# Panel admin de AnimeQuote

Migrado desde `quote-anime` (`/admin`). Vive en `/apps/animequote/admin` (y `/en/apps/animequote/admin`, que muestra el mismo panel en español: es una herramienta interna).

- Código: `src/apps/animequote/admin/` (componentes, hooks, servicios de Firebase, tipos). La ruta solo monta `AdminApp`.
- Oculto: sin enlaces desde la web, `noindex`, `disallow` en `robots.ts`, sin aviso de cookies ni GA (`Consent` se omite en rutas `/admin`).
- Datos: Firebase Realtime Database del proyecto `quoteanime-76a76`, nodos `quotes` e `imagenes` (los mismos que lee la app móvil).

## 1. Variables de entorno

Las mismas que el proyecto `quote-anime-web` en Vercel (ver `.env.example`): `NEXT_PUBLIC_FIREBASE_*` y `NEXT_PUBLIC_ADMIN_ALLOWED_EMAILS`. Añádelas también en el proyecto de Vercel de Nekodojo (Production y Preview). Son valores públicos del SDK web, no secretos.

## 2. Login

Google vía Firebase Auth (`signInWithPopup`). Cualquier cuenta fuera de `NEXT_PUBLIC_ADMIN_ALLOWED_EMAILS` se cierra al instante con un mensaje. Ese filtro es solo de UI.

Firebase Console → **Authentication → Settings → Authorized domains**: añade `nekodojo.app` (y `localhost` si no está). Sin eso el popup de Google falla con `auth/unauthorized-domain`.

## 3. Seguridad real: reglas de la base

[`firebase-rtdb-rules.json`](./firebase-rtdb-rules.json): lectura pública (la app móvil lee sin sesión) y escritura solo para una sesión con el email verificado autorizado. Si autorizas otra cuenta, cambia la variable **y** la regla.

## 4. Esquema de una frase (`quotes/{id}`) — contrato con la app móvil

| Campo | Tipo | Notas |
| --- | --- | --- |
| `anime`, `author`, `quote` | string | Requeridos. `quote` en español, texto plano. |
| `quoteEn` | string (opcional) | Traducción al inglés; si falta, la app usa `quote`. |
| `size` | `xs` \| `short` \| `medium` \| `long` (opcional) | `xs` = cabe en el widget del home (máx. 60 caracteres por idioma, `HOME_WIDGET_MAX_CHARS` en `lib/quoteSize.ts`). |
| `categories` | string[] (opcional) | Ver `lib/categories.ts` (1–4). |
| `animeSlug` | string (opcional) | Clave en el nodo `imagenes`. |

Flujos del panel: crear/editar/borrar frases, importar JSON (asigna `xs` si cabe y no trae `size`), "Asignar XS" en lote, filtros (anime, categorías, tamaño, traducción, "caben en widget"), y la pestaña Imágenes (añadir/quitar URLs y animes).

## 5. Imports automáticos (Admin SDK)

Los scripts `import-quotes` y `backfill-translations` y la service account **siguen en `quote-anime`** (no se migraron: no son parte del panel y la credencial no debe copiarse a otro repo).
