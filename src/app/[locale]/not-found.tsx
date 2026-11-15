"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizePath, parsePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import StudioShell from "@/components/studio/StudioShell";
import CatMark from "@/components/shared/CatMark";
import AppIcon from "@/components/shared/AppIcon";
import { apps } from "@/content/apps";

// A client component on purpose: reading request headers here would make every
// route under [locale] dynamic. The language comes from the URL instead.
export default function NotFound() {
  const locale: Locale = parsePath(usePathname() ?? "/").locale ?? "es";
  const t = getDictionary(locale);
  return (
    <StudioShell locale={locale}>
      <div className="tatami">
        <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6 md:py-32">
          <CatMark className="h-16 w-16 text-accent" />
          <p className="mt-8 font-display text-8xl font-bold tracking-tighter text-muted">404</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">{t.notFound.title}</h1>
          <p className="mt-4 text-lg text-muted">{t.notFound.body}</p>
          <h2 className="mt-10 text-sm font-semibold text-ink">{t.notFound.shortcuts}</h2>
          <ul className="mt-3 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link
                  href={localizePath(locale, `/apps/${app.slug}`)}
                  className="flex min-h-14 items-center gap-3 rounded-xl border border-line bg-surface/50 p-3 transition-colors hover:border-accent"
                >
                  <AppIcon app={app} size={32} />
                  <span className="font-semibold">{app.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={localizePath(locale)} className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-on-accent">{t.notFound.home}</Link>
            <Link href={localizePath(locale, "/apps")} className="rounded-lg border border-line px-5 py-2.5 font-semibold hover:border-accent">{t.notFound.apps}</Link>
          </div>
        </div>
      </div>
    </StudioShell>
  );
}
