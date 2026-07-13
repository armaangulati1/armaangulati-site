import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { featuredProjects } from "@/lib/content";
import { SectionLabel } from "@/components/tag";
import { ProjectCard } from "@/components/sections/project-card";
import { AnimatedSection, AnimatedItem } from "@/components/animated-section";

export function FeaturedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 border-t border-border"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <AnimatedSection>
          <AnimatedItem>
            <div className="flex items-end justify-between gap-4">
              <div>
                <SectionLabel>Featured projects</SectionLabel>
                <h2
                  id="projects-heading"
                  className="mt-2 text-2xl font-semibold tracking-tight text-foreground"
                >
                  Systems I built and evaluated
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden shrink-0 items-center gap-1 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                All projects
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </AnimatedItem>

          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <AnimatedItem className="h-full">
                  <ProjectCard project={project} />
                </AnimatedItem>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
}
