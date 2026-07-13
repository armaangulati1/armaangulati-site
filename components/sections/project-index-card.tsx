import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Tag } from "@/components/tag";
import type { ProjectMetric } from "@/lib/mdx";

export type IndexCard = {
  slug: string;
  title: string;
  oneLiner: string;
  metrics: ProjectMetric[];
  tags: string[];
  href: string | null;
  note?: string;
  image?: { src: string; alt: string } | null;
};

export function ProjectIndexCard({ card }: { card: IndexCard }) {
  const inner = (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors group-hover:border-brand/60">
      {card.image ? (
        <div className="aspect-[16/10] w-full overflow-hidden border-b border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image.src}
            alt={card.image.alt}
            loading="lazy"
            className="size-full object-cover object-top"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-metric text-base font-semibold text-foreground">
          {card.title}
        </h3>
        {card.href ? (
          <ArrowUpRight
            className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
            aria-hidden="true"
          />
        ) : card.note ? (
          <span className="text-metric shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            {card.note}
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {card.oneLiner}
      </p>

      {card.metrics.length ? (
        <dl className="mt-4 grid grid-cols-2 gap-3">
          {card.metrics.slice(0, 2).map((m) => (
            <div key={m.label} className="rounded-lg border border-border p-3">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="text-metric text-lg font-semibold text-foreground">
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
      ) : null}

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
        {card.tags.map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );

  if (card.href) {
    return (
      <Link href={card.href} className="group block h-full">
        {inner}
      </Link>
    );
  }
  return <div className="group h-full">{inner}</div>;
}
