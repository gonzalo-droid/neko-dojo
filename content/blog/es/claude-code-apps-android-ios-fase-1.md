# Cómo uso Claude Code en mis apps Android e iOS: fase 1

Esta es la primera parte de una serie sobre cómo voy aprendiendo a usar la IA en mis proyectos. Cuento **cómo trabajo hoy con Claude Code**, qué me funciona y qué todavía no. *Cuando cambie algo importante en mi forma de trabajar, escribiré la fase 2.*

## Mis apps hoy

Tengo **cuatro apps publicadas en Android e iOS**: [AnimeQuote](/apps/animequote), [MTCQuiz](/apps/mtcquiz), [ApruebaSUCAMEC](/apps/apruebasucamec) y [Cazadores Perú](/apps/peruxhunter). Otras cuatro están en desarrollo, *y de una todavía no puedo contar nada*. Casi todas son nativas o están hechas con [Kotlin Multiplatform](/blog/kotlin-multiplatform).

Con tantos proyectos, **me tocaba repetir las mismas explicaciones en cada uno**: cómo nombro los commits, qué arquitectura uso, qué necesita una ficha de tienda. *De ahí sale casi todo lo que cuento abajo.*

## Skills de Claude para lo que se repite

**Cuando una tarea se repite, la convierto en una skill** (expliqué qué es una skill en [este post](/blog/skills-claude)). Algunas son globales y me sirven en todos los proyectos:

- `commit-format` redacta los commits con Conventional Commits.
- `changelog-update` actualiza el CHANGELOG antes de un merge, con el formato que ya usa el archivo.
- `store-screenshots` arma las capturas para App Store y Google Play a partir del simulador o el emulador.
- `add-admob` y `admob-compliance` revisan los anuncios: IDs de prueba en Debug, ATT en iOS y el formulario de consentimiento de Google.
- `ux-audit` revisa cada pantalla nueva con capturas antes de darla por terminada.

**Otras viven dentro de un solo repositorio**, porque dependen de ese código. En MTCQuiz, por ejemplo, hay una skill solo para extraer las preguntas del examen de manejo. Cómo decido dónde va cada una lo cuento en [este otro post](/blog/tipos-de-skills-claude).

## La misma arquitectura en Android, iOS y KMP

Para que todas las apps sigan la misma arquitectura, la tengo escrita en una skill. `base-kmp-audit` reúne **166 reglas con ID**: ARQ- para arquitectura, COD- para código, TST- para tests, PUB- para publicación, entre otras. La uso para arrancar una app nueva y para auditar una existente antes de publicarla. *Si una auditoría encuentra algo que la base no cubría, lo agrego como regla nueva.*

Para llevar funciones de Android a iOS tengo un agente, `android-to-ios-sync`. Lee el cambio en Android y lo vuelve a implementar en iOS con componentes nativos, **sin traducir el código línea por línea**. Entrega la función con sus tests, la entrada del changelog y una prueba en el simulador.

Cada repositorio tiene además su `CLAUDE.md` con las reglas fijas del proyecto. El de esta web, por ejemplo, dice que no se inventan testimonios ni cifras y que todo texto visible existe en español e inglés.

## Varias sesiones de Claude Code en paralelo

Ahora trabajo con **varias sesiones de Claude Code a la vez**, cada una en un proyecto o en una función distinta. Un ejemplo de esta semana: mientras una sesión armaba en esta web todo lo que SubTrack necesita para salir (su ficha, las páginas legales, el soporte, la página para borrar la cuenta que pide Google Play y el enlace de descarga que comparte la app), otra reescribía los posts del blog. Para no pisarse, **cada sesión trabaja en su propia rama**.

## De programador a revisor

**Mi trabajo ahora es sobre todo revisar**. Claude escribe el código, abre el PR y me cuenta qué hizo y qué no pudo comprobar. Yo leo, pido cambios o le digo que publique. *Muchas veces lo hago desde el celular con Remote Control*, que me deja seguir y responder desde el teléfono una sesión que corre en mi computadora.

## Reels y carruseles con el mismo método

**Lo mismo aplica al contenido de mis marcas**. Con las skills `reels-motion` y `carruseles-ig` preparo reels y carruseles para Instagram, y `neko-news` arma las noticias semanales de la tienda. Conté ese flujo en [este post](/blog/reels-carruseles-claude).

## Lo que todavía no suelto

*Todavía le doy mucho la mano a Claude, sobre todo en correcciones.* Leo el PR, encuentro algo que no quedó como quería y se lo devuelvo. **La meta de la fase 2 es que haya menos que corregir**: que lo que corrijo una vez quede escrito en una skill o en una regla del `CLAUDE.md`, y que el PR llegue más cerca de lo que yo habría hecho.
