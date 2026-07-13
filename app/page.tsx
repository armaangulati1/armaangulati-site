import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ExperienceBlock } from "@/components/sections/experience-block";
import { Philosophy } from "@/components/sections/philosophy";
import { ContactCTA } from "@/components/sections/contact-cta";
import { personJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(personJsonLd())}
      />
      <Hero />
      <ProofStrip />
      <FeaturedProjects />
      <ExperienceBlock />
      <Philosophy />
      <ContactCTA />
    </>
  );
}
