import type { Locale } from "@/i18n/config";

type L<T = string> = Record<Locale, T>;

export type AppSlug = "animequote" | "mtcquiz" | "apruebasucamec" | "peruxhunter" | "anki-dojo" | "goals";

/**
 * available       → published in a store
 * in-development  → being built, has a waitlist
 * testing         → in TestFlight / Play testing, not public in the stores yet
 * pending         → status not confirmed yet, has a waitlist
 */
export type AppStatus = "available" | "testing" | "in-development" | "pending";

export type StoreLink = {
  store: "google-play" | "app-store";
  /** null = link not confirmed yet; the UI shows "pending" instead of a button. */
  url: string | null;
};

export type Faq = { q: string; a: string };

export type AppEntry = {
  slug: AppSlug;
  name: string;
  status: AppStatus;
  /** True while texts, icon or screenshots are placeholders. */
  provisional: boolean;
  icon: { src: string } | { glyph: string };
  /** Small preview of the app's identity, used on studio cards. */
  preview: { canvas: string; ink: string; muted: string; accent: string; fontVar: string };
  tagline: L;
  summary: L;
  stores: StoreLink[];
  /** Real average rating shown in the stores. Leave it out if there is none. */
  rating?: number;
  /**
   * Real screenshot for the studio cards (public path). framed: the image already has its own
   * phone mockup; otherwise the card draws one around the bare screen.
   */
  screenshot?: { src: string; width: number; height: number; alt: L; framed?: boolean };
  legal:
    | {
        mode: "live";
        /** Last update of each document: "YYYY-MM-DD", or "YYYY-MM" when only the month is known. */
        privacy: string;
        terms: string;
        /**
         * Where the original is published, when this site holds a copy (its Spanish page then
         * points canonical there). Leave it out when this site is the original.
         */
        publishedAt?: { privacy: string; terms: string };
      }
    | { mode: "draft" };
  support: {
    faq: L<Faq[]>;
    /** Steps to delete data. Shown on the app's support page under a stable anchor. */
    dataDeletion: L<string[]>;
  };
};

export const apps: AppEntry[] = [
  {
    slug: "animequote",
    name: "AnimeQuote",
    status: "available",
    provisional: false,
    icon: { src: "/apps/animequote/logo.png" },
    preview: { canvas: "#F7F4FF", ink: "#1C1638", muted: "#625882", accent: "#6D4AE0", fontVar: "--font-playfair" },
    tagline: {
      es: "Frases del universo anime, en tu pantalla cada día",
      en: "Anime quotes on your screen, every day",
    },
    summary: {
      es: "Frases de anime en notificaciones, en un widget y como imágenes para compartir.",
      en: "Anime quotes in notifications, in a widget and as images to share.",
    },
    stores: [
      { store: "google-play", url: "https://play.google.com/store/apps/details?id=com.gondroid.quoteanime" },
      { store: "app-store", url: "https://apps.apple.com/pe/app/anime-quote-frases-de-anime/id6762100338?l=en-GB" },
    ],
    rating: 4.5,
    screenshot: {
      src: "/apps/animequote/home_app.png",
      width: 900,
      height: 1901,
      framed: true,
      alt: {
        es: "Pantalla principal de AnimeQuote mostrando una frase de anime a pantalla completa",
        en: "AnimeQuote home screen showing a full-screen anime quote",
      },
    },
    legal: {
      mode: "live",
      privacy: "2026-04",
      terms: "2026-04",
      publishedAt: {
        privacy: "https://animequote.app/privacy-policy",
        terms: "https://animequote.app/terms-and-conditions",
      },
    },
    support: {
      faq: {
        es: [
          { q: "¿Necesito una cuenta?", a: "No. AnimeQuote se usa sin registro." },
          { q: "¿Dónde se guardan mis favoritas?", a: "Solo en tu dispositivo. No se envían a ningún servidor." },
          { q: "No me llegan las notificaciones", a: "Revisa que estén activadas en la app y en los ajustes del sistema, y que la hora actual esté dentro del horario que elegiste." },
        ],
        en: [
          { q: "Do I need an account?", a: "No. AnimeQuote works without signing up." },
          { q: "Where are my favorites stored?", a: "Only on your device. They are never sent to a server." },
          { q: "I'm not getting notifications", a: "Check that they are on in the app and in your system settings, and that the current time is inside the schedule you picked." },
        ],
      },
      dataDeletion: {
        es: [
          "AnimeQuote no crea cuentas, así que no hay una cuenta que eliminar.",
          "Tus favoritas viven solo en tu dispositivo. Para borrarlas, quítalas desde la app o borra los datos de la app en los ajustes del sistema.",
          "Al desinstalar la app se elimina toda la información guardada localmente.",
        ],
        en: [
          "AnimeQuote doesn't create accounts, so there is no account to delete.",
          "Your favorites live only on your device. To remove them, unfavorite them in the app or clear the app's data in your system settings.",
          "Uninstalling the app deletes everything stored locally.",
        ],
      },
    },
  },
  {
    slug: "mtcquiz",
    name: "MTCQuiz",
    status: "available",
    provisional: false,
    icon: { src: "/apps/mtcquiz/logo.png" },
    preview: { canvas: "#F6F7FC", ink: "#161B3D", muted: "#4F5675", accent: "#3949AB", fontVar: "--font-outfit" },
    tagline: {
      es: "Practica el balotario del MTC y llega listo a tu examen de brevete",
      en: "Practice the MTC question bank and walk into your license test ready",
    },
    summary: {
      es: "Las preguntas oficiales del examen de reglas de tránsito del MTC, con simulacros cronometrados y sin internet.",
      en: "The official questions of Peru's MTC traffic rules test, with timed practice exams and no internet needed.",
    },
    stores: [
      { store: "google-play", url: "https://play.google.com/store/apps/details?id=com.gondroid.mtcquiz" },
      { store: "app-store", url: "https://apps.apple.com/pe/app/mtcquiz-examen-brevete-per%C3%BA/id6800840447" },
    ],
    screenshot: {
      src: "/apps/mtcquiz/home.webp",
      width: 920,
      height: 2000,
      alt: {
        es: "Pantalla de inicio de MTCQuiz con las categorías de licencia A-I, A-IIa, A-IIb y A-IIIa",
        en: "MTCQuiz home screen listing the A-I, A-IIa, A-IIb and A-IIIa license categories",
      },
    },
    legal: {
      mode: "live",
      privacy: "2026-11-16",
      terms: "2026-08-11",
      publishedAt: {
        privacy: "https://gonzalo-lozg.me/apps-docs/mtcquiz/politics/",
        terms: "https://gonzalo-lozg.me/apps-docs/mtcquiz/term/",
      },
    },
    support: {
      faq: {
        es: [
          { q: "¿MTCQuiz es una app oficial?", a: "No. Es una app independiente de Nekodojo y no está afiliada al Ministerio de Transportes y Comunicaciones (MTC)." },
          { q: "¿De dónde salen las preguntas?", a: "Del balotario oficial que publica el MTC para cada categoría de licencia. Copiamos preguntas, respuestas e imágenes tal cual, incluso sus erratas, porque el examen real se califica contra ese documento." },
          { q: "¿Qué categorías incluye?", a: "Nueve: A-I, A-IIa, A-IIb, A-IIIa, A-IIIb y A-IIIc de la clase A, y B-IIa, B-IIb y B-IIc de la clase B. En total, unas 2.200 preguntas." },
          { q: "¿Necesito internet o una cuenta?", a: "No necesitas cuenta. Las preguntas están guardadas en la app, así que puedes estudiar y hacer simulacros sin conexión." },
          { q: "¿Es gratis?", a: "Sí, con anuncios. Premium es opcional y quita los anuncios; se paga a través de la tienda." },
        ],
        en: [
          { q: "Is MTCQuiz an official app?", a: "No. It's an independent Nekodojo app and isn't affiliated with Peru's Ministry of Transport and Communications (MTC)." },
          { q: "Where do the questions come from?", a: "From the official question bank the MTC publishes for each license category. Questions, answers and images are copied as they are, typos included, because the real test is graded against that document." },
          { q: "Which categories are included?", a: "Nine: A-I, A-IIa, A-IIb, A-IIIa, A-IIIb and A-IIIc in class A, and B-IIa, B-IIb and B-IIc in class B. About 2,200 questions in total." },
          { q: "Do I need internet or an account?", a: "You don't need an account. The questions are stored in the app, so you can study and take practice tests offline." },
          { q: "Is it free?", a: "Yes, with ads. Premium is optional and removes the ads; it's paid through the store." },
        ],
      },
      dataDeletion: {
        es: [
          "MTCQuiz no te pide crear una cuenta, así que no hay una cuenta que eliminar.",
          "Tus resultados, tu historial y tu racha de estudio se guardan solo en tu dispositivo. Para borrarlos, borra los datos de la app en los ajustes del sistema o desinstálala.",
          "Para pedir el acceso, la corrección o la eliminación de otros datos (por ejemplo, los de analítica o reportes de errores en Android), escribe al correo que figura en la política de privacidad.",
        ],
        en: [
          "MTCQuiz doesn't ask you to create an account, so there is no account to delete.",
          "Your results, history and study streak are stored only on your device. To delete them, clear the app's data in your system settings or uninstall it.",
          "To ask for access to, correction or deletion of other data (for example, analytics or crash reports on Android), write to the email listed in the privacy policy.",
        ],
      },
    },
  },
  {
    slug: "apruebasucamec",
    name: "ApruebaSUCAMEC",
    // Published on Google Play and the App Store (links confirmed 2026-11-25).
    // Package name and bundle id: com.nekodojo.sucamecquiz.
    status: "available",
    // Texts, logo and screenshots are real (iOS build of the app).
    provisional: false,
    icon: { src: "/apps/apruebasucamec/logo.png" },
    preview: { canvas: "#F4F6FB", ink: "#1A1F36", muted: "#4A5272", accent: "#1A3A6B", fontVar: "--font-poppins" },
    tagline: {
      es: "Practica el examen de SUCAMEC y llega listo a tu licencia de armas",
      en: "Practice for the SUCAMEC test and walk in ready for your firearms license",
    },
    summary: {
      es: "Preguntas tipo examen para el examen teórico de SUCAMEC, con simulacros cronometrados y sin internet.",
      en: "Exam-style questions for Peru's SUCAMEC written test, with timed practice exams and no internet needed.",
    },
    stores: [
      { store: "google-play", url: "https://play.google.com/store/apps/details?id=com.nekodojo.sucamecquiz" },
      { store: "app-store", url: "https://apps.apple.com/pe/app/apruebasucamec/id6836632721" },
    ],
    screenshot: {
      src: "/apps/apruebasucamec/home.webp",
      width: 920,
      height: 1999,
      alt: {
        es: "Pantalla de inicio de ApruebaSUCAMEC con los modos de estudio y los tipos de licencia L1 a L6",
        en: "ApruebaSUCAMEC home screen with the study modes and the L1 to L6 license types",
      },
    },
    legal: {
      mode: "live",
      privacy: "2026-11-23",
      terms: "2026-11-17",
    },
    support: {
      faq: {
        es: [
          { q: "¿ApruebaSUCAMEC es una app oficial?", a: "No. Es una app independiente de Nekodojo y no está afiliada a la SUCAMEC ni a ninguna entidad del Estado peruano." },
          { q: "¿Cuántas preguntas tiene?", a: "100 preguntas tipo examen: 65 de opción múltiple y 35 de verdadero o falso. El simulacro tipo examen y el personalizado eligen preguntas al azar en cada intento." },
          { q: "¿Cómo funciona el simulacro tipo examen?", a: "Te da 5 preguntas al azar y 10 minutos para responderlas. Al terminar ves tu porcentaje y si aprobaste (70 % o más). Durante este simulacro no se muestran anuncios." },
          { q: "¿Necesito internet o una cuenta?", a: "No necesitas cuenta. Las preguntas y el manual vienen dentro de la app, así que estudias sin conexión. Solo los anuncios y las páginas legales usan internet." },
          { q: "¿Es gratis?", a: "Sí, con anuncios: un banner en los modos de práctica. Antes de cargar anuncios, la app te pide tu consentimiento cuando corresponde." },
        ],
        en: [
          { q: "Is ApruebaSUCAMEC an official app?", a: "No. It's an independent Nekodojo app and isn't affiliated with SUCAMEC or any Peruvian government body." },
          { q: "How many questions does it have?", a: "100 exam-style questions: 65 multiple choice and 35 true or false. The exam simulation and the custom practice pick random questions on every attempt." },
          { q: "How does the exam simulation work?", a: "It gives you 5 random questions and 10 minutes to answer them. When you finish, you see your score and whether you passed (70% or more). No ads are shown during this simulation." },
          { q: "Do I need internet or an account?", a: "You don't need an account. The questions and the manual are inside the app, so you can study offline. Only the ads and the legal pages use the internet." },
          { q: "Is it free?", a: "Yes, with ads: a banner in the practice modes. Before loading ads, the app asks for your consent where it applies." },
        ],
      },
      dataDeletion: {
        es: [
          "ApruebaSUCAMEC no crea cuentas, así que no hay una cuenta que eliminar.",
          "Tu historial de resultados y el tamaño de letra se guardan solo en tu teléfono. Para borrar el historial, ve a Configuraciones → Limpiar historial. Para borrarlo todo, borra los datos de la app en los ajustes del sistema o desinstálala.",
          "Los datos que usa Google AdMob para mostrar anuncios los gestiona Google. Puedes cambiar tu consentimiento en Configuraciones → Preferencias de anuncios (si la opción aparece en tu región) y restablecer el identificador de publicidad en los ajustes de tu teléfono.",
        ],
        en: [
          "ApruebaSUCAMEC doesn't create accounts, so there is no account to delete.",
          "Your results history and font size are stored only on your phone. To delete the history, go to Settings → Clear history. To delete everything, clear the app's data in your system settings or uninstall it.",
          "The data Google AdMob uses to show ads is handled by Google. You can change your consent in Settings → Ad preferences (if the option appears in your region) and reset the advertising ID in your phone's settings.",
        ],
      },
    },
  },
  {
    slug: "peruxhunter",
    name: "Cazadores Perú",
    // On the App Store since 2026-11-25 (iPhone). Android is still in Play testing; when it's public, paste
    //   https://play.google.com/store/apps/details?id=com.nekodojo.peruxhunter
    // in `stores`; the landing's download box and every list update on their own.
    status: "available",
    // Texts are the app's own; screenshots are real (iOS) with faces, names and IDs pixelated.
    provisional: false,
    icon: { src: "/apps/peruxhunter/logo.png" },
    preview: { canvas: "#EFE4CC", ink: "#2B1D10", muted: "#5A4630", accent: "#7A1D12", fontVar: "--font-archivo" },
    tagline: {
      es: "Conoce a los más buscados del Perú. Si los reconoces, llama gratis.",
      en: "Know Peru's most wanted. If you recognize one, call for free.",
    },
    summary: {
      es: "Los buscados del Programa de Recompensas del Mininter como carteles «Se busca», con la línea gratuita 0-800-40-007 a un toque. App no oficial.",
      en: "The people wanted by Peru's Interior Ministry Rewards Program as “Wanted” posters, with the free 0-800-40-007 hotline one tap away. Unofficial app.",
    },
    stores: [
      // The live store first, so the pending one doesn't lead.
      { store: "app-store", url: "https://apps.apple.com/pe/app/cazadores-per%C3%BA/id6836196201" },
      { store: "google-play", url: null },
    ],
    screenshot: {
      src: "/apps/peruxhunter/home.webp",
      width: 920,
      height: 1996,
      alt: {
        es: "Inicio de Cazadores Perú: línea gratuita 0-800-40-007 y los más buscados como carteles (caras y nombres pixelados)",
        en: "Cazadores Perú home: the free 0-800-40-007 hotline and the most wanted as posters (faces and names pixelated)",
      },
    },
    // The app opens these pages from AppConfig.kt (this site is the original).
    legal: {
      mode: "live",
      privacy: "2026-11-25",
      terms: "2026-11-18",
    },
    support: {
      faq: {
        es: [
          { q: "¿Cazadores Perú es una app oficial?", a: "No. Es una app independiente de Nekodojo. No está afiliada al Ministerio del Interior ni a la Policía Nacional del Perú." },
          { q: "¿De dónde salen los datos?", a: "De la web pública del Programa de Recompensas del Ministerio del Interior (recompensas.pe). La lista se actualiza cada semana y puede cambiar sin aviso: verifica siempre en recompensas.pe." },
          { q: "¿La app envía o guarda mis reportes?", a: "No. Para reportar, la app marca la línea gratuita 0-800-40-007 (o el 1818) o abre tu app de correo con el texto listo para que lo envíes tú." },
          { q: "¿Quién paga la recompensa?", a: "El Estado, después de validar la información. La app no interviene en ese proceso ni puede asegurar que proceda." },
          { q: "¿Qué significan las clases S, A, B y C?", a: "Son un sello de la app que agrupa a los buscados según el monto de la recompensa. No son una calificación oficial." },
          { q: "¿Es gratis?", a: "Sí. La app es gratuita y muestra anuncios, que ayudan a mantener el proyecto: banners en algunas pantallas y, antes de compartir un cartel, un anuncio corto que puedes aceptar. La pantalla de reporte nunca tiene anuncios." },
        ],
        en: [
          { q: "Is Cazadores Perú an official app?", a: "No. It's an independent Nekodojo app. It isn't affiliated with Peru's Ministry of the Interior or the Peruvian National Police." },
          { q: "Where does the data come from?", a: "From the public website of the Interior Ministry's Rewards Program (recompensas.pe). The list is updated every week and may change without notice: always check recompensas.pe." },
          { q: "Does the app send or store my reports?", a: "No. To report, the app dials the free 0-800-40-007 hotline (or 1818) or opens your email app with the text ready for you to send." },
          { q: "Who pays the reward?", a: "The Peruvian State, after it validates the information. The app takes no part in that process and can't promise a reward." },
          { q: "What do the S, A, B and C classes mean?", a: "They're the app's own badge, grouping wanted people by reward amount. They aren't an official rating." },
          { q: "Is it free?", a: "Yes. The app is free and shows ads, which help keep the project going: banners on some screens and, before you share a poster, a short ad you can accept. The report screen never has ads." },
        ],
      },
      dataDeletion: {
        es: [
          "Cazadores Perú no crea cuentas, así que no hay una cuenta que eliminar.",
          "Tus carteles guardados y tus preferencias viven solo en tu teléfono. Para borrarlos, quítalos desde Mis carteles, borra los datos de la app en los ajustes del sistema o desinstálala.",
          "Los datos que usa Google AdMob para mostrar anuncios los gestiona Google. Puedes cambiar tu consentimiento en Ajustes → Preferencias de anuncios (si la opción aparece en tu región) y restablecer el identificador de publicidad en los ajustes de tu teléfono.",
        ],
        en: [
          "Cazadores Perú doesn't create accounts, so there is no account to delete.",
          "Your saved posters and preferences live only on your phone. To delete them, remove them from My posters, clear the app's data in your system settings or uninstall it.",
          "The data Google AdMob uses to show ads is handled by Google. You can change your consent in Settings → Ad preferences (if the option appears in your region) and reset the advertising ID in your phone's settings.",
        ],
      },
    },
  },
  {
    slug: "anki-dojo",
    name: "Anki Dojo",
    status: "in-development",
    provisional: true,
    icon: { glyph: "語" },
    preview: { canvas: "#F5EFE4", ink: "#1F1B16", muted: "#5E554A", accent: "#B5361F", fontVar: "--font-zen-kaku" },
    tagline: { es: "Nuevas palabras. Nuevos mundos.", en: "New words. New worlds." },
    summary: {
      es: "Aprende idiomas con tarjetas de estudio y ayuda de inteligencia artificial.",
      en: "Learn languages with flashcards and help from AI.",
    },
    stores: [],
    legal: { mode: "draft" },
    support: {
      faq: {
        es: [{ q: "¿Cuándo sale Anki Dojo?", a: "Todavía no hay fecha. Únete a la lista de espera para enterarte primero." }],
        en: [{ q: "When does Anki Dojo launch?", a: "There's no date yet. Join the waitlist to hear first." }],
      },
      dataDeletion: {
        es: ["[Pendiente: se definirá antes del lanzamiento.]"],
        en: ["[Pending: to be defined before launch.]"],
      },
    },
  },
  {
    slug: "goals",
    name: "Goals",
    status: "pending",
    provisional: true,
    icon: { glyph: "G" },
    preview: { canvas: "#16161A", ink: "#F5F5F2", muted: "#A3A39C", accent: "#FF6B3D", fontVar: "--font-sora" },
    tagline: { es: "Grandes metas. Pequeños pasos.", en: "Big goals. Small steps." },
    summary: {
      es: "Registra tus metas y sigue tu progreso paso a paso.",
      en: "Set your goals and track your progress step by step.",
    },
    stores: [],
    legal: { mode: "draft" },
    support: {
      faq: {
        es: [{ q: "¿Goals ya está disponible?", a: "Todavía no. Únete a la lista de espera para enterarte cuando salga." }],
        en: [{ q: "Is Goals available yet?", a: "Not yet. Join the waitlist to hear when it's out." }],
      },
      dataDeletion: {
        es: ["[Pendiente: se definirá antes del lanzamiento.]"],
        en: ["[Pending: to be defined before launch.]"],
      },
    },
  },
];

/** Texts that still start with a [Pending]/[Placeholder] marker are kept out of the page. */
export function isPlaceholder(text: string): boolean {
  return /^\[(pendiente|pending|provisional|placeholder)/i.test(text.trim());
}

/** FAQ entries ready to publish (question and answer without markers). */
export function readyFaq(items: Faq[]): Faq[] {
  return items.filter((f) => !isPlaceholder(f.q) && !isPlaceholder(f.a));
}

/** Store links that actually go somewhere. */
export function liveStores(app: AppEntry): (StoreLink & { url: string })[] {
  return app.stores.filter((s): s is StoreLink & { url: string } => !!s.url);
}

/**
 * A published app whose page is still full of placeholders stays out of search
 * until the real content is in (same idea as the draft legal documents).
 */
export function isIndexable(app: AppEntry): boolean {
  return !(app.status === "available" && app.provisional);
}

export function getApp(slug: AppSlug): AppEntry {
  const app = apps.find((a) => a.slug === slug);
  if (!app) throw new Error(`Unknown app: ${slug}`);
  return app;
}

/** Most recent update of an app's legal documents. */
export function legalUpdated(legal: { privacy: string; terms: string }): string {
  return legal.privacy > legal.terms ? legal.privacy : legal.terms;
}

/** "2026-11-16" → "16 de noviembre de 2026" / "November 16, 2026"; "2026-04" → "abril de 2026". */
export function formatDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d || 1)).toLocaleDateString(locale === "es" ? "es-PE" : "en-US", {
    ...(d ? { day: "numeric" } : {}),
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const platformName = { "google-play": "Android", "app-store": "iPhone" } as const;
const storeLabel: Record<Locale, Record<StoreLink["store"], string>> = {
  es: { "google-play": "Google Play", "app-store": "App Store" },
  en: { "google-play": "Google Play", "app-store": "the App Store" },
};

/**
 * Download box copy built from `stores`, so publishing a store link updates every landing:
 * "Descárgala para Android y iPhone" / "Gratis en Google Play y App Store. La versión de Android llega pronto."
 */
export function downloadCopy(app: AppEntry, locale: Locale): { title: string; body: string } {
  const and = locale === "es" ? " y " : " and ";
  const live = liveStores(app);
  const soon = app.stores.filter((s) => !s.url).map((s) => platformName[s.store]).join(and);
  const platforms = live.map((s) => platformName[s.store]).join(and);
  const stores = live.map((s) => storeLabel[locale][s.store]).join(and);
  if (locale === "es")
    return {
      title: platforms ? `Descárgala para ${platforms}` : "Muy pronto en las tiendas",
      body: [stores && `Gratis en ${stores}.`, soon && `La versión de ${soon} llega pronto.`].filter(Boolean).join(" "),
    };
  return {
    title: platforms ? `Get it for ${platforms}` : "Coming soon to the stores",
    body: [stores && `Free on ${stores}.`, soon && `The ${soon} version is coming soon.`].filter(Boolean).join(" "),
  };
}
