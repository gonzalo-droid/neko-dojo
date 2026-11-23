import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { CATEGORIES, categoryLabel, formatDate, getPosts, isCategory } from "@/lib/blog";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/blog", title: `${t.blog.title} — Nekodojo`, description: t.blog.description });
}

export default async function Blog({ params, searchParams }: Props) {
  const locale = await getLocale(params);
  const t = getDictionary(locale).blog;
  const { category } = await searchParams;
  const active = isCategory(category) ? category : null;
  const all = getPosts(locale);
  const posts = active ? all.filter((p) => p.categories.includes(active)) : all;
  // Only offer categories that have at least one post.
  const available = CATEGORIES.filter((c) => all.some((p) => p.categories.includes(c.id)));
  const blogPath = localizePath(locale, "/blog");

  const chip = (selected: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors ${
      selected ? "bg-accent text-on-accent ring-accent" : "bg-surface text-muted ring-line hover:text-ink"
    }`;

  return (
    <div className="tatami">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-sm font-semibold text-accent">{t.eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t.lead}</p>

        <nav aria-label={t.categoriesLabel} className="mt-10">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link href={blogPath} scroll={false} className={chip(!active)} aria-current={!active ? "page" : undefined}>
                {t.all}
              </Link>
            </li>
            {available.map((c) => (
              <li key={c.id}>
                <Link
                  href={`${blogPath}?category=${c.id}`}
                  scroll={false}
                  className={chip(active === c.id)}
                  aria-current={active === c.id ? "page" : undefined}
                >
                  {categoryLabel(c.id, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {posts.length === 0 ? (
          <p className="mt-10 text-muted">{t.empty}</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={localizePath(locale, `/blog/${p.slug}`)}
                className="group flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition-transform hover:-translate-y-1"
              >
                {p.image && <Image src={p.image} alt="" width={600} height={400} className="aspect-[3/2] w-full object-cover" />}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    {p.categories.map((c) => (
                      <span key={c} className="rounded-full bg-canvas px-2 py-0.5 font-semibold text-accent ring-1 ring-line">
                        {categoryLabel(c, locale)}
                      </span>
                    ))}
                    <span>{formatDate(p.date, locale)}</span>
                  </div>
                  <h2 className="mt-2 font-display text-xl font-bold leading-snug group-hover:text-accent">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                  <p className="mt-auto pt-4 text-xs text-muted">{p.tags.join(" · ")}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
