# Qué es una skill de Claude, cómo crearla y cuáles uso

Cuando repites la misma tarea con Claude (hacer un reel, revisar un texto, preparar las noticias de la semana), terminas explicando lo mismo una y otra vez. Una skill resuelve eso: **es un manual que Claude lee solo cuando lo necesita**.

## Qué es una skill

Una skill es **una carpeta con un archivo principal**, `SKILL.md`, y opcionalmente scripts, plantillas y documentos de referencia:

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

Claude no lee todas las skills todo el tiempo:

1. Al empezar, **solo ve el nombre y la descripción de cada skill**.
2. Cuando lo que pides encaja con una descripción, abre ese `SKILL.md` y sigue sus instrucciones.
3. Los archivos de `references/` o `scripts/` los abre solo cuando un paso los necesita.

Por eso puedes tener muchas skills sin que Claude se sature. También por eso **la descripción es lo que más cuidado necesita**: si no dice cuándo usar la skill, Claude no la va a usar.

## En qué se diferencia de un prompt o de un proyecto

Un prompt sirve para una conversación. Las instrucciones de un proyecto, o un `CLAUDE.md`, aplican siempre dentro de ese proyecto. **Una skill se activa sola en cualquier conversación cuando la tarea encaja**, y puede traer sus propios scripts y archivos.

## Cómo crear una skill

### Opción 1: con la skill `skill-creator`

Claude tiene una skill para crear skills, y trabaja así:

1. Te pregunta qué debe hacer la skill y cómo.
2. Escribe un primer borrador.
3. Prepara algunos casos de prueba y los ejecuta con la skill.
4. Revisan juntos los resultados.
5. Reescribe la skill según lo que falló y repite.

Basta con pedirle: *"Crea una skill para hacer carruseles de Instagram con mis marcas"*.

### Opción 2: a partir de algo que ya funcionó

*Es la forma que más uso.* Primero hago la tarea con Claude paso a paso, corrigiendo lo que haga falta. Cuando el resultado me gusta, le pido: *"Guarda todo este proceso como una skill"*. Así **la skill copia un flujo que ya funcionó al menos una vez**.

### Dónde viven

Las skills se guardan en tu cuenta de claude.ai, en la sección de skills de la configuración. Desde ahí puedes activarlas, desactivarlas o subir una nueva. Las skills de tu cuenta **también están disponibles en las sesiones de Claude Code**.

## Consejos para escribir una buena skill

- En la descripción, escribe las frases con las que tú la pedirías: *"Úsala SIEMPRE que pida reels, videos cortos o 'otro reel como los anteriores'"*.
- Al inicio, pon una tabla de qué archivo está dónde: perfiles, plantillas, guías y scripts.
- Escribe el flujo en pasos numerados y marca dónde Claude debe esperar tu aprobación.
- Las reglas que no se negocian van escritas tal cual, por ejemplo "no inventes cifras ni testimonios".
- **Deja una sección de errores.** Cada vez que algo falla, lo anotas ahí con la solución.
- Guarda los datos (colores, logos, contactos) en archivos aparte para cambiarlos sin tocar las instrucciones.
- **Nunca guardes claves dentro de la skill.** Van como secretos del entorno.

## Las skills que uso

### Creadas para mis marcas

| Skill | Para qué |
| --- | --- |
| `reels-motion` | Reels animados para Nekodojo, Cobaya Tech, Agrosalas y Neko Manga CIX, con voz de ElevenLabs. |
| `carruseles-ig` | Carruseles de Instagram 1080×1350 con la identidad de cada marca. |
| `neko-news` | Noticias semanales de anime y manga para la tienda: búsqueda, puntuación, carrusel en Canva, textos y registro en Notion. |
| `agrosalas-news` | Contenido semanal de agroexportación para Agrosalas Perú. |
| `animequote-frases` | Busca y verifica frases de anime para AnimeQuote con dos fuentes. |
| `morning` | Mi resumen de la mañana. |

### Generales

- Documentos: `docx` (Word), `pdf`, `pptx` (PowerPoint), `xlsx` (Excel), `google-workspace` y `docs`.
- Investigación: `deep-research`, para informes con muchas fuentes.
- Navegador y computadora: `chrome-browser`, `built-in-browser` y `computer-use`.
- Utilidades: `skill-creator` (crear y mejorar skills) e `import-memory`.

## Por dónde empezar

*Piensa en algo que le pides a Claude cada semana.* Hazlo una vez con calma, corrigiendo cada detalle, y al final **pídele que lo guarde como skill**. La próxima vez solo dirás *"lo de siempre, pero sobre X"*.
