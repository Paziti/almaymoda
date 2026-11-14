# Cómo trabajamos de a dos

El proyecto está dividido en dos partes con un punto de unión.

| Parte | Quién | Carpetas |
|---|---|---|
| **Frente**: lo que ven las clientas | Diseño / frente | `src/app/(tienda)/` · `src/components/tienda/` |
| **Atrás**: panel, datos, importación, remitos | Agustín | `src/app/admin/` · `src/components/admin/` · `src/lib/` · `.github/` |
| **Compartido**: se toca avisando al otro | Los dos | `src/components/comun/` · `src/app/globals.css` · `src/app/layout.tsx` · `DESIGN.md` · `public/` |

## El punto de unión: `src/lib/tienda.ts`

La tienda pide **todos** sus datos a `@/lib/tienda`. Nada más de `src/lib/` y nada del panel.
Si una página de la tienda importa otra cosa, `npm run lint` da error y explica por qué.

Lo que ofrece hoy:

| Función | Para qué |
|---|---|
| `useCatalogo()` | Artículos publicados |
| `useArticulo(id)` | Un artículo publicado |
| `usePrecio()` | Devuelve `precio(articulo)` con el precio de venta |
| `useVerPrecios()` | `false` si hay que ingresar para ver precios |
| `useLocal()` | Nombre, WhatsApp, Instagram, mail, dirección, categorías, medidas, compra mínima |
| `useCarrito()` | `cart`, `setQty`, `addMany`, `clearCart` |
| `useClienta()` | `clienta`, `pedidos`, `ingresar(tel)`, `registrar(datos)`, `salir()` |
| `useEnviarPedido()` | Registra el pedido y da de alta a la clienta |
| `useListo()` · `useHayEjemplos()` | Datos cargados · hay artículos de ejemplo |
| `fmtMoney`, `fmtDate`, `totalStock`, `variantLabel`, `whatsappUrl`, `normalizeText` | Utilidades de presentación |

**¿Falta un dato?** No lo saques de otro lado: pedilo y se agrega a `tienda.ts`.
Así, cuando la parte de atrás pase a Supabase (etapa 2), la tienda sigue funcionando sin cambios.

## Componentes

- `src/components/tienda/`: piezas solo de la tienda (tarjeta de artículo, encabezado y pie).
- `src/components/comun/`: botones, campos, logo, foto de artículo, modo oscuro. Los usa también el panel: si cambiás cómo se ve un botón, cambia en los dos lados. Avisá antes.
- Colores, tipografías y espaciados: `src/app/globals.css` y `DESIGN.md`.

## Flujo con Git

1. Antes de empezar: `git pull`.
2. El frente trabaja siempre en la rama `frente`. La parte de atrás, en `main` o en ramas propias.
3. Antes de subir: `npm run lint` y `npm run build`.
4. Cuando algo del frente está listo, se abre un pull request de `frente` contra `main`. **Lo que entra a `main` se publica solo** en almaymoda.vercel.app.
5. Si el pull request toca carpetas del otro o las compartidas, GitHub le pide revisión (ver `.github/CODEOWNERS`).

## Para quien hace el frente (primera vez)

1. Instalar [Git](https://git-scm.com), [Node.js](https://nodejs.org) y [Claude Code](https://claude.com/claude-code).
2. Aceptar la invitación al repositorio en GitHub y bajarlo:
   ```bash
   git clone https://github.com/Paziti/almaymoda.git
   cd almaymoda
   git switch frente
   npm install
   ```
3. Activar los límites para Claude (que no toque la parte de atrás ni suba a `main`):
   ```bash
   cp .claude/frente.settings.json .claude/settings.local.json
   ```
4. Abrir Claude en la carpeta (`claude`) y pedirle cambios: "cambiá la tapa", "hacé más grandes las fotos del catálogo"...
5. Para ver los cambios publicados: pedirle a Claude "hacé commit y push a frente". En un minuto aparecen en https://paziti.github.io/almaymoda/ (la vidriera de prueba; las clientas no la usan).

El sitio de las clientas (almaymoda.vercel.app) solo cambia con lo que entra a `main`, y eso lo une Agustín cuando está aprobado.

## Probar en tu compu

```bash
npm install
npm run dev        # tienda en http://localhost:3000, panel en /admin (PIN 1234)
```

Los datos se guardan en el navegador. Para volver a los artículos de ejemplo: panel → Ajustes.
