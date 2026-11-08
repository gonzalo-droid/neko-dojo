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
};

export function pageMetadata({ locale, path, title, description, canonical, siteName, noindex }: Options): Metadata {
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
    },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
