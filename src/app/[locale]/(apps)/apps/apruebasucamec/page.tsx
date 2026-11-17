import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getApp, isIndexable, readyFaq } from "@/content/apps";
import { mobileApplication } from "@/lib/structured-data";
import JsonLd from "@/components/shared/JsonLd";
import { licenses, sucamecContent } from "@/apps/apruebasucamec/content";
import AppChrome from "@/components/app/AppChrome";
import StoreButtons from "@/components/app/StoreButtons";
import FaqList from "@/components/shared/FaqList";
import StatusBadge from "@/components/shared/StatusBadge";

const app = getApp("apruebasucamec");
const SHOT = { width: 920, height: 2053 };

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = sucamecContent[locale];
  return pageMetadata({ locale, path: "/apps/apruebasucamec", title: c.meta.title, description: c.meta.description, siteName: "ApruebaSUCAMEC", noindex: !isIndexable(app) });
}

/** Phone-shaped frame around a real screenshot. */
function Phone({ src, alt, sizes, priority = false, className = "" }: { src: string; alt: string; sizes: string; priority?: boolean; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[6px] border-ink bg-surface shadow-xl shadow-accent/20 ${className}`}>
      <Image src={src} alt={alt} {...SHOT} sizes={sizes} priority={priority} className="h-auto w-full" />
    </div>
  );
}

/** Thin gold rule used as the section marker on light backgrounds (the app's accent). */
function Rule() {
  return <span aria-hidden="true" className="block h-1 w-12 rounded-full bg-[var(--sa-gold)]" />;
}

export default async function ApruebaSucamecPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const c = sucamecContent[locale];
  const faq = readyFaq(app.support.faq[locale]);
  const appLd = mobileApplication(app, locale);

  const download = <StoreButtons stores={app.stores} t={t.common} showPending />;

  return (
    <AppChrome app={app} locale={locale} nav={faq.length ? c.nav : c.nav.filter((n) => n.href !== "#faq")}>
      {appLd && <JsonLd data={appLd} />}

      {/* Hero, on the app's navy */}
      <section className="bg-accent text-on-accent">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1.25fr_1fr] md:pb-20 md:pt-20">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-sm font-semibold uppercase tracking-wide text-[var(--sa-gold-soft)]">{c.eyebrow}</span>
              <StatusBadge status={app.status} label={t.status[app.status]} />
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {app.tagline[locale]}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-on-accent/85">{c.heroBody}</p>
            <div className="mt-8">{download}</div>
            <p className="mt-8 max-w-lg border-l-4 border-[var(--sa-gold)] pl-4 text-sm leading-relaxed text-on-accent/90">{c.disclaimer}</p>
          </div>
          <div className="mx-auto w-full max-w-[17rem] md:max-w-[19rem]">
            <Phone src={c.heroShot.src} alt={c.heroShot.alt} sizes="(min-width: 768px) 19rem, 17rem" priority />
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="border-b border-line bg-surface">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4">
          {c.stats.map((s) => (
            <div key={s.label} className="flex flex-col border-l-2 border-[var(--sa-gold)] pl-4">
              <dt className="order-2 mt-1 text-sm text-muted">{s.label}</dt>
              <dd className="order-1 font-display text-3xl font-bold tracking-tight text-accent sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Study modes */}
      <section id="modos" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Rule />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{c.modes.title}</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">{c.modes.lead}</p>
            <ol className="mt-10 space-y-4">
              {c.modes.items.map((m, i) => (
                <li key={m.title} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent font-display text-sm font-bold text-on-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{m.title}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-accent2">{m.meta}</p>
                    <p className="mt-2 leading-relaxed text-muted">{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">{c.modes.bankNote}</p>
          </div>
          <div className="mx-auto w-full max-w-[16rem] md:sticky md:top-24 md:max-w-[18rem]">
            <Phone src={c.modes.shot.src} alt={c.modes.shot.alt} sizes="(min-width: 768px) 18rem, 16rem" />
          </div>
        </div>
      </section>

      {/* Results and review */}
      <section id="resultados" className="scroll-mt-20 border-y border-line bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.1fr]">
          <div className="order-2 grid grid-cols-2 gap-4 sm:gap-6 md:order-1">
            <Phone src={c.results.resultShot.src} alt={c.results.resultShot.alt} sizes="(min-width: 768px) 14rem, 45vw" />
            <Phone src={c.results.reviewShot.src} alt={c.results.reviewShot.alt} sizes="(min-width: 768px) 14rem, 45vw" className="mt-10" />
          </div>
          <div className="order-1 md:order-2">
            <Rule />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{c.results.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{c.results.lead}</p>
            <ul className="mt-8 space-y-4">
              {c.results.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-ink">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-ok" fill="currentColor">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* License types */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Rule />
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{c.licenses.title}</h2>
        <p className="mt-3 max-w-xl text-lg text-muted">{c.licenses.lead}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {licenses.map((l) => (
            <li key={l.code} className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4">
              <span className="font-display text-2xl font-bold text-accent">{l.code}</span>
              <span className="text-ink">{l[locale]}</span>
            </li>
          ))}
        </ul>
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
            <p className="mt-2 text-on-accent/85">{c.downloadBody}</p>
            <div className="mt-5">{download}</div>
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
