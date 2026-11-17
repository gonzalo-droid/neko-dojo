import type { Locale } from "@/i18n/config";

/**
 * Public URL used for canonical, hreflang, Open Graph and the sitemap.
 * 1. NEXT_PUBLIC_SITE_URL, if set in Vercel.
 * 2. Otherwise the project's production domain that Vercel exposes at build time
 *    (neko-dojo.vercel.app today; it switches to nekodojo.com by itself once that
 *    domain is added to the project). This keeps canonicals pointing at a host that exists.
 * 3. Local builds fall back to the future domain.
 */
const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelProduction ? `https://${vercelProduction}` : "https://nekodojo.com")
).replace(/\/$/, "");

export const STUDIO_NAME = "Nekodojo";
export const CONTACT_EMAIL = "contacto@gondroid.dev";
/** The studio's Instagram: studio pages, structured data and app waitlist fallbacks. */
export const INSTAGRAM_URL = "https://www.instagram.com/nekodojo.apps/";
/** AnimeQuote's own link, kept as in the original site (quote-anime/src/lib/constants.ts). */
export const ANIMEQUOTE_INSTAGRAM_URL = "https://www.instagram.com/neko.manga.cix/";

export const tagline: Record<Locale, string> = {
  es: "Pequeñas apps. Grandes posibilidades.",
  en: "Small apps. Big possibilities.",
};
