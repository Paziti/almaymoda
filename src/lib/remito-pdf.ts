"use client";

import type { Remito, Settings } from "./types";
import { fmtDate, fmtMoney, remitoNumber } from "./format";

export const remitoTotals = (r: Pick<Remito, "items" | "discount">) => {
  const subtotal = r.items.reduce((a, i) => a + i.qty * i.unitPrice, 0);
  const units = r.items.reduce((a, i) => a + i.qty, 0);
  const discountAmount = Math.round((subtotal * (r.discount || 0)) / 100);
  return { subtotal, units, discountAmount, total: subtotal - discountAmount };
};

export const remitoFileName = (r: Remito, s: Settings) =>
  `remito-${remitoNumber(s.pointOfSale, r.number)}-${(r.customer.name || "cliente").toLowerCase().replace(/[^a-z0-9]+/gi, "-")}.pdf`;

const INK: [number, number, number] = [34, 27, 38];
const GREY: [number, number, number] = [102, 93, 105];
const ACCENT: [number, number, number] = [184, 50, 106];
const LINE: [number, number, number] = [227, 216, 223];

export async function buildRemitoPdf(r: Remito, s: Settings): Promise<Blob> {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const M = 16;

  // Encabezado: marca a la izquierda, etiqueta "R" y número a la derecha.
  doc.setFont("times", "italic");
  doc.setFontSize(26);
  doc.setTextColor(...INK);
  doc.text(s.storeName || "almaymoda", M, 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...GREY);
  const info = [s.legalName, s.cuit && `CUIT ${s.cuit}`, s.address, [s.phone || s.whatsapp, s.email].filter(Boolean).join("  ·  ")].filter(Boolean) as string[];
  info.forEach((l, i) => doc.text(l, M, 31 + i * 4.2));

  const boxW = 64;
  const bx = W - M - boxW;
  doc.setDrawColor(...INK);
  doc.setLineWidth(0.4);
  doc.roundedRect(bx, 12, boxW, 30, 2, 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...INK);
  doc.text("REMITO", bx + 5, 20);
  doc.setFontSize(13);
  doc.text(`N° ${remitoNumber(s.pointOfSale, r.number)}`, bx + 5, 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GREY);
  doc.text(`Fecha: ${fmtDate(r.createdAt)}`, bx + 5, 35);
  if (r.status === "anulado") {
    doc.setTextColor(...ACCENT);
    doc.setFont("helvetica", "bold");
    doc.text("ANULADO", bx + boxW - 5, 35, { align: "right" });
  }

  // Cliente
  let y = 54;
  doc.setDrawColor(...LINE);
  doc.line(M, y - 6, W - M, y - 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...GREY);
  doc.text("CLIENTE", M, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...INK);
  doc.setFontSize(11);
  doc.text(r.customer.name || "Consumidor", M, y + 6);
  doc.setFontSize(9);
  doc.setTextColor(...GREY);
  const cust = [r.customer.cuit && `CUIT/DNI ${r.customer.cuit}`, r.customer.address, [r.customer.phone, r.customer.email].filter(Boolean).join("  ·  ")].filter(Boolean) as string[];
  cust.forEach((l, i) => doc.text(l, M, y + 11 + i * 4.4));
  y += 14 + cust.length * 4.4;

  const { subtotal, units, discountAmount, total } = remitoTotals(r);

  autoTable(doc, {
    startY: y,
    margin: { left: M, right: M },
    head: [["Código", "Artículo", "Talle", "Color", "Cant.", "P. unit.", "Importe"]],
    body: r.items.map((i) => [i.code, i.name, i.size, i.color, String(i.qty), fmtMoney(i.unitPrice), fmtMoney(i.qty * i.unitPrice)]),
    styles: { font: "helvetica", fontSize: 9, textColor: INK, cellPadding: 2.4, lineColor: LINE, lineWidth: 0 },
    headStyles: { fillColor: INK, textColor: [255, 255, 255], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [249, 245, 247] },
    columnStyles: {
      0: { cellWidth: 22 },
      2: { cellWidth: 14, halign: "center" },
      3: { cellWidth: 24 },
      4: { cellWidth: 13, halign: "right" },
      5: { cellWidth: 24, halign: "right" },
      6: { cellWidth: 26, halign: "right" },
    },
  });

  const last = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;
  y = last + 8;
  const rx = W - M;
  const row = (label: string, value: string, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(bold ? 12 : 9.5);
    doc.setTextColor(...(bold ? INK : GREY));
    doc.text(label, rx - 50, y);
    doc.text(value, rx, y, { align: "right" });
    y += bold ? 8 : 5.5;
  };
  row(`Unidades`, String(units));
  if (discountAmount) {
    row("Subtotal", fmtMoney(subtotal));
    row(`Descuento ${r.discount}%`, `- ${fmtMoney(discountAmount)}`);
  }
  row("Total", fmtMoney(total), true);

  if (r.notes) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...GREY);
    const lines = doc.splitTextToSize(`Observaciones: ${r.notes}`, W - M * 2 - 60);
    doc.text(lines, M, last + 8);
  }

  // Pie: firma y leyenda
  const H = doc.internal.pageSize.getHeight();
  doc.setDrawColor(...GREY);
  doc.setLineWidth(0.2);
  doc.line(M, H - 34, M + 70, H - 34);
  doc.setFontSize(8.5);
  doc.setTextColor(...GREY);
  doc.text("Recibí conforme: firma y aclaración", M, H - 29);
  if (s.remitoFooter) doc.text(s.remitoFooter, W - M, H - 29, { align: "right" });
  doc.setFillColor(...ACCENT);
  doc.rect(0, H - 6, W, 6, "F");

  return doc.output("blob");
}

export function remitoMessage(r: Remito, s: Settings) {
  const { total, units } = remitoTotals(r);
  const lines = r.items.map((i) => `• ${i.qty} × ${i.name}${i.size ? ` T.${i.size}` : ""}${i.color ? ` ${i.color}` : ""}`);
  return [
    `Hola ${r.customer.name || ""}! Te paso el remito N° ${remitoNumber(s.pointOfSale, r.number)} de ${s.storeName}.`,
    "",
    ...lines,
    "",
    `${units} unidades · Total ${fmtMoney(total)}`,
  ].join("\n");
}
