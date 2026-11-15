import Link from "next/link";
import type { Metadata } from "next";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { apps } from "@/content/apps";
import { CONTACT_EMAIL, INSTAGRAM_URL, tagline } from "@/content/site";
import CatMark from "@/components/shared/CatMark";
import AppIcon from "@/components/shared/AppIcon";
import StatusBadge from "@/components/shared/StatusBadge";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/studio", title: t.meta.studioTitle, description: t.studio.description });
}

export default async function Studio({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return (
    <>
      <section className="tatami border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <CatMark className="h-14 w-14 text-accent" />
          <h1 className="mt-8 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">{t.studio.lead}</h1>
          <p className="mt-6 font-display text-xl text-muted">{tagline[locale]}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t.studio.principlesTitle}</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {t.studio.blocks.map((b) => (
            <section key={b.title} className="border-t border-accent/40 pt-6">
              <h3 className="font-display text-xl font-bold">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
            </section>
          ))}
        </div>
      </section>

      {/* Status comes from the app registry, so this list never claims more than apps.ts. */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t.studio.timelineTitle}</h2>
          <p className="mt-3 max-w-lg text-muted">{t.studio.timelineBody}</p>
          <ol className="relative mt-10 space-y-6 border-l border-line pl-8">
            {apps.map((app) => (
              <li key={app.slug} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[37px] top-4 h-3 w-3 rounded-full ring-4 ring-canvas ${app.status === "available" ? "bg-accent" : "bg-line"}`}
                />
                <Link
                  href={localizePath(locale, `/apps/${app.slug}`)}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-surface/50 p-4 transition-colors hover:border-accent"
                >
                  <AppIcon app={app} size={44} />
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">{app.name}</span>
                    <span className="block text-sm text-muted">{app.summary[locale]}</span>
                    <StatusBadge status={app.status} label={t.status[app.status]} className="mt-1 text-muted" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">{t.studio.contactTitle}</h2>
            <p className="mt-3 max-w-md text-muted">{t.studio.contactBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 font-semibold text-on-accent hover:opacity-90">
              {t.studio.contactCta}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-lg border border-line px-5 font-semibold text-ink hover:border-accent"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
