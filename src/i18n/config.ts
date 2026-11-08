export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Cookie that remembers the language the visitor picked. */
export const LOCALE_COOKIE = "locale";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/**
 * Paths are in English in every language. Spanish (default) has no prefix,
 * English uses /en: /studio ↔ /en/studio, /apps/goals/privacy ↔ /en/apps/goals/privacy.
 */
export function localizePath(locale: Locale, path = "/"): string {
  const clean = path.split("/").filter(Boolean).join("/");
  if (locale === defaultLocale) return `/${clean}`;
  return `/${locale}${clean ? `/${clean}` : ""}`;
}

/**
 * "/en/studio" → { locale: "en", prefixed: true,  internal: "/studio" }
 * "/studio"    → { locale: null, prefixed: false, internal: "/studio" }
 */
export function parsePath(pathname: string): { locale: Locale | null; internal: string } {
  const parts = pathname.split("/").filter(Boolean);
  if (isLocale(parts[0])) return { locale: parts[0], internal: `/${parts.slice(1).join("/")}` };
  return { locale: null, internal: `/${parts.join("/")}` };
}

export const htmlLang: Record<Locale, string> = { es: "es", en: "en" };
export const ogLocale: Record<Locale, string> = { es: "es_PE", en: "en_US" };
