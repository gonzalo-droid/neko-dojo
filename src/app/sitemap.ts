import type { MetadataRoute } from "next";
import { locales, localizePath } from "@/i18n/config";
import { apps } from "@/content/apps";
import { SITE_URL } from "@/content/site";

/** Every public page in both languages, with hreflang alternates. Drafts are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/apps", "/studio", "/support", "/legal"];
  for (const app of apps) {
    paths.push(`/apps/${app.slug}`, `/apps/${app.slug}/support`);
    if (app.legal.mode === "live") paths.push(`/apps/${app.slug}/privacy`, `/apps/${app.slug}/terms`);
  }
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localizePath(locale, path)}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localizePath(l, path)}`])) },
    })),
  );
}
