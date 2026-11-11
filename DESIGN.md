# DESIGN.md: almaymoda

> Direction written by the developer (there was no brand guide from the client). Review it with almaymoda and adjust it to their real identity.

**Design read:** a wholesale fashion store for resellers who buy from their phones, plus an operations panel for the owners. The visual language is a fashion magazine applied to a work tool.

**Dials:**
- Store: ENERGY 2 / RHYTHM 2 / MOTION 2
- Panel: ENERGY 1 / RHYTHM 1 / MOTION 1

## Color (2 core + 1 accent)
- **Ink** `#221B26` (deep eggplant): text and primary buttons. A tinted black reads as fashion, not as tech.
- **Canvas** `#FBF9F8` with **Mauve** `#F1E9EE` surfaces: a very light pinkish neutral, so it isn't the usual cream.
- **Raspberry** `#B8326A`: the only accent. Used for the main action, the featured price and the "Load item" button. Nowhere else.
- Semantic colors (ok / warning / danger) and WhatsApp green are separate from the accent.
- Dark mode with a toggle, tested in both themes.

## Type
- **Bodoni Moda** (display): the Bodoni is *the* typeface of fashion magazines, and its name says "moda". Used only for headings and large numbers.
- **Figtree** (body): open and legible at small sizes on phones, with tabular numerals for prices and stock.

## Identity motif
- **The hang tag**: prices, delivery note numbers and the supplier coefficient appear as a clothing tag (a notched shape with a hole). It repeats throughout the store and the panel.

## Layout
- Store: an asymmetric hero (headline + a staggered collage of featured items), categories as a line of big serif type, a product grid, and a real "how to order" sequence.
- Panel: the home screen is built around the day's decision (orders to handle, what to restock), not around generic stat cards. On phones there's a bottom nav with a central "+" button for the most frequent action: loading an item.

## Icons
- Phosphor (regular/fill): each icon represents its section (T-shirt = items, box = stock, receipt = delivery notes, truck = suppliers).

## Motion
- Only one load-in moment in the store hero (a collage stagger) and transitions that respond to actions. `prefers-reduced-motion` is respected.
