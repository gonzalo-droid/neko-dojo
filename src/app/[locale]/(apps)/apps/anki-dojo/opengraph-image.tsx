import { isLocale } from "@/i18n/config";
import { getApp } from "@/content/apps";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = getApp("anki-dojo").name;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const app = getApp("anki-dojo");
  const l = isLocale(locale) ? locale : "es";
  const p = app.preview;
  return ogImage({ title: app.name, subtitle: app.tagline[l], canvas: p.canvas, ink: p.ink, accent: p.accent, label: "Nekodojo" });
}
