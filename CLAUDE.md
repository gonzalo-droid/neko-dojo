# CLAUDE.md

Web del estudio Nekodojo (Next.js 16 App Router, TypeScript, Tailwind 4). Ver README.md para estructura y contenido.

## Comandos

```bash
npm run dev / build / lint / typecheck
```

## Reglas del proyecto

- Rutas: siempre en inglés. Español sin prefijo (`/studio`), inglés con `/en` (`/en/studio`). Usa `localizePath(locale, "/ruta")` para enlaces; nunca escribas `/es` a mano.
- Identidades: cada página vive en un contenedor `.theme-<slug>`; colores y fuentes salen de variables `--app-*` (`bg-canvas`, `text-ink`, `text-muted`, `bg-accent`, `font-display`…). No uses colores fijos en componentes compartidos. Cada app carga solo sus fuentes en su `layout.tsx`.
- AnimeQuote es una copia fiel de `/Volumes/Neko/webs/quote-anime`: no cambiar su diseño ni su contenido sin revisar el original. No cambiar su dominio.
- No inventar testimonios, cifras, puntuaciones, afiliaciones, enlaces de descarga ni prácticas de datos. Lo provisional va marcado (`[Pendiente]`, "Mockup conceptual", "Funciones previstas").
- Formularios: nunca mostrar un registro exitoso falso. Sin `FORMS_PROVIDER` quedan en modo demo.
- Todo texto visible existe en español e inglés.
