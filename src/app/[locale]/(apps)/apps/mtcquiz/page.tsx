import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getApp } from "@/content/apps";
import { mtcContent } from "@/apps/mtcquiz/content";
import AppChrome from "@/components/app/AppChrome";
import StoreButtons from "@/components/app/StoreButtons";
import FaqList from "@/components/shared/FaqList";
import StatusBadge from "@/components/shared/StatusBadge";

const app = getApp("mtcquiz");

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = mtcContent[locale];
  return pageMetadata({ locale, path: "/apps/mtcquiz", title: c.meta.title, description: c.meta.description, siteName: "MTCQuiz" });
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full border border-dashed border-accent2 px-2.5 py-0.5 text-xs font-medium text-muted">{children}</span>;
}

export default async function MtcQuizPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const c = mtcContent[locale];

  return (
    <AppChrome app={app} locale={locale} nav={c.nav}>
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={app.status} label={t.status[app.status]} className="text-ink" />
            <Tag>{t.common.provisional}</Tag>
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {app.tagline[locale]}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{c.heroBody}</p>
          <div className="mt-8"><StoreButtons stores={app.stores} t={t.common} /></div>
          <p className="mt-8 flex max-w-md gap-3 border-l-4 border-accent2 pl-4 text-sm leading-relaxed text-ink">{c.disclaimer}</p>
        </div>

        {/* Concept mockup: a quiz card on a road. */}
        <figure className="relative">
          <div className="rounded-3xl bg-ink p-5 pb-8 sm:p-7 sm:pb-10">
            <div className="rounded-2xl bg-surface p-5 sm:p-6">
              <p className="text-xs font-semibold text-muted">{c.mock.label}</p>
              <p className="mt-3 font-display text-xl font-bold leading-snug text-ink">{c.mock.question}</p>
              <ul className="mt-5 space-y-2.5">
                {c.mock.options.map((o, i) => (
                  <li
                    key={o}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium ${
                      i === c.mock.correct ? "border-accent bg-accent text-on-accent" : "border-line text-ink"
                    }`}
                  >
                    {o}
                    {i === c.mock.correct && <span aria-hidden="true">✓</span>}
                  </li>
                ))}
              </ul>
            </div>
            {/* Lane-line progress: dashes are questions, amber marks where you are. */}
            <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
              {Array.from({ length: 20 }, (_, i) => (
                <span key={i} className={`h-1.5 flex-1 rounded-full ${i < 6 ? "bg-accent2" : "bg-white/25"}`} />
              ))}
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs text-muted">{t.common.conceptMockup}</figcaption>
        </figure>
      </section>

      <section id="practica" className="scroll-mt-20 border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink">{c.practice.title}</h2>
            <Tag>{t.common.provisional}</Tag>
          </div>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {c.practice.steps.map((s, i) => (
              <li key={s.title}>
                <span className="font-display text-5xl font-bold text-accent">{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">{c.sourceTitle}</h2>
          <p className="mt-3 leading-relaxed text-muted">{c.sourceBody}</p>
          <h2 className="mt-12 font-display text-2xl font-bold text-ink">{c.downloadTitle}</h2>
          <div className="mt-5"><StoreButtons stores={app.stores} t={t.common} /></div>
        </div>
        <div id="faq" className="scroll-mt-20">
          <h2 className="font-display text-2xl font-bold text-ink">{t.common.faq}</h2>
          <div className="mt-5"><FaqList items={app.support.faq[locale]} /></div>
        </div>
      </section>
    </AppChrome>
  );
}
