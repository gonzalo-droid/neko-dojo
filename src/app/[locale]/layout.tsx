import type { Metadata, Viewport } from "next";
import { htmlLang, locales } from "@/i18n/config";
import { getLocale } from "@/lib/locale";
import { inter } from "@/lib/fonts/inter";
import { SITE_URL } from "@/content/site";
import StudioThemeScript from "@/components/studio/StudioThemeScript";
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
  // No cookies() here: reading them would make every page dynamic. AnimeQuote reads
  // its own theme cookie in its layout, so only its pages are rendered per request.
  return (
    // suppressHydrationWarning: StudioThemeScript sets data-theme on <html> before React hydrates.
    <html lang={htmlLang[locale]} className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <StudioThemeScript />
        {children}
      </body>
    </html>
  );
}
