"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import type { TocEntry } from "@/lib/mdx";
import { cn } from "@/lib/utils";

function useActiveHeading(ids: string[]): string | null {
  const [active, setActive] = React.useState<string | null>(ids[0] ?? null);

  React.useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function TocLinks({
  items,
  active,
  onNavigate,
}: {
  items: TocEntry[];
  active: string | null;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-1.5 text-sm">
      {items.map((item) => (
        <li key={item.id} className={item.depth === 3 ? "pl-3" : undefined}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            className={cn(
              "block rounded py-0.5 transition-colors",
              active === item.id
                ? "font-medium text-brand"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

// Sticky rail for >= 1024px (spec §3).
export function TocRail({ items }: { items: TocEntry[] }) {
  const ids = React.useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveHeading(ids);
  if (!items.length) return null;
  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
    >
      <p className="text-metric mb-3 text-xs uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <TocLinks items={items} active={active} />
    </nav>
  );
}

// Collapsed "On this page" disclosure for mobile (spec §12).
export function TocDisclosure({ items }: { items: TocEntry[] }) {
  const ids = React.useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveHeading(ids);
  if (!items.length) return null;
  return (
    <details className="group mt-8 rounded-lg border border-border bg-card lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
        On this page
        <ChevronDown
          className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="border-t border-border px-4 py-3">
        <TocLinks items={items} active={active} />
      </div>
    </details>
  );
}
