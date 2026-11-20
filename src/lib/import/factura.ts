import { parseNumber } from "../format";
import type { ParsedTable } from "./parse";

/** Lo que se pudo leer del pie de una factura o presupuesto. */
export interface InvoiceInfo {
  items: number;
  units: number;
  /** Bonificación general del comprobante (%), si figura. */
  discountPct: number | null;
  /** IVA que no está incluido en los precios (%), si el comprobante lo aclara. */
  vatPct: number | null;
}

const NUMERIC = /^\$?\s*-?[\d.,]+$/;
const num = (s: string) => (NUMERIC.test(s.trim()) ? parseNumber(s) : null);
const near = (a: number, b: number) => Math.abs(a - b) <= Math.max(0.02, Math.abs(b) * 0.002);

interface Hit {
  qty: number;
  unit: number;
  total: number;
}

/** En un renglón, busca cantidad × precio unitario = importe. */
function findProduct(cells: string[]): Hit | null {
  const vals = cells.map(num);
  for (let t = cells.length - 1; t >= 0; t--) {
    const total = vals[t];
    if (!total || total <= 0) continue;
    for (let q = 0; q < cells.length; q++) {
      const qty = vals[q];
      if (q === t || !qty || !Number.isInteger(qty) || qty > 10000 || /[.,]\d{2}$/.test(cells[q])) continue;
      for (let u = 0; u < cells.length; u++) {
        const unit = vals[u];
        if (u === t || u === q || !unit) continue;
        if (near(qty * unit, total)) return { qty: q, unit: u, total: t };
      }
    }
  }
  return null;
}

/**
 * Reconoce comprobantes (factura, presupuesto, remito valorizado) en los renglones de un PDF:
 * los artículos son los renglones donde cantidad × precio unitario da el importe.
 * Devuelve una tabla con columnas con nombre, sin encabezados, totales ni datos fiscales.
 */
export function readInvoice(lines: string[][]): { table: ParsedTable; info: InvoiceInfo } | null {
  const found = lines.map((cells, i) => ({ i, cells, hit: findProduct(cells) })).filter((r) => r.hit);
  if (found.length === 0) return null;

  const rows: string[][] = [];
  let units = 0;
  let sum = 0;
  for (const { cells, hit } of found) {
    const h = hit!;
    const rest = cells.map((c, k) => ({ c, k })).filter(({ k }) => k !== h.qty && k !== h.unit && k !== h.total);
    // Descripción: el texto más largo. Código: un texto corto sin espacios, a la izquierda.
    const desc = rest.reduce<{ c: string; k: number } | null>((a, b) => (!a || b.c.length > a.c.length ? b : a), null);
    let code = rest.find(({ c, k }) => k !== desc?.k && c.length <= 20 && !/\s/.test(c))?.c ?? "";
    let name = desc?.c ?? "";
    // "1608-BANDOLERA ..." repite el código delante de la descripción.
    const prefix = name.match(/^([A-Za-z0-9][\w./]{0,19})\s*-\s*(.+)$/);
    if (prefix && (!code || prefix[1].toLowerCase() === code.toLowerCase())) {
      code = code || prefix[1];
      name = prefix[2];
    }
    const qty = num(cells[h.qty])!;
    units += qty;
    sum += num(cells[h.total])!;
    rows.push([code, name, String(qty), cells[h.unit], cells[h.total]]);
  }

  // Pie del comprobante: lo que está después del último artículo.
  const last = found[found.length - 1].i;
  const footer = lines.slice(last + 1).map((c) => c.join(" ")).join(" ");
  const amounts = (footer.match(/\d{1,3}(?:\.\d{3})*,\d{2}|\d+,\d{2}/g) ?? []).map((s) => parseNumber(s)!).filter((n) => n > 0);

  let discountPct: number | null = null;
  let net = sum;
  for (const a of amounts) {
    if (a >= sum) continue;
    const pct = (a / sum) * 100;
    const round = Math.round(pct * 100) / 100;
    // Bonificación: un monto que es un % redondo del subtotal y deja el neto también escrito.
    if (pct >= 1 && Math.abs(pct - Math.round(pct * 2) / 2) < 0.01 && amounts.some((b) => near(b, sum - a))) {
      discountPct = round;
      net = sum - a;
      break;
    }
  }

  let vatPct: number | null = null;
  for (const rate of [21, 10.5, 27]) {
    if (amounts.some((a) => near(a, (net * rate) / 100))) {
      vatPct = rate;
      break;
    }
  }
  const allText = lines.map((c) => c.join(" ")).join(" ");
  if (vatPct === null && /m[aá]s\s+i\.?\s?v\.?\s?a/i.test(allText)) vatPct = 21;

  return {
    table: {
      name: "Factura o presupuesto (artículos y cantidades)",
      headers: ["Código", "Descripción", "Cantidad", "Precio unitario", "Importe total"],
      rows,
    },
    info: { items: rows.length, units, discountPct, vatPct },
  };
}
