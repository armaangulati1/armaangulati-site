import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

// Allow all crawlers (spec §13). Sitemap advertised for discovery.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
