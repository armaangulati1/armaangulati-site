import type { Metadata } from "next";

import { getAllProjects } from "@/lib/mdx";
import { screenshots } from "@/lib/screenshots";
import { SectionLabel } from "@/components/tag";
import { ProjectExplorer } from "@/components/sections/project-explorer";
import type { IndexCard } from "@/components/sections/project-index-card";
import { ogImage } from "@/lib/seo";

const description =
  "Healthcare-AI systems built and evaluated by Armaan Gulati, with honest metrics and disclosed limitations.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects",
    description,
    url: "/projects",
    images: ogImage({ title: "Projects", subtitle: description }),
  },
};

// clinical-rag has no case study at launch: a light card marked "write-up
// coming", with no metrics claimed yet (spec §6).
const clinicalRagCard: IndexCard = {
  slug: "clinical-rag",
  title: "clinical-rag",
  oneLiner:
    "A hybrid-retrieval clinical RAG system with reranking, a RAGAS evaluation harness, and CI. No accuracy metrics claimed yet.",
  metrics: [],
  tags: ["healthcare", "evals", "infra"],
  href: null,
  note: "write-up coming",
};

export default function ProjectsPage() {
  const cards: IndexCard[] = getAllProjects().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    oneLiner: p.frontmatter.oneLiner,
    metrics: p.frontmatter.metrics ?? [],
    tags: p.frontmatter.tags ?? [],
    href: `/projects/${p.slug}`,
    image: screenshots[p.slug] ?? null,
  }));
  cards.push(clinicalRagCard);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionLabel>Projects</SectionLabel>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Projects
      </h1>
      <p className="mt-4 max-w-[60ch] text-lg leading-[1.65] text-muted-foreground">
        Healthcare-AI systems, each with an architecture diagram, the technical
        decisions behind it, and a results table where every metric shows its
        qualifier. The failures are in here too, on purpose.
      </p>

      <ProjectExplorer cards={cards} />
    </section>
  );
}
