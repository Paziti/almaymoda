"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartLine {
  productId: string;
  variantId: string;
  qty: number;
}

interface SessionState {
  cart: CartLine[];
  clientId: string | null;
  setQty: (productId: string, variantId: string, qty: number) => void;
  addMany: (lines: CartLine[]) => void;
  clearCart: () => void;
  login: (clientId: string) => void;
  logout: () => void;
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      cart: [],
      clientId: null,
      setQty: (productId, variantId, qty) =>
        set((s) => {
          const rest = s.cart.filter((l) => !(l.productId === productId && l.variantId === variantId));
          return { cart: qty > 0 ? [...rest, { productId, variantId, qty }] : rest };
        }),
      addMany: (lines) =>
        set((s) => {
          const cart = [...s.cart];
          for (const l of lines) {
            if (l.qty <= 0) continue;
            const i = cart.findIndex((c) => c.productId === l.productId && c.variantId === l.variantId);
            if (i >= 0) cart[i] = { ...cart[i], qty: cart[i].qty + l.qty };
            else cart.push(l);
          }
          return { cart };
        }),
      clearCart: () => set({ cart: [] }),
      login: (clientId) => set({ clientId }),
      logout: () => set({ clientId: null }),
    }),
    {
      name: "almaymoda-session",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Desbloqueo del panel: dura lo que dura la pestaña. */
const AUTH_EVENT = "almaymoda-auth";
export const adminAuth = {
  subscribe(cb: () => void) {
    window.addEventListener(AUTH_EVENT, cb);
    return () => window.removeEventListener(AUTH_EVENT, cb);
  },
  isUnlocked() {
    try {
      return sessionStorage.getItem("almaymoda-admin") === "1";
    } catch {
      return false;
    }
  },
  unlock() {
    try {
      sessionStorage.setItem("almaymoda-admin", "1");
    } catch {}
    window.dispatchEvent(new Event(AUTH_EVENT));
  },
  lock() {
    try {
      sessionStorage.removeItem("almaymoda-admin");
    } catch {}
    window.dispatchEvent(new Event(AUTH_EVENT));
  },
};
