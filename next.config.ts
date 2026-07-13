import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The /api/og route reads Geist TTFs from node_modules at runtime; trace them
  // into the serverless bundle so OG generation works after deploy too.
  outputFileTracingIncludes: {
    "/api/og": ["./node_modules/geist/dist/fonts/**/*.ttf"],
  },
};

export default nextConfig;
