import { isLocale } from "@/i18n/config";
import { getApp } from "@/content/apps";
import { MTC_EXAM } from "@/lib/mtc";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Simulador examen MTC";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const p = getApp("mtcquiz").preview;
  const es = !isLocale(locale) || locale === "es";
  const { questions: n, minutes: m, pass } = MTC_EXAM;
  return ogImage({
    title: es ? "Simulador examen MTC" : "MTC test simulator",
    subtitle: es ? `${n} preguntas · ${m} minutos · aprueba con ${pass}. Gratis.` : `${n} questions · ${m} minutes · pass with ${pass}. Free.`,
    canvas: p.canvas,
    ink: p.ink,
    accent: p.accent,
    label: "MTCQuiz · Nekodojo",
  });
}
