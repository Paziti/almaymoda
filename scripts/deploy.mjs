// Publica el sitio en Cloudflare: arma los archivos estáticos con Supabase y los sube con wrangler.
// Uso: npm run deploy   (la primera vez: npx wrangler login)
import { execSync } from "node:child_process";
import { rmSync } from "node:fs";

// Claves públicas de Supabase: van igual dentro del sitio, no son secretas.
const env = {
  ...process.env,
  STATIC_EXPORT: "true",
  NEXT_PUBLIC_SUPABASE_URL: "https://eqifqsbyeuuzclrqjamb.supabase.co",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_ScOFYfblIvaui3nGdFYgmQ_S2aMsEaO",
};

const run = (cmd) => execSync(cmd, { stdio: "inherit", env });

rmSync("out", { recursive: true, force: true });
run("npx next build");
run("npx wrangler deploy");
