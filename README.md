# almaymoda

Tienda mayorista y panel de dueños para [almaymoda](https://www.instagram.com/mayorista_almaymoda/).

## Qué hace

**Tienda (clientas)** `/`
- Catálogo con búsqueda, categorías, filtro por talle y stock en vivo.
- Ficha de producto donde la clienta elige cantidades **por talle y color**.
- Pedido con total, compra mínima y envío por **WhatsApp** (el pedido también queda guardado en el panel).
- "Mi cuenta": ingresa con su teléfono y ve el historial de pedidos.

**Panel de dueños** `/admin` (PIN de prueba: `1234`, se cambia en Ajustes)
- **Hoy**: pedidos web sin atender, artículos para reponer y accesos rápidos.
- **Artículos**: carga desde el celular con foto; **la IA quita el fondo** y centra la prenda (corre en el navegador, las fotos no se suben a ningún lado). Grilla de talles × colores con stock.
- **Precios**: costo × coeficiente. Coeficiente por artículo → por proveedor → general, con redondeo. Cambios en bloque (ej: +12% de un proveedor) con vista previa antes de aplicar.
- **Importar lista**: Excel, CSV, PDF con texto o la **base de Access (.mdb/.accdb) de Jaque**. Detecta las columnas, lee números en formato argentino (`$ 12.345,67`) y muestra artículos nuevos, cambios de costo en % y stock a sumar antes de aplicar nada.
- **Ingreso de stock**: buscar por código y tipear cantidades por talle (sumar o corregir por conteo). Historial de movimientos.
- **Remitos**: desde un pedido web o desde cero. PDF numerado que se **manda por WhatsApp o mail** (en el celular abre la hoja de compartir con el PDF adjunto). Descuenta stock y, si se anula, lo devuelve.
- Clientes, proveedores, ajustes, respaldo (exportar/importar).

## Etapa 1 (esta versión)

Los datos se guardan **en cada dispositivo** (IndexedDB). Alcanza para probar todo el sistema y mostrarlo. Para pasar datos entre dispositivos se usa el respaldo en Ajustes.

Etapa 2: base de datos compartida en la nube (Supabase/Postgres) y cuentas de usuario reales. La capa de datos está en `src/lib/store.ts`, que es lo que se reemplaza.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Stack: Next.js 16 (App Router), React 19, Tailwind 4, Zustand, SheetJS, pdf.js, mdb-reader, jsPDF, @imgly/background-removal.

## Publicar

**GitHub Pages (actual):** https://paziti.github.io/almaymoda/

Cada push a `main` construye el sitio estático y lo publica solo (`.github/workflows/pages.yml`). Para probar la exportación localmente: `GITHUB_PAGES=true npm run build` (genera la carpeta `out/`).

Como Pages sólo sirve archivos estáticos, las fichas usan `?id=` (`/producto/?id=...`, `/admin/productos/editar/?id=...`, `/admin/remitos/ver/?id=...`).

**Vercel (alternativa):** importar el repo en [vercel.com/new](https://vercel.com/new). No necesita variables de entorno.
