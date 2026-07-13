import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { nav, site } from "@/lib/site";
import { AGLogo } from "@/components/ag-logo";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <AGLogo className="size-7 text-foreground" />
          <div className="text-sm">
            <p className="font-medium text-foreground">{site.name}</p>
            <p className="text-muted-foreground">
              AI systems for healthcare operations.
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-5" aria-hidden="true" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="size-5" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-5" aria-hidden="true" />
          </a>
        </nav>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
        <p className="text-xs text-muted-foreground">
          Built with Next.js. No trackers beyond privacy-safe, cookieless page
          counts.
        </p>
      </div>
    </footer>
  );
}
