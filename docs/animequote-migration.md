# AnimeQuote: posible migración futura

Estado actual (no cambiar en esta fase):

- `animequote.app` sigue siendo el sitio principal de AnimeQuote, con su propio proyecto (`/Volumes/Neko/webs/quote-anime`).
- Nekodojo tiene una copia completa de la landing en `/apps/animequote` y `/en/apps/animequote`.
- La versión en español de Nekodojo declara `canonical` hacia `animequote.app` (y hacia sus documentos legales) para que Google no las trate como duplicadas.
- Las tiendas apuntan a `https://animequote.app/privacy-policy` y `https://animequote.app/terms-and-conditions`. **Esas URLs no deben romperse nunca.**

## Si algún día se migra a Nekodojo

1. Verificar que `nekodojo.com` esté en producción y que `/apps/animequote` muestre el mismo contenido.
2. En el proyecto `quote-anime` (o en Vercel, en el dominio `animequote.app`), crear redirecciones **301**:

   | Desde | Hacia |
   | --- | --- |
   | `animequote.app/` | `nekodojo.com/apps/animequote` |
   | `animequote.app/privacy-policy` | `nekodojo.com/apps/animequote/privacy` |
   | `animequote.app/terms-and-conditions` | `nekodojo.com/apps/animequote/terms` |
   | `animequote.app/*` (resto) | `nekodojo.com/apps/animequote` |

   Mantener el dominio `animequote.app` registrado y apuntando a Vercel indefinidamente, solo para servir las redirecciones.
3. En Nekodojo, quitar los `canonical` hacia animequote.app:
   - `src/app/[locale]/(apps)/apps/animequote/page.tsx` (`canonical: …`)
   - `src/components/app/LegalPage.tsx` (`canonical` cuando `legal.mode === "live"`)
   - Cambiar `publishedAt` en `src/content/apps.ts` a las nuevas URLs.
4. Actualizar las fichas de Google Play y App Store con las nuevas URLs de privacidad (opcional: las redirecciones ya las cubren).
5. Decidir qué pasa con el panel `/admin` de `quote-anime` (Firebase): no se migra a Nekodojo; puede seguir en un subdominio, por ejemplo `admin.animequote.app`.
6. Avisar a Google Search Console del cambio de dirección.

Alternativa sin migrar: mantener ambos sitios y que Nekodojo enlace a animequote.app. En ese caso, actualizar la copia de Nekodojo cuando cambie el texto de la landing o de los documentos legales (`src/apps/animequote/content.ts` y `src/content/legal/animequote.ts`).
