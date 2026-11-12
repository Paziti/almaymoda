import type { Client, Order, Product, Settings, Supplier, Variant } from "./types";

/* Rubros reales de la cuenta de Instagram (@mayorista_almaymoda): carteras, mochilas, bolsos, billeteras, materos, térmicos y viaje. */
export const CATEGORIAS = ["Carteras", "Bolsos", "Mochilas", "Billeteras", "Materos", "Térmicos", "Botellas", "Viaje"];
export const MEDIDAS = ["Único", "Chico", "Mediano", "Grande", "160 ml", "280 ml", "500 ml", "750 ml", "1 L", "1,2 L", "1,3 L"];

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
const f = (...names: string[]) => names.map((n) => `/demo/${n}.jpg`);

/*
  Artículos de ejemplo: todos tienen foto (recortes provisorios del Instagram del cliente).
  El orden importa: los primeros destacados arman la tapa y los últimos son "Recién llegados".
*/
const seeds: Seed[] = [
  { code: "CT-1130", name: "Cartera tote Oreiro Love", description: "Ecocuero con bolsillos frontales, bolsillo antirrobo, porta llavero interno y llavero desmontable. 31 x 28 x 10 cm.", category: "Carteras", supplierId: "s-demo-1", cost: 16800, featured: true, swatch: "#D99A8A", images: f("cartera-oreiro-rosa", "cartera-oreiro-negra", "cartera-oreiro-roja"), variants: grid(U, ["Rosa", "Negro", "Rojo"], [2, 8, 2]) },
  { code: "TM-6030", name: "Termo con manija Discovery", description: "Interior de acero 304 de doble capa, manija lateral y tapa vaso. Viene en caja.", category: "Térmicos", supplierId: "s-demo-2", cost: 27500, featured: true, swatch: "#E8C3B8", images: f("termo-discovery-rosa"), variants: grid(["1,3 L"], ["Rosa"], [5]) },
  { code: "MC-3040", name: "Mochila urbana Head 17”", description: "Porta notebook de 17 pulgadas, espalda y tiras con tela mesh. 43 x 29 x 14 cm.", category: "Mochilas", supplierId: "s-demo-2", cost: 21900, featured: true, swatch: "#B22B3A", images: f("mochila-head-roja", "mochila-head-negra"), variants: grid(U, ["Rojo", "Negro"], [4, 8]) },
  { code: "CT-1102", name: "Bandolera con bolsillos laterales", description: "Ecocuero con pouch desmontable, bolsillo interno y correa regulable. 15 x 18 x 10 cm.", category: "Carteras", supplierId: "s-demo-1", cost: 9800, featured: true, swatch: "#8C3B32", images: f("bandolera-bordo", "bandolera-suela"), variants: grid(U, ["Bordó", "Suela"], [12, 9]) },
  { code: "BT-4040", name: "Billetera Trendy con parche", description: "Ecocuero texturado con parche bordado y organizador interno. 9 x 14 x 3 cm.", category: "Billeteras", supplierId: "s-demo-1", cost: 6900, featured: true, swatch: "#E8B9C3", images: f("billetera-parche-rosa", "billetera-parche-crema", "billetera-parche-negra"), variants: grid(U, ["Rosa", "Crema", "Negro"], [3, 3, 6]) },
  { code: "VJ-8001", name: "Valija rígida con ruedas 360°", description: "Súper liviana, extensible, ruedas dobles, candado con combinación y manija retráctil.", category: "Viaje", supplierId: "s-demo-2", cost: 48500, featured: true, swatch: "#BFE6D8", images: f("valijas-menta"), variants: grid(VALIJA, ["Verde menta"], [3, 4, 2]) },
  { code: "MT-5020", name: "Mate de acero Discovery", description: "Interior de acero 304 de doble capa, borde de acero. Viene en caja.", category: "Materos", supplierId: "s-demo-2", cost: 9800, featured: false, swatch: "#2B2A2C", images: f("mate-discovery-negro"), variants: grid(["160 ml"], ["Negro"], [14]) },
  { code: "MT-5010", name: "Bolso matero matelaseado", description: "Entra termo de 1 L, bolsillo frontal con cierre, manijas y correa larga.", category: "Materos", supplierId: "s-demo-3", cost: 15400, featured: false, swatch: "#C9CACC", images: f("bolso-matero-gris"), variants: grid(U, ["Gris"], [6]) },
  { code: "BT-4030", name: "Billetera Trendy con cierre", description: "Ecocuero con logo en relieve, tarjeteros y monedero. 9 x 13,5 x 2 cm.", category: "Billeteras", supplierId: "s-demo-1", cost: 5900, featured: false, swatch: "#C2185B", images: f("billetera-trendy-fucsia", "billetera-trendy-suela", "billetera-trendy-negra"), variants: grid(U, ["Fucsia", "Suela", "Negro"], [3, 3, 6]) },
  { code: "BT-4005", name: "Billetera doble cierre", description: "Ecocuero texturado, dos compartimentos con cierre y manija de mano.", category: "Billeteras", supplierId: "s-demo-1", cost: 7400, featured: false, swatch: "#A0522D", images: f("billeteras-doble-cierre"), variants: grid(U, ["Azul marino", "Cobre", "Gris"], [20, 18, 9]) },
  { code: "BT-4020", name: "Billetera porta celular", description: "Bolsillo frontal para el celular, interior con tarjeteros y correa desmontable. 18 x 10 x 4 cm.", category: "Billeteras", supplierId: "s-demo-3", cost: 8600, featured: false, swatch: "#B07A45", images: f("portacelular-suela", "portacelular-rojo", "portacelular-negro"), variants: grid(U, ["Suela", "Rojo", "Negro"], [12, 6, 16]) },
  { code: "MC-3001", name: "Mochila maternal con cambiador", description: "Frente matelaseado, bolsillos laterales y cambiador plegable incluido.", category: "Mochilas", supplierId: "s-demo-2", cost: 18500, featured: false, swatch: "#2E3D63", images: f("mochila-maternal-azul"), variants: grid(U, ["Azul"], [6]) },
  { code: "MC-3020", name: "Mochila antirrobo con puerto USB", description: "Cierre oculto en la espalda, compartimento acolchado para notebook y salida USB.", category: "Mochilas", supplierId: "s-demo-2", cost: 24600, featured: false, swatch: "#8D9399", images: f("mochila-antirrobo-gris"), variants: grid(U, ["Gris"], [5]) },
  { code: "MC-3060", name: "Mochila escolar Game Start", description: "Diseño gamer con bolsillo frontal, laterales de red y llavero.", category: "Mochilas", supplierId: "s-demo-3", cost: 19800, featured: false, swatch: "#3A5DA8", images: f("mochila-gamer"), variants: grid(U, ["Azul", "Gris", "Negro"], [4, 4, 4]) },
  { code: "MC-3070", name: "Mochila Wilson", description: "Bolsillo frontal con cierre, laterales de red y espalda acolchada.", category: "Mochilas", supplierId: "s-demo-3", cost: 20500, featured: false, swatch: "#E8838A", images: f("mochila-wilson"), variants: grid(U, ["Negro y coral", "Rosa", "Verde"], [4, 4, 4]) },
  { code: "TM-6020", name: "Termo Discovery con vaso", description: "Interior de acero 304 de doble capa, tapa interna de silicona y vaso. Viene en caja.", category: "Térmicos", supplierId: "s-demo-2", cost: 24900, featured: false, swatch: "#2B2A2C", images: f("termo-discovery-negro"), variants: grid(["1 L"], ["Negro"], [7]) },
  { code: "TM-6001", name: "Vaso térmico con manija", description: "Doble pared de acero, tapa con sorbete. 6 horas caliente, 8 horas frío.", category: "Térmicos", supplierId: "s-demo-2", cost: 15900, featured: false, swatch: "#4FA79A", images: f("vaso-termico-turquesa"), variants: grid(["1,2 L"], ["Verde agua"], [8]) },
  { code: "TM-6014", name: "Vaso térmico con tapa", description: "Interior de acero 304 de doble capa, tapa transparente. Viene en caja.", category: "Térmicos", supplierId: "s-demo-2", cost: 6900, featured: false, swatch: "#B79AD9", images: f("vaso-280-lila", "vaso-280-rosa", "vaso-280-verde-agua"), variants: grid(["280 ml"], ["Lila", "Rosa", "Verde agua"], [12, 12, 8]) },
  { code: "BO-7020", name: "Botella térmica Trendy", description: "Interior de acero 304 de doble capa, tapa interna de silicona. Viene en caja.", category: "Botellas", supplierId: "s-demo-1", cost: 8400, featured: false, swatch: "#2B2A2C", images: f("botella-trendy-negra", "botella-trendy-verde", "botella-trendy-lila"), variants: grid(["500 ml"], ["Negro", "Verde agua", "Lila"], [6, 3, 3]) },
  { code: "BO-7002", name: "Botella térmica estampada", description: "Interior de acero 304 de doble capa, tapa con silicona. Viene en caja.", category: "Botellas", supplierId: "s-demo-1", cost: 8900, featured: false, swatch: "#D9578A", images: f("botella-estampada-fucsia"), variants: grid(["500 ml", "750 ml"], ["Fucsia"], [12, 8]) },
  { code: "VJ-8030", name: "Set de 3 valijas blandas Unicross", description: "Grande, mediana y chica. Ruedas 360°, bolsillos frontales y manija telescópica.", category: "Viaje", supplierId: "s-demo-2", cost: 98000, featured: false, swatch: "#5B6E8C", images: f("valijas-unicross-azul"), variants: grid(U, ["Azul"], [2]) },
  { code: "BL-2201", name: "Bolso tote impermeable", description: "Material transparente con necessaire interno de 16,5 x 24 x 7 cm.", category: "Bolsos", supplierId: "s-demo-1", cost: 14600, featured: false, swatch: "#2B2A2C", images: f("tote-transparente-negro"), variants: grid(U, ["Negro"], [10]) },
  /* Recién llegados (los últimos) */
  { code: "VJ-8040", name: "Almohada de viaje Discovery", description: "Viscoelástica con funda de terciopelo y broche. 27 x 27 x 10 cm.", category: "Viaje", supplierId: "s-demo-3", cost: 7900, featured: false, swatch: "#D99A9A", images: f("almohada-viaje-rosa", "almohada-viaje-marron", "almohada-viaje-verde"), variants: grid(U, ["Rosa", "Marrón", "Verde"], [6, 3, 3]) },
  { code: "MC-3050", name: "Mochila Trendy con bolsillos frontales", description: "Nylon con tapa y cordón, bolsillos frontales y llavero desmontable. 33 x 30 x 15 cm, 13”.", category: "Mochilas", supplierId: "s-demo-1", cost: 17900, featured: false, swatch: "#5E6B4F", images: f("mochila-trendy-verde", "mochila-trendy-negra"), variants: grid(U, ["Verde oliva", "Negro"], [4, 8]) },
  { code: "BL-2240", name: "Set Chimola: mochila, bandolera y billetera", description: "Nylon con cinta logo y mosquetones. Se venden juntos o por separado.", category: "Bolsos", supplierId: "s-demo-3", cost: 32500, featured: false, swatch: "#2747C9", images: f("set-chimola-azul"), variants: grid(U, ["Azul francia"], [3]) },
  { code: "CT-1140", name: "Cartera y bandolera Basilea", description: "Ecocuero negro con vivos en suela y tiradores trenzados.", category: "Carteras", supplierId: "s-demo-1", cost: 22800, featured: false, swatch: "#2B2A2C", images: f("cartera-basilea-negra"), variants: grid(U, ["Negro con suela"], [3]) },
  { code: "MC-3030", name: "Mochila de ecocuero con manija", description: "Ecocuero texturado, cierre lateral, manija de mano y tiras regulables.", category: "Mochilas", supplierId: "s-demo-1", cost: 19400, featured: false, swatch: "#2B2A2C", images: f("mochila-ecocuero-negra"), variants: grid(U, ["Negro"], [7]) },
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
  const p1 = products.find((p) => p.code === "CT-1130") ?? products[0];
  const p2 = products.find((p) => p.code === "MC-3040") ?? products[1];
  return [
    {
      id: "o-demo-1",
      number: 1,
      createdAt: t0 + 86400_000 * 9,
      clientId: "c-demo-1",
      customer: { name: "Clienta de ejemplo", phone: "", business: "Local de ejemplo", city: "" },
      items: [
        { productId: p1.id, variantId: p1.variants[1].id, code: p1.code, name: p1.name, size: p1.variants[1].size, color: p1.variants[1].color, qty: 4, unitPrice: 30300 },
        { productId: p2.id, variantId: p2.variants[1].id, code: p2.code, name: p2.name, size: p2.variants[1].size, color: p2.variants[1].color, qty: 3, unitPrice: 39500 },
      ],
      notes: "Pedido de ejemplo",
      status: "nuevo",
      remitoId: null,
      demo: true,
    },
  ];
}
