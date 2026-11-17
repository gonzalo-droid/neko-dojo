import type { MetadataRoute } from "next";
import { locales, localizePath } from "@/i18n/config";
import { apps, isIndexable } from "@/content/apps";
import { SITE_URL } from "@/content/site";
import { getPosts } from "@/lib/blog";

/** Every public page in both languages, with hreflang alternates. Drafts and placeholder pages are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/apps", "/studio", "/about", "/blog", "/support", "/legal"];
  for (const app of apps) {
    if (!isIndexable(app)) continue;
    paths.push(`/apps/${app.slug}`, `/apps/${app.slug}/support`);
    if (app.legal.mode === "live") paths.push(`/apps/${app.slug}/privacy`, `/apps/${app.slug}/terms`);
  }
  for (const post of getPosts("es")) paths.push(`/blog/${post.slug}`);
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localizePath(locale, path)}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localizePath(l, path)}`])) },
    })),
  );
}
