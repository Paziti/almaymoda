"use client";

import { waPhone } from "./format";

export function whatsappUrl(phone: string, text: string) {
  const p = waPhone(phone);
  return `https://wa.me/${p}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(to: string, subject: string, body: string) {
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** Comparte el archivo con la hoja nativa del teléfono (WhatsApp, Mail, Drive...). */
export async function shareFile(blob: Blob, filename: string, text: string): Promise<"shared" | "unsupported" | "cancelled"> {
  const file = new File([blob], filename, { type: blob.type || "application/pdf" });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (!nav.share || !nav.canShare?.({ files: [file] })) return "unsupported";
  try {
    await nav.share({ files: [file], title: filename, text });
    return "shared";
  } catch (e) {
    if ((e as Error).name === "AbortError") return "cancelled";
    return "unsupported";
  }
}

export const canShareFiles = () => {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  try {
    return !!nav.share && !!nav.canShare?.({ files: [new File(["x"], "x.pdf", { type: "application/pdf" })] });
  } catch {
    return false;
  }
};

/**
 * Abre el diálogo de impresión con el PDF. En la compu se imprime desde un iframe oculto,
 * sin salir del panel. En teléfonos y tablets el iframe no imprime PDFs: se abre en otra
 * pestaña y se imprime desde el visor (Compartir → Imprimir).
 */
export function printBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);
  if (window.matchMedia("(pointer: coarse)").matches) {
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return;
  }
  document.getElementById("print-frame")?.remove();
  const frame = document.createElement("iframe");
  frame.id = "print-frame";
  frame.title = "Impresión";
  frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
  frame.onload = () => {
    try {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
    } catch {
      window.open(url, "_blank");
    }
    // El iframe queda hasta la próxima impresión: si se quita enseguida, algunos navegadores cancelan el diálogo.
  };
  frame.src = url;
  document.body.appendChild(frame);
}
