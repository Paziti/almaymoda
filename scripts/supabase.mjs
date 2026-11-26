// Corre la CLI de Supabase con la cuenta de Alma y Moda, sin tocar el login global
// (que puede ser de otro proyecto). Lee supabase/credenciales.local, que no se sube a GitHub.
// Uso: npm run sb -- migration list     |     npm run sb -- db push
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";

const FILE = "supabase/credenciales.local";
if (!existsSync(FILE)) {
  console.error(`Falta ${FILE}. Copiá supabase/credenciales.example con ese nombre y completalo.`);
  process.exit(1);
}

const env = { ...process.env };
for (const line of readFileSync(FILE, "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
  if (m && m[2]) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
if (!env.SUPABASE_ACCESS_TOKEN) {
  console.error(`Falta SUPABASE_ACCESS_TOKEN en ${FILE}.`);
  process.exit(1);
}

// Directo al JS de la CLI (sin npx ni shell) para que los argumentos con espacios, como un SQL, lleguen enteros.
const cli = createRequire(import.meta.url).resolve("supabase/dist/supabase.js");
const r = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], { stdio: "inherit", env });
process.exit(r.status ?? 1);
