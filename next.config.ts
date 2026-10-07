import type { NextConfig } from "next";
import sizes from "./image-sizes.json";

const nextConfig: NextConfig = {
  // Static HTML export: no server, deployable anywhere (Vercel serves `out/`).
  output: "export",
  // The default image optimizer needs a server. Photos are pre-sized at build
  // time by scripts/optimize-images.mts and served through this loader.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: sizes.deviceSizes,
    imageSizes: sizes.imageSizes,
  },
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
