import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getApp } from "@/content/apps";
import { isFormsConnected } from "@/lib/forms/provider";
import { goalsContent } from "@/apps/goals/content";
import AppChrome from "@/components/app/AppChrome";
import FaqList from "@/components/shared/FaqList";
import StatusBadge from "@/components/shared/StatusBadge";
import WaitlistForm from "@/components/forms/WaitlistForm";

const app = getApp("goals");

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = goalsContent[locale];
  return pageMetadata({ locale, path: "/apps/goals", title: c.meta.title, description: c.meta.description, siteName: "Goals" });
}

export default async function GoalsPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const c = goalsContent[locale];
  const [big, small] = app.tagline[locale].split(". ");
  const pct = c.mock.done / c.mock.steps.length;
  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <AppChrome app={app} locale={locale} nav={c.nav}>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 md:pt-20">
        <StatusBadge status={app.status} label={t.status[app.status]} className="text-ink" />
        <h1 className="mt-6 font-display font-bold leading-[0.92] tracking-[-0.04em] text-ink">
          <span className="block text-[clamp(3.25rem,12vw,9rem)]">{big}.</span>
          <span className="mt-3 block text-[clamp(1.75rem,5.5vw,4rem)] text-accent md:mt-4">{small}</span>
        </h1>

        <div className="mt-14 grid items-end gap-12 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="max-w-md text-lg leading-relaxed text-muted">{c.heroBody}</p>
            <a href="#lista" className="mt-8 inline-flex rounded-lg bg-accent px-5 py-3 font-semibold text-on-accent hover:opacity-90">
              {t.forms.joinWaitlist}
            </a>
          </div>

          {/* Concept mockup of a goal card */}
          <figure>
            <div className="flex flex-col gap-6 rounded-3xl bg-surface p-6 sm:flex-row sm:items-center">
              <svg viewBox="0 0 120 120" className="h-28 w-28 shrink-0 -rotate-90" aria-hidden="true">
                <circle cx="60" cy="60" r={R} fill="none" stroke="var(--app-line)" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r={R} fill="none" stroke="var(--app-accent)" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={C * (1 - pct)}
                />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="font-display text-2xl font-bold text-ink">{c.mock.goal}</p>
                <p className="text-sm text-muted">{c.mock.progress}</p>
                <ol className="mt-4 space-y-1.5 text-sm">
                  {c.mock.steps.map((s, i) => (
                    <li key={s} className={`flex items-center gap-2.5 ${i < c.mock.done ? "text-muted line-through" : "text-ink"}`}>
                      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-sm ${i < c.mock.done ? "bg-accent" : i === c.mock.done ? "border-2 border-accent" : "bg-line"}`} />
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <figcaption className="mt-3 text-xs text-muted">{t.common.conceptMockup}</figcaption>
          </figure>
        </div>
      </section>

      <section id="previstas" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink">{t.common.plannedFeatures}</h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {c.planned.map((f) => (
              <li key={f.title} className="border-t-2 border-accent pt-5">
                <h3 className="font-display text-xl font-bold text-ink">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div id="lista" className="scroll-mt-20">
            <h2 className="font-display text-3xl font-bold text-ink">{c.waitlistTitle}</h2>
            <p className="mt-3 text-muted">{c.waitlistBody}</p>
            <div className="mt-8"><WaitlistForm t={t.forms} locale={locale} connected={isFormsConnected()} app={app.slug} /></div>
          </div>
          <div id="faq" className="scroll-mt-20">
            <h2 className="font-display text-2xl font-bold text-ink">{t.common.faq}</h2>
            <div className="mt-5"><FaqList items={app.support.faq[locale]} /></div>
          </div>
        </div>
      </section>
    </AppChrome>
  );
}
