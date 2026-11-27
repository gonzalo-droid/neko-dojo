# Cómo crear reels con Claude paso a paso y cuánto cuesta

Este tutorial es para ti si tienes un negocio o una marca y quieres hacer reels y carruseles para Instagram **sin saber de programación ni de edición de video**. Al terminarlo sabrás qué necesitas, qué pedirle a Claude en cada paso y **cuánto vas a pagar al mes**.

Yo lo uso para cuatro negocios: Nekodojo, Cobaya Tech, Agrosalas Perú y la tienda Neko Manga CIX. *Así lo armé yo, conversando con Claude.* El detalle técnico de mi flujo lo conté en [el post anterior](/blog/reels-carruseles-claude). Los precios de este post son los que muestran las páginas oficiales de [Claude](https://claude.com/pricing) y [ElevenLabs](https://elevenlabs.io/pricing) el 27 de noviembre de 2026, en dólares.

## Qué es Claude y qué vas a lograr

Claude es un asistente de inteligencia artificial de la empresa Anthropic. Le escribes con naturalidad, como a una persona y sin ningún formato especial, y te entiende. **Solo dale un objetivo** y él hace el trabajo: busca los datos, escribe el guion, anima el video y arma las imágenes.

Con esta guía puedes sacar:

- Un reel de 30 a 40 segundos con animaciones, efectos de sonido y música.
- La portada del reel y el texto para publicarlo, con hashtags.
- Carruseles de Instagram listos para subir.
- Opcional: una voz en off.

Con este flujo salieron dos reels y un carrusel para la tienda Neko Manga CIX: "¿Mito o realidad?" sobre el manga, "Cómo leer manga" y "¿Shonen, shojo, seinen o josei?".

## Qué necesitas

1. Una Mac (macOS 11 o más nuevo). La herramienta que anima los videos también funciona en Linux, pero **no en Windows**.
2. Una cuenta de Claude con un **plan de pago**. El plan gratis no incluye Claude Code, la parte que hace los videos.
3. Tu logo, tus colores y una idea de cómo les hablas a tus clientes.
4. Opcional: una cuenta de ElevenLabs si quieres voz.

## Paso 1: instala Claude y abre la pestaña Code

1. Descarga la app de escritorio de Claude siguiendo las [instrucciones oficiales](https://code.claude.com/docs/en/desktop-quickstart). Elige la versión para Mac.
2. Inicia sesión con tu cuenta.
3. En la barra lateral, haz clic en Code.
4. Elige o crea una carpeta de tu computadora para guardar tus videos, por ejemplo una llamada "contenido", y copia ahí tu logo.

## Paso 2: instala Motion Architect

[Motion Architect](https://github.com/Hainrixz/motion-architect) es una herramienta **gratuita y de código abierto** creada por Enrique Rocha. Convierte a Claude en un diseñador de animación: le pides el video con palabras y él lo diseña, lo anima con Remotion y lo renderiza en tu computadora, sin subir nada a internet.

La uso porque ya resuelve la parte difícil de un reel:

- Te muestra el storyboard (gancho, desarrollo y cierre, con sus tiempos) y no anima nada hasta que lo apruebas.
- Cuida el movimiento: entradas suaves, ritmo y rebotes que no se ven hechos con IA.
- Respeta las zonas seguras de Reels y TikTok, para que los botones de la app no tapen tu texto.
- Trae una librería de efectos de sonido que se sincronizan con la animación.
- Entiende videos de referencia: le pasas un reel que te gusta y toma su ritmo, sus cortes y su paleta.

Sobre esa base armé mi propia skill, `reels-motion`, que le agrega mis cuatro marcas, la verificación de datos y la voz. *Es privada de mi cuenta, pero en el paso 3 armas la tuya.*

Para instalarla, pídeselo a Claude en la pestaña Code:

> Instala Motion Architect desde github.com/Hainrixz/motion-architect y avísame si falta algo.

Si prefieres hacerlo tú, abre la Terminal y pega estas líneas:

```bash
git clone https://github.com/Hainrixz/motion-architect.git
cd motion-architect
./install.sh
```

El instalador revisa lo que necesita (Node.js, ffmpeg, yt-dlp y Python 3) y en Mac ofrece instalar con Homebrew lo que falte. Al terminar, cierra y vuelve a abrir Claude.

## Paso 3: cuéntale cómo es tu marca

Escribe algo como esto, con tus datos:

> Tengo una tienda de manga en Chiclayo. Mis colores son negro, blanco y naranja, mi logo está en esta carpeta y les hablo a mis clientes de forma cercana. Quiero hacer reels para Instagram. Guarda esta información como mi perfil de marca.

Claude guarda ese perfil en una skill, que es un archivo de instrucciones que lee cada vez que lo necesita. Así **no repites tus colores ni tu tono** en cada reel. Cómo funcionan las skills lo expliqué en [este post](/blog/skills-claude).

## Paso 4: pide tu primer reel

> Hazme un reel de 30 segundos para mi tienda sobre cómo leer manga.

Claude responde con una propuesta: el gancho, los datos que va a buscar y las 6 escenas. **No produce nada hasta que le dices "dale"**. Este es el momento de cambiar el tema o el tono, porque cambiar una propuesta es rápido y volver a hacer el video no.

En mi flujo, Claude busca los datos en fuentes reales y las muestra en pantalla. Pídele lo mismo y, aun así, *lee las cifras antes de publicar: el que publica eres tú*.

## Paso 5: espera el video y pide cambios

Claude arma el video, lo revisa por su cuenta y te entrega el video, la portada y el texto para publicar. Tarda unos minutos.

Para cambiar algo, **díselo con tus palabras**: "el título de la escena 3 es muy largo" o "cambia el naranja por un tono más oscuro".

## Paso 6: haz un carrusel

> Hazme un carrusel de 8 slides con 4 mitos del manga.

Claude te entrega las imágenes en orden. Súbelas a Instagram en ese orden y elige el **formato 4:5** para que no las recorte.

## Paso 7 (opcional): ponle voz

Tienes tres caminos, del más simple al más técnico.

1. **Tu propia voz**, sin pagar nada extra. Claude te da el guion y el segundo en que empieza cada escena. Tú lo grabas con el celular y pones el audio en el video con una app de edición como CapCut.
2. **Una voz generada con ElevenLabs**. Crea tu cuenta en elevenlabs.io, elige un plan (Free para probar, Starter para publicar) y crea una clave de API, que es una contraseña especial que deja a Claude usar tu cuenta. Después dile a Claude: "Quiero conectar ElevenLabs, guíame paso a paso". **Nunca pegues la clave en el chat**: Claude te explica dónde guardarla.
3. **Tu voz clonada**. Con el plan Starter, ElevenLabs puede copiar tu voz a partir de una grabación. La variante de grabar el guion y pasarle los audios a Claude para que los enlace con cada escena *todavía no la tengo armada, y es la que quiero probar*.

## Cuánto cuesta

| Qué quieres hacer | Qué pagas | Al mes |
| --- | --- | --- |
| Empezar sin voz, o grabando tu propia voz | Claude Pro | $20 |
| Reels con voz generada para publicar | Claude Pro más ElevenLabs Starter | $26 |
| Lo que yo uso | Claude Max más ElevenLabs Starter | $106 |

**Empieza con Pro.** Si el uso se te acaba antes de fin de mes, sube a Max, que da más uso. Yo uso Max porque hago muchos reels y carruseles, y además programo mis apps con Claude.

### Los planes de Claude

| Plan | Precio | Incluye Claude Code |
| --- | --- | --- |
| Free | $0 | No |
| Pro | $20 al mes ($17 al mes si pagas $200 por año) | Sí |
| Max | $100 al mes | Sí |
| Ultra | $200 al mes | Sí |

### Los planes de ElevenLabs

| Plan | Precio | Créditos al mes | Qué agrega |
| --- | --- | --- | --- |
| Free | $0 | 10 mil | Sirve para probar. No incluye licencia comercial |
| Starter | $6 al mes ($5 pagando $60 por año) | 30 mil | Licencia comercial y clonación rápida de tu voz |
| Creator | $22 al mes | 121 mil | Clonación profesional de voz |
| Pro | $99 al mes | 600 mil | Más créditos |

Un reel gasta entre 400 y 500 caracteres de voz. Con el modelo que uso, un crédito equivale a un carácter, así que los 30 mil créditos de Starter alcanzan para **más de 60 reels al mes**. *Hasta el 1 de diciembre hay oferta de Black Friday y el primer mes de Starter cuesta $1.*

### Lo que no cuesta

Motion Architect es gratis y de código abierto (licencia MIT). Remotion, el programa de animación que usa por dentro, es gratis para personas y para equipos de hasta 3 personas. Una empresa más grande necesita una [licencia de pago](https://www.remotion.dev/docs/license/faq). La música también sale sin costo, porque la compone Claude.

## Música sin licencia

Claude compuso la música de los dos reels de Neko Manga. La sintetizó con código a 120 pulsos por minuto, de modo que cada cambio de escena cae en un tiempo fuerte. Como no usa muestras ni canciones de nadie, **no hay licencia que pagar ni reclamos de derechos de autor**. Todavía no está dentro de mi skill, así que hoy se la pido en la conversación.

## Consejos para empezar

- **Empieza con una sola marca.**
- Haz el primer reel sobre un tema que ya conoces, así detectas rápido un dato mal puesto.
- Pide los cambios con tus palabras y repítelos las veces que haga falta.
- Cuando el resultado te guste, pídele a Claude que guarde el proceso como skill para repetirlo.
