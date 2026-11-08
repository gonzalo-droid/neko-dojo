import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { htmlLang, locales } from "@/i18n/config";
import { getLocale } from "@/lib/locale";
import { inter } from "@/lib/fonts/inter";
import { SITE_URL } from "@/content/site";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Nekodojo", template: "%s" },
  applicationName: "Nekodojo",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  // AnimeQuote's dark mode comes from a cookie, so the server paints it right away
  // (no flash, no inline script). Only .theme-animequote reads this attribute.
  const aqDark = (await cookies()).get("aq-theme")?.value === "dark";
  return (
    <html lang={htmlLang[locale]} className={inter.variable} data-scroll-behavior="smooth" data-aq-theme={aqDark ? "dark" : undefined}>
      <body>{children}</body>
    </html>
  );
}
