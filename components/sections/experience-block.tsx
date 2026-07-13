import { experience } from "@/lib/content";
import { SectionLabel } from "@/components/tag";
import { StatTile } from "@/components/sections/stat-tile";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";

export function ExperienceBlock() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <AnimatedSection>
          <AnimatedItem>
            <SectionLabel>Healthcare-AI experience</SectionLabel>
            <h2
              id="experience-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-foreground"
            >
              Two years at {experience.employer}
            </h2>
          </AnimatedItem>

          <div className="mt-6 grid gap-8 md:grid-cols-5">
            <AnimatedItem className="md:col-span-3">
              <div className="space-y-4 text-lg leading-[1.65] text-muted-foreground">
                {experience.sentences.map((s, i) => (
                  <p key={i}>{s}</p>
                ))}
              </div>
            </AnimatedItem>

            <div className="flex flex-col gap-4 md:col-span-2">
              {experience.stats.map((metric) => (
                <AnimatedItem key={metric.label}>
                  <StatTile metric={metric} />
                </AnimatedItem>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
