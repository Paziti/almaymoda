"use client";

const OUT_W = 800;
const OUT_H = 1000; // 4:5, el formato de foto de producto de moda

function loadImage(src: string | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = typeof src === "string" ? src : URL.createObjectURL(src);
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("No se pudo abrir la imagen."));
    img.src = url;
  });
}

/** Bounding box de los píxeles visibles (alpha > umbral). */
function alphaBounds(img: HTMLImageElement) {
  const c = document.createElement("canvas");
  const scale = Math.min(1, 600 / Math.max(img.naturalWidth, img.naturalHeight));
  c.width = Math.round(img.naturalWidth * scale);
  c.height = Math.round(img.naturalHeight * scale);
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0, c.width, c.height);
  const { data } = ctx.getImageData(0, 0, c.width, c.height);
  let minX = c.width, minY = c.height, maxX = -1, maxY = -1;
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      if (data[(y * c.width + x) * 4 + 3] > 24) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return { x: 0, y: 0, w: img.naturalWidth, h: img.naturalHeight };
  return { x: minX / scale, y: minY / scale, w: (maxX - minX + 1) / scale, h: (maxY - minY + 1) / scale };
}

/** Artículo recortado centrada sobre fondo liso con una sombra de apoyo suave. */
function composeCutout(img: HTMLImageElement, background: string) {
  const b = alphaBounds(img);
  const c = document.createElement("canvas");
  c.width = OUT_W;
  c.height = OUT_H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, OUT_W, OUT_H);
  const pad = 0.1;
  const scale = Math.min((OUT_W * (1 - pad * 2)) / b.w, (OUT_H * (1 - pad * 2)) / b.h);
  const w = b.w * scale;
  const h = b.h * scale;
  const x = (OUT_W - w) / 2;
  const y = (OUT_H - h) / 2;
  ctx.save();
  ctx.shadowColor = "rgba(40, 20, 40, 0.18)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 14;
  ctx.drawImage(img, b.x, b.y, b.w, b.h, x, y, w, h);
  ctx.restore();
  return c.toDataURL("image/webp", 0.86);
}

/** Recorte 4:5 centrado sin quitar fondo. */
function composeCover(img: HTMLImageElement) {
  const c = document.createElement("canvas");
  c.width = OUT_W;
  c.height = OUT_H;
  const ctx = c.getContext("2d")!;
  const target = OUT_W / OUT_H;
  const ratio = img.naturalWidth / img.naturalHeight;
  let sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
  if (ratio > target) {
    sw = sh * target;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = sw / target;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H);
  return c.toDataURL("image/webp", 0.86);
}

export type PhotoStage = "cargando-modelo" | "quitando-fondo" | "componiendo";

// Si en este tiempo no termina (compu muy lenta o descarga trabada), se corta y se usa la foto sin quitar fondo.
const PLAZO_MS = 3 * 60 * 1000;

let worker: Worker | null = null;
let siguienteId = 0;

/** El worker queda vivo entre fotos para no volver a cargar el modelo cada vez. */
function quitarFondoEnWorker(file: Blob, onStage?: (s: PhotoStage, pct?: number) => void): Promise<Blob> {
  worker ??= new Worker(new URL("./quitar-fondo.worker.ts", import.meta.url), { type: "module" });
  const w = worker;
  const id = ++siguienteId;
  return new Promise((resolve, reject) => {
    const terminar = (err?: Error) => {
      clearTimeout(plazo);
      w.removeEventListener("message", alMensaje);
      w.removeEventListener("error", alError);
      if (err) {
        w.terminate();
        if (worker === w) worker = null;
        reject(err);
      }
    };
    const plazo = setTimeout(() => terminar(new Error("Quitar el fondo tardó demasiado.")), PLAZO_MS);
    const alError = (e: ErrorEvent) => terminar(new Error(e.message || "Falló la IA de quitar fondo."));
    const alMensaje = (e: MessageEvent<import("./quitar-fondo.worker").RespuestaFondo>) => {
      const r = e.data;
      if (r.id !== id) return;
      if (r.tipo === "progreso") onStage?.(r.etapa, r.pct);
      else if (r.tipo === "listo") {
        terminar();
        resolve(r.blob);
      } else terminar(new Error(r.mensaje));
    };
    w.addEventListener("message", alMensaje);
    w.addEventListener("error", alError);
    w.postMessage({ id, file });
  });
}

export async function processPhoto(
  file: Blob,
  opts: { removeBackground: boolean; background: string; onStage?: (s: PhotoStage, pct?: number) => void },
): Promise<string> {
  if (!opts.removeBackground) {
    const img = await loadImage(file);
    return composeCover(img);
  }
  opts.onStage?.("cargando-modelo", 0);
  const blob = await quitarFondoEnWorker(file, opts.onStage);
  opts.onStage?.("componiendo");
  const img = await loadImage(blob);
  return composeCutout(img, opts.background);
}

/** Vuelve a componer con otro color de fondo una foto ya recortada (se guarda el PNG original en memoria). */
export async function fileToDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}
