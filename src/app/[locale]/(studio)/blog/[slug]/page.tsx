import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, localizePath, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { categoryLabel, formatDate, getPost, getPosts } from "@/lib/blog";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => getPosts(locale).map((p) => ({ locale, slug: p.slug })));
}

async function load(params: Params["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPost(locale, slug);
  if (!post) notFound();
  return { locale, post };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, post } = await load(params);
  return pageMetadata({ locale, path: `/blog/${post.slug}`, title: `${post.title} — Nekodojo`, description: post.description });
}

export default async function Post({ params }: Params) {
  const { locale, post } = await load(params);
  const t = getDictionary(locale).blog;
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <Link href={localizePath(locale, "/blog")} className="text-sm text-muted hover:text-accent">
        ← {t.back}
      </Link>
      <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">{post.title}</h1>
      {post.categories.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {post.categories.map((c) => (
            <li key={c}>
              <Link
                href={`${localizePath(locale, "/blog")}?category=${c}`}
                className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-accent ring-1 ring-line hover:ring-accent"
              >
                {categoryLabel(c, locale)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-sm text-muted">
        {formatDate(post.date, locale)} · {post.tags.join(" · ")}
      </p>
      {locale === "en" && <p className="mt-2 text-xs text-muted">{t.translationNote}</p>}
      <div className="article-body mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
