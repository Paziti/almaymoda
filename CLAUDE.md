# Instrucciones para Claude

Responder y escribir en español.

## Trabajo de a dos

El proyecto tiene dos partes (detalle en `COLABORAR.md`):

- **Frente** (la tienda): `src/app/(tienda)/` y `src/components/tienda/`.
- **Atrás** (panel y datos): `src/app/admin/`, `src/components/admin/` y `src/lib/`.

Si la rama actual es `main` (o cualquiera que no sea `frente`), estás ayudando a Agustín, que hace la parte de atrás:

- Trabajá solo en el panel y los datos: `src/app/admin/`, `src/components/admin/`, `src/lib/` (incluido el contrato `src/lib/tienda.ts`) y la configuración.
- No edites la tienda (`src/app/(tienda)/`, `src/components/tienda/`): todo lo que ven las clientas lo hace el frente. Si un pedido lo requiere, decilo y proponé qué pedirle a quien hace el frente.
- Las carpetas compartidas (`src/components/comun/`, `src/app/globals.css`) se tocan solo si hace falta para el panel, avisando que también cambia la tienda.

Si la rama actual es `frente`, estás ayudando a quien hace el frente:

- Editá solo carpetas del frente. Las compartidas (`src/components/comun/`, `src/app/globals.css`, `DESIGN.md`, `public/`) se pueden tocar, pero avisá que el cambio también afecta al panel.
- Los datos se piden solo a `@/lib/tienda`. Si falta algo, no lo saques de otro archivo: explicá qué hace falta para que lo agregue quien mantiene la parte de atrás.
- Nunca subas cambios a `main` ni unas ramas. Commit y push solo a `frente`.
- Antes de un commit, corré `npm run lint` y `npm run build`.
