import type { Locale } from "@/i18n/config";

/**
 * Public URL used for canonical, hreflang, Open Graph and the sitemap.
 * 1. NEXT_PUBLIC_SITE_URL, if set in Vercel.
 * 2. Otherwise the project's production domain that Vercel exposes at build time
 *    (nekodojo.app). This keeps canonicals pointing at a host that exists.
 * 3. Local builds fall back to the production domain.
 */
const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelProduction ? `https://${vercelProduction}` : "https://nekodojo.app")
).replace(/\/$/, "");

export const STUDIO_NAME = "Nekodojo";
export const CONTACT_EMAIL = "nekodojo.apps@gmail.com";
/** Public WhatsApp that already appeared on the gonzalo-lozg.me portfolio. */
export const WHATSAPP_URL = "https://wa.me/51924262747";
/** The studio's Instagram: studio pages, structured data and app waitlist fallbacks. */
/** Development partner credited in the footers. */
export const COBAYATECH_URL = "https://cobayatech.com";
/** Online SUCAMEC quiz linked from the ApruebaSUCAMEC landing. */
export const SUCAMEC_WEB_QUIZ_URL = "https://alvaro-barrera.me/sucamec/";
/** GA4 property; it loads only after the visitor accepts the cookie notice (components/shared/Consent). */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-EHYDPDFB5E";
export const INSTAGRAM_URL = "https://www.instagram.com/nekodojo.apps/";
/** AnimeQuote's own link, kept as in the original site (quote-anime/src/lib/constants.ts). */
export const ANIMEQUOTE_INSTAGRAM_URL = "https://www.instagram.com/neko.manga.cix/";

export const tagline: Record<Locale, string> = {
  es: "Pequeñas apps. Grandes posibilidades.",
  en: "Small apps. Big possibilities.",
};
