// Uso: node scripts/importar-inventario.mjs archivos/INVENTARIO.xlsx "archivos/CLIENTES.xls" archivos
// Deja importar_inventario.sql e importar_clientes.sql en la carpeta indicada (archivos/ no se sube a GitHub).
// Genera el SQL para cargar en Supabase el inventario (xlsx) y las clientas (xls).
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");
const [, , invPath, cliPath, outDir] = process.argv;

const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const slug = (s) => clean(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const nice = (s) => {
  const t = clean(s);
  if (t !== t.toUpperCase() || !/[A-Z]/.test(t)) return t;
  const low = t.toLowerCase();
  return low.charAt(0).toUpperCase() + low.slice(1);
};
const title = (s) => clean(s).toLowerCase().replace(/(^|[\s(.-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase());
const num = (v) => {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : Number(String(v).replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

const RULES = [
  ["Viaje", /valij|carry|set de \d+"|abs|almohada|viaje|porta ?valores|candado|etiqueta|organizador de valija/],
  ["Mochilas", /mochila/],
  ["Materos", /mater|bombilla|\bmate\b|yerbera/],
  ["Térmicos", /termo|vaso|jarro|taza/],
  ["Botellas", /botella|botinero/],
  ["Billeteras", /billetera|tarjetero|monedero|portacelular|porta celular|fichero|cartuchera/],
  ["Carteras", /cartera|bandolera|morral|tote|clutch|sobre|shopping|phone ?bag|gondola|góndola/],
  ["Bolsos", /bolso|ri[ñn]oner|rñoner|beach ?bag|porta ?cosm|neceser|necessaire|cosmetiquero|portacosmetico|bolsa|matero/],
];
const category = (name) => {
  const n = name.toLowerCase();
  for (const [c, re] of RULES) if (re.test(n)) return c;
  return "Accesorios";
};

const SUPPLIERS = {
  "ALL BRANDS": { name: "All Brands" },
  "BAG COMPANY": { name: "Bag Company" },
  "GOOD COMPANY": { name: "Good Company", legal: "GOOD COMPANY", address: "Galicia 144", phone: "011-20811675", email: "info@goodcompany.com.ar", cuit: "30711061114", contact: "Transporte Interprovincial" },
  LESEDIFE: { name: "Lesedife", legal: "LESEDIFE S.A.", address: "Av Corrientes 3360 9", postal: "1001", phone: "011-39873111", email: "info@lesedife.com", cuit: "30661041486", contact: "Vendedora Cecilia (cecilias@lesedife.com)" },
  TARGET: { name: "Target Moda", legal: "TARGET MODA", address: "Av Corrientes 2136", phone: "011-50319444", email: "info@targetmoda.com.ar", cuit: "20223812733", contact: "Transporte Interprovincial" },
  TENDENCE: { name: "Tendence" },
  ZATEL: { name: "Zatel" },
};

const wb = XLSX.read(readFileSync(invPath));
const sup = [], prod = [], vars = [];
const stats = { sinPrecio: 0, porCat: {}, porProv: {} };
const seen = new Set();
for (const sheet of wb.SheetNames) {
  const meta = SUPPLIERS[sheet];
  if (!meta) { console.error("Hoja salteada:", sheet); continue; }
  const sid = `s_inv_${slug(sheet)}`;
  sup.push(`(${q(sid)}, ${q(meta.name)}, ${q(meta.legal ?? "")}, ${q(meta.address ?? "")}, ${q(meta.postal ?? "")}, ${q(meta.cuit ? "Responsable Inscripto" : "")}, ${q(meta.cuit ?? "")}, ${q(meta.contact ?? "")}, ${q(meta.phone ?? "")}, ${q(meta.email ?? "")}, 'Importado del inventario del 18/11')`);
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { header: 1, blankrows: false }).slice(1);
  let i = 0;
  for (const r of rows) {
    const [barcode, code, desc, cost, price, , stock] = r;
    const name = nice(desc);
    if (!name && !code) continue;
    i++;
    let id = `p_inv_${slug(sheet)}_${slug(code) || i}`;
    while (seen.has(id)) id += "_b";
    seen.add(id);
    const p = num(price);
    const c = num(cost);
    const cat = category(name);
    if (!p) stats.sinPrecio++;
    stats.porCat[cat] = (stats.porCat[cat] ?? 0) + 1;
    stats.porProv[meta.name] = (stats.porProv[meta.name] ?? 0) + 1;
    const bc = clean(barcode).replace(/\D/g, "");
    prod.push(`(${q(id)}, ${q(clean(code))}, ${bc ? q(bc) : "null"}, ${q(name || clean(code))}, ${q(cat)}, ${q(sid)}, ${c && c > 0 ? c : 0}, ${p && p > 0 ? Math.round(p) : "null"}, false)`);
    vars.push(`(${q(`v_${id.slice(2)}`)}, ${q(id)}, ${Math.max(0, Math.round(num(stock) ?? 0))})`);
  }
}

const inv = `-- Inventario del 18/11 (ALMA_Y_MODA_INVENTARIO_18_DE_NOV.xlsx) → Supabase.
-- Generado automáticamente. Contiene datos reales del local: NO subir a GitHub.
-- Correr en Supabase: SQL Editor → New query → pegar todo → Run. Se puede correr más de una vez.

begin;

-- 1) Borrar los datos de ejemplo (artículos, proveedores, clientas, pedidos y remitos de prueba).
delete from public.remitos where demo;
delete from public.orders where demo;
delete from public.clients where demo;
delete from public.products where demo;
delete from public.suppliers where demo;

-- 2) Categoría "Accesorios" para lo que no entra en las demás (pañuelos, cinturones, bombillas sueltas…).
update public.settings
set data = jsonb_set(data, '{categories}', (data -> 'categories') || '["Accesorios"]'::jsonb)
where id = 1 and not (data -> 'categories') ? 'Accesorios';

-- 3) Proveedores (${sup.length}).
insert into public.suppliers (id, name, legal_name, address, postal_code, tax_category, doc_number, contact, phone, email, notes) values
${sup.join(",\n")}
on conflict (id) do nothing;

-- 4) Artículos (${prod.length}): ocultos en la tienda, con el precio final como precio mayorista fijo.
insert into public.products (id, code, barcode, name, category, supplier_id, cost, price_override, active) values
${prod.join(",\n")}
on conflict (id) do nothing;

-- 5) Stock: una variante "Único" por artículo.
insert into public.variants (id, product_id, stock) values
${vars.join(",\n")}
on conflict (id) do nothing;

commit;
`;
writeFileSync(`${outDir}/importar_inventario.sql`, inv);

// Clientas
const cw = XLSX.read(readFileSync(cliPath));
const crow = XLSX.utils.sheet_to_json(cw.Sheets[cw.SheetNames[0]], { header: 1, blankrows: false }).slice(1);
const cli = [];
for (const r of crow) {
  const [cod, razon, dom, local, loc, tel, iva, doc, trans] = r;
  if (!clean(razon)) continue;
  const notes = [clean(iva) && `IVA: ${clean(iva)}`, clean(trans) && `Transporte: ${clean(trans)}`, "Importada de Jaque"].filter(Boolean).join(" · ");
  cli.push(`(${q(`c_jaque_${clean(cod)}`)}, ${q(title(razon))}, ${q(title(local))}, ${q(clean(tel))}, ${q(title(loc))}, ${q(title(dom))}, ${q(clean(doc).replace(/\D/g, ""))}, ${q(notes)})`);
}
writeFileSync(`${outDir}/importar_clientes.sql`, `-- Clientas de Jaque (LISTADO DE CLIENTES EXCELL.xls) → Supabase. Datos reales: NO subir a GitHub.
insert into public.clients (id, name, business, phone, city, address, cuit, notes) values
${cli.join(",\n")}
on conflict (id) do nothing;
`);

console.log(JSON.stringify({ proveedores: sup.length, articulos: prod.length, clientas: cli.length, ...stats }, null, 1));
