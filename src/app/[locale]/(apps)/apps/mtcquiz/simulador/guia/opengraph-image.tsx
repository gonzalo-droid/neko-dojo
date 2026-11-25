import { isLocale } from "@/i18n/config";
import { getApp } from "@/content/apps";
import { MTC_EXAM } from "@/lib/mtc";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Examen de reglas de tránsito MTC";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const p = getApp("mtcquiz").preview;
  const es = !isLocale(locale) || locale === "es";
  const { questions: n, minutes: m, pass } = MTC_EXAM;
  return ogImage({
    title: es ? "Examen de reglas MTC: cómo es" : "MTC rules test: how it works",
    subtitle: es ? `${n} preguntas · ${m} minutos · ${pass} para aprobar. Pasos, costo y cómo prepararte.` : `${n} questions · ${m} minutes · ${pass} to pass. Steps, fee and how to prepare.`,
    canvas: p.canvas,
    ink: p.ink,
    accent: p.accent,
    label: "MTCQuiz · Nekodojo",
  });
}
