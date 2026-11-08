import { isLocale } from "@/i18n/config";
import { tagline } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Nekodojo";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "es";
  return ogImage({ title: "Nekodojo", subtitle: tagline[l], canvas: "#0D0B14", ink: "#F4F0FA", accent: "#A78BFA", label: "nekodojo.com" });
}
