import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  getAllProjects,
  getProject,
  getProjectSlugs,
  splitAtArchitecture,
} from "@/lib/mdx";
import { renderMdx } from "@/lib/mdx-render";
import { screenshots } from "@/lib/screenshots";
import { SectionLabel, Tag } from "@/components/tag";
import { MetaRow } from "@/components/case-study/meta-row";
import { TldrBox } from "@/components/case-study/tldr-box";
import { TocRail, TocDisclosure } from "@/components/case-study/toc";
import { CtaStrip } from "@/components/case-study/cta-strip";
import { EmailFab } from "@/components/case-study/email-fab";
import { ProjectDiagram } from "@/components/diagrams";

type Params = { slug: string };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getProjectSlugs().includes(slug)) return {};
  const { frontmatter } = getProject(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.oneLiner,
    openGraph: { title: frontmatter.title, description: frontmatter.oneLiner },
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (!getProjectSlugs().includes(slug)) notFound();

  const { frontmatter, body, toc } = getProject(slug);
  const { before, after } = splitAtArchitecture(body);
  const beforeContent = await renderMdx(before);
  const afterContent = after ? await renderMdx(after) : null;

  // Next project for the CTA strip (flagship-first order, wraps around).
  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const nextDoc = all.length > 1 ? all[(idx + 1) % all.length] : null;
  const next = nextDoc
    ? { slug: nextDoc.slug, title: nextDoc.frontmatter.title }
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
      <aside className="lg:pt-40">
        <TocRail items={toc} />
      </aside>

      <article className="min-w-0 max-w-3xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All projects
        </Link>

        <SectionLabel>Case study</SectionLabel>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 text-lg leading-[1.6] text-muted-foreground">
          {frontmatter.oneLiner}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
          {frontmatter.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <MetaRow frontmatter={frontmatter} />
        <TldrBox points={frontmatter.tldr} />

        {screenshots[slug] ? (
          <figure className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshots[slug].src}
              alt={screenshots[slug].alt}
              className="w-full rounded-xl border border-border"
              loading="lazy"
            />
            <figcaption className="mt-2 text-sm text-muted-foreground">
              Live demo, captured from the deployed build.
            </figcaption>
          </figure>
        ) : null}

        <TocDisclosure items={toc} />

        <div className="prose-body mt-4">
          {beforeContent}
          <ProjectDiagram name={frontmatter.diagram} />
          {afterContent}
        </div>

        <CtaStrip next={next} />
      </article>

      <EmailFab />
    </div>
  );
}
