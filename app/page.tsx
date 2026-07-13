import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ExperienceBlock } from "@/components/sections/experience-block";
import { Philosophy } from "@/components/sections/philosophy";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <FeaturedProjects />
      <ExperienceBlock />
      <Philosophy />
      <ContactCTA />
    </>
  );
}
