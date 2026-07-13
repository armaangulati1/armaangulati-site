import type { Metadata } from "next";
import { Download } from "lucide-react";

import { site } from "@/lib/site";
import { SectionLabel } from "@/components/tag";
import { Button } from "@/components/ui/button";
import { AtsResume } from "@/components/ats-resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Armaan Gulati, applied-AI / forward-deployed engineer building agentic systems for healthcare operations.",
};

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
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

      {/* Embedded PDF viewer (spec §1/§14). The ATS mirror below is the
          accessible, machine-readable alternative. */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <object
          data={`${site.resumePath}#view=FitH`}
          type="application/pdf"
          aria-label="Armaan Gulati resume, PDF"
          className="h-[80vh] w-full"
        >
          <div className="p-6 text-sm text-muted-foreground">
            Your browser cannot display the embedded PDF.{" "}
            <a
              href={site.resumePath}
              download="Armaan_Gulati_Resume.pdf"
              className="font-medium text-brand underline"
            >
              Download the resume PDF
            </a>{" "}
            or read the full text below.
          </div>
        </object>
      </div>

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
