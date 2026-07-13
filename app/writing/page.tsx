import type { Metadata } from "next";

import { site } from "@/lib/site";
import { SectionLabel } from "@/components/tag";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on building and honestly evaluating AI systems for healthcare, by Armaan Gulati.",
};

const planned = [
  "When your LLM judge fails its own eval",
  "Fine-tuning won in-distribution and lost out-of-distribution",
  "What 63.8% no-email taught me about building for Medicaid",
];

export default function WritingPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <AnimatedSection>
        <AnimatedItem>
          <SectionLabel>Writing</SectionLabel>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Writing
          </h1>
          <p className="mt-4 text-lg leading-[1.65] text-muted-foreground">
            The first posts are being written from work that is already public.
            Each one is a story about an eval that told me something I did not
            want to hear.
          </p>
        </AnimatedItem>

        <AnimatedItem>
          <ul className="mt-8 space-y-3">
            {planned.map((title) => (
              <li
                key={title}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="text-base font-medium text-foreground">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Coming soon.
                </p>
              </li>
            ))}
          </ul>
        </AnimatedItem>

        <AnimatedItem>
          <div className="mt-8">
            <Button asChild variant="outline" className="h-11">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the code and evals meanwhile
              </a>
            </Button>
          </div>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
