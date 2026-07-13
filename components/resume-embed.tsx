"use client";

import * as React from "react";
import { FileText } from "lucide-react";

import { site } from "@/lib/site";

// In-page PDF viewer (spec §1/§14). The heavy PDF is loaded on a user gesture
// rather than eagerly: Chrome's PDF plugin reflows the whole page when it
// initializes (both <object> and <iframe> do this), which is a measurable
// desktop layout shift. Loading on click defers the shift past a user
// interaction (excluded from CLS) and also avoids fetching a large PDF on first
// paint. The fixed-height container reserves the space up front, and the plain
// download link + the ATS text mirror below are always available (including for
// screen readers and applicant tracking systems).
export function ResumeEmbed() {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <>
      <div className="mt-8 h-[60vh] overflow-hidden rounded-xl border border-border bg-card sm:h-[80vh]">
        {loaded ? (
          <iframe
            src={`${site.resumePath}#view=FitH`}
            title="Armaan Gulati resume, PDF"
            className="size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group flex size-full flex-col items-center justify-center gap-2 px-6 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <FileText className="size-7" aria-hidden="true" />
            Show the embedded resume preview
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Prefer a file?{" "}
        <a
          href={site.resumePath}
          download="Armaan_Gulati_Resume.pdf"
          className="font-medium text-brand underline"
        >
          Download the resume PDF
        </a>
        .
      </p>
    </>
  );
}
