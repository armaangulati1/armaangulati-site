import { site } from "@/lib/site";
import { SectionLabel } from "@/components/tag";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";

export function ContactCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <AnimatedSection>
          <AnimatedItem>
            <SectionLabel>Contact</SectionLabel>
            <h2
              id="contact-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-foreground"
            >
              The fastest way to reach me is email.
            </h2>
          </AnimatedItem>

          <AnimatedItem>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-metric font-semibold tracking-tight text-brand hover:underline"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}
            >
              {site.email}
            </a>
          </AnimatedItem>

          <AnimatedItem>
            <p className="mt-4 text-base text-muted-foreground">
              I respond within a day.
            </p>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
