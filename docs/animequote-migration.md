# AnimeQuote: de animequote.app a Nekodojo

## Estado (2026-11-25)

- El dominio `animequote.app` se discontinúa. La landing y los documentos legales de AnimeQuote viven solo en Nekodojo:
  - `https://nekodojo.app/apps/animequote` (y `/en/apps/animequote`)
  - `https://nekodojo.app/apps/animequote/privacy`
  - `https://nekodojo.app/apps/animequote/terms`
- Nekodojo ya no apunta `canonical` ni enlaza a animequote.app. El correo de los documentos es el de `CONTACT_EMAIL` (`src/content/site.ts`).
- El panel de administración está en `/apps/animequote/admin` (ver `docs/animequote-admin/README.md`).

## Pendiente (fuera de este repo)

1. **Fichas de las tiendas**: cambiar la URL de la política de privacidad en Google Play Console y App Store Connect a `https://nekodojo.app/apps/animequote/privacy`. Si la ficha apunta a un dominio que deja de responder, la tienda puede rechazar actualizaciones o retirar la app.
2. **La app**: si abre `animequote.app/privacy-policy` o `/terms-and-conditions`, cambiar esos enlaces en la próxima versión.
3. **Mientras el dominio siga activo**: redirigir con 301 `animequote.app/*` a `nekodojo.app/apps/animequote` (y `/privacy-policy`, `/terms-and-conditions` a `/privacy` y `/terms`), para no perder visitas ni posicionamiento.
