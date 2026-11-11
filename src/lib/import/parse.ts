"use client";

export interface ParsedTable {
  name: string;
  headers: string[];
  rows: string[][];
}

export interface ParseResult {
  kind: "excel" | "csv" | "pdf" | "access";
  tables: ParsedTable[];
  warnings: string[];
}

const cell = (v: unknown) => {
  if (v == null) return "";
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v).replace(/\s+/g, " ").trim();
};

/** Busca la fila que parece encabezado (texto con palabras clave) dentro de las primeras filas. */
function splitHeader(matrix: string[][], name: string): ParsedTable {
  const rows = matrix.filter((r) => r.some((c) => c !== ""));
  const keywords = /(cod|art|desc|detalle|precio|costo|lista|stock|cant|talle|color|rubro|categ|nombre|producto|importe|unit)/i;
  let headerIdx = -1;
  for (let i = 0; i < Math.min(rows.length, 15); i++) {
    const hits = rows[i].filter((c) => keywords.test(c) && c.length < 40).length;
    if (hits >= 2) {
      headerIdx = i;
      break;
    }
  }
  const width = Math.max(0, ...rows.map((r) => r.length));
  const pad = (r: string[]) => Array.from({ length: width }, (_, i) => r[i] ?? "");
  if (headerIdx === -1) {
    return { name, headers: Array.from({ length: width }, (_, i) => `Columna ${i + 1}`), rows: rows.map(pad) };
  }
  const headers = pad(rows[headerIdx]).map((h, i) => h || `Columna ${i + 1}`);
  return { name, headers, rows: rows.slice(headerIdx + 1).map(pad) };
}

async function parseSpreadsheet(file: File, kind: "excel" | "csv"): Promise<ParseResult> {
  const XLSX = await import("xlsx");
  const buf = await file.arrayBuffer();
  const wb = kind === "csv" ? XLSX.read(new TextDecoder(guessEncoding(buf)).decode(buf), { type: "string" }) : XLSX.read(buf, { type: "array", cellDates: true });
  const tables: ParsedTable[] = [];
  for (const name of wb.SheetNames) {
    const ws = wb.Sheets[name];
    const matrix = XLSX.utils.sheet_to_json<unknown[]>(ws, { header: 1, raw: false, defval: "" }).map((r) => r.map(cell));
    const t = splitHeader(matrix, name);
    if (t.rows.length) tables.push(t);
  }
  return { kind, tables, warnings: tables.length ? [] : ["El archivo no tiene filas con datos."] };
}

function guessEncoding(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf.slice(0, 4096));
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return "utf-8";
  } catch {
    return "windows-1252";
  }
}

interface PdfItem {
  str: string;
  x: number;
  y: number;
  w: number;
}

async function parsePdf(file: File): Promise<ParseResult> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const lines: PdfItem[][] = [];
  for (let pageNo = 1; pageNo <= doc.numPages; pageNo++) {
    const page = await doc.getPage(pageNo);
    const content = await page.getTextContent();
    const items: PdfItem[] = [];
    for (const it of content.items) {
      if (!("str" in it) || !it.str.trim()) continue;
      const [, , , , x, y] = it.transform as number[];
      items.push({ str: it.str, x, y: Math.round(y), w: it.width });
    }
    items.sort((a, b) => b.y - a.y || a.x - b.x);
    let current: PdfItem[] = [];
    let lastY: number | null = null;
    for (const it of items) {
      if (lastY !== null && Math.abs(it.y - lastY) > 3) {
        lines.push(current);
        current = [];
      }
      current.push(it);
      lastY = it.y;
    }
    if (current.length) lines.push(current);
  }
  if (!lines.length) {
    return { kind: "pdf", tables: [], warnings: ["El PDF no tiene texto seleccionable (puede ser una imagen escaneada). Probá con el Excel del proveedor."] };
  }

  // Modo columnas: corta cada línea donde hay espacios grandes entre palabras.
  const byGap = lines.map((items) => {
    const sorted = [...items].sort((a, b) => a.x - b.x);
    const cells: string[] = [];
    let buf = "";
    let end = -Infinity;
    for (const it of sorted) {
      if (buf && it.x - end > 12) {
        cells.push(buf.trim());
        buf = "";
      }
      buf += (buf && it.x - end > 1.5 ? " " : "") + it.str;
      end = it.x + it.w;
    }
    if (buf.trim()) cells.push(buf.trim());
    return cells;
  });

  const counts = new Map<number, number>();
  byGap.forEach((r) => counts.set(r.length, (counts.get(r.length) ?? 0) + 1));
  const [commonLen, commonHits] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  const tables: ParsedTable[] = [];
  const warnings: string[] = [];

  if (commonLen >= 2 && commonHits / byGap.length >= 0.45) {
    tables.push(splitHeader(byGap, "PDF por columnas"));
  }

  // Modo línea: código al principio, precio al final, el resto es descripción.
  const priceRe = /\$?\s*-?\d{1,3}(?:[.\s]\d{3})*(?:,\d{1,2})?$|\$?\s*-?\d+(?:[.,]\d{1,2})?$/;
  const lineRows: string[][] = [];
  for (const items of lines) {
    const text = items
      .sort((a, b) => a.x - b.x)
      .map((i) => i.str)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    const m = text.match(priceRe);
    if (!m) continue;
    const price = m[0].trim();
    const rest = text.slice(0, m.index).trim();
    const codeMatch = rest.match(/^([A-Za-z0-9][\w./-]{1,20})\s+(.*)$/);
    if (!codeMatch || !/\d/.test(codeMatch[1])) {
      lineRows.push(["", rest, price]);
    } else {
      lineRows.push([codeMatch[1], codeMatch[2], price]);
    }
  }
  if (lineRows.length) {
    tables.push({ name: "PDF por renglón (código, descripción, precio)", headers: ["Código", "Descripción", "Precio"], rows: lineRows });
  }
  if (!tables.length) warnings.push("No se encontraron renglones con precio en el PDF.");
  return { kind: "pdf", tables, warnings };
}

async function parseAccess(file: File): Promise<ParseResult> {
  const { Buffer } = await import("buffer");
  (globalThis as unknown as { Buffer: typeof Buffer }).Buffer ??= Buffer;
  const { default: MDBReader } = await import("mdb-reader");
  const reader = new MDBReader(Buffer.from(await file.arrayBuffer()));
  const tables: ParsedTable[] = [];
  for (const name of reader.getTableNames()) {
    const table = reader.getTable(name);
    const headers = table.getColumnNames();
    const data = table.getData({ rowLimit: 20000 });
    const rows = data.map((r) => headers.map((h) => cell(r[h])));
    if (rows.length) tables.push({ name: `${name} (${table.rowCount} filas)`, headers, rows });
  }
  tables.sort((a, b) => scoreTable(b) - scoreTable(a));
  return { kind: "access", tables, warnings: tables.length ? [] : ["La base no tiene tablas con datos."] };
}

/** Las tablas que parecen de artículos aparecen primero. */
function scoreTable(t: ParsedTable) {
  const h = t.headers.join(" ").toLowerCase();
  let s = 0;
  if (/art|product|item|stock/.test(t.name.toLowerCase())) s += 5;
  if (/cod/.test(h)) s += 3;
  if (/desc|detalle|nombre/.test(h)) s += 3;
  if (/precio|costo|lista/.test(h)) s += 3;
  return s + Math.min(t.rows.length / 100, 3);
}

export async function parseFile(file: File): Promise<ParseResult> {
  const ext = file.name.toLowerCase().split(".").pop() ?? "";
  if (["xlsx", "xls", "xlsm", "ods"].includes(ext)) return parseSpreadsheet(file, "excel");
  if (["csv", "txt", "tsv"].includes(ext)) return parseSpreadsheet(file, "csv");
  if (ext === "pdf") return parsePdf(file);
  if (["mdb", "accdb"].includes(ext)) return parseAccess(file);
  throw new Error(`No se puede leer archivos .${ext}. Usá Excel, CSV, PDF o Access (.mdb / .accdb).`);
}

export const ACCEPTED = ".xlsx,.xls,.xlsm,.ods,.csv,.txt,.tsv,.pdf,.mdb,.accdb";
