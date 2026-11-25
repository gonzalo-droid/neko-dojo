import { isLocale, locales } from "@/i18n/config";
import { getApp } from "@/content/apps";
import { MTC_CATEGORIES, getCategory } from "@/lib/mtc";
import { loadQuestions } from "@/lib/mtc-server";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Balotario MTC";

export function generateStaticParams() {
  return locales.flatMap((locale) => MTC_CATEGORIES.map((k) => ({ locale, categoria: k.slug })));
}

/** Share card per license: what shows when a bank page is sent by WhatsApp. */
export default async function Image({ params }: { params: Promise<{ locale: string; categoria: string }> }) {
  const { locale, categoria } = await params;
  const cat = getCategory(categoria) ?? MTC_CATEGORIES[0];
  const p = getApp("mtcquiz").preview;
  const es = !isLocale(locale) || locale === "es";
  const n = loadQuestions(cat.slug).length;
  return ogImage({
    title: es ? `Balotario MTC ${cat.code}` : `MTC ${cat.code} question bank`,
    subtitle: es ? `${n} preguntas con respuestas. ${cat.vehicles.es}` : `${n} questions with answers. ${cat.vehicles.en}`,
    canvas: p.canvas,
    ink: p.ink,
    accent: p.accent,
    label: "MTCQuiz · Nekodojo",
  });
}
