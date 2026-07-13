// SEO helpers (spec §13): dynamic OG image URLs, JSON-LD structured data, and
// canonical helpers. All URLs are absolute against site.url so they are valid
// in <head> and in JSON-LD regardless of render context.

import { site } from "@/lib/site";

// --------------------------------------------------------------- OG images

// Build a relative /api/og URL (Next resolves it against metadataBase). Params
// are trimmed to what the route reads.
export function ogImageUrl(params: {
  title?: string;
  subtitle?: string;
  metric?: string;
  eyebrow?: string;
}): string {
  const qs = new URLSearchParams();
  if (params.title) qs.set("title", params.title);
  if (params.subtitle) qs.set("subtitle", params.subtitle);
  if (params.metric) qs.set("metric", params.metric);
  if (params.eyebrow) qs.set("eyebrow", params.eyebrow);
  const q = qs.toString();
  return q ? `/api/og?${q}` : "/api/og";
}

// A ready-to-spread openGraph.images entry (1200x630).
export function ogImage(params: Parameters<typeof ogImageUrl>[0]) {
  return [
    {
      url: ogImageUrl(params),
      width: 1200,
      height: 630,
      alt: params.title ?? site.name,
    },
  ];
}

// --------------------------------------------------------------- JSON-LD

// Person (home). alumniOf WashU, jobTitle, sameAs GitHub + LinkedIn (spec §13).
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Applied AI Engineer",
    email: `mailto:${site.email}`,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Washington University in St. Louis",
    },
    sameAs: [site.github, site.linkedin],
  };
}

// SoftwareSourceCode (case studies with a public repo; NOT trust-marketplace).
export function softwareSourceCodeJsonLd(params: {
  name: string;
  description: string;
  codeRepository: string;
  slug: string;
  languages: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: params.name,
    description: params.description,
    codeRepository: params.codeRepository,
    url: `${site.url}/projects/${params.slug}`,
    programmingLanguage: params.languages,
    author: { "@type": "Person", name: site.name, url: site.url },
  };
}

// Article (writing posts).
export function articleJsonLd(params: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    datePublished: params.datePublished,
    dateModified: params.datePublished,
    url: `${site.url}/writing/${params.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/writing/${params.slug}`,
  };
}

// Render helper: a <script type="application/ld+json"> with safe serialization.
export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
