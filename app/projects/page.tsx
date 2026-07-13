import type { Metadata } from "next";

import { featuredProjects } from "@/lib/content";
import { SectionLabel } from "@/components/tag";
import { ProjectCard } from "@/components/sections/project-card";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Healthcare-AI systems built and evaluated by Armaan Gulati, with honest metrics and disclosed limitations.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <AnimatedSection>
        <AnimatedItem>
          <SectionLabel>Projects</SectionLabel>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg leading-[1.65] text-muted-foreground">
            Full case studies, with architecture diagrams, technical decisions,
            and metrics tables that always show their qualifiers, are shipping
            this week. Until then, here is the shape of the work.
          </p>
        </AnimatedItem>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <AnimatedItem className="h-full">
                <ProjectCard project={project} />
              </AnimatedItem>
            </li>
          ))}
        </ul>
      </AnimatedSection>
    </section>
  );
}
