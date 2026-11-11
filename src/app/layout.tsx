import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Figtree, Ms_Madi } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", style: ["normal", "italic"], display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
// Letra de firma del logo ("Alma y Moda"): sólo para el logo, nunca para texto de lectura.
const firma = Ms_Madi({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Alma y Moda · Mayorista de accesorios", template: "%s · Alma y Moda" },
  description: "Mayorista de accesorios en Bahía Blanca: carteras, mochilas, bolsos, billeteras, materos y térmicos. Elegí colores y cantidades y mandá tu pedido por WhatsApp.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#191613" },
  ],
};

const themeScript = `try{var t=localStorage.getItem("almaymoda-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${bodoni.variable} ${figtree.variable} ${firma.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: "var(--tinta)", color: "var(--lienzo)", border: "none", fontFamily: "var(--font-sans)" },
          }}
        />
      </body>
    </html>
  );
}
