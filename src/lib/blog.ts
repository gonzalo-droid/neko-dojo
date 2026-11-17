import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import type { Locale } from "@/i18n/config";

/*
 * Blog posts live in content/blog/<locale>/<slug>.md, with titles and
 * descriptions in content/blog/<locale>/_meta.json. Spanish holds the date,
 * tags and image; English only translates title and description.
 * The first seven posts were migrated from gonzalo-lozg.me on 2026-11-17.
 */

const ROOT = path.join(process.cwd(), "content", "blog");

type RawMeta = {
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  categories?: string[];
  image?: string;
};

/** Blog categories, in the order the filter shows them. Posts set them in the Spanish _meta.json. */
export const CATEGORIES = [
  { id: "android", es: "Android", en: "Android" },
  { id: "ios", es: "iOS", en: "iOS" },
  { id: "kmm", es: "KMM", en: "KMM" },
  { id: "web", es: "Web", en: "Web" },
  { id: "ia", es: "IA", en: "AI" },
  { id: "marketing", es: "Marketing", en: "Marketing" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function isCategory(value: unknown): value is CategoryId {
  return CATEGORIES.some((c) => c.id === value);
}

export function categoryLabel(id: CategoryId, locale: Locale): string {
  return CATEGORIES.find((c) => c.id === id)![locale];
}

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  categories: CategoryId[];
  image: string | null;
};

function readMeta(locale: Locale): Record<string, RawMeta> {
  const file = path.join(ROOT, locale, "_meta.json");
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
}

/** Every post that exists in both languages, newest first. */
export function getPosts(locale: Locale): PostMeta[] {
  const base = readMeta("es");
  const local = readMeta(locale);
  return Object.entries(base)
    .filter(([slug]) => slug in local && fs.existsSync(path.join(ROOT, locale, `${slug}.md`)))
    .map(([slug, m]) => ({
      slug,
      title: local[slug].title,
      description: local[slug].description,
      date: m.date ?? "",
      tags: local[slug].tags ?? m.tags ?? [],
      categories: (m.categories ?? []).filter(isCategory),
      image: m.image ?? null,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(locale: Locale, slug: string): (PostMeta & { html: string }) | null {
  const meta = getPosts(locale).find((p) => p.slug === slug);
  if (!meta) return null;
  const md = fs.readFileSync(path.join(ROOT, locale, `${slug}.md`), "utf8");
  // The page already shows the title as <h1>; drop the article's own leading heading.
  const body = md.replace(/^\s*#\s+.*\n/, "");
  return { ...meta, html: marked.parse(body, { async: false }) as string };
}

export function formatDate(date: string, locale: Locale): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString(locale === "es" ? "es-PE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
