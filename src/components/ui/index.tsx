"use client";

import clsx from "clsx";
import Link from "next/link";
import { forwardRef, useEffect, useId, useRef, type ComponentProps, type ReactNode } from "react";
import { MinusIcon, PlusIcon, XIcon, CircleNotchIcon } from "@phosphor-icons/react";

/* ---------- Botones ---------- */

type Variant = "primary" | "accent" | "secondary" | "ghost" | "danger" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-[color,background-color,opacity] duration-150 active:opacity-75 disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap";
const variants: Record<Variant, string> = {
  primary: "bg-tinta text-lienzo hover:opacity-90",
  accent: "bg-acento text-sobre-acento hover:bg-acento-hover",
  secondary: "bg-papel text-tinta border border-linea-fuerte hover:bg-piedra",
  ghost: "text-tinta hover:bg-piedra",
  danger: "bg-peligro-suave text-peligro hover:brightness-95",
  whatsapp: "bg-whatsapp text-white hover:brightness-110 dark:text-[#0b2a1a]",
};
const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3 text-sm rounded-lg",
  md: "min-h-11 px-4 text-[0.95rem] rounded-xl",
  lg: "min-h-13 px-6 text-base rounded-xl",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra?: string) {
  return clsx(base, variants[variant], sizes[size], extra);
}

export const Button = forwardRef<HTMLButtonElement, ComponentProps<"button"> & { variant?: Variant; size?: Size; loading?: boolean }>(
  function Button({ variant = "primary", size = "md", loading, className, children, disabled, type = "button", ...rest }, ref) {
    return (
      <button ref={ref} type={type} className={buttonClass(variant, size, className)} disabled={disabled || loading} {...rest}>
        {loading && <CircleNotchIcon className="animate-spin" size={18} />}
        {children}
      </button>
    );
  },
);

export function ButtonLink({ href, variant = "primary", size = "md", className, children, ...rest }: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function IconButton({ label, className, children, ...rest }: ComponentProps<"button"> & { label: string }) {
  return (
    <button type="button" aria-label={label} title={label} className={clsx("inline-flex size-11 items-center justify-center rounded-xl text-tinta hover:bg-piedra", className)} {...rest}>
      {children}
    </button>
  );
}

/* ---------- Formularios ---------- */

const fieldBase =
  "w-full min-h-11 rounded-xl border border-linea-fuerte bg-papel px-3.5 text-[0.95rem] text-tinta placeholder:text-gris/80 focus:border-acento focus:outline-none focus:ring-2 focus:ring-acento/25 aria-[invalid=true]:border-peligro";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(function Input({ className, ...rest }, ref) {
  return <input ref={ref} className={clsx(fieldBase, className)} {...rest} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} className={clsx(fieldBase, "py-2.5 min-h-24", className)} {...rest} />;
});

export const Select = forwardRef<HTMLSelectElement, ComponentProps<"select">>(function Select({ className, children, ...rest }, ref) {
  return (
    <select ref={ref} className={clsx(fieldBase, "appearance-none bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9", className)} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23887d8a' stroke-width='1.6' fill='none'/%3E%3C/svg%3E\")" }} {...rest}>
      {children}
    </select>
  );
});

export function Field({ label, hint, error, children, className, htmlFor }: { label: ReactNode; hint?: ReactNode; error?: string; children: ReactNode; className?: string; htmlFor?: string }) {
  return (
    <div className={clsx("flex flex-col gap-1.5 min-w-0", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-tinta">
        {label}
      </label>
      {children}
      {error ? (
        <p id={htmlFor ? `${htmlFor}-error` : undefined} className="text-sm text-peligro">
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-gris">{hint}</p>
      ) : null}
    </div>
  );
}

export function Switch({ checked, onChange, label, description, id }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; description?: ReactNode; id?: string }) {
  const auto = useId();
  const sid = id ?? auto;
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <label htmlFor={sid} className="flex flex-col gap-0.5 cursor-pointer min-w-0">
        <span className="font-semibold text-[0.95rem]">{label}</span>
        {description && <span className="text-sm text-gris">{description}</span>}
      </label>
      <button
        id={sid}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx("relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-colors", checked ? "bg-acento" : "bg-linea-fuerte")}
      >
        <span className={clsx("absolute top-1 size-5 rounded-full bg-papel shadow transition-[left] duration-150", checked ? "left-6" : "left-1")} />
      </button>
    </div>
  );
}

export function Segmented<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: { value: T; label: ReactNode }[]; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-xl bg-piedra p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={clsx("min-h-9 rounded-lg px-3 text-sm font-semibold transition-colors", value === o.value ? "bg-papel text-tinta shadow-sm" : "text-gris hover:text-tinta")}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Stepper({ value, onChange, min = 0, max, label, size = "md" }: { value: number; onChange: (v: number) => void; min?: number; max?: number; label: string; size?: "sm" | "md" }) {
  const clamp = (n: number) => Math.max(min, max !== undefined ? Math.min(max, n) : n);
  const h = size === "sm" ? "h-10" : "h-11";
  return (
    <div className={clsx("inline-flex items-stretch rounded-xl border border-linea-fuerte bg-papel", h)}>
      <button type="button" aria-label={`Restar ${label}`} className="w-10 inline-flex items-center justify-center text-tinta hover:bg-piedra rounded-l-xl disabled:opacity-40" onClick={() => onChange(clamp(value - 1))} disabled={value <= min}>
        <MinusIcon size={16} weight="bold" />
      </button>
      <input
        aria-label={label}
        inputMode="numeric"
        className="num w-12 text-center bg-transparent font-semibold focus:outline-none"
        value={value}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, "") || "0", 10);
          onChange(clamp(n));
        }}
      />
      <button type="button" aria-label={`Sumar ${label}`} className="w-10 inline-flex items-center justify-center text-tinta hover:bg-piedra rounded-r-xl disabled:opacity-40" onClick={() => onChange(clamp(value + 1))} disabled={max !== undefined && value >= max}>
        <PlusIcon size={16} weight="bold" />
      </button>
    </div>
  );
}

/* ---------- Presentación ---------- */

export function PriceTag({ value, tone, className, size = "md" }: { value: ReactNode; tone?: "accent"; className?: string; size?: "sm" | "md" | "lg" }) {
  const s = size === "sm" ? "text-[0.8rem]" : size === "lg" ? "text-xl" : "text-[0.95rem]";
  return (
    <span className={clsx("hang-tag", s, className)} data-tone={tone}>
      {value}
    </span>
  );
}

type Tone = "neutral" | "ok" | "alerta" | "peligro" | "acento";
const tones: Record<Tone, string> = {
  neutral: "bg-piedra text-tinta",
  ok: "bg-ok-suave text-ok",
  alerta: "bg-alerta-suave text-alerta",
  peligro: "bg-peligro-suave text-peligro",
  acento: "bg-acento-suave text-acento",
};

export function Badge({ tone = "neutral", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return <span className={clsx("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold whitespace-nowrap", tones[tone], className)}>{children}</span>;
}

export function Panel({ children, className, as: As = "section" }: { children: ReactNode; className?: string; as?: "section" | "div" | "article" }) {
  return <As className={clsx("rounded-2xl border border-linea bg-papel", className)}>{children}</As>;
}

export function EmptyState({ icon, title, children, action }: { icon?: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 px-6 py-12">
      {icon && <div className="text-gris">{icon}</div>}
      <h3 className="font-display text-2xl">{title}</h3>
      {children && <div className="text-gris max-w-md">{children}</div>}
      {action}
    </div>
  );
}

export function Spinner({ label = "Cargando" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-16 text-gris">
      <CircleNotchIcon size={22} className="animate-spin" />
      <span>{label}…</span>
    </div>
  );
}

/* ---------- Diálogo (Escape cierra, foco atrapado por el navegador) ---------- */

export function Dialog({ open, onClose, title, children, footer, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={clsx(
        "m-auto w-[calc(100%-24px)] max-h-[calc(100dvh-24px)] rounded-2xl bg-papel text-tinta p-0 border border-linea shadow-2xl",
        wide ? "max-w-3xl" : "max-w-lg",
      )}
    >
      {open && (
        <div className="flex max-h-[calc(100dvh-24px)] flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-linea px-5 py-3">
            <h2 className="font-display text-2xl">{title}</h2>
            <IconButton label="Cerrar" onClick={onClose}>
              <XIcon size={20} />
            </IconButton>
          </header>
          <div className="overflow-y-auto px-5 py-4">{children}</div>
          {footer && <footer className="flex flex-wrap justify-end gap-2 border-t border-linea px-5 py-3">{footer}</footer>}
        </div>
      )}
    </dialog>
  );
}

/** Confirmación en línea (sin confirm() del navegador). */
export function ConfirmButton({ onConfirm, children, confirmLabel = "Sí, confirmar", variant = "danger", size = "md", up = false }: { onConfirm: () => void; children: ReactNode; confirmLabel?: string; variant?: Variant; size?: Size; up?: boolean }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details ref={ref} className="relative group">
      <summary className={clsx(buttonClass(variant, size), "list-none cursor-pointer [&::-webkit-details-marker]:hidden")}>{children}</summary>
      <div className={clsx("absolute right-0 z-20 w-64 rounded-xl border border-linea bg-papel p-3 shadow-xl", up ? "bottom-full mb-2" : "mt-2")}>
        <p className="text-sm text-gris mb-3">Esta acción no se puede deshacer.</p>
        <div className="flex gap-2 justify-end">
          <Button size="sm" variant="ghost" onClick={() => ref.current?.removeAttribute("open")}>
            Cancelar
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              ref.current?.removeAttribute("open");
              onConfirm();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </details>
  );
}
