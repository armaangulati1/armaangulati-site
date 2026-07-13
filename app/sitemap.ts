import type { MetadataRoute } from "next";

import { site } from "@/lib/site";
import { getProjectSlugs, getAllPosts } from "@/lib/mdx";

// All routes (spec §13). Static pages + every project + every post.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, priority: 1 },
    { url: `${site.url}/projects`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/writing`, lastModified: now, priority: 0.6 },
    { url: `${site.url}/resume`, lastModified: now, priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url: `${site.url}/projects/${slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/writing/${post.slug}`,
    lastModified: new Date(`${post.frontmatter.date}T00:00:00Z`),
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
