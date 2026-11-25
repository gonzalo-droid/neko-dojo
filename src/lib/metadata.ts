import type { Metadata } from "next";
import { defaultLocale, locales, localizePath, ogLocale, type Locale } from "@/i18n/config";
import { apps } from "@/content/apps";

/**
 * Spanish pages whose original lives on another site (copied legal documents, e.g. MTCQuiz).
 * Their Spanish version points canonical there, so it stays out of the sitemap and hreflang.
 */
export function externalOriginal(path: string): string | undefined {
  const m = path.match(/^\/apps\/([^/]+)\/(privacy|terms)$/);
  const app = m ? apps.find((a) => a.slug === m[1]) : undefined;
  return m && app?.legal.mode === "live" ? app.legal.publishedAt?.[m[2] as "privacy" | "terms"] : undefined;
}

type Options = {
  locale: Locale;
  /** Internal path, e.g. "/studio" or "/apps/goals/privacy" */
  path: string;
  title: string;
  description: string;
  siteName?: string;
  noindex?: boolean;
  /** Share image (path or URL). Leave it out to use the opengraph-image file next to the page. */
  image?: { url: string; alt: string };
};

export function pageMetadata({ locale, path, title, description, siteName, noindex, image }: Options): Metadata {
  const original = externalOriginal(path);
  // No hreflang when the Spanish version is not canonical here: it would point at a non-canonical page.
  const languages: Record<string, string> | undefined = original
    ? undefined
    : { ...Object.fromEntries(locales.map((l) => [l, localizePath(l, path)])), "x-default": localizePath(defaultLocale, path) };

  return {
    title,
    description,
    alternates: { canonical: (locale === "es" && original) || localizePath(locale, path), languages },
    openGraph: {
      title,
      description,
      url: localizePath(locale, path),
      siteName: siteName ?? "Nekodojo",
      locale: ogLocale[locale],
      type: "website",
      ...(image ? { images: [image] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
