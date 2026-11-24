/// <reference lib="webworker" />
// Corre el modelo de quitar fondo fuera del hilo de la página: en compus sin WebGPU
// la librería lo hace en el hilo principal y Chrome muestra "La página no responde".
import { removeBackground } from "@imgly/background-removal";

export type PedidoFondo = { id: number; file: Blob };
export type RespuestaFondo =
  | { id: number; tipo: "progreso"; etapa: "cargando-modelo" | "quitando-fondo"; pct?: number }
  | { id: number; tipo: "listo"; blob: Blob }
  | { id: number; tipo: "error"; mensaje: string };

const ctx = self as unknown as DedicatedWorkerGlobalScope;
const enviar = (r: RespuestaFondo) => ctx.postMessage(r);

ctx.onmessage = async (e: MessageEvent<PedidoFondo>) => {
  const { id, file } = e.data;
  try {
    const blob = await removeBackground(file, {
      model: "isnet_fp16",
      output: { format: "image/png" },
      progress: (key, current, total) => {
        if (key.startsWith("fetch")) enviar({ id, tipo: "progreso", etapa: "cargando-modelo", pct: total ? Math.round((current / total) * 100) : undefined });
        else enviar({ id, tipo: "progreso", etapa: "quitando-fondo" });
      },
    });
    enviar({ id, tipo: "listo", blob });
  } catch (err) {
    enviar({ id, tipo: "error", mensaje: err instanceof Error ? err.message : String(err) });
  }
};
