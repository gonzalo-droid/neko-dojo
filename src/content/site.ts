import type { Locale } from "@/i18n/config";

/** Public URL. Set NEXT_PUBLIC_SITE_URL in Vercel once nekodojo.com is connected. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nekodojo.com").replace(/\/$/, "");

export const STUDIO_NAME = "Nekodojo";
export const CONTACT_EMAIL = "contacto@gondroid.dev";
export const INSTAGRAM_URL = "https://www.instagram.com/neko.manga.cix/";

export const tagline: Record<Locale, string> = {
  es: "Pequeñas apps. Grandes posibilidades.",
  en: "Small apps. Big possibilities.",
};
