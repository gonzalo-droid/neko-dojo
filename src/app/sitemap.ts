import type { MetadataRoute } from "next";
import { defaultLocale, locales, localizePath } from "@/i18n/config";
import { apps, isIndexable } from "@/content/apps";
import { about } from "@/content/about";
import { SITE_URL } from "@/content/site";
import { getPosts } from "@/lib/blog";

/** Every public page in both languages, with hreflang alternates (x-default = Spanish). Drafts and placeholder pages are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/apps", "/studio", "/about", "/blog", "/support", "/legal"];
  for (const app of apps) {
    if (!isIndexable(app)) continue;
    paths.push(`/apps/${app.slug}`, `/apps/${app.slug}/support`);
    if (app.legal.mode === "live") paths.push(`/apps/${app.slug}/privacy`, `/apps/${app.slug}/terms`);
  }
  for (const project of about.projects) paths.push(`/about/projects/${project.slug}`);
  const modified: Record<string, string> = {};
  for (const post of getPosts("es")) {
    paths.push(`/blog/${post.slug}`);
    if (post.date) modified[`/blog/${post.slug}`] = post.date;
  }
  const url = (locale: (typeof locales)[number], path: string) => `${SITE_URL}${localizePath(locale, path)}`;
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: url(locale, path),
      ...(modified[path] ? { lastModified: modified[path] } : {}),
      alternates: {
        languages: { ...Object.fromEntries(locales.map((l) => [l, url(l, path)])), "x-default": url(defaultLocale, path) },
      },
    })),
  );
}
