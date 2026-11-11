import type { Client, Order, Product, Settings, Supplier, Variant } from "./types";

export const defaultSettings: Settings = {
  storeName: "almaymoda",
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
  photoBackground: "#F3EEF1",
  pin: "1234",
  categories: ["Remeras", "Tops", "Camisas", "Jeans", "Pantalones", "Vestidos", "Polleras", "Buzos", "Camperas"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL", "36", "38", "40", "42", "44", "46", "Único"],
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
    { id: "s-demo-1", name: "Textil Ejemplo", contact: "", phone: "", email: "", coefficient: 1.8, notes: "Proveedor de ejemplo", demo: true },
    { id: "s-demo-2", name: "Denim Ejemplo", contact: "", phone: "", email: "", coefficient: 1.65, notes: "Proveedor de ejemplo", demo: true },
    { id: "s-demo-3", name: "Tejidos Ejemplo", contact: "", phone: "", email: "", coefficient: null, notes: "Usa el coeficiente general", demo: true },
  ];
}

type Seed = Omit<Product, "id" | "createdAt" | "updatedAt" | "images" | "active" | "demo" | "priceOverride" | "coefficient"> & {
  coefficient?: number | null;
};

const LETTERS = ["S", "M", "L", "XL"];
const JEANS = ["36", "38", "40", "42", "44"];

const seeds: Seed[] = [
  { code: "RM-1020", name: "Remera básica algodón", description: "Algodón peinado 24/1, cuello redondo, calce recto.", category: "Remeras", supplierId: "s-demo-1", cost: 4200, featured: true, swatch: "#E9E2D8", variants: grid(LETTERS, ["Blanco", "Negro", "Gris melange"], [18, 24, 20, 8, 12, 16, 10, 4, 9, 11, 7, 0]) },
  { code: "RM-1034", name: "Remera oversize lavada", description: "Jersey con lavado a la piedra, hombro caído.", category: "Remeras", supplierId: "s-demo-1", cost: 5600, featured: false, swatch: "#B9A7A2", variants: grid(["M", "L", "XL"], ["Tiza", "Grafito"], [10, 14, 6, 8, 5, 3]) },
  { code: "TP-2201", name: "Top lino con breteles", description: "Lino con elastizado en espalda.", category: "Tops", supplierId: "s-demo-1", cost: 6100, featured: true, swatch: "#D8C7B0", variants: grid(["S", "M", "L"], ["Natural", "Negro"], [12, 15, 9, 6, 10, 4]) },
  { code: "TP-2210", name: "Top morley acanalado", description: "Morley de algodón con lycra, escote cuadrado.", category: "Tops", supplierId: "s-demo-3", cost: 3900, featured: false, swatch: "#C9637F", variants: grid(["Único"], ["Fucsia", "Negro", "Crudo"], [30, 22, 18]) },
  { code: "CM-3105", name: "Camisa poplin oversize", description: "Poplin 100% algodón, botones nacarados.", category: "Camisas", supplierId: "s-demo-1", cost: 8900, featured: true, swatch: "#DCE3EA", variants: grid(["S", "M", "L"], ["Celeste", "Blanco"], [6, 9, 5, 7, 8, 2]) },
  { code: "JN-4001", name: "Jean mom tiro alto", description: "Denim rígido 12 oz, cinco bolsillos.", category: "Jeans", supplierId: "s-demo-2", cost: 14500, featured: true, swatch: "#6F86A6", variants: grid(JEANS, ["Celeste", "Azul"], [6, 10, 12, 8, 4, 5, 9, 11, 6, 0]) },
  { code: "JN-4012", name: "Jean wide leg", description: "Denim con elastano, pierna ancha, ruedo a la vista.", category: "Jeans", supplierId: "s-demo-2", cost: 15800, featured: false, swatch: "#3E4E6B", variants: grid(JEANS, ["Azul oscuro"], [4, 8, 9, 6, 3]) },
  { code: "JN-4020", name: "Jean recto negro", description: "Denim negro con elastano.", category: "Jeans", supplierId: "s-demo-2", cost: 14900, featured: false, swatch: "#2C2A30", variants: grid(JEANS, ["Negro"], [2, 3, 1, 0, 0]) },
  { code: "PN-5003", name: "Pantalón sastrero", description: "Crepe con pinzas y cintura con elástico atrás.", category: "Pantalones", supplierId: "s-demo-3", cost: 11200, featured: false, swatch: "#8C7B6B", variants: grid(["S", "M", "L", "XL"], ["Camel", "Negro"], [5, 7, 6, 3, 8, 9, 5, 2]) },
  { code: "PN-5010", name: "Cargo gabardina", description: "Gabardina elastizada, bolsillos laterales.", category: "Pantalones", supplierId: "s-demo-3", cost: 12400, featured: true, swatch: "#7E8061", variants: grid(["S", "M", "L"], ["Verde militar", "Beige"], [7, 10, 6, 5, 6, 4]) },
  { code: "VS-6002", name: "Vestido midi fibrana", description: "Fibrana estampada, tiras regulables.", category: "Vestidos", supplierId: "s-demo-1", cost: 13200, featured: true, swatch: "#A65D6E", variants: grid(["S", "M", "L"], ["Estampado bordó"], [8, 12, 7]) },
  { code: "VS-6015", name: "Vestido corto morley", description: "Morley acanalado, manga larga.", category: "Vestidos", supplierId: "s-demo-3", cost: 9800, featured: false, swatch: "#4B3A4F", variants: grid(["Único"], ["Negro", "Uva"], [14, 9]) },
  { code: "PL-7004", name: "Pollera satén midi", description: "Satén al bies con cintura elástica.", category: "Polleras", supplierId: "s-demo-1", cost: 8700, featured: false, swatch: "#C7B49B", variants: grid(["S", "M", "L"], ["Champagne", "Negro"], [6, 8, 5, 4, 6, 3]) },
  { code: "BZ-8001", name: "Buzo frisa canguro", description: "Frisa invisible, capucha con cordón.", category: "Buzos", supplierId: "s-demo-3", cost: 12900, featured: false, swatch: "#9DA6A0", variants: grid(["M", "L", "XL"], ["Gris", "Verde agua"], [9, 11, 5, 6, 7, 2]) },
  { code: "CP-9002", name: "Campera de jean", description: "Denim 12 oz, botones metálicos.", category: "Camperas", supplierId: "s-demo-2", cost: 21500, featured: true, swatch: "#5D7699", variants: grid(["S", "M", "L"], ["Celeste"], [4, 6, 3]) },
  { code: "CP-9011", name: "Chaleco puffer", description: "Nylon con relleno de guata, cuello alto.", category: "Camperas", supplierId: "s-demo-3", cost: 18900, featured: false, swatch: "#2F2B35", variants: grid(["Único"], ["Negro", "Plata"], [0, 0]) },
];

export function demoProducts(): Product[] {
  return seeds.map((s, i) => ({
    ...s,
    id: `p-demo-${i + 1}`,
    coefficient: s.coefficient ?? null,
    priceOverride: null,
    images: [],
    active: true,
    demo: true,
    createdAt: t0 + i * 3600_000,
    updatedAt: t0 + i * 3600_000,
  }));
}

export function demoClients(): Client[] {
  return [
    { id: "c-demo-1", name: "Clienta de ejemplo", business: "Local de ejemplo", phone: "", email: "", city: "", address: "", cuit: "", notes: "Cliente de ejemplo para probar remitos", createdAt: t0, demo: true },
  ];
}

export function demoOrders(products: Product[]): Order[] {
  const p1 = products[0];
  const p2 = products[5];
  return [
    {
      id: "o-demo-1",
      number: 1,
      createdAt: t0 + 86400_000 * 9,
      clientId: "c-demo-1",
      customer: { name: "Clienta de ejemplo", phone: "", business: "Local de ejemplo", city: "" },
      items: [
        { productId: p1.id, variantId: p1.variants[1].id, code: p1.code, name: p1.name, size: p1.variants[1].size, color: p1.variants[1].color, qty: 6, unitPrice: 7600 },
        { productId: p2.id, variantId: p2.variants[2].id, code: p2.code, name: p2.name, size: p2.variants[2].size, color: p2.variants[2].color, qty: 4, unitPrice: 24000 },
      ],
      notes: "Pedido de ejemplo",
      status: "nuevo",
      remitoId: null,
      demo: true,
    },
  ];
}
