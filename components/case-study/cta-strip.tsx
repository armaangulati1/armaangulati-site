import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function CtaStrip({
  next,
}: {
  next?: { slug: string; title: string } | null;
}) {
  return (
    <div className="mt-16 rounded-xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-foreground">
            Want the walkthrough, or the parts that didn&apos;t work?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            The fastest way to reach me is email. I respond within a day.
          </p>
        </div>
        <Button asChild className="h-11 shrink-0">
          <a href={`mailto:${site.email}`}>
            <Mail className="size-4" aria-hidden="true" />
            Email me
          </a>
        </Button>
      </div>

      {next ? (
        <div className="mt-6 border-t border-border pt-5">
          <Link
            href={`/projects/${next.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Next project
            <span className="font-medium text-foreground">{next.title}</span>
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
