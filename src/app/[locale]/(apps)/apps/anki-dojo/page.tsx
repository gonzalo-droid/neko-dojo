import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getApp } from "@/content/apps";
import { isFormsConnected } from "@/lib/forms/provider";
import { ankiContent } from "@/apps/anki-dojo/content";
import Flashcards from "@/apps/anki-dojo/Flashcards";
import AppChrome from "@/components/app/AppChrome";
import FaqList from "@/components/shared/FaqList";
import StatusBadge from "@/components/shared/StatusBadge";
import WaitlistForm from "@/components/forms/WaitlistForm";

const app = getApp("anki-dojo");

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = ankiContent[locale];
  return pageMetadata({ locale, path: "/apps/anki-dojo", title: c.meta.title, description: c.meta.description, siteName: "Anki Dojo" });
}

export default async function AnkiDojoPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const c = ankiContent[locale];

  return (
    <AppChrome app={app} locale={locale} nav={c.nav}>
      <section className="mx-auto grid max-w-6xl items-center gap-16 px-4 pb-24 pt-14 sm:px-6 md:grid-cols-2 md:pt-24">
        <div>
          <StatusBadge status={app.status} label={t.status[app.status]} className="text-ink" />
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            {app.tagline[locale]}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{c.heroBody}</p>
          <a href="#lista" className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 font-semibold text-on-accent hover:opacity-90">
            {t.forms.joinWaitlist}
          </a>
          <p className="mt-6 text-xs text-muted">{c.nameNote}</p>
        </div>
        <Flashcards c={c} mockLabel={t.common.conceptMockup} />
      </section>

      <section id="previstas" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink">{t.common.plannedFeatures}</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {c.planned.map((f) => (
              <li key={f.title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display text-xl font-bold text-ink">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-ink text-canvas">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div id="lista" className="scroll-mt-20">
            <h2 className="font-display text-3xl font-bold">{c.waitlistTitle}</h2>
            <p className="mt-3 text-canvas/75">{c.waitlistBody}</p>
            {/* Re-scope the theme so the form reads on the dark band */}
            <div className="theme-anki-dojo mt-8 rounded-2xl bg-canvas p-5 text-ink sm:p-6">
              <WaitlistForm t={t.forms} locale={locale} connected={isFormsConnected()} app={app.slug} />
            </div>
          </div>
          <div id="faq" className="theme-anki-dojo rounded-2xl bg-canvas p-5 text-ink sm:p-6">
            <h2 className="font-display text-2xl font-bold">{t.common.faq}</h2>
            <div className="mt-5"><FaqList items={app.support.faq[locale]} /></div>
          </div>
        </div>
      </section>
    </AppChrome>
  );
}
