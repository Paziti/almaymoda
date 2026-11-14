import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Separación frente / atrás (ver COLABORAR.md):
  // la tienda solo pide datos a @/lib/tienda y nunca importa piezas del panel.
  {
    files: ["src/app/(tienda)/**", "src/components/tienda/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/lib/*", "!@/lib/tienda"],
              message: "La tienda pide los datos solo a \"@/lib/tienda\". Si falta algo, pedíselo a quien mantiene la parte de atrás.",
            },
            {
              group: ["@/components/admin", "@/components/admin/*", "@/app/admin/*"],
              message: "La tienda no usa piezas del panel. Lo compartido está en \"@/components/comun\".",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/comun/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/admin/*", "@/components/tienda/*", "@/lib/store", "@/lib/session"],
              message: "Lo compartido no depende ni de la tienda ni del panel.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
