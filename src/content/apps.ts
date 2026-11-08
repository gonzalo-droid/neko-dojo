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
  legal:
    | { mode: "live"; updated: L; publishedAt: { privacy: string; terms: string } }
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
    provisional: true,
    icon: { glyph: "M" },
    preview: { canvas: "#FAFAF7", ink: "#13201F", muted: "#4B5B59", accent: "#0F766E", fontVar: "--font-outfit" },
    tagline: { es: "Tu próximo destino: la licencia.", en: "Next stop: your license." },
    summary: {
      es: "Cuestionarios para preparar el examen de conocimientos de la licencia de conducir en Perú.",
      en: "Practice quizzes for Peru's driver's license knowledge test.",
    },
    stores: [
      { store: "google-play", url: null },
      { store: "app-store", url: null },
    ],
    legal: { mode: "draft" },
    support: {
      faq: {
        es: [
          { q: "¿MTCQuiz es una app oficial?", a: "No. Es una app independiente de Nekodojo y no está afiliada al Ministerio de Transportes y Comunicaciones." },
          { q: "[Provisional] ¿De dónde salen las preguntas?", a: "[Pendiente de confirmar la fuente exacta del banco de preguntas.]" },
        ],
        en: [
          { q: "Is MTCQuiz an official app?", a: "No. It's an independent Nekodojo app and isn't affiliated with Peru's Ministry of Transport and Communications." },
          { q: "[Placeholder] Where do the questions come from?", a: "[Exact source of the question bank pending confirmation.]" },
        ],
      },
      dataDeletion: {
        es: ["[Pendiente: describir si la app guarda datos y cómo eliminarlos.]"],
        en: ["[Pending: describe whether the app stores data and how to delete it.]"],
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

export function getApp(slug: AppSlug): AppEntry {
  const app = apps.find((a) => a.slug === slug);
  if (!app) throw new Error(`Unknown app: ${slug}`);
  return app;
}

/** Studio news. Only facts that can be checked; add new entries at the top. */
export const news: { app: AppSlug; text: L }[] = [
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
