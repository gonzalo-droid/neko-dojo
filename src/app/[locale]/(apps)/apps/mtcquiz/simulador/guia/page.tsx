import type { Metadata } from "next";
import Link from "next/link";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { ORG_ID } from "@/lib/structured-data";
import { formatDate, getApp } from "@/content/apps";
import { SITE_URL } from "@/content/site";
import { MTC_BASE } from "@/lib/mtc";
import { GUIDE_CHECKED, GUIDE_SOURCES, guideContent } from "@/apps/mtcquiz/guide-content";
import { AppCta, SimulatorNotice, simulatorNav } from "@/apps/mtcquiz/simulator/parts";
import AppChrome from "@/components/app/AppChrome";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FaqList from "@/components/shared/FaqList";
import JsonLd from "@/components/shared/JsonLd";

const app = getApp("mtcquiz");
const PATH = `${MTC_BASE}/guia`;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const g = guideContent[locale].meta;
  return pageMetadata({ locale, path: PATH, title: g.title, description: g.description, siteName: "MTCQuiz" });
}

/** Steps and tips share one look: a numbered marker only where the order matters. */
function Steps({ items, numbered }: { items: { title: string; body: string }[]; numbered: boolean }) {
  const List = numbered ? "ol" : "ul";
  return (
    <List className="mt-6 space-y-5">
      {items.map((s, i) => (
        <li key={s.title} className="flex gap-4">
          <span
            aria-hidden="true"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${numbered ? "bg-accent text-on-accent" : "bg-surface text-accent ring-1 ring-line"}`}
          >
            {numbered ? i + 1 : "✓"}
          </span>
          <div>
            <h3 className="font-semibold text-ink">{s.title}</h3>
            <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
          </div>
        </li>
      ))}
    </List>
  );
}

export default async function GuidePage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const g = guideContent[locale];
  const url = `${SITE_URL}${localizePath(locale, PATH)}`;
  const h2 = "font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl";

  return (
    <AppChrome app={app} locale={locale} nav={simulatorNav(locale)}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.h1,
          description: g.meta.description,
          url,
          mainEntityOfPage: url,
          inLanguage: locale,
          datePublished: GUIDE_CHECKED,
          dateModified: GUIDE_CHECKED,
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
          citation: GUIDE_SOURCES.map((s) => s.url),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />

      <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 md:pt-12">
        <Breadcrumbs
          locale={locale}
          label={t.breadcrumbs.label}
          crumbs={[
            { name: app.name, path: "/apps/mtcquiz" },
            { name: simulatorNav(locale)[0].label, path: MTC_BASE },
            { name: g.breadcrumb, path: PATH },
          ]}
        />
        <h1 className="mt-8 font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">{g.h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{g.lead}</p>

        <dl className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
          {g.facts.map((f) => (
            <div key={f.label} className="flex flex-col rounded-xl bg-surface p-2.5 ring-1 ring-line sm:rounded-2xl sm:p-4">
              <dt className="order-2 text-xs text-muted sm:text-sm">{f.label}</dt>
              <dd className="order-1 whitespace-nowrap font-display text-lg font-bold tabular-nums text-accent sm:text-3xl">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`${localizePath(locale, `${MTC_BASE}/examen`)}?cat=a-i&modo=exam`}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-6 text-lg font-bold text-on-accent hover:opacity-90"
          >
            {g.startCta}
          </Link>
          <Link
            href={`${localizePath(locale, MTC_BASE)}#simulacro`}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-line bg-surface px-6 font-semibold text-ink hover:border-accent"
          >
            {g.otherCta}
          </Link>
        </div>

        <section aria-labelledby="what" className="mt-14">
          <h2 id="what" className={h2}>{g.what.title}</h2>
          <p className="mt-4 leading-relaxed text-muted">{g.what.body}</p>
          <Link href={localizePath(locale, `${MTC_BASE}/balotario`)} className="mt-3 inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">
            {g.what.bankLink}
          </Link>
        </section>

        <section aria-labelledby="steps" className="mt-12">
          <h2 id="steps" className={h2}>{g.steps.title}</h2>
          <Steps items={g.steps.items} numbered />
          <p className="mt-5 text-sm text-muted">{g.steps.note}</p>
        </section>

        <section aria-labelledby="how" className="mt-12">
          <h2 id="how" className={h2}>{g.how.title}</h2>
          <Steps items={g.how.items} numbered={false} />
        </section>

        <section aria-labelledby="who" className="mt-12">
          <h2 id="who" className={h2}>{g.requirements.title}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted marker:text-accent">
            {g.requirements.items.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="prepare" className="mt-12 rounded-3xl bg-surface p-6 ring-1 ring-line sm:p-8">
          <h2 id="prepare" className={h2}>{g.prepare.title}</h2>
          <p className="mt-2 text-sm text-muted">{g.prepare.lead}</p>
          <Steps items={g.prepare.items} numbered />
          <Link
            href={`${localizePath(locale, `${MTC_BASE}/examen`)}?cat=a-i&modo=exam`}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-6 font-bold text-on-accent hover:opacity-90 sm:w-auto"
          >
            {g.startCta}
          </Link>
        </section>

        <section aria-labelledby="guide-faq" className="mt-14">
          <h2 id="guide-faq" className={h2}>{g.faqTitle}</h2>
          <div className="mt-6">
            <FaqList items={g.faq} />
          </div>
        </section>

        <section aria-labelledby="sources" className="mt-12 text-sm text-muted">
          <h2 id="sources" className="font-semibold text-ink">{g.sources.title}</h2>
          <p className="mt-2 leading-relaxed">{g.sources.body(formatDate(GUIDE_CHECKED, locale))}</p>
          <ul className="mt-2 space-y-1">
            {GUIDE_SOURCES.map((s, i) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-accent">
                  {g.sources.labels[i]}
                </a>{" "}
                ({g.sources.updated(formatDate(s.updated, locale))})
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <AppCta locale={locale} />
        </div>
        <div className="mt-12">
          <SimulatorNotice locale={locale} />
        </div>
      </article>
    </AppChrome>
  );
}
