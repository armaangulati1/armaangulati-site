import { Mail } from "lucide-react";

import { site } from "@/lib/site";

// Mobile-only sticky email FAB (spec §12): contact is always <=1 gesture away
// on case-study pages. Hidden on lg where the header CTA is always visible.
export function EmailFab() {
  return (
    <a
      href={`mailto:${site.email}`}
      aria-label="Email Armaan"
      className="fixed bottom-5 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full border border-border bg-brand text-primary-foreground shadow-lg transition-transform hover:scale-105 lg:hidden"
    >
      <Mail className="size-5" aria-hidden="true" />
    </a>
  );
}
