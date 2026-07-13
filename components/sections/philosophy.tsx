import { philosophy } from "@/lib/content";
import { SectionLabel } from "@/components/tag";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <AnimatedSection>
          <AnimatedItem>
            <SectionLabel>Engineering philosophy</SectionLabel>
            <h2
              id="philosophy-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-foreground"
            >
              How I work
            </h2>
          </AnimatedItem>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {philosophy.map((p) => (
              <li key={p.title}>
                <AnimatedItem className="h-full">
                  <div className="h-full rounded-xl border border-border bg-card p-5">
                    <h3 className="text-base font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </AnimatedItem>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
}
