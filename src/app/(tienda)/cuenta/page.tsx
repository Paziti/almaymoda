"use client";

import { useState } from "react";
import { SignOutIcon } from "@phosphor-icons/react";
import { HISTORIAL_PEDIDOS, useClienta, fmtDate, fmtMoney, variantLabel, type OrderStatus } from "@/lib/tienda";
import { Badge, Button, ButtonLink, EmptyState, Field, Input, Panel } from "@/components/comun/ui";

const statusTone: Record<OrderStatus, { label: string; tone: "acento" | "ok" | "neutral" | "peligro" }> = {
  nuevo: { label: "Recibido", tone: "acento" },
  confirmado: { label: "Confirmado", tone: "ok" },
  remitido: { label: "Preparado", tone: "ok" },
  cancelado: { label: "Cancelado", tone: "peligro" },
};

export default function CuentaPage() {
  const { clienta: me, pedidos: mine, ingresar, registrar, salir: logout } = useClienta();

  const [step, setStep] = useState<"phone" | "register">("phone");
  const [phone, setPhone] = useState("");
  const [form, setForm] = useState({ name: "", business: "", city: "", email: "" });
  const [error, setError] = useState("");

  if (me) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-gris">Hola,</p>
            <h1 className="font-display text-[clamp(3rem,9vw,5.5rem)] leading-[0.9] tracking-[-0.02em]">{me.name}</h1>
            <p className="text-gris">{[me.business, me.city, me.phone].filter(Boolean).join(" · ")}</p>
          </div>
          <Button variant="secondary" onClick={logout}>
            <SignOutIcon size={18} /> Salir
          </Button>
        </div>
        {!HISTORIAL_PEDIDOS && (
          <Panel as="div" className="flex flex-col gap-3 p-5">
            <p>Tus datos quedan guardados en este celular: en el próximo pedido ya aparecen completos.</p>
            <ButtonLink href="/catalogo" className="w-fit">
              Ver el catálogo
            </ButtonLink>
          </Panel>
        )}
        {HISTORIAL_PEDIDOS && (
        <section aria-labelledby="t-orders" className="flex flex-col gap-3">
          <h2 id="t-orders" className="border-t border-tinta pt-4 font-display text-3xl">
            Mis pedidos
          </h2>
          {mine.length ? (
            <ul className="flex flex-col gap-3">
              {mine.map((o) => {
                const total = o.items.reduce((a, i) => a + i.qty * i.unitPrice, 0);
                const units = o.items.reduce((a, i) => a + i.qty, 0);
                return (
                  <li key={o.id}>
                    <Panel as="article" className="flex flex-col gap-2 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-display text-xl">Pedido N° {o.number}</span>
                        <Badge tone={statusTone[o.status].tone}>{statusTone[o.status].label}</Badge>
                      </div>
                      <p className="text-sm text-gris">
                        {fmtDate(o.createdAt)} · {units} unidades · <span className="num">{fmtMoney(total)}</span>
                      </p>
                      <ul className="text-sm text-gris">
                        {o.items.slice(0, 4).map((i, k) => (
                          <li key={k}>
                            {i.qty} × {i.name}, {variantLabel(i.size, i.color)}
                          </li>
                        ))}
                        {o.items.length > 4 && <li>y {o.items.length - 4} más</li>}
                      </ul>
                    </Panel>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Panel>
              <EmptyState title="Todavía no hiciste pedidos" action={<ButtonLink href="/catalogo">Ver el catálogo</ButtonLink>} />
            </Panel>
          )}
        </section>
        )}
      </div>
    );
  }

  const digits = phone.replace(/\D/g, "");

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
      <div>
        <h1 className="font-display text-[clamp(3rem,10vw,5rem)] leading-[0.9] tracking-[-0.02em]">Mi cuenta</h1>
        <p className="mt-2 text-gris">
          {HISTORIAL_PEDIDOS ? "Ingresá con tu teléfono para ver tus pedidos y que tus datos queden cargados." : "Dejá tus datos una vez y en cada pedido ya aparecen completos."}
        </p>
      </div>
      <Panel as="div" className="p-5">
        {step === "phone" ? (
          <form
            noValidate
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (digits.length < 8) {
                document.getElementById("c-phone")?.focus();
                return setError("Escribí tu teléfono con código de área.");
              }
              setError("");
              if (!ingresar(phone)) setStep("register");
            }}
          >
            <Field label="Teléfono / WhatsApp" htmlFor="c-phone" error={error}>
              <Input id="c-phone" aria-invalid={!!error} aria-describedby={error ? "c-phone-error" : undefined} type="tel" inputMode="tel" autoComplete="tel" placeholder="11 2345 6789" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Field>
            <Button type="submit" size="lg">
              Continuar
            </Button>
          </form>
        ) : (
          <form
            noValidate
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.name.trim()) {
                document.getElementById("r-name")?.focus();
                return setError("Escribí tu nombre.");
              }
              registrar({ ...form, phone });
            }}
          >
            <p className="text-sm text-gris">Es tu primera vez con el {phone}. Completá tus datos.</p>
            <Field label="Nombre" htmlFor="r-name" error={error}>
              <Input id="r-name" aria-invalid={!!error} aria-describedby={error ? "r-name-error" : undefined} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Negocio" htmlFor="r-bus" hint="Opcional">
              <Input id="r-bus" name="organization" autoComplete="organization" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} />
            </Field>
            <Field label="Ciudad" htmlFor="r-city" hint="Opcional">
              <Input id="r-city" name="city" autoComplete="address-level2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </Field>
            <Field label="Email" htmlFor="r-mail" hint="Opcional, para recibir remitos">
              <Input id="r-mail" name="email" spellCheck={false} type="email" autoComplete="email" placeholder="email@ejemplo.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setStep("phone")}>
                Volver
              </Button>
              <Button type="submit" className="flex-1">
                Crear mi cuenta
              </Button>
            </div>
          </form>
        )}
      </Panel>
      <p className="text-sm text-gris">Tus datos quedan guardados sólo en este dispositivo.</p>
    </div>
  );
}
