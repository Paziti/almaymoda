import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Figtree } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", style: ["normal", "italic"], display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: { default: "almaymoda · mayorista", template: "%s · almaymoda" },
  description: "Catálogo mayorista de almaymoda. Elegí talles y cantidades y enviá tu pedido por WhatsApp.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf9f8" },
    { media: "(prefers-color-scheme: dark)", color: "#17121a" },
  ],
};

const themeScript = `try{var t=localStorage.getItem("almaymoda-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${bodoni.variable} ${figtree.variable}`} suppressHydrationWarning>
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
