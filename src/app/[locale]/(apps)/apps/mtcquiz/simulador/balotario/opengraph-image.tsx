import { isLocale } from "@/i18n/config";
import { getApp } from "@/content/apps";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Balotario MTC";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const p = getApp("mtcquiz").preview;
  const es = !isLocale(locale) || locale === "es";
  return ogImage({
    title: es ? "Balotario MTC" : "MTC question bank",
    subtitle: es ? "Todas las categorías, con respuestas y PDF. Gratis." : "Every category, with answers and PDFs. Free.",
    canvas: p.canvas,
    ink: p.ink,
    accent: p.accent,
    label: "MTCQuiz · Nekodojo",
  });
}
