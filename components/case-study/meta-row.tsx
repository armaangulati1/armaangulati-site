import { Github, Play, ExternalLink, Server } from "lucide-react";

import type { ProjectFrontmatter } from "@/lib/mdx";

const linkMeta = [
  { key: "github", label: "GitHub", Icon: Github },
  { key: "demo", label: "Live demo", Icon: ExternalLink },
  { key: "loom", label: "Loom walkthrough", Icon: Play },
  { key: "api", label: "API / health", Icon: Server },
] as const;

export function MetaRow({ frontmatter }: { frontmatter: ProjectFrontmatter }) {
  const links = frontmatter.links ?? {};
  const active = linkMeta.filter((l) => links[l.key]);

  return (
    <div className="mt-8 space-y-5 border-y border-border py-5">
      <dl className="grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-metric text-xs uppercase tracking-widest text-muted-foreground">
            Role
          </dt>
          <dd className="mt-1 text-sm text-foreground">{frontmatter.role}</dd>
        </div>
        <div>
          <dt className="text-metric text-xs uppercase tracking-widest text-muted-foreground">
            Timeframe
          </dt>
          <dd className="mt-1 text-sm text-foreground">
            {frontmatter.timeframe}
          </dd>
        </div>
      </dl>

      <div>
        <p className="text-metric text-xs uppercase tracking-widest text-muted-foreground">
          Stack
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {frontmatter.stack.map((s) => (
            <li
              key={s}
              className="text-metric rounded-md border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      {active.length ? (
        <div className="flex flex-wrap gap-3">
          {active.map(({ key, label, Icon }) => (
            <a
              key={key}
              href={links[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-brand/60"
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
