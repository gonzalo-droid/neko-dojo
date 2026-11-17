import type { Locale } from "@/i18n/config";

type L<T = string> = Record<Locale, T>;

export type AppSlug = "animequote" | "mtcquiz" | "anki-dojo" | "goals";

/**
 * available       → published in a store
 * in-development  → being built, has a waitlist
 * pending         → status not confirmed yet, has a waitlist
 */
export type AppStatus = "available" | "in-development" | "pending";

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
  /** Real screenshot for the studio cards (public path). */
  screenshot?: { src: string; width: number; height: number; alt: L };
  legal:
    | {
        mode: "live";
        /** Most recent update of the two documents (shown on the studio's legal page). */
        updated: L;
        /** Per-document dates, when privacy and terms were updated on different days. */
        updatedByKind?: { privacy: L; terms: L };
        publishedAt: { privacy: string; terms: string };
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
      { store: "app-store", url: "https://apps.apple.com/pe/app/quoteanime-frases-de-anime/id6762100338?l=en-GB" },
    ],
    rating: 4.5,
    screenshot: {
      src: "/apps/animequote/home_app.png",
      width: 900,
      height: 1901,
      alt: {
        es: "Pantalla principal de AnimeQuote mostrando una frase de anime a pantalla completa",
        en: "AnimeQuote home screen showing a full-screen anime quote",
      },
    },
    legal: {
      mode: "live",
      updated: { es: "abril de 2026", en: "April 2026" },
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
      { store: "app-store", url: "https://apps.apple.com/app/id6800840447" },
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
      updated: { es: "16 de noviembre de 2026", en: "November 16, 2026" },
      updatedByKind: {
        privacy: { es: "16 de noviembre de 2026", en: "November 16, 2026" },
        terms: { es: "11 de agosto de 2026", en: "August 11, 2026" },
      },
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

/**
 * Studio news. Only facts that can be checked; add new entries at the top.
 * date: "YYYY-MM" of the real event. Leave it out if you don't know it; the date is then not shown.
 */
export const news: { app: AppSlug; text: L; date?: string }[] = [
  {
    app: "anki-dojo",
    text: {
      es: "Anki Dojo está en desarrollo. Abrimos la lista de espera.",
      en: "Anki Dojo is in development. The waitlist is open.",
    },
  },
  {
    app: "animequote",
    text: {
      es: "AnimeQuote ya está disponible en Android e iOS.",
      en: "AnimeQuote is out on Android and iOS.",
    },
  },
];
