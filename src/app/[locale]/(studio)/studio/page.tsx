import type { Metadata } from "next";
import { localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { apps, liveStores } from "@/content/apps";
import { CONTACT_EMAIL, INSTAGRAM_URL, tagline } from "@/content/site";
import CatMark from "@/components/shared/CatMark";
import AppIcon from "@/components/shared/AppIcon";
import StatusBadge from "@/components/shared/StatusBadge";
import AppDirectory, { type DirectoryRow } from "@/components/studio/AppDirectory";

const platformName = { "google-play": "Android", "app-store": "iOS" } as const;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  return pageMetadata({ locale, path: "/studio", title: t.meta.studioTitle, description: t.studio.description });
}

export default async function Studio({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
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
    <>
      <section className="tatami border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <CatMark className="h-14 w-14 text-accent" />
          <h1 className="mt-8 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">{t.studio.lead}</h1>
          <p className="mt-6 font-display text-xl text-muted">{tagline[locale]}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t.studio.principlesTitle}</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {t.studio.blocks.map((b) => (
            <section key={b.title} className="border-t border-accent/40 pt-6">
              <h3 className="font-display text-xl font-bold">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
            </section>
          ))}
        </div>
      </section>

      {/* One row per app, straight from apps.ts: status, platforms (only confirmed store links) and direct links. */}
      <section id="apps" className="scroll-mt-20 border-t border-line bg-band">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t.studio.timelineTitle}</h2>
          <p className="mt-3 max-w-lg text-muted">{t.studio.timelineBody}</p>
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
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">{t.studio.contactTitle}</h2>
            <p className="mt-3 max-w-md text-muted">{t.studio.contactBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 font-semibold text-on-accent hover:opacity-90">
              {t.studio.contactCta}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-lg border border-line px-5 font-semibold text-ink hover:border-accent"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
