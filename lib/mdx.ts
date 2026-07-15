// MDX content loader. Frontmatter drives everything; prose is review-controlled
// and rendered verbatim. Files live in content/projects and content/writing and
// are synced from the career-agent workspace via scripts/sync-content.mjs.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const CONTENT_ROOT = join(process.cwd(), "content");
const PROJECTS_DIR = join(CONTENT_ROOT, "projects");
const WRITING_DIR = join(CONTENT_ROOT, "writing");

export type ProjectMetric = {
  value: string;
  label: string;
  qualifier: string;
};

export type ProjectLinks = {
  github?: string;
  demo?: string;
  loom?: string;
  api?: string;
};

export type ProjectFrontmatter = {
  title: string;
  oneLiner: string;
  role: string;
  timeframe: string;
  stack: string[];
  tags: string[];
  featured: boolean;
  metrics: ProjectMetric[];
  links: ProjectLinks;
  diagram?: string;
  tldr: string[];
};

export type PostFrontmatter = {
  title: string;
  date: string; // normalized to YYYY-MM-DD
  summary: string;
  tags: string[];
};

export type TocEntry = { depth: 2 | 3; text: string; id: string };

export type ProjectDoc = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  body: string;
  toc: TocEntry[];
};

export type PostDoc = {
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
  toc: TocEntry[];
  readingTime: number; // minutes
};

// Flagship-first ordering for the projects index and next/prev navigation.
const PROJECT_ORDER = [
  "clinical-ops-copilot",
  "chartextractor",
  "handoff-lens",
  "ledgersim",
  "trust-marketplace",
  "chartextract-ui",
];

function slugFromFile(file: string): string {
  return file.replace(/\.mdx$/, "");
}

// gray-matter/js-yaml parses an unquoted `2026-07-14` into a Date at UTC
// midnight. Normalize back to a stable YYYY-MM-DD string in UTC (no TZ drift).
function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "");
}

// Build the table of contents by scanning h2/h3 markdown headings in the body.
// Uses github-slugger so ids match rehype-slug's generated heading ids exactly.
function buildToc(body: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const toc: TocEntry[] = [];
  let inFence = false;
  for (const rawLine of body.split("\n")) {
    const line = rawLine.trimEnd();
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!match) continue;
    const depth = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    toc.push({ depth, text, id: slugger.slug(text) });
  }
  return toc;
}

function computeReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Split the body at the "## Architecture" heading so the animated diagram can be
// injected directly beneath it without editing prose. `before` keeps the heading
// line; `after` is the remainder. If there is no such heading, `after` is empty.
export function splitAtArchitecture(body: string): {
  before: string;
  after: string;
} {
  const lines = body.split("\n");
  const idx = lines.findIndex((l) => /^##\s+Architecture\s*$/.test(l.trim()));
  if (idx === -1) return { before: body, after: "" };
  return {
    before: lines.slice(0, idx + 1).join("\n"),
    after: lines.slice(idx + 1).join("\n"),
  };
}

// ---------------------------------------------------------------- Projects

export function getProjectSlugs(): string[] {
  return readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(slugFromFile);
}

export function getProject(slug: string): ProjectDoc {
  const raw = readFileSync(join(PROJECTS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    body: content,
    toc: buildToc(content),
  };
}

export function getAllProjects(): ProjectDoc[] {
  const docs = getProjectSlugs().map(getProject);
  return docs.sort((a, b) => {
    const ai = PROJECT_ORDER.indexOf(a.slug);
    const bi = PROJECT_ORDER.indexOf(b.slug);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

// ---------------------------------------------------------------- Writing

export function getPostSlugs(): string[] {
  return readdirSync(WRITING_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(slugFromFile);
}

export function getPost(slug: string): PostDoc {
  const raw = readFileSync(join(WRITING_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = {
    ...(data as Omit<PostFrontmatter, "date">),
    date: normalizeDate((data as { date?: unknown }).date),
  } as PostFrontmatter;
  return {
    slug,
    frontmatter,
    body: content,
    toc: buildToc(content),
    readingTime: computeReadingTime(content),
  };
}

export function getAllPosts(): PostDoc[] {
  const docs = getPostSlugs().map(getPost);
  return docs.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1,
  );
}
