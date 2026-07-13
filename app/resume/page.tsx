import type { Metadata } from "next";
import { Download } from "lucide-react";

import { site } from "@/lib/site";
import { SectionLabel } from "@/components/tag";
import { Button } from "@/components/ui/button";
import { AtsResume } from "@/components/ats-resume";
import { ResumeEmbed } from "@/components/resume-embed";
import { ogImage } from "@/lib/seo";

const description =
  "Resume of Armaan Gulati, applied-AI / forward-deployed engineer building agentic systems for healthcare operations.";

export const metadata: Metadata = {
  title: "Resume",
  description,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume",
    description,
    url: "/resume",
    images: ogImage({
      title: "Armaan Gulati",
      subtitle: "Applied AI / forward-deployed engineer, healthcare operations",
      eyebrow: "Resume",
    }),
  },
};

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* items-start (not items-end) pins the download button to the row top so
          it cannot shift down when the heading reflows on web-font swap. */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <SectionLabel>Resume</SectionLabel>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Resume
          </h1>
        </div>
        <Button asChild className="h-11">
          <a href={site.resumePath} download="Armaan_Gulati_Resume.pdf">
            <Download className="size-4" aria-hidden="true" />
            Download PDF
          </a>
        </Button>
      </div>

      <ResumeEmbed />

      <hr className="my-12 border-border" />

      <div>
        <p className="mb-6 text-sm text-muted-foreground">
          Full resume text, for screen readers and applicant tracking systems:
        </p>
        <AtsResume />
      </div>
    </section>
  );
}
