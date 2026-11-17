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
  return pageMetadata({ locale, path: "/legal", title: t.meta.legalTitle, description: t.legal.description });
}

function State({ live, label }: { live: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${live ? "bg-ok" : "bg-warn"}`} />
      <span className={live ? "text-ok" : "text-warn"}>{label}</span>
    </span>
  );
}

export default async function LegalCenter({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const cell = "inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm hover:border-accent";

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">{t.legal.title}</h1>
      <p className="mt-4 text-lg text-muted">{t.legal.lead}</p>

      <section aria-labelledby="states" className="mt-10 rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
        <h2 id="states" className="font-display text-lg font-bold">{t.legal.statesTitle}</h2>
        <dl className="mt-3 space-y-2 text-sm text-muted">
          <div className="flex flex-wrap gap-2"><dt><State live label={t.legal.live} /></dt><dd>{t.legal.liveExplain}</dd></div>
          <div className="flex flex-wrap gap-2"><dt><State live={false} label={t.legal.draft} /></dt><dd>{t.legal.draftExplain}</dd></div>
        </dl>
      </section>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <th scope="col" className="py-3 pr-4 font-semibold">{t.legal.colApp}</th>
              <th scope="col" className="py-3 pr-4 font-semibold">{t.common.privacy}</th>
              <th scope="col" className="py-3 pr-4 font-semibold">{t.common.terms}</th>
              <th scope="col" className="py-3 font-semibold">{t.legal.colData}</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => {
              const live = app.legal.mode === "live";
              const label = live ? t.legal.live : t.legal.draft;
              return (
                <tr key={app.slug} className="border-b border-line align-middle">
                  <th scope="row" className="py-5 pr-4 font-normal">
                    <Link href={localizePath(locale, `/apps/${app.slug}`)} className="flex items-center gap-3 font-semibold hover:text-accent">
                      <AppIcon app={app} size={36} />
                      {app.name}
                    </Link>
                    {app.legal.mode === "live" && (
                      <p className="mt-1 pl-12 text-xs text-muted">{t.common.updated}: {app.legal.updated[locale]}</p>
                    )}
                  </th>
                  <td className="py-5 pr-4">
                    <Link href={localizePath(locale, `/apps/${app.slug}/privacy`)} className={`${cell} gap-2`}>
                      {t.common.privacy} <State live={live} label={label} />
                    </Link>
                  </td>
                  <td className="py-5 pr-4">
                    <Link href={localizePath(locale, `/apps/${app.slug}/terms`)} className={`${cell} gap-2`}>
                      {t.common.terms} <State live={live} label={label} />
                    </Link>
                  </td>
                  <td className="py-5">
                    <Link href={`${localizePath(locale, `/apps/${app.slug}/support`)}#delete-data`} className={cell}>
                      {t.legal.deleteData}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
