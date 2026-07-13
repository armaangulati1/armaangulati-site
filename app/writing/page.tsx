import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { SectionLabel, Tag } from "@/components/tag";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on honest evaluation, healthcare AI, and forward-deployed engineering by Armaan Gulati.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <AnimatedSection>
        <AnimatedItem>
          <SectionLabel>Writing</SectionLabel>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Writing
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg leading-[1.65] text-muted-foreground">
            Short pieces on honest evaluation and building AI for the population
            you actually have. Each one comes out of a project on this site, and
            each leads with what didn&apos;t work.
          </p>
        </AnimatedItem>

        <ul className="mt-10 divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <AnimatedItem>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block py-6"
                >
                  <div className="flex items-baseline justify-between gap-4 text-xs text-muted-foreground">
                    <time dateTime={post.frontmatter.date}>
                      {formatDate(post.frontmatter.date)}
                    </time>
                    <span className="text-metric">
                      {post.readingTime} min read
                    </span>
                  </div>
                  <h2 className="mt-2 flex items-start gap-2 text-xl font-semibold tracking-tight text-foreground">
                    {post.frontmatter.title}
                    <ArrowUpRight
                      className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                      aria-hidden="true"
                    />
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {post.frontmatter.summary}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
                    {post.frontmatter.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </Link>
              </AnimatedItem>
            </li>
          ))}
        </ul>
      </AnimatedSection>
    </section>
  );
}
