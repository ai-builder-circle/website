import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: no server, deployable anywhere (Vercel serves `out/`).
  output: "export",
  // The default image optimizer needs a server. Images are pre-sized at build
  // time instead (see Phase 3), so next/image serves them as-is.
  images: { unoptimized: true },
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
