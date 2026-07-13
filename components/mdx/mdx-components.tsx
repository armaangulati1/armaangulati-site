import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

// A slugged, hover-linkable heading. rehype-slug supplies the id.
function Heading2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      {...props}
      className="group mt-12 scroll-mt-20 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
    >
      {props.id ? (
        <a href={`#${props.id}`} className="no-underline">
          {props.children}
        </a>
      ) : (
        props.children
      )}
    </h2>
  );
}

function InternalOrExternalLink(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "";
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link
        href={href}
        className="font-medium text-brand underline-offset-4 hover:underline"
      >
        {props.children}
      </Link>
    );
  }
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand underline-offset-4 hover:underline"
    >
      {props.children}
    </a>
  );
}

// Callout for MDX authors (not used by current prose, available going forward).
export function Callout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <aside className="not-prose my-6 flex gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
      <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
      <div>
        {title ? (
          <p className="mb-1 font-medium text-foreground">{title}</p>
        ) : null}
        {children}
      </div>
    </aside>
  );
}

export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-lg border border-border"
        loading="lazy"
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  h2: Heading2,
  h3: (props) => (
    <h3
      {...props}
      className="mt-8 scroll-mt-20 text-lg font-semibold tracking-tight text-foreground"
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      className="mt-6 scroll-mt-20 text-base font-semibold text-foreground"
    />
  ),
  p: (props) => (
    <p
      {...props}
      className="mt-4 text-[15px] leading-[1.7] text-foreground/90 sm:text-base"
    />
  ),
  a: InternalOrExternalLink,
  ul: (props) => (
    <ul
      {...props}
      className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-foreground/90 marker:text-muted-foreground sm:text-base"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-[1.7] text-foreground/90 marker:text-muted-foreground sm:text-base"
    />
  ),
  li: (props) => <li {...props} className="pl-1" />,
  strong: (props) => (
    <strong {...props} className="font-semibold text-foreground" />
  ),
  em: (props) => <em {...props} className="italic" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="mt-6 border-l-2 border-brand/50 pl-4 text-muted-foreground italic"
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  pre: (props) => <CodeBlock {...props} />,
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table {...props} className={cn("metrics-table", props.className)} />
    </div>
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ""}
      className="my-8 w-full rounded-lg border border-border"
      loading="lazy"
    />
  ),
  Callout,
  Figure,
};
