import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { apps } from "@/content/apps";
import AppCard from "@/components/studio/AppCard";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/apps", title: `${t.catalog.title} — Nekodojo`, description: t.catalog.description });
}

export default async function Catalog({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">{t.catalog.title}</h1>
      <p className="mt-4 max-w-lg text-lg text-muted">{t.catalog.intro}</p>
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {apps.map((app) => (
          <li key={app.slug} className="min-h-[340px]">
            <AppCard app={app} locale={locale} t={t} large />
          </li>
        ))}
      </ul>
    </div>
  );
}
