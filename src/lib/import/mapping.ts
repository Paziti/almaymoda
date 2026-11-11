import { normalizeText, parseNumber } from "../format";
import type { Product } from "../types";
import type { ImportChange } from "../store";
import type { ParsedTable } from "./parse";

export type FieldKey = "ignore" | "code" | "name" | "cost" | "stock" | "category" | "size" | "color" | "description";

export const FIELD_LABELS: Record<FieldKey, string> = {
  ignore: "No usar",
  code: "Código",
  name: "Descripción / nombre",
  cost: "Costo / precio de lista",
  stock: "Stock / cantidad",
  category: "Categoría / rubro",
  size: "Talle",
  color: "Color",
  description: "Detalle extra",
};

const PATTERNS: [FieldKey, RegExp][] = [
  ["code", /^(cod|codigo|cod\.?\s*art|art|articulo|sku|ref|referencia|id\s*art|nro\s*art)/],
  ["cost", /(precio|costo|lista|importe|p\.?\s*unit|unitario|valor|neto|mayorista)/],
  ["stock", /(stock|cant|cantidad|existencia|unidades|uds|disponible)/],
  ["size", /^(talle|talla|size|t\.)$|talle/],
  ["color", /^(color|colour|col\.?)$|color/],
  ["category", /(rubro|categoria|familia|linea|grupo|seccion|tipo)/],
  ["name", /(desc|descripcion|detalle|nombre|producto|articulo)/],
];

export function guessMapping(table: ParsedTable): FieldKey[] {
  const used = new Set<FieldKey>();
  const out: FieldKey[] = table.headers.map(() => "ignore");
  const headers = table.headers.map((h) => normalizeText(h));
  for (const [key, re] of PATTERNS) {
    const idx = headers.findIndex((h, i) => out[i] === "ignore" && re.test(h));
    if (idx >= 0 && !used.has(key)) {
      out[idx] = key;
      used.add(key);
    }
  }
  // Si no hay encabezados reconocibles, adivinar por contenido.
  if (!used.has("code") || !used.has("cost")) {
    const sample = table.rows.slice(0, 40);
    const numericShare = table.headers.map((_, c) => sample.filter((r) => parseNumber(r[c]) !== null && /\d/.test(r[c])).length / Math.max(1, sample.length));
    const textLen = table.headers.map((_, c) => sample.reduce((a, r) => a + (r[c]?.length ?? 0), 0) / Math.max(1, sample.length));
    if (!used.has("name")) {
      const i = textLen.indexOf(Math.max(...textLen.map((l, k) => (out[k] === "ignore" ? l : -1))));
      if (i >= 0 && out[i] === "ignore") {
        out[i] = "name";
        used.add("name");
      }
    }
    if (!used.has("code")) {
      const i = out.findIndex((k, c) => k === "ignore" && textLen[c] > 0 && textLen[c] < 16);
      if (i >= 0) {
        out[i] = "code";
        used.add("code");
      }
    }
    if (!used.has("cost")) {
      for (let c = out.length - 1; c >= 0; c--) {
        if (out[c] === "ignore" && numericShare[c] > 0.6) {
          out[c] = "cost";
          break;
        }
      }
    }
  }
  return out;
}

export type DiffKind = "nuevo" | "cambia" | "igual" | "error";

export interface DiffRow {
  key: string;
  kind: DiffKind;
  code: string;
  name: string;
  category?: string;
  cost: number | null;
  oldCost: number | null;
  stockTotal: number;
  stock: { size: string; color: string; qty: number }[];
  product: Product | null;
  error?: string;
  selected: boolean;
}

export interface BuildOptions {
  supplierId: string | null;
  updateCost: boolean;
  updateName: boolean;
  createNew: boolean;
  /** Sumar un % al costo leído (ej: lista sin IVA). */
  costAdjustPct: number;
}

export function buildDiff(table: ParsedTable, mapping: FieldKey[], products: Product[], opts: BuildOptions): DiffRow[] {
  const col = (k: FieldKey) => mapping.indexOf(k);
  const cCode = col("code");
  const cName = col("name");
  const cCost = col("cost");
  const cStock = col("stock");
  const cCat = col("category");
  const cSize = col("size");
  const cColor = col("color");
  const cDesc = col("description");

  const byCode = new Map(products.map((p) => [normalizeText(p.code), p]));
  const groups = new Map<string, DiffRow>();
  const factor = 1 + (opts.costAdjustPct || 0) / 100;

  table.rows.forEach((r, i) => {
    const code = cCode >= 0 ? r[cCode]?.trim() : "";
    const name = cName >= 0 ? r[cName]?.trim() : "";
    if (!code && !name) return;
    const key = normalizeText(code || name);
    const rawCost = cCost >= 0 ? parseNumber(r[cCost]) : null;
    const cost = rawCost !== null ? Math.round(rawCost * factor * 100) / 100 : null;
    const qty = cStock >= 0 ? parseNumber(r[cStock]) : null;
    const existing = byCode.get(normalizeText(code)) ?? null;

    let row = groups.get(key);
    if (!row) {
      row = {
        key: `${key}-${i}`,
        kind: "igual",
        code,
        name: name || existing?.name || code,
        category: cCat >= 0 ? r[cCat] : undefined,
        cost,
        oldCost: existing?.cost ?? null,
        stockTotal: 0,
        stock: [],
        product: existing,
        selected: true,
      };
      if (cDesc >= 0 && r[cDesc]) row.name = row.name || r[cDesc];
      groups.set(key, row);
    } else if (cost !== null && row.cost === null) {
      row.cost = cost;
    }
    if (qty !== null && qty !== 0) {
      row.stock.push({ size: cSize >= 0 ? r[cSize] : "", color: cColor >= 0 ? r[cColor] : "", qty: Math.round(qty) });
      row.stockTotal += Math.round(qty);
    }
  });

  const rows = [...groups.values()];
  for (const row of rows) {
    if (!row.code) {
      row.kind = "error";
      row.error = "Sin código";
      row.selected = false;
    } else if (!row.product) {
      row.kind = opts.createNew ? "nuevo" : "error";
      if (!opts.createNew) {
        row.error = "No existe en el catálogo";
        row.selected = false;
      }
      if (row.cost === null && opts.createNew) {
        row.kind = "error";
        row.error = "Sin precio";
        row.selected = false;
      }
    } else {
      const costChanged = opts.updateCost && row.cost !== null && Math.abs((row.cost ?? 0) - (row.oldCost ?? 0)) >= 0.01;
      row.kind = costChanged || row.stock.length ? "cambia" : "igual";
      row.selected = row.kind === "cambia";
    }
  }
  const order: Record<DiffKind, number> = { cambia: 0, nuevo: 1, error: 2, igual: 3 };
  return rows.sort((a, b) => order[a.kind] - order[b.kind]);
}

export function diffToChanges(rows: DiffRow[], opts: BuildOptions): ImportChange[] {
  return rows
    .filter((r) => r.selected && (r.kind === "nuevo" || r.kind === "cambia"))
    .map((r) => {
      const data: ImportChange["data"] = { code: r.code };
      if (r.kind === "nuevo") {
        data.name = r.name;
        data.cost = r.cost ?? 0;
        data.category = r.category?.trim() || undefined;
        data.supplierId = opts.supplierId;
      } else {
        if (opts.updateCost && r.cost !== null) data.cost = r.cost;
        if (opts.updateName && r.name) data.name = r.name;
        if (opts.supplierId && !r.product?.supplierId) data.supplierId = opts.supplierId;
      }
      return { productId: r.product?.id ?? null, data, stock: r.stock };
    });
}
