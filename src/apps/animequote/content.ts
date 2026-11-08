import type { Locale } from "@/i18n/config";

/*
 * Landing content, ported from /Volumes/Neko/webs/quote-anime/src/lib/constants.ts
 * and its components. Spanish is the original; English is a translation.
 */

const IMG = "/apps/animequote";

export const RATINGS = { googlePlay: 4.5, appStore: 4.5 };

const es = {
  meta: {
    title: "AnimeQuote — Frases del universo anime",
    description: "Frases motivacionales del universo anime para Android e iOS. Notificaciones, widget, favoritos y más.",
  },
  nav: [
    { href: "#app", label: "La app" },
    { href: "#faq", label: "Preguntas" },
    { href: "#download", label: "Descargar" },
  ],
  download: "Descargar",
  themeToLight: "Cambiar a tema claro",
  themeToDark: "Cambiar a tema oscuro",
  hero: {
    title: "Frases del universo anime, en tu pantalla cada día",
    body: "Desliza, guarda tus favoritas y recíbelas en notificaciones o en tu widget. Gratis y sin registro.",
    screensLabel: "Pantallas de la app",
    screens: [
      { label: "Frases", src: `${IMG}/home_app.png`, alt: "Pantalla principal de AnimeQuote mostrando una frase de anime a pantalla completa" },
      { label: "Explorar", src: `${IMG}/category_app.png`, alt: "Pantalla Explorar de AnimeQuote con frases agrupadas por emoción" },
      { label: "Favoritas", src: `${IMG}/quotes_app.png`, alt: "Lista de frases favoritas guardadas en AnimeQuote" },
    ],
  },
  showcase: {
    title: "Cada frase, donde la necesites",
    share: {
      title: "Compártela como imagen",
      body: "Genera una tarjeta vertical con la frase, el autor y el anime. Lista para WhatsApp, Instagram o donde quieras, sin editores externos.",
      alt1: "Tarjeta con una frase de Satoru Gojo sobre el amor, de Jujutsu Kaisen",
      alt2: "Tarjeta con una frase de Wasuke Itadori sobre ayudar, de Jujutsu Kaisen",
    },
    notifications: {
      title: "Notificaciones en tu horario",
      body: "Elige de 1 a 10 frases al día y el rango de horas en que quieres recibirlas. Fuera de ese horario, la app no te molesta.",
      alt: "Pantalla Personalización de AnimeQuote con el horario permitido y la frecuencia de notificaciones",
    },
    widget: {
      title: "Un widget con frase nueva",
      body: "Ponlo en tu pantalla de inicio y ajusta su tamaño. Puede mostrar una frase nueva hasta 8 veces al día, o la cambias tú con un toque.",
      alt: "Widget de AnimeQuote en la pantalla de inicio mostrando una frase de Natsu Dragneel, de Fairy Tail",
    },
    basics: [
      { title: "Favoritos sin conexión", text: "Guarda una frase con un toque y vuelve a leerla cuando quieras, sin internet." },
      { title: "Explora por emoción", text: "Motivación, lucha, amor, esperanza… o mira todas las frases en una lista." },
      { title: "Frases nuevas cada semana", text: "Actualizamos el catálogo con frases de más animes." },
    ],
  },
  faq: {
    title: "¿Tienes dudas?",
    intro: "Si no encuentras tu respuesta, escríbenos a",
    items: [
      { q: "¿AnimeQuote es gratis?", a: "Sí, AnimeQuote es completamente gratis para descargar y usar, sin necesidad de registro." },
      { q: "¿Tiene anuncios?", a: "No mostramos anuncios intrusivos. La app está pensada para que disfrutes las frases sin interrupciones." },
      { q: "¿Cómo funcionan las notificaciones?", a: "Puedes elegir recibir de 1 a 10 frases al día, en el rango horario que prefieras, para no molestarte de noche." },
      { q: "¿Puedo guardar frases sin conexión a internet?", a: "Sí, tus frases favoritas se guardan offline y puedes acceder a ellas en cualquier momento, sin necesidad de conexión." },
      { q: "¿Qué pasa con mis datos y mi privacidad?", a: "No pedimos registro ni datos personales para usar la app. Puedes revisar el detalle completo en nuestra Política de Privacidad." },
    ],
  },
  downloadSection: {
    title: "Disponible en Android e iOS",
    body: "Únete a los fans del anime que reciben su dosis de inspiración cada día.",
    trust: ["Sin anuncios intrusivos", "Actualizaciones semanales de frases", "Gratis, sin registro"],
    instagram: "Síguenos en Instagram",
  },
  badges: {
    gpPre: "Disponible en",
    asPre: "Descargar en",
    gpLabel: "Descargar en Google Play",
    asLabel: "Descargar en App Store",
    gpCaption: "Gratis · Android 7.0+",
    asCaption: "Gratis · iOS",
    gpQr: "Código QR para descargar AnimeQuote en Google Play",
    asQr: "Código QR para descargar AnimeQuote en App Store",
  },
  sticky: { title: "Descarga AnimeQuote", close: "Cerrar" },
  footer: { privacy: "Política de Privacidad", terms: "Términos y Condiciones", support: "Soporte", contact: "Contacto" },
};

export type AqContent = typeof es;

const en: AqContent = {
  meta: {
    title: "AnimeQuote — Quotes from the anime universe",
    description: "Motivational anime quotes for Android and iOS. Notifications, a widget, favorites and more.",
  },
  nav: [
    { href: "#app", label: "The app" },
    { href: "#faq", label: "FAQ" },
    { href: "#download", label: "Download" },
  ],
  download: "Download",
  themeToLight: "Switch to light theme",
  themeToDark: "Switch to dark theme",
  hero: {
    title: "Anime quotes on your screen, every day",
    body: "Swipe, save your favorites and get them in notifications or on your widget. Free, no sign-up.",
    screensLabel: "App screens",
    screens: [
      { label: "Quotes", src: `${IMG}/home_app.png`, alt: "AnimeQuote home screen showing a full-screen anime quote" },
      { label: "Explore", src: `${IMG}/category_app.png`, alt: "AnimeQuote Explore screen with quotes grouped by emotion" },
      { label: "Favorites", src: `${IMG}/quotes_app.png`, alt: "List of favorite quotes saved in AnimeQuote" },
    ],
  },
  showcase: {
    title: "Every quote, wherever you need it",
    share: {
      title: "Share it as an image",
      body: "Create a vertical card with the quote, the character and the anime. Ready for WhatsApp, Instagram or anywhere else, no extra editing apps.",
      alt1: "Card with a Satoru Gojo quote about love, from Jujutsu Kaisen",
      alt2: "Card with a Wasuke Itadori quote about helping others, from Jujutsu Kaisen",
    },
    notifications: {
      title: "Notifications on your schedule",
      body: "Pick 1 to 10 quotes a day and the hours you want to get them. Outside that window, the app stays quiet.",
      alt: "AnimeQuote Personalization screen with the allowed hours and notification frequency",
    },
    widget: {
      title: "A widget with a fresh quote",
      body: "Add it to your home screen and resize it. It can show a new quote up to 8 times a day, or you can change it with a tap.",
      alt: "AnimeQuote widget on the home screen showing a Natsu Dragneel quote, from Fairy Tail",
    },
    basics: [
      { title: "Offline favorites", text: "Save a quote with one tap and read it again whenever you want, no internet needed." },
      { title: "Explore by emotion", text: "Motivation, struggle, love, hope… or see every quote in one list." },
      { title: "New quotes every week", text: "We keep adding quotes from more anime." },
    ],
  },
  faq: {
    title: "Questions?",
    intro: "If you can't find your answer, write to us at",
    items: [
      { q: "Is AnimeQuote free?", a: "Yes. AnimeQuote is completely free to download and use, with no sign-up." },
      { q: "Does it have ads?", a: "We don't show intrusive ads. The app is designed so you can enjoy the quotes without interruptions." },
      { q: "How do notifications work?", a: "You can choose to get 1 to 10 quotes a day, within the hours you prefer, so nothing bothers you at night." },
      { q: "Can I save quotes offline?", a: "Yes. Your favorite quotes are stored offline and you can open them anytime, no connection needed." },
      { q: "What about my data and privacy?", a: "We don't ask you to sign up or share personal data to use the app. See the full details in our Privacy Policy." },
    ],
  },
  downloadSection: {
    title: "Available on Android and iOS",
    body: "Join the anime fans who get their daily dose of inspiration.",
    trust: ["No intrusive ads", "New quotes every week", "Free, no sign-up"],
    instagram: "Follow us on Instagram",
  },
  badges: {
    gpPre: "Get it on",
    asPre: "Download on the",
    gpLabel: "Get it on Google Play",
    asLabel: "Download on the App Store",
    gpCaption: "Free · Android 7.0+",
    asCaption: "Free · iOS",
    gpQr: "QR code to download AnimeQuote on Google Play",
    asQr: "QR code to download AnimeQuote on the App Store",
  },
  sticky: { title: "Get AnimeQuote", close: "Close" },
  footer: { privacy: "Privacy Policy", terms: "Terms and Conditions", support: "Support", contact: "Contact" },
};

export const aqContent: Record<Locale, AqContent> = { es, en };
