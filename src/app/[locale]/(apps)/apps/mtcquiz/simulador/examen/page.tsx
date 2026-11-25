import type { Metadata } from "next";
import { Suspense } from "react";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getApp } from "@/content/apps";
import { MTC_BASE } from "@/lib/mtc";
import { simulatorContent } from "@/apps/mtcquiz/simulator-content";
import ExamRunner from "@/apps/mtcquiz/simulator/ExamRunner";
import { AppCta, simulatorNav } from "@/apps/mtcquiz/simulator/parts";
import AppChrome from "@/components/app/AppChrome";

const app = getApp("mtcquiz");

// The exam is drawn in the browser; this URL has nothing for search engines.
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = simulatorContent[locale];
  return pageMetadata({ locale, path: `${MTC_BASE}/examen`, title: c.meta.examTitle, description: c.meta.description, siteName: "MTCQuiz", noindex: true });
}

export default async function ExamPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = simulatorContent[locale];
  return (
    <AppChrome app={app} locale={locale} nav={simulatorNav(locale)}>
      <Suspense fallback={<p className="px-4 py-20 text-center text-muted">{c.exam.loading}</p>}>
        <ExamRunner locale={locale} appCta={<AppCta locale={locale} compact />} />
      </Suspense>
    </AppChrome>
  );
}
