import Link from "next/link";
import type { Metadata } from "next";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { apps, news } from "@/content/apps";
import { tagline } from "@/content/site";
import { isFormsConnected } from "@/lib/forms/provider";
import AppCard from "@/components/studio/AppCard";
import WaitlistForm from "@/components/forms/WaitlistForm";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/", title: t.meta.homeTitle, description: t.meta.homeDescription });
}

export default async function Home({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const [first, second] = tagline[locale].split(". ");
  const upcoming = apps.filter((a) => a.status !== "available");

  return (
    <>
      <section className="tatami border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pb-24 md:pt-24">
          <h1 className="rise font-display text-[clamp(2.75rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            <span className="block">{first}.</span>
            <span className="block text-muted">{second}</span>
          </h1>
          <div className="rise mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" style={{ animationDelay: "120ms" }}>
            <p className="max-w-md text-lg leading-relaxed text-muted">{t.home.lead}</p>
            <Link
              href={localizePath(locale, "/apps")}
              className="inline-flex w-fit items-center rounded-lg bg-accent px-5 py-3 font-semibold text-on-accent transition-opacity hover:opacity-90"
            >
              {t.home.explore}
            </Link>
          </div>

          <h2 className="sr-only">{t.home.shelfLabel}</h2>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {apps.map((app, i) => (
              <li key={app.slug} className="rise" style={{ animationDelay: `${240 + i * 90}ms` }}>
                <AppCard app={app} locale={locale} t={t} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.2fr] md:py-28">
        <h2 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">{t.home.aboutTitle}</h2>
        <div>
          <p className="text-lg leading-relaxed text-muted">{t.home.aboutBody}</p>
          <Link href={localizePath(locale, "/studio")} className="mt-6 inline-block font-semibold text-accent underline underline-offset-4">
            {t.home.aboutLink}
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="font-display text-2xl font-bold">{t.home.newsTitle}</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {news.map((item) => {
                const app = apps.find((a) => a.slug === item.app)!;
                return (
                  <li key={item.text.es}>
                    <Link href={localizePath(locale, `/apps/${app.slug}`)} className="flex gap-4 py-4 hover:text-accent">
                      <span className="w-24 shrink-0 text-sm font-semibold">
                        {app.name}
                      </span>
                      <span className="text-muted">{item.text[locale]}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div id="waitlist" className="scroll-mt-24">
            <h2 className="font-display text-2xl font-bold">{t.home.waitlistTitle}</h2>
            <p className="mt-3 text-muted">{t.home.waitlistBody}</p>
            <div className="mt-6 rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
              <WaitlistForm
                t={t.forms}
                locale={locale}
                connected={isFormsConnected()}
                options={upcoming.map((a) => ({ value: a.slug, label: `${a.name} · ${t.status[a.status]}` }))}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
