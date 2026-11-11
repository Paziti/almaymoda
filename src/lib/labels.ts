import type { RemitoStatus } from "./types";

export const remitoStatus: Record<RemitoStatus, { label: string; tone: "acento" | "ok" | "peligro" }> = {
  emitido: { label: "Emitido", tone: "acento" },
  entregado: { label: "Entregado", tone: "ok" },
  anulado: { label: "Anulado", tone: "peligro" },
};
