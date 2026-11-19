export type ID = string;

export interface Variant {
  id: ID;
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: ID;
  /** Código corto con el que trabajan (el de la lista del proveedor). */
  code: string;
  /** Código de barras que lee la pistola. Opcional: hay artículos que no tienen. Sólo dígitos. */
  barcode?: string;
  name: string;
  description: string;
  category: string;
  supplierId: ID | null;
  /** Costo del proveedor (sin coeficiente). */
  cost: number;
  /** Coeficiente propio del artículo. null = usa el del proveedor o el general. */
  coefficient: number | null;
  /** Precio fijo que ignora el cálculo costo x coeficiente. */
  priceOverride: number | null;
  /** Precio minorista fijo. null o ausente = mayorista + recargo minorista de Ajustes. */
  retailPrice?: number | null;
  images: string[];
  variants: Variant[];
  active: boolean;
  featured: boolean;
  /** En oferta en la tienda. Se puede apagar sin perder el porcentaje cargado. */
  onSale?: boolean;
  /** Descuento de la oferta, en % sobre el precio mayorista (1 a 90). */
  salePercent?: number;
  /** Sólo en la tienda con Supabase: precios ya calculados por la base (la tienda no recibe el costo). */
  shopPrices?: { price: number; regular?: number };
  /** Color de la silueta cuando no hay foto (sólo datos de ejemplo). */
  swatch?: string;
  demo?: boolean;
  createdAt: number;
  updatedAt: number;
}

/** Condición frente al IVA. */
export type TaxCategory = "" | "Responsable Inscripto" | "Monotributista" | "Exento" | "Consumidor Final";

export type DocType = "CUIT" | "DNI";

export interface Supplier {
  id: ID;
  name: string;
  /** Datos fiscales. Opcionales porque los proveedores guardados antes no los tienen. */
  legalName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  taxCategory?: TaxCategory;
  docType?: DocType;
  /** Sólo dígitos, sin guiones. */
  docNumber?: string;
  contact: string;
  phone: string;
  email: string;
  coefficient: number | null;
  notes: string;
  demo?: boolean;
}

export interface Client {
  id: ID;
  name: string;
  business: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  cuit: string;
  notes: string;
  /** Compra a precio minorista: sus remitos arrancan con esa lista. */
  retail?: boolean;
  createdAt: number;
  demo?: boolean;
}

/** Mayorista es el precio de siempre; minorista se usa en el local o con clientes particulares. */
export type PriceList = "mayorista" | "minorista";

export interface LineItem {
  productId: ID | null;
  variantId: ID | null;
  code: string;
  name: string;
  size: string;
  color: string;
  qty: number;
  unitPrice: number;
}

export type OrderStatus = "nuevo" | "confirmado" | "remitido" | "cancelado";

export interface Order {
  id: ID;
  number: number;
  createdAt: number;
  clientId: ID | null;
  customer: { name: string; phone: string; business: string; city: string };
  items: LineItem[];
  notes: string;
  status: OrderStatus;
  remitoId: ID | null;
  demo?: boolean;
}

export type RemitoStatus = "emitido" | "entregado" | "anulado";

export interface Remito {
  id: ID;
  number: number;
  createdAt: number;
  clientId: ID | null;
  customer: { name: string; phone: string; email: string; address: string; cuit: string };
  items: LineItem[];
  notes: string;
  discount: number;
  /** Ausente en remitos viejos = mayorista. */
  priceList?: PriceList;
  status: RemitoStatus;
  stockDiscounted: boolean;
  orderId: ID | null;
  demo?: boolean;
}

export interface StockMovement {
  id: ID;
  at: number;
  productId: ID;
  variantId: ID;
  delta: number;
  reason: string;
}

export interface ImportRecord {
  id: ID;
  at: number;
  fileName: string;
  supplierId: ID | null;
  created: number;
  updated: number;
  stockRows: number;
}

export type Rounding = 1 | 10 | 50 | 100 | 500;

export interface Settings {
  storeName: string;
  legalName: string;
  cuit: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  coefficient: number;
  rounding: Rounding;
  /** Porcentaje que se suma al mayorista para el precio minorista. */
  retailMarkup: number;
  minPurchase: number;
  pricesRequireLogin: boolean;
  lowStock: number;
  pointOfSale: string;
  nextRemito: number;
  nextOrder: number;
  remitoFooter: string;
  photoBackground: string;
  pin: string;
  categories: string[];
  sizes: string[];
}
