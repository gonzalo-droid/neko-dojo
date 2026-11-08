import Link from "next/link";
import type { Metadata } from "next";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { apps } from "@/content/apps";
import AppIcon from "@/components/shared/AppIcon";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/legal", title: `${t.legal.title} — Nekodojo`, description: t.legal.description });
}

export default async function LegalCenter({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">{t.legal.title}</h1>
      <p className="mt-4 text-lg text-muted">{t.legal.lead}</p>
      <ul className="mt-12 divide-y divide-line border-y border-line">
        {apps.map((app) => {
          const live = app.legal.mode === "live";
          return (
            <li key={app.slug} className="grid gap-4 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex items-center gap-4">
                <AppIcon app={app} size={40} />
                <div>
                  <Link href={localizePath(locale, `/apps/${app.slug}`)} className="font-semibold hover:text-accent">{app.name}</Link>
                  <p className="text-sm text-muted">
                    <span className={live ? "text-emerald-400" : "text-amber-300"}>{live ? t.legal.live : t.legal.draft}</span>
                    {app.legal.mode === "live" && <> · {t.common.updated}: {app.legal.updated[locale]}</>}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <Link href={localizePath(locale, `/apps/${app.slug}/privacy`)} className="rounded-md border border-line px-3 py-1.5 hover:border-accent">{t.common.privacy}</Link>
                <Link href={localizePath(locale, `/apps/${app.slug}/terms`)} className="rounded-md border border-line px-3 py-1.5 hover:border-accent">{t.common.terms}</Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
