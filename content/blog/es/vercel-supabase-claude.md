# Vercel, Supabase y Claude: despliegues automáticos paso a paso

Esta web, la de Nekodojo, se publica sola: cada vez que un cambio llega a la rama `main` de GitHub, Vercel la compila y la pone en línea en un par de minutos. Todo el montaje lo hice con Claude, sin abrir el panel de Vercel. Aquí cuento cómo se conectan las piezas, qué falló la primera vez y cómo puedes configurar lo mismo en tu proyecto.

## Las piezas y qué hace cada una

| Pieza | Para qué sirve |
| --- | --- |
| **GitHub** | Guarda el código. Es la fuente de verdad: lo que está en `main` es lo que se publica. |
| **Vercel** | Compila la web (Next.js) y la sirve. Escucha a GitHub y despliega con cada cambio. |
| **Supabase** | Base de datos Postgres, autenticación, almacenamiento y funciones. Es el backend cuando la web necesita guardar datos. |
| **Claude** | Escribe el código, lo sube a GitHub y, con los conectores, crea y revisa los proyectos en Vercel y Supabase. |

Claude no despliega directamente: sube cambios a GitHub y Vercel reacciona. Así el flujo funciona igual si el cambio lo hace Claude, tú desde tu computadora o un compañero.

## Cómo funcionan los despliegues automáticos

Cuando conectas un repositorio a Vercel pasan dos cosas:

1. Producción: cada push a la rama de producción (`main`) genera un despliegue que pasa a ser la versión pública, por ejemplo `neko-dojo.vercel.app` o tu dominio.
2. Previews: cada push a cualquier otra rama genera una URL de prueba propia. Sirve para revisar un cambio antes de llevarlo a `main`.

Con Claude Code en la nube el flujo queda así:

1. Le pides un cambio a Claude.
2. Claude trabaja en una rama (por ejemplo `claude/...`), la sube y Vercel crea una preview.
3. Revisas la preview. Si te gusta, se fusiona a `main` (con un pull request o directamente).
4. Vercel ve el cambio en `main` y publica en producción.

## Paso a paso: conectar el proyecto a Vercel con Claude

En claude.ai puedes activar el conector de Vercel (Configuración → Conectores). Con él, Claude puede listar tus equipos y proyectos, crear proyectos, leer los registros del build y revisar despliegues.

Lo que hizo Claude en nuestro caso:

1. Buscó el equipo de Vercel de la cuenta y comprobó que no hubiera ya un proyecto para el repo.
2. Creó el proyecto `neko-dojo` enlazado a `gonzalo-droid/neko-dojo`, con `main` como rama de producción. Vercel detectó Next.js solo.
3. Siguió el build consultando el estado del despliegue hasta que terminó.

Si prefieres hacerlo a mano, es lo mismo desde vercel.com: *Add New → Project → Import Git Repository*, eliges el repo y le das a *Deploy*.

## El primer despliegue falló (y qué aprendimos)

El primer build terminó en error. Claude leyó los registros del build con el conector y encontró esto:

```text
Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'
```

El problema estaba en las fuentes de Google cargadas con `next/font/google`: el compilador de Next.js 16 (Turbopack) no lograba resolverlas durante el build. Lo resolvimos sirviendo las fuentes desde el propio proyecto con `next/font/local`, usando los archivos `woff2` de los paquetes `@fontsource` (licencia libre OFL):

```ts
import localFont from "next/font/local";

export const spaceGrotesk = localFont({
  src: [
    { path: "./files/space-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./files/space-grotesk-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});
```

Como la variable CSS se mantiene igual, el resto de la web no cambió. Además, el build ya no depende de descargar nada de Google, así que funciona igual en Vercel, en tu computadora o en un entorno sin internet.

### Lecciones

- Compila en local antes de subir (`npm run build`). Si falla en tu máquina, fallará en Vercel.
- Lee los registros del build completos, no solo el mensaje final. El error real suele estar unas líneas más arriba.
- Con menos dependencias externas en el build, los despliegues son más predecibles.

## Protección de despliegues

Vercel crea los proyectos nuevos con *Deployment Protection* activada: las URLs de preview piden iniciar sesión en Vercel. Es útil para no enseñar trabajo a medias, pero revisa que la versión de producción se vea en una ventana de incógnito. Se ajusta en *Settings → Deployment Protection*. Si conectas un dominio propio, ese dominio queda público.

## Dónde encaja Supabase

Una web como esta empieza estática, pero en cuanto quieres guardar algo (una lista de espera, un formulario de contacto, usuarios) necesitas un backend. Supabase te da Postgres, autenticación, almacenamiento y funciones sin montar servidores.

Hay dos formas de conectarlo con Vercel:

1. Con la integración de Supabase en el Marketplace de Vercel, que vincula un proyecto de Supabase con el de Vercel y copia en Vercel las variables de entorno necesarias (la URL del proyecto y las claves). Así no las copias a mano.
2. Con variables a mano: copias la URL y la clave pública desde el panel de Supabase (*Project Settings → API*) a *Settings → Environment Variables* en Vercel.

Reglas que conviene respetar:

- La clave pública (anon o publishable) puede ir al navegador, pero solo si tus tablas tienen Row Level Security activado con políticas claras.
- La clave de servicio (service role) solo va en el servidor. Nunca en una variable `NEXT_PUBLIC_` ni en el código.
- Después de cambiar variables en Vercel, vuelve a desplegar: los despliegues ya hechos no las toman.

Con el conector de Supabase en Claude puedes además listar tablas, aplicar migraciones, revisar registros y los avisos de seguridad del proyecto. Pídele siempre que revise el esquema antes de cambiarlo.

En Nekodojo los formularios todavía están en modo demostración. El código ya está preparado para enviarlos a un webhook (`FORMS_PROVIDER=webhook` y `FORMS_WEBHOOK_URL`), y una Edge Function de Supabase es una buena opción para recibirlos y guardarlos en una tabla.

## Cómo configurar lo mismo en tu proyecto

1. Sube tu proyecto a GitHub.
2. En claude.ai, activa los conectores de GitHub, Vercel y, si lo usarás, Supabase.
3. Pídele a Claude: *"Crea el proyecto en Vercel enlazado a mi repo y despliega `main`"*.
4. Si el build falla, pídele que lea los registros y lo arregle. Compila en local antes de volver a subir.
5. Revisa la protección de despliegues y abre la web en incógnito.
6. Cuando necesites datos, crea el proyecto en Supabase, conecta las variables en Vercel y vuelve a desplegar.
7. A partir de ahí, solo trabajas en ramas y fusionas a `main`, y Vercel se encarga de publicar.
