import { proofStats } from "@/lib/content";
import { StatTile } from "@/components/sections/stat-tile";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";

export function ProofStrip() {
  return (
    <section
      aria-label="Proof points"
      className="mx-auto max-w-5xl px-4 pb-16 sm:px-6"
    >
      <AnimatedSection>
        {/* Horizontal snap-scroll on mobile, 3-up grid on larger screens (spec §12). */}
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
          {proofStats.map((metric) => (
            <li
              key={metric.label}
              className="min-w-[80%] snap-start sm:min-w-0"
            >
              <AnimatedItem className="h-full">
                <StatTile metric={metric} />
              </AnimatedItem>
            </li>
          ))}
        </ul>
      </AnimatedSection>
    </section>
  );
}
