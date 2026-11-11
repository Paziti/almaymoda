# DESIGN.md: almaymoda

> Dirección escrita por el desarrollador (el cliente no tenía guía de marca). Revisarla con almaymoda y ajustarla a su identidad real.

**Lectura de diseño:** tienda mayorista de moda para revendedoras que compran desde el celular, más un panel de operación para los dueños. El lenguaje visual es el de una revista de moda aplicado a una herramienta de trabajo.

**Diales:**
- Tienda: ENERGY 2 / RHYTHM 2 / MOTION 2
- Panel: ENERGY 1 / RHYTHM 1 / MOTION 1

## Color (2 base + 1 acento)
- **Tinta** `#221B26` (berenjena oscuro): texto y botones principales. Un negro teñido se lee como moda, no como tecnología.
- **Lienzo** `#FBF9F8` con superficies **Malva** `#F1E9EE`: un neutro rosado muy claro, para no caer en el crema de siempre.
- **Frambuesa** `#B8326A`: el único acento. Se usa en la acción principal, el precio destacado y el botón "Cargar artículo". En ningún otro lado.
- Los colores semánticos (ok / alerta / peligro) y el verde de WhatsApp van aparte del acento.
- Modo oscuro con selector, probado en los dos temas.

## Tipografía
- **Bodoni Moda** (títulos): la Bodoni es *la* tipografía de las revistas de moda, y su nombre dice "moda". Sólo para títulos y números grandes.
- **Figtree** (texto): abierta y legible en tamaños chicos en el celular, con números tabulares para precios y stock.

## Motivo de identidad
- **La etiqueta colgante**: precios, números de remito y el coeficiente del proveedor aparecen como una etiqueta de ropa (forma con muesca y agujerito). Se repite en la tienda y en el panel.

## Diagramación
- Tienda: portada asimétrica (titular + collage escalonado de destacados), categorías como una línea de tipografía serif grande, grilla de productos y una secuencia real de "cómo hacer un pedido".
- Panel: la pantalla de inicio se arma alrededor de la decisión del día (pedidos para atender, qué reponer), no de tarjetas de estadísticas genéricas. En el celular hay una barra inferior con un botón "+" central para la acción más frecuente: cargar un artículo.

## Íconos
- Phosphor (regular/relleno): cada ícono representa su sección (remera = artículos, caja = stock, recibo = remitos, camión = proveedores).

## Movimiento
- Un solo momento de entrada en la portada de la tienda (collage escalonado) y transiciones que responden a acciones. Se respeta `prefers-reduced-motion`.
