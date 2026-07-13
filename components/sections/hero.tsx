import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

// The hero is the LCP element and is rendered statically (no JS-gated entrance
// animation): a framer-motion opacity:0 initial state defers mobile LCP until
// hydration. Below-the-fold sections keep their scroll entrance. (spec §9 motion
// budget is preserved for revealed-on-scroll content; the fold paints instantly.)
export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20">
      <div className="max-w-3xl">
        <h1
          className="font-semibold leading-[1.05] tracking-[-0.02em] text-foreground"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
        >
          Building AI systems for healthcare operations.
        </h1>

        <p className="mt-6 max-w-[60ch] text-lg leading-[1.65] text-muted-foreground">
          Two years embedded with Medicaid providers as one of two engineers on
          a platform that reached 35,000+ reported enrollments and
          re-enrollments. Agentic systems for prior authorization and clinical
          data, shipped with eval harnesses and honest numbers.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11">
                <Link href="/projects">
                  View projects
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11">
                <Link href="/resume">Resume</Link>
              </Button>
            </div>

            <div className="flex items-center gap-1 sm:ml-2">
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
            </div>
          </div>
        </div>
    </section>
  );
}
