import type { NextConfig } from "next";

// En GitHub Pages el sitio vive en /almaymoda y se publica como archivos estáticos.
const pages = process.env.GITHUB_PAGES === "true";
// En Cloudflare Pages (variable STATIC_EXPORT=true) también son archivos estáticos, en la raíz del dominio.
const staticExport = pages || process.env.STATIC_EXPORT === "true";
const basePath = pages ? "/almaymoda" : "";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const } : {}),
  ...(pages ? { trailingSlash: true } : {}),
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
