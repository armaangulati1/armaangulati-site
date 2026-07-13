import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/content";
import { Tag } from "@/components/tag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/60"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-metric text-base font-semibold text-foreground">
          {project.name}
        </h3>
        <ArrowUpRight
          className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
          aria-hidden="true"
        />
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {project.problem}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-3">
        {project.metrics.map((m) => (
          <div key={m.label} className="rounded-lg border border-border p-3">
            <dt className="sr-only">{m.label}</dt>
            <dd>
              <span
                className={
                  m.mono !== false
                    ? "text-metric text-lg font-semibold text-foreground"
                    : "text-lg font-semibold text-foreground"
                }
              >
                {m.value}
              </span>
              <span className="mt-0.5 block text-xs font-medium text-foreground">
                {m.label}
              </span>
              <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                {m.qualifier}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
        {project.tags.map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
    </Link>
  );
}
