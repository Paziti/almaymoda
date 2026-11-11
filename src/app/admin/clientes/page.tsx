"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { PlusIcon, UsersIcon, WhatsappLogoIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { normalizeText, uid } from "@/lib/format";
import { whatsappUrl } from "@/lib/share";
import type { Client } from "@/lib/types";
import { Button, ButtonLink, ConfirmButton, Dialog, EmptyState, Field, Input, Panel, Spinner, Textarea, buttonClass } from "@/components/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

const blank = (): Client => ({ id: uid("c"), name: "", business: "", phone: "", email: "", city: "", address: "", cuit: "", notes: "", createdAt: Date.now() });

function Clientes() {
  const params = useSearchParams();
  const clients = useDB((s) => s.clients);
  const orders = useDB((s) => s.orders);
  const remitos = useDB((s) => s.remitos);
  const saveClient = useDB((s) => s.saveClient);
  const deleteClient = useDB((s) => s.deleteClient);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Client | null>(() => clients.find((x) => x.id === params.get("c")) ?? null);
  const [error, setError] = useState("");

  const list = useMemo(() => {
    const nq = normalizeText(q);
    return clients.filter((c) => !nq || normalizeText(`${c.name} ${c.business} ${c.phone} ${c.city}`).includes(nq)).sort((a, b) => a.name.localeCompare(b.name));
  }, [clients, q]);

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) return setError("Poné el nombre.");
    saveClient({ ...editing, name: editing.name.trim(), demo: false });
    toast.success("Cliente guardado");
    setEditing(null);
    setError("");
  };

  const f = (k: keyof Client) => ({
    value: String(editing?.[k] ?? ""),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditing((c) => (c ? { ...c, [k]: e.target.value } : c)),
  });

  return (
    <div>
      <PageHeader
        title="Clientes"
        description="Se suman solas cuando alguien hace un pedido desde la tienda o le hacés un remito."
        actions={
          <Button variant="accent" onClick={() => setEditing(blank())}>
            <PlusIcon size={18} weight="bold" /> Nuevo cliente
          </Button>
        }
      />
      <div className={`${pagePad} flex flex-col gap-4`}>
        {clients.length > 0 && (
          <div className="relative">
            <MagnifyingGlassIcon size={20} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gris" />
            <Input type="search" aria-label="Buscar cliente" placeholder="Nombre, negocio, teléfono o ciudad" className="pl-11" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        )}
        {clients.length === 0 ? (
          <Panel>
            <EmptyState icon={<UsersIcon size={40} />} title="Todavía no hay clientes" action={<Button onClick={() => setEditing(blank())}>Cargar un cliente</Button>}>
              También se crean solos con cada pedido web.
            </EmptyState>
          </Panel>
        ) : list.length === 0 ? (
          <Panel>
            <EmptyState title="Nadie coincide con la búsqueda" />
          </Panel>
        ) : (
          <Panel as="div">
            <ul className="divide-y divide-linea">
              {list.map((c) => {
                const nOrders = orders.filter((o) => o.clientId === c.id).length;
                const nRemitos = remitos.filter((r) => r.clientId === c.id).length;
                return (
                  <li key={c.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                    <button type="button" onClick={() => setEditing(c)} className="min-w-0 flex-1 text-left">
                      <span className="block truncate font-semibold hover:text-acento">{c.name}</span>
                      <span className="text-sm text-gris">
                        {[c.business, c.city, c.phone].filter(Boolean).join(" · ") || "Sin datos de contacto"} · {nOrders} pedidos · {nRemitos} remitos
                      </span>
                    </button>
                    <div className="flex gap-2">
                      {c.phone && (
                        <a href={whatsappUrl(c.phone, `Hola ${c.name}!`)} target="_blank" rel="noreferrer" aria-label={`WhatsApp a ${c.name}`} className={buttonClass("secondary", "sm", "min-h-11 min-w-11")}>
                          <WhatsappLogoIcon size={18} />
                        </a>
                      )}
                      <ButtonLink href={`/admin/remitos/nuevo?cliente=${c.id}`} size="sm" variant="secondary" className="min-h-11">
                        Remito
                      </ButtonLink>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
        )}
      </div>

      <Dialog
        open={!!editing}
        onClose={() => (setEditing(null), setError(""))}
        title={editing && clients.some((c) => c.id === editing.id) ? "Editar cliente" : "Nuevo cliente"}
        footer={
          <>
            {editing && clients.some((c) => c.id === editing.id) && (
              <div className="mr-auto">
                <ConfirmButton
                  up
                  confirmLabel="Sí, borrar"
                  onConfirm={() => {
                    deleteClient(editing.id);
                    setEditing(null);
                    toast.success("Cliente borrado");
                  }}
                >
                  Borrar
                </ConfirmButton>
              </div>
            )}
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button onClick={save}>Guardar</Button>
          </>
        }
      >
        {editing && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" htmlFor="cl-name" error={error} className="sm:col-span-2">
              <Input id="cl-name" {...f("name")} />
            </Field>
            <Field label="Negocio" htmlFor="cl-bus">
              <Input id="cl-bus" {...f("business")} />
            </Field>
            <Field label="Teléfono / WhatsApp" htmlFor="cl-phone">
              <Input id="cl-phone" type="tel" inputMode="tel" {...f("phone")} />
            </Field>
            <Field label="Email" htmlFor="cl-mail">
              <Input id="cl-mail" type="email" placeholder="email@ejemplo.com" {...f("email")} />
            </Field>
            <Field label="CUIT / DNI" htmlFor="cl-cuit">
              <Input id="cl-cuit" inputMode="numeric" {...f("cuit")} />
            </Field>
            <Field label="Ciudad" htmlFor="cl-city">
              <Input id="cl-city" {...f("city")} />
            </Field>
            <Field label="Dirección" htmlFor="cl-addr">
              <Input id="cl-addr" {...f("address")} />
            </Field>
            <Field label="Notas" htmlFor="cl-notes" className="sm:col-span-2">
              <Textarea id="cl-notes" rows={2} {...f("notes")} />
            </Field>
          </div>
        )}
      </Dialog>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <Clientes />
    </Suspense>
  );
}
