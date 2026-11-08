# Nekodojo

Web del estudio Nekodojo: presenta sus apps, cada una con su landing, enlaces de descarga, soporte y documentos legales, en español e inglés.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · listo para Vercel · contenido en archivos, sin CMS.

## Ejecutar en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # comprobación de tipos
npm run lint
npm run build      # compilación de producción
```

Opcional: copia `.env.example` a `.env.local`. Sin variables, el sitio funciona y los formularios quedan en modo demostración.

## Publicar en Vercel

1. Sube el repositorio a GitHub.
2. En Vercel: **Add New → Project**, importa el repositorio. Vercel detecta Next.js; no hay que cambiar nada del build.
3. En **Settings → Environment Variables** añade `NEXT_PUBLIC_SITE_URL=https://nekodojo.com` (Production).
4. Cuando compres el dominio: **Settings → Domains → Add `nekodojo.com`** y sigue las instrucciones de DNS.

Indexación: `robots.txt` solo permite indexar cuando `VERCEL_ENV=production`. Las vistas previas y los builds locales quedan fuera de los buscadores.

## Rutas

Las rutas están siempre en inglés. El español (idioma principal) no lleva prefijo; el inglés usa `/en`:

```
/                        /en
/apps                    /en/apps
/studio                  /en/studio
/support                 /en/support
/legal                   /en/legal
/apps/[app]              /en/apps/[app]        (animequote, mtcquiz, anki-dojo, goals)
/apps/[app]/privacy      /en/apps/[app]/privacy
/apps/[app]/terms        /en/apps/[app]/terms
/apps/[app]/support      /en/apps/[app]/support
```

- Internamente el español vive en `src/app/[locale]` con `locale = es`; `src/proxy.ts` lo sirve sin prefijo. Una URL con `/es/...` redirige a la versión sin prefijo.
- Primera visita: si el navegador prefiere inglés, se redirige a `/en/...`. La elección queda en la cookie `locale`, así que quien cambia a español con el selector se queda en español.
- El selector de idioma muestra la bandera del idioma al que cambias (🇪🇸 / 🇺🇸) y conserva la página.
- Instrucciones de borrado de datos con URL estable para las tiendas: `/apps/[app]/support#delete-data`.
- El modo oscuro de AnimeQuote se guarda en la cookie `aq-theme`; el servidor lo aplica desde el primer pintado.

## Estructura

```
src/
  app/[locale]/
    (studio)/        páginas del estudio (inicio, apps, estudio, soporte, legal)
    (apps)/apps/     una carpeta por app: layout (identidad), landing, legal, soporte
    not-found.tsx    404 localizada
  apps/<slug>/       contenido y componentes propios de cada landing
  components/
    studio/          cabecera, pie y tarjetas del estudio
    app/             piezas compartidas por las apps (barra, legal, soporte, tiendas)
    forms/           lista de espera y contacto
    shared/          logo, selector de idioma, FAQ, estado
  content/
    apps.ts          registro de apps: estado, enlaces, FAQ de soporte, legal, novedades
    site.ts          URL, correo, Instagram, lema
    legal/           documentos legales (AnimeQuote vigente, borradores del resto)
  i18n/              rutas por idioma y traducciones de la interfaz
  lib/forms/         validación, acciones del servidor y proveedor de formularios
  app/globals.css    temas: un bloque de variables por identidad
```

### Cómo se aíslan las identidades

Cada página vive dentro de un contenedor de tema (`.theme-studio`, `.theme-animequote`, `.theme-mtcquiz`, …). Ese contenedor define sus colores y fuentes como variables (`--app-*`), y las utilidades (`bg-canvas`, `text-ink`, `font-display`…) las leen. El estudio no impone nada a las apps: cada una tiene su bloque en `globals.css`, sus fuentes en su propio `layout.tsx` y su composición en `src/apps/<slug>/`. Para añadir una app nueva, copia la carpeta de una existente y añade su bloque de tema.

## Dónde reemplazar el contenido provisional

| Qué | Dónde |
| --- | --- |
| Estado, enlaces de tienda, resumen, FAQ de soporte, pasos de borrado de datos | `src/content/apps.ts` |
| Icono de una app (ahora es una letra) | `icon` en `src/content/apps.ts` → `{ src: "/apps/<slug>/icon.png" }` |
| Textos de la landing de MTCQuiz, Anki Dojo y Goals | `src/apps/<slug>/content.ts` |
| Mockups conceptuales | En la página de cada app; cámbialos por capturas reales en `public/apps/<slug>/` |
| Documentos legales | `src/content/legal/` — al tener el texto real, pasa la app a `legal: { mode: "live", … }` |
| Novedades del inicio | `news` en `src/content/apps.ts` |
| Logo de Nekodojo (provisional) | `src/components/shared/CatMark.tsx` y `src/app/icon.svg` |
| Correo, Instagram, URL | `src/content/site.ts` |
| Textos del estudio y de la interfaz | `src/i18n/dictionaries/es.ts` y `en.ts` |

Lo provisional está marcado en pantalla ("Contenido provisional", "Mockup conceptual", "Funciones previstas", "Enlace pendiente", "Borrador no vigente") y en el código con `[Pendiente]` / `[Pending]`. Busca esas cadenas para encontrar todo.

## Integraciones pendientes

- **Formularios**: hoy son demostraciones (no envían ni guardan nada, y lo dicen). Para conectarlos, define `FORMS_PROVIDER=webhook` y `FORMS_WEBHOOK_URL` en Vercel (sirve Zapier, Make, Google Apps Script, una función de Supabase…), o añade otro proveedor en `src/lib/forms/provider.ts`. La validación ya corre en el navegador y en el servidor.
- **Enlaces de tienda de MTCQuiz** y su política de privacidad real.
- **Dominio** `nekodojo.com` en Vercel y `NEXT_PUBLIC_SITE_URL`.
- **Analítica**: no hay ninguna. Si se añade, preferir una sin cookies (Vercel Analytics) para evitar el banner de consentimiento.
- **Insignias oficiales** de Google Play / App Store para MTCQuiz, Anki Dojo y Goals (AnimeQuote ya usa las suyas).
- **Logo definitivo** de Nekodojo.

## Puntos a revisar

- **Política de AnimeQuote**: el texto vigente habla de anuncios de AdMob, de "Frases Anime" y solo de Android, mientras la landing dice "sin anuncios intrusivos" y está en iOS. Se copió tal cual; conviene revisarlo en animequote.app.
- **SEO de AnimeQuote**: la landing y los documentos en español apuntan con `canonical` a animequote.app para no competir con ella. Ver `docs/animequote-migration.md`.
- **Borradores legales** de MTCQuiz, Anki Dojo y Goals: marcados como no vigentes, con `noindex` y fuera del sitemap.
- **Nombres**: "MTC" (sigla del ministerio) y "Anki" (marca de Ankitects). MTCQuiz muestra un aviso de no afiliación; Anki Dojo figura como nombre provisional.
- **Rendimiento**: las páginas se renderizan en el servidor en cada visita (la 404 localizada lee una cabecera). Funciona bien en Vercel; si se quiere todo estático, es el primer punto a revisar.
