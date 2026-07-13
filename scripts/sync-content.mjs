// Copies review-controlled MDX source files from the career-agent outputs into
// this repo's content/ tree. Re-runnable: run at launch to pick up final text.
//
//   npm run sync:content
//
// The source files are the single source of truth for prose. This script only
// copies bytes; it never rewrites content. If a source file changes, re-run.

import { cp, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

// Source lives outside this repo (the career-agent workspace). Overridable via
// env for portability.
const SOURCE_ROOT =
  process.env.SITE_CONTENT_SOURCE ??
  "/Users/agulati/career-agent/outputs/site-content";

const groups = [
  { from: join(SOURCE_ROOT, "projects"), to: join(repoRoot, "content", "projects") },
  { from: join(SOURCE_ROOT, "writing"), to: join(repoRoot, "content", "writing") },
];

let copied = 0;

for (const { from, to } of groups) {
  if (!existsSync(from)) {
    console.error(`[sync-content] source missing: ${from}`);
    process.exitCode = 1;
    continue;
  }
  await mkdir(to, { recursive: true });
  const entries = await readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue;
    await cp(join(from, entry.name), join(to, entry.name));
    copied += 1;
    console.log(`[sync-content] ${entry.name} -> ${to.replace(repoRoot + "/", "")}`);
  }
}

console.log(`[sync-content] done. ${copied} file(s) copied.`);
