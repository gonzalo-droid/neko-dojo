import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getApp, isIndexable, readyFaq } from "@/content/apps";
import { mobileApplication } from "@/lib/structured-data";
import JsonLd from "@/components/shared/JsonLd";
import { categories, mtcContent } from "@/apps/mtcquiz/content";
import AppChrome from "@/components/app/AppChrome";
import StoreButtons from "@/components/app/StoreButtons";
import FaqList from "@/components/shared/FaqList";
import StatusBadge from "@/components/shared/StatusBadge";

const app = getApp("mtcquiz");
const SHOT = { width: 920, height: 2000 };

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = mtcContent[locale];
  return pageMetadata({ locale, path: "/apps/mtcquiz", title: c.meta.title, description: c.meta.description, siteName: "MTCQuiz", noindex: !isIndexable(app) });
}

/** Phone-shaped frame around a real screenshot. */
function Phone({ src, alt, sizes, priority = false, className = "" }: { src: string; alt: string; sizes: string; priority?: boolean; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[6px] border-ink bg-surface shadow-xl shadow-accent/15 ${className}`}>
      <Image src={src} alt={alt} {...SHOT} sizes={sizes} priority={priority} className="h-auto w-full" />
    </div>
  );
}

function CategoryTable({ title, hint, rows, col1, col2 }: { title: string; hint: string; rows: { code: string; questions: number }[]; col1: string; col2: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <h3 className="font-display text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{hint}</p>
      <table className="mt-5 w-full text-left">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
            <th scope="col" className="pb-2 font-semibold">{col1}</th>
            <th scope="col" className="pb-2 text-right font-semibold">{col2}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.code} className="border-b border-line last:border-0">
              <th scope="row" className="py-3 font-display text-lg font-bold text-accent">{r.code}</th>
              <td className="py-3 text-right tabular-nums text-ink">{r.questions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function MtcQuizPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const c = mtcContent[locale];
  const faq = readyFaq(app.support.faq[locale]);
  const appLd = mobileApplication(app, locale);

  const download = <StoreButtons stores={app.stores} t={t.common} showPending />;

  return (
    <AppChrome app={app} locale={locale} nav={faq.length ? c.nav : c.nav.filter((n) => n.href !== "#faq")}>
      {appLd && <JsonLd data={appLd} />}

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1.25fr_1fr] md:pt-20">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-sm font-semibold text-accent">{c.eyebrow}</span>
            <StatusBadge status={app.status} label={t.status[app.status]} className="text-ink" />
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {app.tagline[locale]}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{c.heroBody}</p>
          <div className="mt-8">{download}</div>
          <p className="mt-8 max-w-lg border-l-4 border-accent2 pl-4 text-sm leading-relaxed text-ink">{c.disclaimer}</p>
        </div>
        <div className="mx-auto w-full max-w-[17rem] md:max-w-[19rem]">
          <Phone src={c.heroShot.src} alt={c.heroShot.alt} sizes="(min-width: 768px) 19rem, 17rem" priority />
        </div>
      </section>

      {/* Key facts */}
      <section className="bg-accent text-on-accent">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4">
          {c.stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-1 text-sm opacity-85">{s.label}</dt>
              <dd className="order-1 font-display text-4xl font-bold tracking-tight">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How it works */}
      <section id="practica" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{c.practice.title}</h2>
          <p className="mt-3 max-w-xl text-lg text-muted">{c.practice.lead}</p>
          {/* Phones scroll sideways on small screens; the page itself never does. */}
          <ol className="-mx-4 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
            {c.practice.steps.map((s, i) => (
              <li key={s.title} className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-auto">
                <Phone src={s.shot.src} alt={s.shot.alt} sizes="(min-width: 768px) 16rem, 70vw" />
                <p className="mt-6 font-display text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Categories */}
      <section id="categorias" className="scroll-mt-20 border-y border-line bg-canvas">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{c.categories.title}</h2>
          <p className="mt-3 max-w-xl text-lg text-muted">{c.categories.lead}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-start">
            <CategoryTable title={c.categories.classA} hint={c.categories.classAHint} rows={categories.a} col1={c.categories.colCategory} col2={c.categories.colQuestions} />
            <CategoryTable title={c.categories.classB} hint={c.categories.classBHint} rows={categories.b} col1={c.categories.colCategory} col2={c.categories.colQuestions} />
          </div>
        </div>
      </section>

      {/* Source of the questions */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.3fr]">
        <div className="order-2 mx-auto w-full max-w-[16rem] md:order-1">
          <Phone src={c.source.shot.src} alt={c.source.shot.alt} sizes="16rem" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{c.source.title}</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            {c.source.body.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* More features */}
      <section id="funciones" className="scroll-mt-20 border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{c.features.title}</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.items.map((f) => (
              <li key={f.title} className="border-t-2 border-accent pt-4">
                <h3 className="font-display text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing, download and FAQ */}
      <section className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">{c.pricing.title}</h2>
          <p className="mt-3 leading-relaxed text-muted">{c.pricing.body}</p>
          <div className="mt-10 rounded-2xl bg-accent p-6 text-on-accent">
            <h2 className="font-display text-2xl font-bold">{c.downloadTitle}</h2>
            <div className="mt-5 [&_a]:bg-on-accent [&_a]:text-accent">{download}</div>
          </div>
        </div>
        {faq.length > 0 && (
          <div id="faq" className="scroll-mt-20">
            <h2 className="font-display text-2xl font-bold text-ink">{t.common.faq}</h2>
            <div className="mt-5"><FaqList items={faq} /></div>
          </div>
        )}
      </section>
    </AppChrome>
  );
}
