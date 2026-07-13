"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  ProjectIndexCard,
  type IndexCard,
} from "@/components/sections/project-index-card";

// Filter tags per spec §1. Client-side filter, synced to the ?tag= URL param.
// We deliberately avoid useSearchParams (it forces a dynamic/client-only render
// and would leave the cards out of the static HTML); instead all cards are
// server-rendered, and a deep-linked ?tag is applied on mount.
const FILTERS = ["healthcare", "agents", "evals", "infra", "frontend"] as const;

export function ProjectExplorer({ cards }: { cards: IndexCard[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = React.useState<string | null>(null);

  // Apply a deep-linked ?tag on first mount (keeps the page statically render-
  // able with all cards visible by default).
  React.useEffect(() => {
    const tag = new URLSearchParams(window.location.search).get("tag");
    if (tag && FILTERS.includes(tag as (typeof FILTERS)[number])) {
      setActive(tag);
    }
  }, []);

  const setTag = (tag: string | null) => {
    setActive(tag);
    const params = new URLSearchParams(window.location.search);
    if (tag) params.set("tag", tag);
    else params.delete("tag");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const visible = active
    ? cards.filter((c) => c.tags.includes(active))
    : cards;

  return (
    <>
      <div
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by tag"
      >
        <FilterButton
          label="All"
          selected={!active}
          onClick={() => setTag(null)}
        />
        {FILTERS.map((tag) => (
          <FilterButton
            key={tag}
            label={tag}
            selected={active === tag}
            onClick={() => setTag(active === tag ? null : tag)}
          />
        ))}
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((card) => (
          <li key={card.slug}>
            <ProjectIndexCard card={card} />
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No projects tagged {active}.
        </p>
      ) : null}
    </>
  );
}

function FilterButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-full border px-3 py-1 text-sm capitalize transition-colors",
        selected
          ? "border-brand bg-brand-soft text-brand"
          : "border-border text-muted-foreground hover:border-brand/50 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
