import type { Metadata } from "next";
import Link from "next/link";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getApp } from "@/content/apps";
import Image from "next/image";
import { CAT_IMAGE, IMG_BASE, MTC_BASE, MTC_CATEGORIES, catImage, pdfPath, splitOption } from "@/lib/mtc";
import { loadQuestions } from "@/lib/mtc-server";
import { simulatorContent } from "@/apps/mtcquiz/simulator-content";
import SetupForm from "@/apps/mtcquiz/simulator/SetupForm";
import ProgressPanel from "@/apps/mtcquiz/simulator/ProgressPanel";
import {
  AppCta,
  SimulatorNotice,
  simulatorNav,
} from "@/apps/mtcquiz/simulator/parts";
import AppChrome from "@/components/app/AppChrome";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FaqList from "@/components/shared/FaqList";
import JsonLd from "@/components/shared/JsonLd";

const app = getApp("mtcquiz");

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = simulatorContent[locale];
  return pageMetadata({
    locale,
    path: MTC_BASE,
    title: c.meta.title,
    description: c.meta.description,
    siteName: "MTCQuiz",
  });
}

export default async function SimulatorPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const c = simulatorContent[locale];
  const categories = MTC_CATEGORIES.map((k) => ({
    slug: k.slug,
    code: k.code,
    officialCode: k.officialCode,
    licenseClass: k.licenseClass,
    vehicles: k.vehicles[locale],
    count: loadQuestions(k.slug).length,
  }));
  // A real question with its sign, so the first screen shows what the simulator looks like.
  const sample =
    loadQuestions("a-i").find((q) => q.id === 100) ?? loadQuestions("a-i")[0];

  return (
    <AppChrome app={app} locale={locale} nav={simulatorNav(locale)}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: c.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 md:pb-16 md:pt-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <Breadcrumbs
                locale={locale}
                label={t.breadcrumbs.label}
                crumbs={[
                  { name: "Nekodojo", path: "/" },
                  { name: app.name, path: "/apps/mtcquiz" },
                  { name: c.breadcrumb.simulator, path: MTC_BASE },
                ]}
              />
              <p className="mt-8 text-sm font-semibold text-accent">
                {c.hero.eyebrow}
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {c.hero.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                {c.hero.body}
              </p>
              {/* One row at every width, so the start button stays on the first screen. */}
              <dl className="mt-6 grid max-w-2xl grid-cols-4 gap-2 sm:mt-8 sm:gap-3">
                {c.hero.facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col rounded-xl bg-surface p-2.5 ring-1 ring-line sm:rounded-2xl sm:p-4"
                  >
                    <dt className="order-2 text-xs text-muted sm:text-sm">{f.label}</dt>
                    <dd className="order-1 whitespace-nowrap font-display text-lg font-bold tabular-nums text-accent sm:text-3xl">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {/* A-I is the default license: start it in one tap; the setup below is for the rest. */}
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
                <Link
                  href={`${localizePath(locale, `${MTC_BASE}/examen`)}?cat=a-i&modo=exam`}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-6 text-lg font-bold text-on-accent hover:opacity-90"
                >
                  {c.hero.startA1}
                </Link>
                <a
                  href="#simulacro"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-line bg-surface px-6 font-semibold text-ink hover:border-accent"
                >
                  {c.hero.otherCategory}
                </a>
              </div>
              <p className="mt-3 text-sm text-muted">
                A-I: {MTC_CATEGORIES[0].vehicles[locale]}{" "}
                <Link
                  href={localizePath(locale, `${MTC_BASE}/balotario`)}
                  className="font-semibold text-accent underline underline-offset-4"
                >
                  {c.hero.bankLink}
                </Link>
              </p>
            </div>
            <figure className="hidden rounded-3xl border border-line bg-surface p-6 shadow-xl shadow-accent/10 lg:block">
              <figcaption className="flex items-center justify-between text-xs font-semibold text-muted">
                <span className="uppercase tracking-wide text-accent">
                  {c.hero.sampleLabel}
                </span>
                <span>A-I · N.º {sample.id}</span>
              </figcaption>
              <p className="mt-3 whitespace-pre-line font-display text-xl font-bold leading-snug text-ink">
                {sample.q}
              </p>
              {sample.images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${IMG_BASE}/${sample.images[0]}`}
                  alt=""
                  className="mt-4 max-h-32 w-auto rounded-lg border border-line bg-white p-2"
                />
              )}
              <ul className="mt-4 space-y-2 text-sm">
                {sample.options.map((o, k) => {
                  const { letter, text } = splitOption(o);
                  const right = k === sample.answer;
                  return (
                    <li
                      key={k}
                      className={`flex gap-3 rounded-xl border-2 px-3 py-2.5 ${right ? "border-ok bg-ok/10 font-semibold text-ink" : "border-line text-ink"}`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase ${right ? "bg-ok text-white" : "bg-canvas ring-1 ring-line"}`}
                      >
                        {right ? "✓" : letter}
                      </span>
                      {text}
                    </li>
                  );
                })}
              </ul>
            </figure>
          </div>
        </div>
      </section>

      {/* Only for returning visitors: an unfinished exam and past results, right under the hero. */}
      <ProgressPanel locale={locale} />

      <section
        id="simulacro"
        aria-labelledby="setup-title"
        className="scroll-mt-20"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <h2
            id="setup-title"
            className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            {c.setup.title}
          </h2>
          {c.englishNote && (
            <p className="mt-2 text-sm text-muted">{c.englishNote}</p>
          )}
          <div className="mt-8">
            <SetupForm locale={locale} categories={categories} />
          </div>
          <p className="mt-6 text-sm text-muted">{c.categoriesNote}</p>
        </div>
      </section>

      <section aria-labelledby="bank-title" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <h2
            id="bank-title"
            className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            {c.bank.title}
          </h2>
          <p className="mt-3 max-w-xl text-lg text-muted">{c.bank.lead}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((k) => (
              <li
                key={k.slug}
                className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4"
              >
                <Link
                  href={localizePath(locale, `${MTC_BASE}/balotario/${k.slug}`)}
                  className="group flex min-w-0 items-center gap-3"
                >
                  <Image src={catImage(k.slug)} alt="" {...CAT_IMAGE} sizes="5rem" className="h-auto w-20 shrink-0" />
                  <span className="min-w-0">
                  <span className="block font-display text-xl font-bold text-ink group-hover:text-accent">
                    {k.code}
                  </span>
                  <span className="block text-sm text-muted">
                    {c.bank.count(k.count)} · {c.bank.open}
                  </span>
                  </span>
                </Link>
                <a
                  href={pdfPath(k.slug)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 shrink-0 items-center rounded-lg border border-line px-4 text-sm font-semibold text-accent hover:border-accent"
                >
                  {c.bank.pdf}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href={localizePath(locale, `${MTC_BASE}/balotario`)}
            className="mt-6 inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4"
          >
            {c.pdfs.title}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <AppCta locale={locale} />
      </section>

      <section aria-labelledby="faq-title" className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.4fr] md:py-20">
          <div>
            <h2
              id="faq-title"
              className="font-display text-3xl font-bold tracking-tight text-ink"
            >
              {c.faqTitle}
            </h2>
            <div className="mt-6">
              <SimulatorNotice locale={locale} />
            </div>
          </div>
          <FaqList items={c.faq} />
        </div>
      </section>
    </AppChrome>
  );
}
