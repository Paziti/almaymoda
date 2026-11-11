"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
import { toast } from "sonner";
import { DownloadSimpleIcon, EnvelopeIcon, ShareNetworkIcon, WhatsappLogoIcon, CheckIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtDate, fmtMoney, remitoNumber } from "@/lib/format";
import { buildRemitoPdf, remitoFileName, remitoMessage, remitoTotals } from "@/lib/remito-pdf";
import { canShareFiles, downloadBlob, mailtoUrl, shareFile, whatsappUrl } from "@/lib/share";
import { remitoStatus } from "@/lib/labels";
import { Badge, Button, ButtonLink, ConfirmButton, EmptyState, Panel } from "@/components/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

export default function RemitoPage() {
  const { id } = useParams<{ id: string }>();
  const remito = useDB((s) => s.remitos.find((r) => r.id === id));
  const settings = useDB((s) => s.settings);
  const setStatus = useDB((s) => s.setRemitoStatus);
  // El PDF se regenera cuando cambia el remito o los datos del local; se guarda junto a lo que lo originó.
  const [pdf, setPdf] = useState<{ source: unknown; url?: string; blob?: Blob; error?: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const shareable = useSyncExternalStore(noopSubscribe, canShareFiles, () => false);

  useEffect(() => {
    if (!remito) return;
    let url: string | null = null;
    let cancelled = false;
    const source = remito;
    buildRemitoPdf(remito, settings)
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setPdf({ source, url, blob });
      })
      .catch(() => !cancelled && setPdf({ source, error: true }));
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [remito, settings]);

  const current = pdf && pdf.source === remito ? pdf : null;
  const pdfUrl = current?.url ?? null;
  const pdfBlob = current?.blob ?? null;
  const pdfError = !!current?.error;

  if (!remito) {
    return (
      <EmptyState title="No encontramos este remito" action={<ButtonLink href="/admin/remitos">Volver a remitos</ButtonLink>}>
        Revisá el número en la lista de remitos.
      </EmptyState>
    );
  }

  const number = remitoNumber(settings.pointOfSale, remito.number);
  const { total, units, subtotal, discountAmount } = remitoTotals(remito);
  const msg = remitoMessage(remito, settings);
  const fileName = remitoFileName(remito, settings);

  // El PDF ya está generado: compartirlo sin esperas mantiene el permiso del toque para la hoja de compartir.
  const getBlob = async () => pdfBlob ?? buildRemitoPdf(remito, settings);

  const onShare = async () => {
    setBusy(true);
    const res = await shareFile(pdfBlob ?? (await getBlob()), fileName, msg);
    setBusy(false);
    if (res === "unsupported") toast("Este dispositivo no permite compartir archivos. Descargá el PDF y adjuntalo.");
  };

  const onWhatsapp = async () => {
    // En el teléfono se comparte el PDF directo; en la compu se descarga y se abre el chat con el resumen.
    if (shareable) return onShare();
    downloadBlob(await getBlob(), fileName);
    window.open(remito.customer.phone ? whatsappUrl(remito.customer.phone, msg) : `https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    toast("PDF descargado. Adjuntalo en el chat de WhatsApp que se abrió.");
  };

  const onMail = async () => {
    downloadBlob(await getBlob(), fileName);
    window.location.href = mailtoUrl(remito.customer.email, `Remito ${number} · ${settings.storeName}`, `${msg}\n\nTe adjunto el remito en PDF.`);
    toast("PDF descargado. Adjuntalo en el mail que se abrió.");
  };

  return (
    <div>
      <PageHeader
        title={`Remito ${number}`}
        description={`${remito.customer.name} · ${fmtDate(remito.createdAt)}`}
        back={{ href: "/admin/remitos", label: "Remitos" }}
        actions={<Badge tone={remitoStatus[remito.status].tone}>{remitoStatus[remito.status].label}</Badge>}
      />
      <div className={`${pagePad} grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]`}>
        <div className="flex min-w-0 flex-col gap-4">
          <Panel className="flex flex-col gap-3 p-5">
            <h2 className="font-semibold">Enviar</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button variant="whatsapp" size="lg" onClick={onWhatsapp} loading={busy}>
                <WhatsappLogoIcon size={22} /> Mandar por WhatsApp
              </Button>
              <Button variant="secondary" size="lg" onClick={onMail}>
                <EnvelopeIcon size={20} /> Mandar por mail
              </Button>
              <Button variant="secondary" size="lg" onClick={async () => downloadBlob(await getBlob(), fileName)}>
                <DownloadSimpleIcon size={20} /> Descargar PDF
              </Button>
              {shareable && (
                <Button variant="secondary" size="lg" onClick={onShare}>
                  <ShareNetworkIcon size={20} /> Compartir…
                </Button>
              )}
            </div>
            <p className="text-sm text-gris">
              {shareable ? "En el teléfono, WhatsApp abre la lista de chats con el PDF ya adjunto." : "En la compu se descarga el PDF y se abre el chat con el resumen: arrastrá el archivo al chat."}
            </p>
          </Panel>

          <Panel as="div" className="overflow-hidden">
            {pdfError ? (
              <p className="p-6 text-peligro">No se pudo generar la vista previa del PDF. Probá descargarlo.</p>
            ) : pdfUrl ? (
              <iframe title={`Vista previa remito ${number}`} src={`${pdfUrl}#toolbar=0&view=FitH`} className="hidden h-[75dvh] w-full md:block" />
            ) : (
              <p className="p-6 text-gris">Generando vista previa…</p>
            )}
            <div className="md:hidden">
              <ul className="divide-y divide-linea">
                {remito.items.map((i, k) => (
                  <li key={k} className="flex justify-between gap-3 px-4 py-2.5 text-sm">
                    <span className="min-w-0">
                      <span className="num font-semibold">{i.qty} ×</span> {i.name}
                      {i.size && ` T.${i.size}`}
                      {i.color && i.color !== "Único" && ` ${i.color}`}
                    </span>
                    <span className="num shrink-0">{fmtMoney(i.qty * i.unitPrice)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          <Panel className="flex flex-col gap-2 p-5 text-sm">
            <div className="flex justify-between">
              <span className="text-gris">Unidades</span>
              <span className="num font-semibold">{units}</span>
            </div>
            {discountAmount > 0 && (
              <>
                <div className="flex justify-between">
                  <span className="text-gris">Subtotal</span>
                  <span className="num">{fmtMoney(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gris">Descuento {remito.discount}%</span>
                  <span className="num">- {fmtMoney(discountAmount)}</span>
                </div>
              </>
            )}
            <div className="flex items-baseline justify-between border-t border-linea pt-2">
              <span className="font-semibold">Total</span>
              <span className="num font-display text-3xl">{fmtMoney(total)}</span>
            </div>
            <p className="text-gris">{remito.stockDiscounted ? "El stock ya se descontó." : "Este remito no movió stock."}</p>
          </Panel>
          {remito.status !== "anulado" && (
            <div className="flex flex-wrap gap-2">
              {remito.status === "emitido" && (
                <Button variant="secondary" onClick={() => (setStatus(remito.id, "entregado"), toast.success("Marcado como entregado"))}>
                  <CheckIcon size={18} /> Marcar entregado
                </Button>
              )}
              <ConfirmButton confirmLabel="Sí, anular" onConfirm={() => (setStatus(remito.id, "anulado"), toast.success("Remito anulado"))}>
                Anular remito
              </ConfirmButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
