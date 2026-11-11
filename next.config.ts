import type { NextConfig } from "next";

// En GitHub Pages el sitio vive en /almaymoda y se publica como archivos estáticos.
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? "/almaymoda" : "";

const nextConfig: NextConfig = {
  ...(pages ? { output: "export" as const, trailingSlash: true } : {}),
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
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
