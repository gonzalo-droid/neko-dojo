import Link from "next/link";
import type { Metadata } from "next";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { apps, news } from "@/content/apps";
import { tagline } from "@/content/site";
import FeaturedAppCard from "@/components/studio/FeaturedAppCard";
import AppIcon from "@/components/shared/AppIcon";
import StatusBadge from "@/components/shared/StatusBadge";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/", title: t.meta.homeTitle, description: t.meta.homeDescription });
}

function formatMonth(date: string, locale: string) {
  const [y, m] = date.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, 1)).toLocaleDateString(locale === "es" ? "es-PE" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function Home({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const [first, second] = tagline[locale].split(". ");
  const available = apps.filter((a) => a.status === "available");
  const upcoming = apps.filter((a) => a.status !== "available");
  const hasDates = news.some((n) => n.date);

  return (
    <>
      <section className="tatami border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-24">
          <h1 className="rise font-display text-[clamp(2.75rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            <span className="block">{first}.</span>{" "}
            <span className="block text-muted">{second}</span>
          </h1>
          <div className="rise mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" style={{ animationDelay: "120ms" }}>
            <p className="max-w-md text-lg leading-relaxed text-muted">{t.home.lead}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#apps"
                className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 py-3 font-semibold text-on-accent transition-opacity hover:opacity-90"
              >
                {t.home.explore}
              </a>
              <Link
                href={localizePath(locale, "/studio")}
                className="inline-flex min-h-11 items-center rounded-lg border border-line px-5 py-3 font-semibold text-ink transition-colors hover:border-accent"
              >
                {t.home.aboutLink}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="apps" className="scroll-mt-20 bg-band" aria-labelledby="available-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 id="available-title" className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t.home.available}</h2>
          <ul className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {available.map((app, i) => (
              <li key={app.slug} className="rise" style={{ animationDelay: `${200 + i * 90}ms` }}>
                <FeaturedAppCard app={app} locale={locale} t={t} />
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t.home.upcoming}</h2>
            <p className="max-w-md text-sm text-muted">{t.home.upcomingBody}</p>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {upcoming.map((app) => (
              <li key={app.slug}>
                <Link
                  href={`${localizePath(locale, `/apps/${app.slug}`)}${app.status === "testing" ? "" : "#lista"}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-4 transition-colors hover:border-accent sm:p-5"
                >
                  <AppIcon app={app} size={48} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{app.name}</span>
                    <span className="block text-sm text-muted sm:truncate">{app.tagline[locale]}</span>
                    <StatusBadge status={app.status} label={t.status[app.status]} className="mt-1.5 text-muted" />
                  </span>
                  {/* Phones: the whole card is the link, so the button gives its room to the tagline. */}
                  <span className="shrink-0 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-accent transition-colors group-hover:border-accent max-sm:hidden">
                    {/* Apps in testing have no waitlist yet, so the button does not promise a notice. */}
                    {app.status === "testing" ? t.home.viewApp : t.home.notify}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.2fr] md:py-24">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">{t.home.aboutTitle}</h2>
          <div>
            <p className="text-lg leading-relaxed text-muted">{t.home.aboutBody}</p>
            <Link href={localizePath(locale, "/studio")} className="mt-6 inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">
              {t.home.aboutLink}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t.home.newsTitle}</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {news.map((item) => {
              const app = apps.find((a) => a.slug === item.app)!;
              return (
                <li key={item.text.es}>
                  <Link href={localizePath(locale, `/apps/${app.slug}`)} className={`grid gap-1 py-4 hover:text-accent sm:gap-4 ${hasDates ? "sm:grid-cols-[7rem_9rem_1fr]" : "sm:grid-cols-[9rem_1fr]"}`}>
                    {hasDates && (
                      <span className="text-sm text-muted">
                        {item.date ? <time dateTime={item.date}>{formatMonth(item.date, locale)}</time> : null}
                      </span>
                    )}
                    <span className="text-sm font-semibold">{app.name}</span>
                    <span className="text-muted">{item.text[locale]}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
