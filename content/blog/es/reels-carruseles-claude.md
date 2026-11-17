# Reels y carruseles con Claude: dos skills y voces de ElevenLabs

Llevo varias marcas a la vez: Nekodojo (este estudio de apps), Cobaya Tech, Agrosalas Perú y la tienda Neko Manga CIX. Hacer contenido para todas a mano no escala, así que armé con Claude un flujo para producir **reels animados** y **carruseles de Instagram** con la identidad de cada marca. En este artículo explico cómo funciona, qué herramientas usa y lo que aprendimos por el camino.

## La idea: convertir el proceso en dos skills

En lugar de explicarle a Claude cada vez cómo hacer un reel, guardé el proceso en dos **skills** (si no sabes qué es una skill, lo explico en [este artículo](/blog/skills-claude)):

| Skill | Qué produce |
| --- | --- |
| **reels-motion** | Reels verticales de unos 30–40 segundos, 6 escenas, con animaciones, efectos de sonido y voz en off. Entrega el `mp4`, la portada y el texto del post. |
| **carruseles-ig** | Carruseles de 7 a 10 slides en 1080×1350 (formato 4:5), listos para subir, con el texto del post. |

Las dos comparten los **perfiles de marca**: un archivo por marca con colores, fuentes, logo, tono, llamada a la acción y hashtags. Si cambio el color de una marca, lo cambio en ese archivo y vale para reels y carruseles.

## Flujo de un reel

### 1. Brief en un solo mensaje

Le digo a Claude algo como *"genera un reel para Nekodojo sobre por qué tener una app"*. Claude lee el perfil de la marca y propone el gancho, el ángulo, los datos que va a buscar y la estructura de las 6 escenas. **No produce nada hasta que digo "dale"**: cambiar un storyboard es barato, volver a renderizar no.

### 2. Datos verificados

Cada cifra sale de una fuente real, idealmente dos, con año. La fuente aparece en pantalla. La skill tiene una regla clara: no inventar cifras, testimonios ni resultados. Y si una cifra es vieja, se busca una más defendible.

### 3. Animación con Remotion

Los reels se hacen con **Remotion**, que permite crear video escribiendo componentes de React, sobre el estudio de **Motion Architect**. La skill trae un kit de componentes (título grande, cifra animada, barra comparativa, fuente, firma de marca, tarjeta de CTA) y una plantilla de reel. Claude copia la plantilla, escribe las escenas y comprueba que el código compile.

Algunas reglas de diseño que funcionan:

- Una idea por escena.
- Gancho con emoji y título grande al inicio.
- Toda escena con cifra lleva su fuente.
- Cierre con el mensaje, la firma de la marca y la llamada a la acción.

### 4. Voz en off con ElevenLabs

Para la voz usamos la API de **ElevenLabs**. El script de voz detecta qué plan tiene la cuenta y elige solo:

- **Plan de pago**: la voz preferida de la marca (una voz latina de la biblioteca).
- **Plan gratis**: una voz alternativa de acento neutro, con un aviso importante: **la licencia gratis no permite uso comercial**.
- **Sin acceso**: el reel sale sin voz y Claude entrega el guion con los tiempos de cada escena para ponerle voz en CapCut.

Un reel gasta unos 400–500 caracteres de voz; el plan gratis traía 10 000 al mes cuando lo probamos.

**Cómo se escribe un guion que suene natural:**

- Una frase por escena, diciendo lo mismo que la pantalla sin leerla palabra por palabra.
- **Pausas marcadas**: `[0.5]` entre oraciones y `[0.2]`–`[0.3]` tras comas. Sin pausas la voz suena atropellada.
- **Números en palabras** ("setenta y cuatro de cada cien") y las cifras exactamente iguales a las de pantalla.

Después, un script ajusta la duración de cada escena a lo que dura su frase más un respiro de ~0.8 segundos. Así el ritmo queda parejo.

### 5. Render y control de calidad

Claude renderiza el video y corre una revisión automática que saca una hoja con cuadros de cada escena y mide el audio. Luego mira la hoja y repasa un checklist:

- 1080×1920, 30 fps, entre 15 y 40 segundos.
- Volumen de la voz alrededor de −16 LUFS.
- Nada pegado a los bordes ni en el 20 % inferior (ahí Instagram pone sus botones).
- Contraste suficiente y títulos sin una palabra suelta en la última línea.

### 6. Entrega

Claude me manda el `mp4`, la portada y el texto del post, con las palabras clave en **negrita Unicode** (para que no se pierdan al pegar en Instagram) y máximo 5 hashtags. También me avisa de lo que haya que revisar: un logo provisional, la licencia de la voz o un dato por confirmar.

## Flujo de un carrusel

Los carruseles siguen la misma lógica, pero se generan como imágenes:

1. **Brief**: Claude propone 2–4 ideas con su estructura slide por slide y recomienda una. Tiene un banco de ideas por marca para no repetir temas.
2. **Contenido** en un archivo `slides.json`: portada con una promesa concreta y "Desliza →", una idea por slide, títulos de máximo 8 palabras y cuerpos de máximo 25.
3. **Generación** con un script que dibuja todo el carrusel como **un solo panorama** y luego lo corta. Así una calle, una flecha o la mascota cruzan de un slide al siguiente e invitan a deslizar.
4. **Revisión** de la hoja de contactos y de los slides con más texto.
5. **Entrega** de los PNG en orden y del texto del post. Hay que subirlos en orden y elegir 4:5 al publicar para que Instagram no los recorte.

Trucos que funcionan: terminar un slide con una pregunta que se responde en el siguiente, un **quiz** de dos opciones ("comenta A o B") en el penúltimo slide, y un resumen para **guardar** al final.

## Lo que aprendimos

- **Primero el storyboard, después el render.** Aprobar la estructura antes ahorra mucho tiempo.
- **Las cuentas hechas a mano hay que comprobarlas.** Una vez escribimos "1 de cada 6 horas despiertos" para 3,6 horas al día, y era falso. Se cambió por "más de 25 horas a la semana" (3,6 × 7).
- **Si el audio mide unos −31 LUFS, la voz no está:** solo suenan los efectos.
- **No renderizar cuadros sueltos en paralelo:** el proceso se cuelga. Mejor renderizar el video y sacar los cuadros con ffmpeg.
- **Las claves nunca van en el chat.** La de ElevenLabs está guardada como secreto del entorno; Claude la usa sin verla.
- **Cada error se escribe en la skill.** Así la siguiente vez no se repite.

## Cómo empezar con algo parecido

No hace falta montar todo de golpe:

1. Escribe el **perfil de tu marca**: colores, fuentes, logo, tono, CTA y hashtags.
2. Haz un primer reel o carrusel con Claude, paso a paso.
3. Cuando el resultado te guste, pídele que **guarde el proceso como skill**.
4. Cada vez que algo falle o mejores algo, actualiza la skill.
