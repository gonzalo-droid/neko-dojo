import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getApp } from "@/content/apps";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "@/content/site";
import { aqContent } from "@/apps/animequote/content";
import Header from "@/apps/animequote/components/Header";
import Hero from "@/apps/animequote/components/Hero";
import AppShowcase from "@/apps/animequote/components/AppShowcase";
import FAQ from "@/apps/animequote/components/FAQ";
import Download from "@/apps/animequote/components/Download";
import Footer from "@/apps/animequote/components/Footer";
import StickyDownloadBar from "@/apps/animequote/components/StickyDownloadBar";

const app = getApp("animequote");
const playUrl = app.stores.find((s) => s.store === "google-play")!.url!;
const appStoreUrl = app.stores.find((s) => s.store === "app-store")!.url!;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = aqContent[locale];
  return pageMetadata({
    locale,
    path: "/apps/animequote",
    title: c.meta.title,
    description: c.meta.description,
    siteName: "AnimeQuote",
    // animequote.app stays the main Spanish page until a migration is decided (see docs/animequote-migration.md).
    canonical: locale === "es" ? "https://animequote.app" : undefined,
  });
}

export default async function AnimeQuotePage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const c = aqContent[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "AnimeQuote",
    alternateName: ["Quote Anime", "QuoteAnime"],
    operatingSystem: "ANDROID, IOS",
    applicationCategory: "LifestyleApplication",
    url: "https://animequote.app",
    downloadUrl: playUrl,
    sameAs: [appStoreUrl, INSTAGRAM_URL],
    publisher: { "@type": "Organization", name: "Nekodojo" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: c.meta.description,
  };

  return (
    <>
      <a href="#main" className="skip-link">{t.a11y.skip}</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header c={c} locale={locale} studioLabel={t.common.backToStudio} allAppsLabel={t.common.allApps} mainNavLabel={t.a11y.mainNav} lang={t.languageSwitch} />
      <main id="main">
        <Hero c={c} playUrl={playUrl} appStoreUrl={appStoreUrl} />
        <AppShowcase c={c.showcase} />
        <FAQ c={c.faq} email={CONTACT_EMAIL} />
        <Download c={c} playUrl={playUrl} appStoreUrl={appStoreUrl} instagramUrl={INSTAGRAM_URL} />
      </main>
      <Footer c={c.footer} locale={locale} email={CONTACT_EMAIL} instagramUrl={INSTAGRAM_URL} madeBy={t.common.madeBy} rights={t.footer.rights} navLabel={t.a11y.footerNav} />
      <StickyDownloadBar c={c.sticky} playUrl={playUrl} appStoreUrl={appStoreUrl} labels={c.badges} />
    </>
  );
}
