export type ID = string;

export interface Variant {
  id: ID;
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: ID;
  code: string;
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
  images: string[];
  variants: Variant[];
  active: boolean;
  featured: boolean;
  /** Color de la silueta cuando no hay foto (sólo datos de ejemplo). */
  swatch?: string;
  demo?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Supplier {
  id: ID;
  name: string;
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
  createdAt: number;
  demo?: boolean;
}

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
