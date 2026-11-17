import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { formatDate, getPosts } from "@/lib/blog";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/blog", title: `${t.blog.title} — Nekodojo`, description: t.blog.description });
}

export default async function Blog({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale).blog;
  const posts = getPosts(locale);
  return (
    <div className="tatami">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">{t.eyebrow}</p>
        <h1 className="mt-3 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t.lead}</p>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={localizePath(locale, `/blog/${p.slug}`)}
              className="group flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition-transform hover:-translate-y-1"
            >
              {p.image && <Image src={p.image} alt="" width={600} height={400} className="aspect-[3/2] w-full object-cover" />}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-muted">{formatDate(p.date, locale)}</p>
                <h2 className="mt-2 font-display text-xl font-bold leading-snug group-hover:text-accent">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                <p className="mt-auto pt-4 text-xs text-muted">{p.tags.join(" · ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
