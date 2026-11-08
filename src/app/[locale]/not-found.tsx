import Link from "next/link";
import { headers } from "next/headers";
import { isLocale, localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import StudioShell from "@/components/studio/StudioShell";
import CatMark from "@/components/shared/CatMark";

export default async function NotFound() {
  const h = (await headers()).get("x-locale") ?? undefined;
  const locale: Locale = isLocale(h) ? h : "es";
  const t = getDictionary(locale);
  return (
    <StudioShell locale={locale}>
      <div className="tatami">
        <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6 md:py-32">
          <CatMark className="h-16 w-16 text-accent" />
          <p className="mt-8 font-display text-8xl font-bold tracking-tighter text-muted">404</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">{t.notFound.title}</h1>
          <p className="mt-4 text-lg text-muted">{t.notFound.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={localizePath(locale)} className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-on-accent">{t.notFound.home}</Link>
            <Link href={localizePath(locale, "/apps")} className="rounded-lg border border-line px-5 py-2.5 font-semibold hover:border-accent">{t.notFound.apps}</Link>
          </div>
        </div>
      </div>
    </StudioShell>
  );
}
