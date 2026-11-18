import type { Locale } from "@/i18n/config";

/*
 * Cazadores Perú landing copy. Facts come from the app itself (strings.xml, AppConfig.kt and
 * docs/DECISIONES.md in HunterXPeru, November 2026): hotline 0-800-40-007, alternate 1818,
 * report by email drafted on the phone (the app sends and stores nothing), weekly list from
 * recompensas.pe, classes S/A/B/C as the app's own badge, D. S. 097-2025-PCM summary.
 * No headcount on purpose: the number of wanted people changes every week.
 *
 * Screenshots are real iOS captures from 2026-11-17. Faces, names and the record ID of real
 * wanted people are pixelated (see the caption on the page). Screens with ads, the consent form
 * or removed features (near you, danger meter) are not used.
 */

export const HOTLINE = { label: "0-800-40-007", href: "tel:080040007" };
export const HOTLINE_ALT = { label: "1818", href: "tel:1818" };
export const SOURCE_URL = "https://recompensas.pe";

type Shot = { src: string; alt: string };
export const SHOT = { width: 920, height: 1996 };

const src = {
  home: "/apps/peruxhunter/home.webp",
  poster: "/apps/peruxhunter/poster.webp",
  details: "/apps/peruxhunter/details.webp",
  filters: "/apps/peruxhunter/filters.webp",
  saved: "/apps/peruxhunter/saved.webp",
  settings: "/apps/peruxhunter/settings.webp",
  classes: "/apps/peruxhunter/classes.webp",
  regime: "/apps/peruxhunter/regime.webp",
};

/** Class badges, with the app's own colors (Color.kt) and thresholds (legend sheet). */
export const classes = [
  { code: "S", stars: 4, bg: "#2B1D10", fg: "#F2B93B", es: "S/ 300 mil o más", en: "S/ 300k or more" },
  { code: "A", stars: 3, bg: "#7A1D12", fg: "#FFF3E6", es: "S/ 100 mil o más", en: "S/ 100k or more" },
  { code: "B", stars: 2, bg: "#B0480C", fg: "#FFF3E6", es: "S/ 50 mil o más", en: "S/ 50k or more" },
  { code: "C", stars: 1, bg: "#EADFB8", fg: "#3D3200", es: "Menos de S/ 50 mil", en: "Under S/ 50k" },
] as const;

const es = {
  meta: {
    title: "Cazadores Perú — Los más buscados del Perú en tu celular",
    description:
      "App gratuita y no oficial con los buscados del Programa de Recompensas del Mininter como carteles «Se busca»: quiénes son, qué delitos se les imputan y cuánto ofrece el Estado. Si reconoces a alguien, llama gratis al 0-800-40-007.",
  },
  nav: [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#funciones", label: "Funciones" },
    { href: "#seguridad", label: "Seguridad" },
    { href: "#proyecto", label: "El proyecto" },
  ],
  eyebrow: "Programa de Recompensas · Perú",
  heroTitle: ["Conoce a los más buscados del Perú.", "Si los reconoces, llama gratis."],
  heroBody:
    "Cazadores Perú muestra como carteles «Se busca» a las personas del Programa de Recompensas del Ministerio del Interior: quiénes son, qué delitos se les imputan y cuánto ofrece el Estado por información. Para reconocer y avisar, nunca para enfrentarse.",
  hotlineLead: "¿Viste a alguien? Línea gratuita",
  disclaimer: "App gratuita y no oficial. No está afiliada al Ministerio del Interior ni a la Policía Nacional del Perú.",
  heroShot: { src: src.home, alt: "Inicio de la app: la línea gratuita 0-800-40-007, el acceso al régimen especial por extorsión y sicariato y los más buscados como carteles" } as Shot,
  shotNote: "Capturas reales del 17/11/2026. Pixelamos caras, nombres e ID a propósito: aquí solo mostramos cómo se ve la app.",
  steps: {
    title: "Cómo funciona",
    lead: "Tres pasos. Ninguno te pide acercarte a nadie.",
    items: [
      { title: "Busca", body: "Revisa los carteles o busca por nombre. Filtra por departamento, provincia o delito para ver quiénes son buscados en tu zona." },
      { title: "Reconoce", body: "Mira con calma la foto y los datos de la ficha. Si crees reconocer a alguien, no te acerques ni lo sigas: anota lugar, hora y ropa." },
      { title: "Llama", body: "Desde un lugar seguro, llama gratis al 0-800-40-007. Tu reporte puede ser anónimo." },
    ],
    call: "Llamar al 0-800-40-007",
  },
  poster: {
    title: "Cada buscado, un cartel claro",
    lead: "Foto, nombre, delito imputado y recompensa en un formato que se entiende de un vistazo, igual en tema claro y oscuro.",
    classesTitle: "Clases S, A, B y C",
    classesBody: "Un sello propio de la app que agrupa a los buscados según el monto de la recompensa. No es una calificación oficial.",
    shot: { src: src.poster, alt: "Ficha con el cartel «Se busca»: delito imputado en una franja roja, foto, nombre, recompensa de S/ 80 000 y sello de clase B" } as Shot,
  },
  search: {
    title: "Encuentra rápido a quien buscas",
    lead: "La web oficial tiene la información, pero no es fácil revisarla desde el celular. Aquí está ordenada.",
    points: [
      "La búsqueda por nombre ignora tildes: «Ramirez» también encuentra «Ramírez».",
      "Filtros por departamento, provincia y delito, con los delitos más comunes a un toque.",
      "Ordena por mayor o menor recompensa, o alfabéticamente.",
    ],
    shot: { src: src.filters, alt: "Hoja de filtros: departamento, provincia y chips de delito como extorsión, sicariato, secuestro o trata de personas" } as Shot,
  },
  detail: {
    title: "La ficha completa y qué hacer",
    lead: "Cada ficha reúne los delitos imputados, el departamento y la provincia, y cuánto pesa su recompensa en el país.",
    points: [
      "Posición nacional: en qué puesto está su recompensa entre todos los buscados.",
      "«Si lo reconoces»: los tres pasos seguros, siempre a la vista.",
      "La fuente y la fecha de consulta en cada ficha, para verificar en recompensas.pe.",
    ],
    shot: { src: src.details, alt: "Ficha: posición nacional por recompensa, delito imputado, departamento, provincia y el recuadro «Si lo reconoces» con tres pasos" } as Shot,
  },
  features: {
    title: "Y además",
    items: [
      { key: "report", title: "Reportar a tu manera", body: "Llama al 0-800-40-007 o al 1818, o escribe: la app arma un correo con lugar, hora y detalles. No envía ni guarda nada; lo envías tú." },
      { key: "share", title: "Comparte el cartel", body: "Envía el cartel como imagen por WhatsApp o redes, con la línea gratuita y el aviso de que no es oficial." },
      { key: "saved", title: "Mis carteles, sin conexión", body: "Guarda una ficha con el marcador y su cartel queda a mano en tu teléfono, incluso sin internet. El 0-800 funciona sin datos." },
      { key: "a11y", title: "Claro, oscuro y letra grande", body: "Sigue el tema de tu teléfono o elige uno. Respeta la letra grande del sistema sin cortar el contenido." },
    ],
    savedShot: { src: src.saved, alt: "Pantalla Mis carteles con un cartel guardado" } as Shot,
    settingsShot: { src: src.settings, alt: "Ajustes: apariencia Sistema, Claro u Oscuro, y accesos al régimen especial y a la leyenda de rangos" } as Shot,
  },
  regime: {
    eyebrow: "D. S. N.º 097-2025-PCM",
    title: "Hasta S/ 500 000 por extorsión y sicariato",
    lead: "Un régimen especial da beneficios económicos a quien brinde información útil para capturar a implicados en estos delitos. La app lo resume:",
    points: [
      { title: "Pago acelerado", body: "En hasta 32 días hábiles." },
      { title: "Protección del informante", body: "Tu anonimato y confidencialidad se protegen con una clave reservada." },
      { title: "Criterios claros", body: "El monto depende del nivel de participación en la captura." },
    ],
    note: "Resumen hecho por una app no oficial. Lo que vale es el decreto y el Ministerio del Interior.",
    shot: { src: src.regime, alt: "Pantalla del régimen especial por extorsión y sicariato con sus puntos clave y el botón para llamar" } as Shot,
  },
  safety: {
    title: "Nunca te enfrentes",
    lead: "La captura le toca a la Policía. Tu parte es avisar sin ponerte en riesgo.",
    rules: ["No te acerques ni lo sigas.", "Anota lugar, hora y ropa.", "Llama a la línea gratuita desde un lugar seguro."],
    facts: [
      { title: "Puede ser anónimo", body: "Tu reporte a la línea gratuita puede ser anónimo." },
      { title: "La recompensa la otorga el Estado", body: "Después de validar la información. La app no participa ni puede asegurarla." },
    ],
  },
  about: {
    title: "Sobre el proyecto",
    motto: "«Si todos estamos atentos, nadie se escapa.»",
    blocks: [
      { title: "Por qué existe", body: "La web oficial del Programa de Recompensas tiene la información, pero no es fácil revisarla desde el celular. Cazadores Perú la ordena en carteles claros, fáciles de consultar y de compartir." },
      { title: "De dónde salen los datos", body: "De recompensas.pe, la web pública del Programa. La lista se actualiza cada semana y puede cambiar sin aviso: verifica siempre en la fuente." },
      { title: "Una comunidad atenta", body: "Mientras más gente conozca estos rostros, más fácil es que alguien los reconozca, avise a la línea gratuita y la Policía haga la captura." },
    ],
    supportTitle: "Cómo apoyar",
    support: [
      { title: "Comparte", body: "Comparte la app y los carteles con tu familia y tus grupos." },
      { title: "Califica", body: "Una calificación y un comentario en la tienda nos ayudan a llegar a más gente y a mejorar." },
    ],
    supportNote: "La app es gratuita y muestra anuncios, que ayudan a mantenerla.",
  },
  downloadTitle: "Descarga Cazadores Perú",
  downloadBody: "Gratis para Android e iOS. Los enlaces aparecerán aquí cuando la app esté publicada en las tiendas.",
  notice: {
    title: "App no oficial",
    body: "Cazadores Perú es una app independiente de Nekodojo. No está afiliada al Ministerio del Interior ni a la Policía Nacional del Perú. Muestra datos públicos del Programa de Recompensas, que pueden cambiar sin aviso.",
    source: "Verifica siempre en recompensas.pe",
  },
};

type Content = typeof es;

const en: Content = {
  meta: {
    title: "Cazadores Perú — Peru's most wanted on your phone",
    description:
      "Free, unofficial app showing the people wanted by the Peruvian Interior Ministry's Rewards Program as “Wanted” posters: who they are, the crimes they're charged with and the reward the State offers. If you recognize someone, call 0-800-40-007 for free.",
  },
  nav: [
    { href: "#como-funciona", label: "How it works" },
    { href: "#funciones", label: "Features" },
    { href: "#seguridad", label: "Safety" },
    { href: "#proyecto", label: "The project" },
  ],
  eyebrow: "Rewards Program · Peru",
  heroTitle: ["Know Peru's most wanted.", "If you recognize one, call for free."],
  heroBody:
    "Cazadores Perú shows the people wanted by the Peruvian Interior Ministry's Rewards Program as “Wanted” posters: who they are, the crimes they're charged with and how much the State offers for information. It's for recognizing and reporting, never for confronting anyone.",
  hotlineLead: "Seen someone? Free hotline",
  disclaimer: "Free, unofficial app. Not affiliated with Peru's Ministry of the Interior or the Peruvian National Police.",
  heroShot: { src: src.home, alt: "App home: the free 0-800-40-007 hotline, a link to the special regime for extortion and contract killing, and the most wanted as posters" },
  shotNote: "Real screenshots from 2026-11-17, in Spanish as in the app. Faces, names and IDs are pixelated on purpose: here we only show what the app looks like.",
  steps: {
    title: "How it works",
    lead: "Three steps. None of them asks you to approach anyone.",
    items: [
      { title: "Search", body: "Browse the posters or search by name. Filter by region, province or crime to see who is wanted in your area." },
      { title: "Recognize", body: "Take your time with the photo and the record. If you think you recognize someone, don't approach or follow them: note the place, time and clothing." },
      { title: "Call", body: "From a safe place, call 0-800-40-007 for free. Your report can be anonymous." },
    ],
    call: "Call 0-800-40-007",
  },
  poster: {
    title: "Every wanted person, one clear poster",
    lead: "Photo, name, alleged crime and reward in a format you get at a glance, the same in light and dark themes.",
    classesTitle: "Classes S, A, B and C",
    classesBody: "The app's own badge, grouping wanted people by reward amount. It isn't an official rating.",
    shot: { src: src.poster, alt: "Record with the “Se busca” (Wanted) poster: alleged crime on a red band, photo, name, a S/ 80,000 reward and a class B badge" },
  },
  search: {
    title: "Find who you're looking for, fast",
    lead: "The official website has the information, but it's hard to browse on a phone. Here it's organized.",
    points: [
      "Name search ignores accents: “Ramirez” also finds “Ramírez”.",
      "Filters by region, province and crime, with the most common crimes one tap away.",
      "Sort by highest or lowest reward, or alphabetically.",
    ],
    shot: { src: src.filters, alt: "Filters sheet: region, province and crime chips such as extortion, contract killing, kidnapping or human trafficking" },
  },
  detail: {
    title: "The full record, and what to do",
    lead: "Each record gathers the alleged crimes, the region and province, and how the reward ranks nationwide.",
    points: [
      "National rank: where their reward stands among everyone wanted.",
      "“If you recognize them”: the three safe steps, always in view.",
      "The source and date checked on every record, so you can verify on recompensas.pe.",
    ],
    shot: { src: src.details, alt: "Record: national rank by reward, alleged crime, region, province and the “If you recognize them” box with three steps" },
  },
  features: {
    title: "And also",
    items: [
      { key: "report", title: "Report your way", body: "Call 0-800-40-007 or 1818, or write: the app drafts an email with place, time and details. It sends and stores nothing; you send it." },
      { key: "share", title: "Share the poster", body: "Send the poster as an image on WhatsApp or social media, with the free hotline and a note that it's unofficial." },
      { key: "saved", title: "My posters, offline", body: "Save a record with the bookmark and its poster stays on your phone, even without internet. The 0-800 line works without data." },
      { key: "a11y", title: "Light, dark and large text", body: "Follows your phone's theme or pick one. Supports the system's large text without cutting content off." },
    ],
    savedShot: { src: src.saved, alt: "My posters screen with one saved poster" },
    settingsShot: { src: src.settings, alt: "Settings: System, Light or Dark appearance, and links to the special regime and the rank legend" },
  },
  regime: {
    eyebrow: "Supreme Decree 097-2025-PCM",
    title: "Up to S/ 500,000 for extortion and contract killing",
    lead: "A special regime pays people who provide useful information to capture those involved in these crimes. The app sums it up:",
    points: [
      { title: "Faster payment", body: "Within 32 business days." },
      { title: "Informant protection", body: "Your anonymity and confidentiality are protected with a confidential code." },
      { title: "Clear criteria", body: "The amount depends on how much the tip contributed to the capture." },
    ],
    note: "Summary by an unofficial app. What counts is the decree and the Ministry of the Interior.",
    shot: { src: src.regime, alt: "Special regime screen for extortion and contract killing with its key points and the call button" },
  },
  safety: {
    title: "Never confront anyone",
    lead: "Capturing is the police's job. Your part is to report without putting yourself at risk.",
    rules: ["Don't approach or follow them.", "Note the place, time and clothing.", "Call the free hotline from a safe place."],
    facts: [
      { title: "It can be anonymous", body: "Your report to the free hotline can be anonymous." },
      { title: "The State grants the reward", body: "After validating the information. The app takes no part in it and can't promise it." },
    ],
  },
  about: {
    title: "About the project",
    motto: "“If we all stay alert, no one gets away.”",
    blocks: [
      { title: "Why it exists", body: "The Rewards Program's official website has the information, but it's hard to browse on a phone. Cazadores Perú organizes it into clear posters that are easy to check and share." },
      { title: "Where the data comes from", body: "From recompensas.pe, the Program's public website. The list is updated every week and may change without notice: always check the source." },
      { title: "An alert community", body: "The more people know these faces, the likelier it is that someone recognizes one, calls the free hotline and the police make the arrest." },
    ],
    supportTitle: "How to help",
    support: [
      { title: "Share", body: "Share the app and the posters with your family and your groups." },
      { title: "Rate", body: "A rating and a review in the store help us reach more people and keep improving." },
    ],
    supportNote: "The app is free and shows ads, which help keep it running.",
  },
  downloadTitle: "Get Cazadores Perú",
  downloadBody: "Free for Android and iOS. The links will show up here once the app is live in the stores.",
  notice: {
    title: "Unofficial app",
    body: "Cazadores Perú is an independent Nekodojo app. It isn't affiliated with Peru's Ministry of the Interior or the Peruvian National Police. It shows public data from the Rewards Program, which may change without notice.",
    source: "Always check recompensas.pe",
  },
};

export const peruxhunterContent: Record<Locale, Content> = { es, en };
