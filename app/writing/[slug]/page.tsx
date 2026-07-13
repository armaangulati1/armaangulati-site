import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getPost, getPostSlugs } from "@/lib/mdx";
import { renderMdx } from "@/lib/mdx-render";
import { formatDate } from "@/lib/utils";
import { SectionLabel, Tag } from "@/components/tag";
import { ogImage, articleJsonLd, jsonLdScript } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const { frontmatter } = getPost(slug);
  const images = ogImage({
    title: frontmatter.title,
    subtitle: frontmatter.summary,
    eyebrow: "Writing",
  });
  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      type: "article",
      url: `/writing/${slug}`,
      publishedTime: frontmatter.date,
      images,
    },
    twitter: { card: "summary_large_image", images: images.map((i) => i.url) },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) notFound();

  const { frontmatter, body, readingTime } = getPost(slug);
  const content = await renderMdx(body);

  const articleLd = articleJsonLd({
    title: frontmatter.title,
    description: frontmatter.summary,
    slug,
    datePublished: frontmatter.date,
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(articleLd)}
      />
      <Link
        href="/writing"
        className="inline-flex items-center gap-1 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All writing
      </Link>

      <SectionLabel>Writing</SectionLabel>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {frontmatter.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span aria-hidden="true">·</span>
        <span className="text-metric">{readingTime} min read</span>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
        {frontmatter.tags.map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>

      <div className="prose-body mt-8">{content}</div>
    </article>
  );
}
