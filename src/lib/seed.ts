import type { Client, Order, Product, Settings, Supplier, Variant } from "./types";

/* Rubros reales de la cuenta de Instagram (@mayorista_almaymoda): carteras, mochilas, bolsos, billeteras, materos, térmicos y viaje. */
export const CATEGORIAS = ["Carteras", "Bolsos", "Mochilas", "Billeteras", "Materos", "Térmicos", "Botellas", "Viaje"];
export const MEDIDAS = ["Único", "Chico", "Mediano", "Grande", "280 ml", "500 ml", "750 ml", "1 L", "1,2 L"];

/** Valores de la primera versión (ropa), para reconocerlos y migrarlos. */
export const LEGACY_CATEGORIAS = ["Remeras", "Tops", "Camisas", "Jeans", "Pantalones", "Vestidos", "Polleras", "Buzos", "Camperas"];
export const LEGACY_MEDIDAS = ["XS", "S", "M", "L", "XL", "XXL", "36", "38", "40", "42", "44", "46", "Único"];

export const defaultSettings: Settings = {
  storeName: "Alma y Moda",
  legalName: "",
  cuit: "",
  address: "",
  phone: "",
  whatsapp: "",
  email: "",
  instagram: "https://www.instagram.com/mayorista_almaymoda/",
  coefficient: 1.8,
  rounding: 100,
  minPurchase: 0,
  pricesRequireLogin: false,
  lowStock: 6,
  pointOfSale: "0001",
  nextRemito: 1,
  nextOrder: 1,
  remitoFooter: "Documento no válido como factura.",
  photoBackground: "#E5DCD2",
  pin: "1234",
  categories: CATEGORIAS,
  sizes: MEDIDAS,
};

let n = 0;
const vid = () => `v-demo-${++n}`;

function grid(sizes: string[], colors: string[], stocks: number[]): Variant[] {
  const out: Variant[] = [];
  let i = 0;
  for (const color of colors) {
    for (const size of sizes) {
      out.push({ id: vid(), size, color, stock: stocks[i % stocks.length] });
      i++;
    }
  }
  return out;
}

const t0 = Date.UTC(2026, 10, 1);

export function demoSuppliers(): Supplier[] {
  return [
    { id: "s-demo-1", name: "Marroquinería Ejemplo", contact: "", phone: "", email: "", coefficient: 1.8, notes: "Proveedor de ejemplo", demo: true },
    { id: "s-demo-2", name: "Importadora Ejemplo", contact: "", phone: "", email: "", coefficient: 1.65, notes: "Proveedor de ejemplo", demo: true },
    { id: "s-demo-3", name: "Distribuidora Ejemplo", contact: "", phone: "", email: "", coefficient: null, notes: "Usa el coeficiente general", demo: true },
  ];
}

type Seed = Omit<Product, "id" | "createdAt" | "updatedAt" | "images" | "active" | "demo" | "priceOverride" | "coefficient"> & {
  /** Fotos provisorias tomadas del Instagram del cliente, sólo para la demo. */
  images?: string[];
  coefficient?: number | null;
};

const U = ["Único"];
const VALIJA = ["Chico", "Mediano", "Grande"];

const seeds: Seed[] = [
  { code: "CT-1102", name: "Bandolera con bolsillos laterales", description: "Ecocuero con pouch desmontable, bolsillo interno y correa regulable. 15 x 18 x 10 cm.", category: "Carteras", supplierId: "s-demo-1", cost: 9800, featured: true, swatch: "#8C3B32", images: ["/demo/bandolera-bordo.jpg", "/demo/bandolera-suela.jpg"], variants: grid(U, ["Bordó", "Suela", "Negro"], [12, 9, 15]) },
  { code: "CT-1120", name: "Cartera hobo de ecocuero", description: "Cierre superior, forro estampado y bolsillo interno.", category: "Carteras", supplierId: "s-demo-1", cost: 12400, featured: false, swatch: "#B08A63", variants: grid(U, ["Camel", "Negro"], [8, 6]) },
  { code: "BL-2201", name: "Bolso tote impermeable", description: "Material transparente con necessaire interno de 16,5 x 24 x 7 cm.", category: "Bolsos", supplierId: "s-demo-1", cost: 14600, featured: true, swatch: "#2B2A2C", images: ["/demo/tote-transparente-negro.jpg"], variants: grid(U, ["Negro", "Beige"], [10, 7]) },
  { code: "BL-2215", name: "Bolso de mano con organizador", description: "Base reforzada, organizador interno y llavero desmontable.", category: "Bolsos", supplierId: "s-demo-3", cost: 11900, featured: false, swatch: "#6F4E37", variants: grid(U, ["Chocolate", "Tiza"], [5, 9]) },
  { code: "MC-3001", name: "Mochila maternal con cambiador", description: "Frente matelaseado, bolsillos laterales y cambiador plegable incluido.", category: "Mochilas", supplierId: "s-demo-2", cost: 18500, featured: true, swatch: "#2E3D63", images: ["/demo/mochila-maternal-azul.jpg"], variants: grid(U, ["Azul", "Gris", "Negro"], [6, 8, 11]) },
  { code: "MC-3018", name: "Mochila matera", description: "Bolsillo térmico lateral para el termo y portayerbera.", category: "Mochilas", supplierId: "s-demo-2", cost: 16200, featured: false, swatch: "#5E6B4F", variants: grid(U, ["Verde oliva", "Negro"], [7, 4]) },
  { code: "BT-4005", name: "Billetera doble cierre", description: "Ecocuero texturado, dos compartimentos con cierre y manija de mano.", category: "Billeteras", supplierId: "s-demo-1", cost: 7400, featured: false, swatch: "#A0522D", images: ["/demo/billeteras-doble-cierre.jpg"], variants: grid(U, ["Azul marino", "Cobre", "Gris"], [20, 18, 9]) },
  { code: "BT-4020", name: "Billetera porta celular", description: "Bolsillo frontal para el celular, interior con tarjeteros y correa desmontable. 18 x 10 x 4 cm.", category: "Billeteras", supplierId: "s-demo-3", cost: 8600, featured: false, swatch: "#B07A45", images: ["/demo/portacelular-suela.jpg", "/demo/portacelular-rojo.jpg", "/demo/portacelular-negro.jpg"], variants: grid(U, ["Suela", "Rojo", "Negro"], [12, 6, 16]) },
  { code: "MT-5003", name: "Matero rígido", description: "Estructura rígida, entra termo de 1 L, yerbera y azucarera.", category: "Materos", supplierId: "s-demo-3", cost: 10800, featured: false, swatch: "#7A5C3E", variants: grid(U, ["Suela", "Negro", "Verde"], [9, 6, 0]) },
  { code: "TM-6001", name: "Vaso térmico con manija", description: "Doble pared de acero, tapa con sorbete. 6 horas caliente, 8 horas frío.", category: "Térmicos", supplierId: "s-demo-2", cost: 15900, featured: true, swatch: "#4FA79A", images: ["/demo/vaso-termico-turquesa.jpg"], variants: grid(["1,2 L"], ["Verde agua", "Lila", "Crema"], [8, 6, 10]) },
  { code: "TM-6014", name: "Vaso térmico con tapa", description: "Interior de acero 304 de doble capa, tapa transparente. Viene en caja.", category: "Térmicos", supplierId: "s-demo-2", cost: 6900, featured: false, swatch: "#B79AD9", images: ["/demo/vaso-280-lila.jpg", "/demo/vaso-280-rosa.jpg", "/demo/vaso-280-verde-agua.jpg"], variants: grid(["280 ml"], ["Lila", "Rosa", "Verde agua"], [12, 12, 8]) },
  { code: "BO-7002", name: "Botella térmica estampada", description: "Interior de acero 304 de doble capa, tapa con silicona. Viene en caja.", category: "Botellas", supplierId: "s-demo-1", cost: 8900, featured: false, swatch: "#D9578A", images: ["/demo/botella-estampada-fucsia.jpg"], variants: grid(["500 ml", "750 ml"], ["Fucsia", "Blanco"], [12, 8, 10, 4]) },
  { code: "BO-7010", name: "Botella deportiva con traba", description: "Tritán libre de BPA, pico con traba antiderrame.", category: "Botellas", supplierId: "s-demo-3", cost: 4600, featured: false, swatch: "#9BB4D6", variants: grid(["750 ml"], ["Celeste", "Lila"], [16, 11]) },
  { code: "VJ-8001", name: "Valija rígida con ruedas 360°", description: "Súper liviana, extensible, ruedas dobles, candado con combinación y manija retráctil.", category: "Viaje", supplierId: "s-demo-2", cost: 48500, featured: true, swatch: "#BFE6D8", images: ["/demo/valijas-menta.jpg"], variants: grid(VALIJA, ["Verde menta"], [3, 4, 2]) },
  { code: "VJ-8020", name: "Necessaire de viaje", description: "Apertura total, bolsillos de malla y gancho para colgar.", category: "Viaje", supplierId: "s-demo-3", cost: 6200, featured: false, swatch: "#C9A9A6", variants: grid(U, ["Rosa viejo", "Negro"], [10, 8]) },
  { code: "BL-2230", name: "Riñonera de nylon", description: "Nylon liviano, dos bolsillos con cierre y correa regulable.", category: "Bolsos", supplierId: "s-demo-1", cost: 5900, featured: false, swatch: "#2F2B35", variants: grid(U, ["Negro", "Plata"], [0, 0]) },
];

export function demoProducts(): Product[] {
  return seeds.map((s, i) => ({
    ...s,
    id: `p-demo-${i + 1}`,
    coefficient: s.coefficient ?? null,
    priceOverride: null,
    images: s.images ?? [],
    active: true,
    demo: true,
    // En la demo, los que tienen foto figuran como los ingresos más recientes.
    createdAt: t0 + (s.images?.length ? 100 + i : i) * 3600_000,
    updatedAt: t0 + (s.images?.length ? 100 + i : i) * 3600_000,
  }));
}

export function demoClients(): Client[] {
  return [
    { id: "c-demo-1", name: "Clienta de ejemplo", business: "Local de ejemplo", phone: "", email: "", city: "", address: "", cuit: "", notes: "Cliente de ejemplo para probar remitos", createdAt: t0, demo: true },
  ];
}

export function demoOrders(products: Product[]): Order[] {
  const p1 = products[0];
  const p2 = products[4];
  return [
    {
      id: "o-demo-1",
      number: 1,
      createdAt: t0 + 86400_000 * 9,
      clientId: "c-demo-1",
      customer: { name: "Clienta de ejemplo", phone: "", business: "Local de ejemplo", city: "" },
      items: [
        { productId: p1.id, variantId: p1.variants[1].id, code: p1.code, name: p1.name, size: p1.variants[1].size, color: p1.variants[1].color, qty: 6, unitPrice: 17700 },
        { productId: p2.id, variantId: p2.variants[2].id, code: p2.code, name: p2.name, size: p2.variants[2].size, color: p2.variants[2].color, qty: 4, unitPrice: 30600 },
      ],
      notes: "Pedido de ejemplo",
      status: "nuevo",
      remitoId: null,
      demo: true,
    },
  ];
}
