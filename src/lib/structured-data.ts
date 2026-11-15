import { localizePath, type Locale } from "@/i18n/config";
import { CONTACT_EMAIL, INSTAGRAM_URL, SITE_URL, STUDIO_NAME, tagline } from "@/content/site";
import { liveStores, type AppEntry } from "@/content/apps";

const abs = (locale: Locale, path: string) => `${SITE_URL}${localizePath(locale, path)}`;
export const ORG_ID = `${SITE_URL}/#organization`;

/** Organization + WebSite, once per studio page. */
export function studioGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: STUDIO_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        email: CONTACT_EMAIL,
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: STUDIO_NAME,
        url: SITE_URL,
        description: tagline[locale],
        inLanguage: locale,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbList(locale: Locale, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(locale, c.path) })),
  };
}

/** Only for published apps with at least one confirmed store link. */
export function mobileApplication(app: AppEntry, locale: Locale) {
  const stores = liveStores(app);
  if (app.status !== "available" || stores.length === 0) return null;
  const os = stores.map((s) => (s.store === "google-play" ? "ANDROID" : "IOS")).join(", ");
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: app.name,
    description: app.summary[locale],
    operatingSystem: os,
    url: abs(locale, `/apps/${app.slug}`),
    downloadUrl: stores.map((s) => s.url),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@id": ORG_ID },
  };
}
