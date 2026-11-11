import type { RemitoStatus } from "./types";

export const remitoStatus: Record<RemitoStatus, { label: string; tone: "acento" | "ok" | "peligro" }> = {
  emitido: { label: "Emitido", tone: "acento" },
  entregado: { label: "Entregado", tone: "ok" },
  anulado: { label: "Anulado", tone: "peligro" },
};

/** "Único" no aporta nada al leer: se omite. Devuelve p. ej. "Negro", "Negro, 750 ml" o "750 ml". */
export function variantLabel(size: string, color: string) {
  const parts = [color, size].filter((x) => x && x !== "Único");
  return parts.length ? parts.join(", ") : "Único";
}
