import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo-name>/, so the build needs a
// base path there. Locally (npm run dev / npm run build) it stays empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // cacheComponents / partialPrefetching (create-next-app defaults) are removed:
  // they need a server and fail with "PPR cannot be enabled in export mode".
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
