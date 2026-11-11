# DESIGN.md: Alma y Moda

> Dirección basada en la marca real del cliente: su logo y su cuenta de Instagram (@mayorista_almaymoda). El logo del sitio es una **reconstrucción tipográfica** de la foto de perfil (150 px); cuando el cliente entregue el archivo original, reemplazarlo en `src/components/logo.tsx`.

**Fotos provisorias:** las fotos de `public/demo/` son recortes de publicaciones del Instagram del cliente, sólo para la demo (con su permiso). Van en los artículos de ejemplo; se reemplazan cuando los dueños cargan sus artículos con fotos propias desde el panel.

**Qué venden:** accesorios por mayor en Bahía Blanca: carteras, bolsos, mochilas, billeteras, materos, térmicos, botellas y artículos de viaje. No es ropa: no hay talles, se eligen colores y, en algunos artículos, medidas (500 ml, 750 ml, chico/mediano/grande).

**Lectura de diseño:** tienda mayorista para revendedoras que compran desde el celular, con lenguaje de revista de moda, más un panel de operación para los dueños.

**Diales:**
- Tienda: ENERGY 3 / RHYTHM 3 / MOTION 2
- Panel: ENERGY 1 / RHYTHM 1 / MOTION 1

## Color (sale del logo)
- **Piedra** `#E5DCD2`: el color exacto del círculo del logo. Se usa en el logo y como base de las superficies (`--piedra`, `--lienzo`).
- **Tinta** `#241F1B`: el negro cálido de la firma "Alma y Moda". Texto, botones principales y la franja oscura.
- **Blanco**: el "AM" y "MAYORISTA" del logo; fondo de tarjetas.
- **Suela** `#8A5434`: el único acento. No está en el logo; viene del material de lo que venden (cuero de carteras, bolsos y billeteras). Se usa sólo en la acción principal, el precio destacado y "Agregar al pedido".
- Los colores semánticos (ok / alerta / peligro) y el verde de WhatsApp van aparte del acento.
- Modo oscuro con selector, probado en los dos temas.
- **Franja oscura** (`.banda`): la tinta invertida como fondo, una vez por pantalla ("Recién llegados", resumen del pedido y pie). Es el momento de contraste; no es un color nuevo.

## Tipografía
- **Bodoni Moda** (títulos): es la misma familia de Didone del "AM" del logo, y es la letra de las revistas de moda.
- **Ms Madi** (firma): la más parecida a la letra manuscrita del logo. Sólo para el logo y el masthead del pie, nunca para texto de lectura.
- **Figtree** (texto): legible en tamaños chicos en el celular, con números tabulares para precios y stock.

## Motivo de identidad
- **El logo**: monograma "AM" con la firma cruzada. Aparece en el encabezado, el ícono de la pestaña y en el pie.
- **La etiqueta colgante**: precios, números de remito y el coeficiente del proveedor aparecen como una etiqueta de producto (forma con muesca y agujerito).

## Diagramación
- Tienda: tapa de revista (titular Bodoni enorme, collage superpuesto de destacados y "líneas de tapa" con datos reales del catálogo), categorías como índice de revista con los colores reales de los artículos, "Recién llegados" en la franja oscura, la secuencia real de "cómo hacer un pedido" con numerales en contorno y un pie con enlaces reales.
- Ficha de producto: si el artículo tiene una sola medida (casi todos), se eligen cantidades por color; si tiene varias, por medida dentro de cada color.
- Las siluetas de artículos sin foto muestran el tipo de accesorio (cartera, bolso, mochila, billetera, matero, térmico, botella, valija, necessaire) con su color real; el fondo toma ese color muy diluido.
- Pie: marca con una línea de qué hacen, enlaces reales agrupados (categorías con artículos, tu compra, contacto) y una barra con copyright, panel de dueños y tema. Sin columnas de relleno.
- Fotos y tarjetas con radio mínimo (4px); botones y campos conservan un radio más suave para leerse como controles.
- Panel (referencia: paneles de Shopify, Stripe y Linear): barra lateral compacta con logo, buscador general (Ctrl/⌘ + K: secciones, artículos, clientes y pedidos), "Cargar artículo" como única acción con acento y navegación agrupada. El inicio saluda con la fecha, muestra cuatro indicadores reales (pedidos sin atender, remitos del mes, artículos publicados, stock a precio de venta) y debajo lo que hay que atender: pedidos, últimos remitos, qué reponer y atajos. En el celular hay una barra inferior con un botón "+" central para cargar un artículo.
- **Acceso oculto:** la tienda no tiene ningún enlace al panel. Se entra escribiendo la dirección `/admin` (marcarla como favorita en los dispositivos de los dueños); el panel no se indexa en buscadores. El ingreso con PIN es una pantalla propia: marca a un lado, formulario al otro.

## Íconos
- Phosphor (regular/relleno): cada ícono representa su sección.

## Movimiento
- Un solo momento de entrada en la tapa de la tienda (el titular sube y el collage aparece escalonado) y transiciones que responden a acciones. Los botones responden al toque con opacidad, sin mover el layout. Se respeta `prefers-reduced-motion`.
