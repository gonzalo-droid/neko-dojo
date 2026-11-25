import type { Metadata } from "next";
import Link from "next/link";
import { statSync } from "node:fs";
import { join } from "node:path";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getApp } from "@/content/apps";
import Image from "next/image";
import { CAT_IMAGE, MTC_BASE, MTC_CATEGORIES, catImage, pdfPath } from "@/lib/mtc";
import { loadQuestions } from "@/lib/mtc-server";
import { simulatorContent } from "@/apps/mtcquiz/simulator-content";
import { AppCta, SimulatorNotice, simulatorNav } from "@/apps/mtcquiz/simulator/parts";
import AppChrome from "@/components/app/AppChrome";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const app = getApp("mtcquiz");

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = simulatorContent[locale].meta;
  return pageMetadata({ locale, path: `${MTC_BASE}/balotario`, title: c.pdfTitle, description: c.pdfDescription, siteName: "MTCQuiz" });
}

const mb = (slug: (typeof MTC_CATEGORIES)[number]["slug"], locale: string) =>
  (statSync(join(process.cwd(), "public", pdfPath(slug))).size / 1_048_576).toLocaleString(locale === "es" ? "es-PE" : "en-US", { maximumFractionDigits: 1 });

export default async function BankIndexPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const c = simulatorContent[locale];

  return (
    <AppChrome app={app} locale={locale} nav={simulatorNav(locale)}>
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6">
        <Breadcrumbs
          locale={locale}
          label={t.breadcrumbs.label}
          crumbs={[
            { name: app.name, path: "/apps/mtcquiz" },
            { name: c.breadcrumb.simulator, path: MTC_BASE },
            { name: c.breadcrumb.bank, path: `${MTC_BASE}/balotario` },
          ]}
        />
        <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{c.pdfs.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{c.pdfs.lead} {c.bank.lead}</p>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {MTC_CATEGORIES.map((k) => (
            <li key={k.slug} className="grid grid-cols-[6rem_1fr] items-center gap-4 py-5 sm:grid-cols-[8rem_1fr_auto]">
              <Image src={catImage(k.slug)} alt="" {...CAT_IMAGE} sizes="8rem" className="h-auto w-full" />
              <div>
                <h2 className="font-display text-2xl font-bold text-ink">
                  <Link href={localizePath(locale, `${MTC_BASE}/balotario/${k.slug}`)} className="hover:text-accent">
                    {k.code}
                  </Link>
                </h2>
                <p className="text-sm text-muted">
                  {k.vehicles[locale]} · {c.bank.count(loadQuestions(k.slug).length)} · {c.pdfs.size(mb(k.slug, locale))}
                </p>
              </div>
              <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1">
                <Link
                  href={localizePath(locale, `${MTC_BASE}/balotario/${k.slug}`)}
                  className="inline-flex min-h-11 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent hover:opacity-90"
                >
                  {c.bank.open}
                </Link>
                <a href={pdfPath(k.slug)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold text-ink hover:border-accent">
                  {c.pdfs.view} PDF
                </a>
                <a href={pdfPath(k.slug)} download className="inline-flex min-h-11 items-center rounded-lg border border-line bg-surface px-4 text-sm font-semibold text-ink hover:border-accent">
                  {c.pdfs.download}
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">{c.pdfs.source}</p>

        <div className="mt-12">
          <AppCta locale={locale} />
        </div>
        <div className="mt-12">
          <SimulatorNotice locale={locale} />
        </div>
      </div>
    </AppChrome>
  );
}
