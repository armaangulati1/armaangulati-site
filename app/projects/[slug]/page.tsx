import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { featuredProjects } from "@/lib/content";
import { site } from "@/lib/site";
import { SectionLabel, Tag } from "@/components/tag";
import { Button } from "@/components/ui/button";

type Params = { slug: string };

function findProject(slug: string) {
  return featuredProjects.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  const name = project?.name ?? "Case study";
  return {
    title: name,
    description: project?.problem ?? "Case study by Armaan Gulati.",
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  const name = project?.name ?? slug;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All projects
      </Link>

      <SectionLabel>Case study</SectionLabel>
      <h1 className="mt-2 text-metric text-3xl font-semibold tracking-tight text-foreground">
        {name}
      </h1>

      {project ? (
        <>
          <p className="mt-4 text-lg leading-[1.65] text-muted-foreground">
            {project.problem}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
            {project.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="mt-10 rounded-xl border border-border bg-card p-6">
        <p className="text-base font-medium text-foreground">
          The full case study is shipping this week.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          It will cover the problem, architecture, technical decisions,
          challenges, and a results table where every metric is shown with its
          qualifier. Want the walkthrough sooner?
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild className="h-11">
            <a href={`mailto:${site.email}`}>Email me</a>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View the code
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
