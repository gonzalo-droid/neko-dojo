import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localizePath, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { getApp } from "@/content/apps";
import Image from "next/image";
import { CAT_IMAGE, IMG_BASE, MTC_BASE, MTC_CATEGORIES, catImage, getCategory, pdfPath, splitOption } from "@/lib/mtc";
import { loadQuestions, topicsOf } from "@/lib/mtc-server";
import { simulatorContent } from "@/apps/mtcquiz/simulator-content";
import BankFilter from "@/apps/mtcquiz/simulator/BankFilter";
import { AppCta, SimulatorNotice, simulatorNav } from "@/apps/mtcquiz/simulator/parts";
import AppChrome from "@/components/app/AppChrome";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const app = getApp("mtcquiz");
type Params = { params: Promise<{ locale: string; categoria: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => MTC_CATEGORIES.map((k) => ({ locale, categoria: k.slug })));
}

async function load(params: Params["params"]) {
  const { locale, categoria } = await params;
  const cat = getCategory(categoria);
  if (!isLocale(locale) || !cat) notFound();
  return { locale, cat, questions: loadQuestions(cat.slug) };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, cat, questions } = await load(params);
  const c = simulatorContent[locale].meta;
  return pageMetadata({
    locale,
    path: `${MTC_BASE}/balotario/${cat.slug}`,
    title: c.bankTitle(cat.code, questions.length),
    description: c.bankDescription(cat.code, questions.length),
    siteName: "MTCQuiz",
  });
}

export default async function BankPage({ params }: Params) {
  const { locale, cat, questions } = await load(params);
  const t = getDictionary(locale);
  const c = simulatorContent[locale];
  const topics = topicsOf(questions);
  const examHref = `${localizePath(locale, `${MTC_BASE}/examen`)}?cat=${cat.slug}&modo=exam`;

  return (
    <AppChrome app={app} locale={locale} nav={simulatorNav(locale)}>
      <div className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6">
        <Breadcrumbs
          locale={locale}
          label={t.breadcrumbs.label}
          crumbs={[
            { name: app.name, path: "/apps/mtcquiz" },
            { name: c.breadcrumb.simulator, path: MTC_BASE },
            { name: c.breadcrumb.bank, path: `${MTC_BASE}/balotario` },
            { name: cat.code, path: `${MTC_BASE}/balotario/${cat.slug}` },
          ]}
        />
        <div className="mt-8 grid items-center gap-6 sm:grid-cols-[1fr_14rem]">
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">{c.bank.h1(cat.code)}</h1>
          <Image src={catImage(cat.slug)} alt="" {...CAT_IMAGE} sizes="(min-width: 640px) 14rem, 60vw" priority className="order-first h-auto w-3/5 sm:order-none sm:w-full" />
        </div>
        <p className="mt-4 text-lg leading-relaxed text-muted">{c.bank.intro(questions.length, cat.code)}</p>
        <p className="mt-2 text-sm text-muted">{cat.vehicles[locale]} {c.bank.asPublished}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={examHref} className="inline-flex min-h-12 items-center rounded-xl bg-accent px-5 font-bold text-on-accent hover:opacity-90">
            {c.bank.practiceCta(cat.code)}
          </Link>
          <a href={pdfPath(cat.slug)} download className="inline-flex min-h-12 items-center rounded-xl border border-line bg-surface px-5 font-semibold text-ink hover:border-accent">
            {c.bank.downloadPdf}
          </a>
        </div>

        <div className="mt-10">
          <BankFilter
            topics={topics}
            total={questions.length}
            listId="bank"
            labels={{
              search: c.bank.search,
              placeholder: c.bank.searchPlaceholder,
              topic: c.bank.topic,
              allTopics: c.bank.allTopics,
              showing: c.bank.showing,
              noResults: c.bank.noResults,
            }}
          />
        </div>

        <ol id="bank" className="mt-6 space-y-4">
          {questions.map((q) => (
            <li key={q.id} data-topic={q.topic ?? ""} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
              <p className="text-xs font-semibold text-muted">
                N.º {q.id}
                {q.topic && ` · ${q.topic}`}
              </p>
              <h2 className="mt-1 whitespace-pre-line text-lg font-semibold leading-snug text-ink">{q.q}</h2>
              {q.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {q.images.map((f, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={f} src={`${IMG_BASE}/${f}`} alt={c.exam.imageAlt(i + 1)} loading="lazy" className="max-h-44 w-auto max-w-full rounded-lg border border-line bg-white object-contain p-2" />
                  ))}
                </div>
              )}
              <ul className="mt-3 space-y-1.5">
                {q.options.map((o, k) => {
                  const right = k === q.answer;
                  const { letter, text } = splitOption(o);
                  return (
                    <li key={k} className={`flex gap-2 rounded-lg px-3 py-2 ${right ? "bg-ok/10 font-semibold text-ink" : "text-muted"}`}>
                      <span className="w-5 shrink-0 font-semibold">{right ? "✓" : `${letter})`}</span>
                      <span>
                        {right && <span className="sr-only">{c.result.correctAnswer}: </span>}
                        {right ? `${letter}) ${text}` : text}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {q.basis && (
                <p className="mt-3 text-sm text-muted">
                  <span className="font-semibold text-ink">{c.exam.basis}:</span> {q.basis}
                </p>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <AppCta locale={locale} />
        </div>

        <nav aria-labelledby="other-cats" className="mt-12">
          <h2 id="other-cats" className="font-display text-2xl font-bold text-ink">{c.bank.otherCategories}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {MTC_CATEGORIES.filter((k) => k.slug !== cat.slug).map((k) => (
              <li key={k.slug}>
                <Link href={localizePath(locale, `${MTC_BASE}/balotario/${k.slug}`)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-3 font-semibold text-ink hover:border-accent">
                  <Image src={catImage(k.slug)} alt="" {...CAT_IMAGE} sizes="3rem" className="h-auto w-12" />
                  {k.code}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12">
          <SimulatorNotice locale={locale} />
        </div>
      </div>
    </AppChrome>
  );
}
