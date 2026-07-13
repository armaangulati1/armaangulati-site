"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

// Collapse tall code blocks (>18 lines, ~480px at 26.6px/line) behind an
// expand control. The child is the shiki-highlighted <pre> from
// rehype-pretty-code; we only wrap it and gate its height.
const COLLAPSE_PX = 480;

export function CodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const ref = React.useRef<HTMLPreElement>(null);
  const [tall, setTall] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (ref.current && ref.current.scrollHeight > COLLAPSE_PX + 24) {
      setTall(true);
    }
  }, []);

  return (
    <div className="not-prose relative my-6">
      <pre
        ref={ref}
        {...props}
        className={cn(
          "overflow-x-auto rounded-md border border-border",
          props.className,
        )}
        style={{
          ...props.style,
          maxHeight: tall && !expanded ? COLLAPSE_PX : undefined,
        }}
      >
        {children}
      </pre>

      {tall && !expanded ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center rounded-b-md bg-gradient-to-t from-card to-transparent">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="pointer-events-auto mb-3 inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm transition-colors hover:border-brand/60"
          >
            Expand
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
