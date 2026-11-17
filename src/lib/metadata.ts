import type { Metadata } from "next";
import { defaultLocale, locales, localizePath, ogLocale, type Locale } from "@/i18n/config";

type Options = {
  locale: Locale;
  /** Internal path, e.g. "/studio" or "/apps/goals/privacy" */
  path: string;
  title: string;
  description: string;
  /** Absolute URL when the main version of this page lives elsewhere (AnimeQuote). */
  canonical?: string;
  siteName?: string;
  noindex?: boolean;
  /** Share image (path or URL). Leave it out to use the opengraph-image file next to the page. */
  image?: { url: string; alt: string };
};

export function pageMetadata({ locale, path, title, description, canonical, siteName, noindex, image }: Options): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localizePath(l, path);
  languages["x-default"] = localizePath(defaultLocale, path);

  return {
    title,
    description,
    alternates: { canonical: canonical ?? localizePath(locale, path), languages },
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
