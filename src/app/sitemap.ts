import type { MetadataRoute } from "next";
import { defaultLocale, locales, localizePath } from "@/i18n/config";
import { apps, isIndexable } from "@/content/apps";
import { about } from "@/content/about";
import { SITE_URL } from "@/content/site";
import { getPosts } from "@/lib/blog";
import { externalOriginal } from "@/lib/metadata";
import { MTC_BASE, MTC_CATEGORIES } from "@/lib/mtc";

/** Every public page in both languages, with hreflang alternates (x-default = Spanish). Drafts and placeholder pages are left out, and so are Spanish pages whose original lives elsewhere. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/studio", "/about", "/blog", "/support", "/legal"];
  for (const app of apps) {
    if (!isIndexable(app)) continue;
    paths.push(`/apps/${app.slug}`, `/apps/${app.slug}/support`);
    if (app.legal.mode === "live") paths.push(`/apps/${app.slug}/privacy`, `/apps/${app.slug}/terms`);
  }
  // MTC simulator: the hub and the question bank pages (the exam page itself is noindex).
  paths.push(MTC_BASE, `${MTC_BASE}/balotario`, ...MTC_CATEGORIES.map((k) => `${MTC_BASE}/balotario/${k.slug}`));
  for (const project of about.projects) paths.push(`/about/projects/${project.slug}`);
  const modified: Record<string, string> = {};
  for (const post of getPosts("es")) {
    paths.push(`/blog/${post.slug}`);
    if (post.date) modified[`/blog/${post.slug}`] = post.date;
  }
  const url = (locale: (typeof locales)[number], path: string) => `${SITE_URL}${localizePath(locale, path)}`;
  return paths.flatMap((path) => {
    // The Spanish original lives on another site: list only the English copy, without alternates.
    if (externalOriginal(path)) return [{ url: url("en", path), ...(modified[path] ? { lastModified: modified[path] } : {}) }];
    return locales.map((locale) => ({
      url: url(locale, path),
      ...(modified[path] ? { lastModified: modified[path] } : {}),
      alternates: {
        languages: { ...Object.fromEntries(locales.map((l) => [l, url(l, path)])), "x-default": url(defaultLocale, path) },
      },
    }));
  });
}
