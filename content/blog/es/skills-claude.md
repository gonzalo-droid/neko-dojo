# Qué es una skill de Claude, cómo crearla y cuáles uso

Cuando repites la misma tarea con Claude (hacer un reel, revisar un texto, preparar las noticias de la semana), terminas explicando lo mismo una y otra vez. Una **skill** resuelve eso: es un manual que Claude lee solo cuando lo necesita. Aquí explico qué es, cómo crear la tuya y cuáles uso para el estudio y mis marcas.

## Qué es una skill

Una skill es una **carpeta** con un archivo principal, `SKILL.md`, y opcionalmente scripts, plantillas y documentos de referencia:

```text
reels-motion/
├── SKILL.md          ← instrucciones principales
├── assets/           ← plantillas, logos, perfiles de marca
├── references/       ← guías que Claude consulta cuando hace falta
└── scripts/          ← código que Claude ejecuta (generar voz, revisar calidad…)
```

El `SKILL.md` empieza con una cabecera con dos campos:

```markdown
---
name: carruseles-ig
description: "Diseña y genera carruseles para Instagram listos para subir…
  Úsala SIEMPRE que pida un carrusel, varios posts deslizables o slides para Instagram."
---

# Carruseles para Instagram
(instrucciones paso a paso)
```

## Cómo la usa Claude

Lo importante es que **Claude no lee todas las skills todo el tiempo**:

1. Al empezar, Claude solo ve el **nombre y la descripción** de cada skill.
2. Cuando lo que pides encaja con una descripción, abre ese `SKILL.md` y sigue sus instrucciones.
3. Los archivos de `references/` o `scripts/` los abre solo cuando un paso los necesita.

Por eso puedes tener muchas skills sin que Claude se sature, y por eso **la descripción es la parte más importante**: si no dice cuándo usarla, Claude no la va a usar.

## Skill, prompt y proyecto: la diferencia

- Un **prompt** sirve para una conversación.
- Las **instrucciones de un proyecto** o un `CLAUDE.md` aplican siempre dentro de ese proyecto.
- Una **skill** se activa sola cuando la tarea encaja, en cualquier conversación, y puede traer sus propios scripts y archivos.

## Cómo crear una skill

### Opción 1: con la skill `skill-creator`

Claude tiene una skill para crear skills. El proceso que sigue:

1. Te pregunta qué debe hacer la skill y cómo.
2. Escribe un primer borrador.
3. Prepara algunos casos de prueba y los ejecuta con la skill.
4. Revisan juntos los resultados.
5. Reescribe la skill según lo que falló y repite.

Basta con pedirle: *"Crea una skill para hacer carruseles de Instagram con mis marcas"*.

### Opción 2: a partir de algo que ya funcionó

Es la forma que más uso. Primero hago la tarea con Claude paso a paso, corrigiendo lo que haga falta. Cuando el resultado me gusta, le pido: *"Guarda todo este proceso como una skill"*. Así la skill nace de un flujo probado y no de una idea en abstracto.

### Dónde viven

Las skills se guardan en tu cuenta de claude.ai, en la sección de skills de la configuración. Desde ahí puedes activarlas, desactivarlas o subir una nueva. Las skills de tu cuenta también están disponibles en las sesiones de Claude Code.

## Consejos para escribir una buena skill

- **Descripción con frases de activación.** Incluye cómo lo pedirías tú: *"Úsala SIEMPRE que pida reels, videos cortos o 'otro reel como los anteriores'"*.
- **Una tabla de "qué está dónde"** al inicio: perfiles, plantillas, guías y scripts.
- **El flujo en pasos numerados**, con los puntos donde Claude debe esperar tu aprobación.
- **Reglas no negociables** escritas claramente: por ejemplo, "no inventes cifras ni testimonios".
- **Una sección de errores ya vividos.** Cada vez que algo falla, se anota ahí con la solución.
- **Los datos en archivos aparte** (colores, logos, contactos), no mezclados con las instrucciones. Así se cambian sin tocar el resto.
- **Nunca guardes claves** dentro de la skill. Van como secretos del entorno.

## Las skills que uso

**Creadas para mis marcas**

| Skill | Para qué |
| --- | --- |
| `reels-motion` | Reels animados para Nekodojo, Cobaya Tech, Agrosalas y Neko Manga CIX, con voz de ElevenLabs. |
| `carruseles-ig` | Carruseles de Instagram 1080×1350 con la identidad de cada marca. |
| `neko-news` | Noticias semanales de anime y manga para la tienda: búsqueda, puntuación, carrusel en Canva, textos y registro en Notion. |
| `agrosalas-news` | Contenido semanal de agroexportación para Agrosalas Perú. |
| `animequote-frases` | Busca y verifica frases de anime para AnimeQuote con dos fuentes. |
| `morning` | Mi resumen de la mañana. |

**Generales**

- **Documentos**: `docx` (Word), `pdf`, `pptx` (PowerPoint), `xlsx` (Excel), `google-workspace` y `docs`.
- **Investigación**: `deep-research`, para informes con muchas fuentes.
- **Navegador y computadora**: `chrome-browser`, `built-in-browser` y `computer-use`.
- **Utilidades**: `skill-creator` (crear y mejorar skills) e `import-memory`.

## Por dónde empezar

Piensa en algo que le pides a Claude cada semana. Hazlo una vez con calma, corrigiendo cada detalle, y al final pídele que lo guarde como skill. La próxima vez solo dirás *"lo de siempre, pero sobre X"*.
