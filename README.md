# almaymoda

A wholesale store plus an owners' panel for [almaymoda](https://www.instagram.com/mayorista_almaymoda/).

## What it does

**Store (customers)** `/`
- Catalog with search, categories, size filter and live stock.
- Product page where the customer picks quantities **per size and color**.
- Order with a running total, minimum purchase, and sending via **WhatsApp** (the order is also saved in the panel).
- "My account": signs in with a phone number and shows order history.

**Owners' panel** `/admin` (demo PIN: `1234`, change it in Settings)
- **Today**: unhandled web orders, items to restock, quick actions.
- **Items**: load from your phone with a photo; **the AI removes the background** and centers the garment (runs in the browser, so photos are never uploaded anywhere). Size × color grid with stock.
- **Prices**: cost × coefficient. Coefficient per item → per supplier → global, with rounding. Bulk changes (e.g. +12% from one supplier) with a preview before applying.
- **Import list**: Excel, CSV, PDF with text, or the **Access database (.mdb/.accdb) from Jaque**. Detects the columns, reads Argentine-format numbers (`$ 12.345,67`) and shows new items, cost changes in % and stock to add before applying anything.
- **Stock intake**: search by code, type quantities per size (add or correct by count). Movement log.
- **Delivery notes (remitos)**: built from a web order or from scratch. Numbered PDF that you **send by WhatsApp or email** (on a phone it opens the share sheet with the PDF attached). Deducts stock, and voiding returns it.
- Customers, suppliers, settings, backup export/import.

## Stage 1 (this version)

Data is stored **on each device** (IndexedDB). This is enough to try the whole system and show it. Use the backup feature in Settings to move data between devices.

Stage 2: a shared cloud database (Supabase/Postgres) and real user accounts. The data layer is in `src/lib/store.ts`, so that's what gets swapped out.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Stack: Next.js 16 (App Router), React 19, Tailwind 4, Zustand, SheetJS, pdf.js, mdb-reader, jsPDF, @imgly/background-removal.

## Deploy

Import the repo on [vercel.com/new](https://vercel.com/new). It needs no environment variables.
