const money = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const moneyCents = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const fmtMoney = (n: number) => money.format(Math.round(n || 0));
export const fmtMoneyExact = (n: number) =>
  Number.isInteger(n) ? money.format(n) : moneyCents.format(n);

export const fmtNumber = (n: number, digits = 0) =>
  new Intl.NumberFormat("es-AR", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n);

export const fmtCoef = (n: number) =>
  new Intl.NumberFormat("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 3 }).format(n);

export const fmtDate = (t: number) =>
  new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(t);

export const fmtDateTime = (t: number) =>
  new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(t);

export const pad = (n: number, len: number) => String(n).padStart(len, "0");

export const remitoNumber = (pos: string, n: number) => `${pad(Number(pos) || 1, 4)}-${pad(n, 8)}`;

/**
 * Interpreta números escritos al estilo argentino o inglés:
 * "$ 12.345,67" -> 12345.67, "12,345.67" -> 12345.67, "12.500" -> 12500, "1,8" -> 1.8
 */
export function parseNumber(raw: unknown): number | null {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
  if (raw == null) return null;
  let s = String(raw).trim();
  if (!s) return null;
  const negative = /^-|\(.*\)$/.test(s);
  s = s.replace(/[^\d.,]/g, "");
  if (!s || !/\d/.test(s)) return null;
  const lastDot = s.lastIndexOf(".");
  const lastComma = s.lastIndexOf(",");
  if (lastDot >= 0 && lastComma >= 0) {
    const dec = lastDot > lastComma ? "." : ",";
    const thou = dec === "." ? "," : ".";
    s = s.split(thou).join("").replace(dec, ".");
  } else if (lastComma >= 0) {
    const parts = s.split(",");
    const thousands = parts.length > 2 || (parts.length === 2 && parts[1].length === 3 && parts[0].length <= 3 && parts[0] !== "0");
    s = thousands ? parts.join("") : parts.join(".");
  } else if (lastDot >= 0) {
    const parts = s.split(".");
    const thousands = parts.length > 2 || (parts.length === 2 && parts[1].length === 3 && parts[0] !== "0");
    s = thousands ? parts.join("") : s;
  }
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return negative ? -n : n;
}

export function normalizeText(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

/** Marca de tiempo actual (para usar en manejadores de eventos). */
export const now = () => Date.now();

export function uid(prefix = "") {
  const r = Math.random().toString(36).slice(2, 8);
  return `${prefix}${Date.now().toString(36)}${r}`;
}

/** Normaliza un teléfono argentino para wa.me (549 + área + número). */
export function waPhone(raw: string) {
  let d = (raw || "").replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("54")) {
    if (!d.startsWith("549")) d = "549" + d.slice(2);
    return d;
  }
  if (d.startsWith("0")) d = d.slice(1);
  d = d.replace(/^(\d{2,4})15(\d{6,8})$/, "$1$2");
  return d.length >= 10 ? "549" + d : d;
}
