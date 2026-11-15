import type { Metadata } from "next";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { apps, liveStores } from "@/content/apps";
import AppIcon from "@/components/shared/AppIcon";
import StatusBadge from "@/components/shared/StatusBadge";
import AppDirectory, { type DirectoryRow } from "@/components/studio/AppDirectory";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/apps", title: t.meta.catalogTitle, description: t.catalog.description });
}

const platformName = { "google-play": "Android", "app-store": "iOS" } as const;

export default async function Catalog({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);

  // Platforms come only from confirmed store links; nothing is assumed.
  const rows: DirectoryRow[] = apps.map((app) => {
    const base = `/apps/${app.slug}`;
    const stores = liveStores(app);
    const available = app.status === "available";
    return {
      slug: app.slug,
      name: app.name,
      tagline: app.tagline[locale],
      available,
      status: <StatusBadge status={app.status} label={t.status[app.status]} />,
      icon: <AppIcon app={app} size={52} />,
      platforms: stores.length ? stores.map((s) => platformName[s.store]).join(" · ") : available ? t.catalog.platformsPending : "—",
      href: localizePath(locale, base),
      links: [
        { href: localizePath(locale, base), label: t.catalog.page },
        { href: localizePath(locale, `${base}/support`), label: t.common.support },
        { href: localizePath(locale, `${base}/privacy`), label: t.common.privacy },
      ],
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">{t.catalog.title}</h1>
      <p className="mt-4 max-w-lg text-lg text-muted">{t.catalog.intro}</p>
      <AppDirectory
        rows={rows}
        labels={{
          filter: t.catalog.filterLabel,
          all: t.catalog.filterAll,
          available: t.catalog.filterAvailable,
          upcoming: t.catalog.filterUpcoming,
          platforms: t.catalog.platforms,
          empty: t.catalog.empty,
        }}
      />
    </div>
  );
}
