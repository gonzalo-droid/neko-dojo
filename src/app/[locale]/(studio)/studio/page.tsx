import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { tagline } from "@/content/site";
import CatMark from "@/components/shared/CatMark";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/studio", title: `${t.studio.title} — Nekodojo`, description: t.studio.description });
}

export default async function Studio({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return (
    <div className="tatami">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <CatMark className="h-14 w-14 text-accent" />
        <h1 className="mt-8 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">{t.studio.lead}</h1>
        <p className="mt-6 font-display text-xl text-muted">{tagline[locale]}</p>
        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {t.studio.blocks.map((b) => (
            <section key={b.title} className="border-t border-accent/40 pt-6">
              <h2 className="font-display text-xl font-bold">{b.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
