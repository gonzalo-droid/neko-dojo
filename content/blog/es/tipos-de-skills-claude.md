# Skills locales, de proyecto y de perfil: dónde guardar cada una

En el [post anterior](/blog/skills-claude) expliqué qué es una skill y cómo crearla. La pregunta que vino después fue: *¿dónde la guardo?* Una skill es la misma carpeta con su `SKILL.md` en todos los casos, pero **según dónde la pongas cambia quién la ve y en qué conversaciones se activa**. Hay tres lugares: tu computadora, el proyecto y tu perfil de Claude.

## Resumen rápido

| Tipo | Dónde vive | Quién la usa |
| --- | --- | --- |
| **Local** | `~/.claude/skills/` en tu computadora | Tú, en cualquier proyecto de esa computadora |
| **De proyecto** | `.claude/skills/` dentro del repositorio | Cualquiera que trabaje en ese repositorio |
| **De perfil** | Tu cuenta de claude.ai | Tú, en claude.ai, la app de escritorio y Claude Code |

## 1. Skills locales

Viven en la carpeta personal de Claude Code, en tu computadora:

```text
~/.claude/skills/
├── commit-format/SKILL.md
├── changelog-update/SKILL.md
├── seo-audit/SKILL.md
└── ux-audit/SKILL.md
```

**Claude Code las carga en todos tus proyectos**, sin importar en qué carpeta abras la sesión. Sirven para tu forma de trabajar: cómo escribes los commits, cómo revisas una pantalla, qué pasos sigues antes de abrir un PR.

Ponla aquí si la skill es tuya y te sirve en muchos proyectos. *`commit-format`, por ejemplo, me sirve igual en una app Android, una app iOS y esta web.*

Eso sí, **solo existen en esa computadora**. Nadie más las ve, no llegan a Cowork ni a las sesiones en la nube, y si cambias de equipo tienes que copiar la carpeta.

## 2. Skills de proyecto

Viven dentro del repositorio, junto al código:

```text
business_manager/
├── .claude/
│   └── skills/
│       ├── efactura-sunat/SKILL.md
│       ├── api-testing/SKILL.md
│       └── laravel-upgrade/SKILL.md
├── app/
└── composer.json
```

Solo se cargan cuando trabajas dentro de ese proyecto. Como la carpeta `.claude/` se sube a Git, **cualquiera que clone el repositorio recibe las mismas skills**.

Van aquí las skills que dependen del código del proyecto: su arquitectura, sus comandos, sus reglas de negocio. En mis proyectos tengo, por ejemplo:

- `efactura-sunat` en un sistema de gestión, con las reglas de la facturación electrónica peruana.
- `mtc-question-extractor` en MTCQuiz, para extraer las preguntas del examen de manejo.
- `epub-shorts` en un proyecto de videos cortos a partir de libros.

*Ninguna sirve fuera de su repositorio, así que no la quiero cargada en mis otros proyectos.*

En un monorepo también puedes poner skills dentro de una subcarpeta (`apps/web/.claude/skills/`). Claude Code las carga cuando empieza a trabajar con archivos de esa subcarpeta.

Lo que subas al repositorio lo ve todo el que tenga acceso, así que **nunca guardes claves ni datos privados dentro de la skill**.

## 3. Skills de perfil

Son las que subes a tu cuenta de claude.ai, desde la sección de skills de la configuración. No dependen de una computadora ni de un repositorio: **van contigo a donde inicies sesión**.

Las uso en el chat de claude.ai y en la app de escritorio, y también se cargan en Claude Code: las skills que tienes activadas en tu cuenta se descargan en `~/.claude/skills/synced/`. Ahí están mis skills de contenido:

- `reels-motion` para los reels de mis marcas.
- `carruseles-ig` para los carruseles de Instagram.
- `neko-news` y `agrosalas-news` para el contenido semanal de la tienda y de Agrosalas.

Aquí van las skills que no dependen de ningún código: escribir, investigar, diseñar, preparar contenido. *Si algo lo haces desde el chat, probablemente va aquí.*

Tres detalles:

- Se administran desde la web. La sincronización con Claude Code es de una sola vía: **si editas la copia de `synced/`, la próxima sincronización la sobrescribe**. Para cambiarlas, subes una versión nueva.
- No se sincronizan si usas Claude Code con una clave de API en vez de tu cuenta.
- Son privadas: nadie más las ve, salvo que estés en un plan Team o Enterprise y decidas compartirlas con tus compañeros.

## ¿Y si dos skills se llaman igual?

Si tienes una skill local y una de proyecto con el mismo nombre, **Claude Code se queda con la local** (y si tu empresa define skills, esas ganan a las dos). Para evitar sorpresas, ponles nombres distintos. *Yo tengo `changelog-update` (local, genérica) y `updating-changelog` (la versión adaptada a MTCQuiz), y conviven sin problema.*

Los plugins son un cuarto origen. Un plugin puede traer varias skills juntas, y estas aparecen con el nombre del plugin delante (`superpowers:brainstorming`), así que nunca chocan con las tuyas.

## Cómo decido dónde va cada una

Me hago tres preguntas, en este orden:

1. ¿Depende del código de un proyecto? Va en el proyecto (`.claude/skills/`).
2. ¿La uso desde el chat, sin código, o en varios dispositivos? Va en mi perfil de claude.ai.
3. ¿Es mi forma de trabajar en cualquier proyecto? Va en local (`~/.claude/skills/`).

Si una skill local empieza a llenarse de "si es el proyecto X, haz esto", **esa parte debería ser una skill de proyecto**.

## Por dónde empezar

Sea cual sea su tipo, en Claude Code puedes llamar a cualquier skill directamente con `/nombre-de-la-skill`, sin esperar a que Claude la elija.

Abre `~/.claude/skills/` y la carpeta `.claude/skills/` de tu proyecto principal, y revisa lo que tienes. **Muchas veces una skill está en el lugar equivocado**: una regla de un solo proyecto guardada como local, o una skill de contenido atada a un repositorio. *Para cambiarla de lugar basta con mover la carpeta.*
