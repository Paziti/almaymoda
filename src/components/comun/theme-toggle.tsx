"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";

const EVENT = "almaymoda-theme";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

// Claro por defecto: el oscuro sólo si se eligió con el botón.
function isDark() {
  return document.documentElement.dataset.theme === "dark";
}

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const toggle = () => {
    const next = !isDark();
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("almaymoda-theme", next ? "dark" : "light");
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };

  const label = dark ? "Usar tema claro" : "Usar tema oscuro";
  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} className={className ?? "inline-flex size-11 items-center justify-center rounded-xl hover:bg-piedra"}>
      {dark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  );
}
