import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { AppEntry } from "@/content/apps";
import AppIcon from "@/components/shared/AppIcon";
import LanguageSwitch from "@/components/shared/LanguageSwitch";
import CatMark from "@/components/shared/CatMark";
import BackToStudio from "@/components/shared/BackToStudio";

type Props = {
  app: AppEntry;
  locale: Locale;
  children: React.ReactNode;
  /** In-page links for the landing (e.g. #features). */
  nav?: { href: string; label: string }[];
  /** Extra element on the right of the bar (theme toggle, CTA). */
  actions?: React.ReactNode;
};

/** Minimal bar and footer in the app's own identity, with a quiet link back to the studio. */
export default function AppChrome({ app, locale, children, nav = [], actions }: Props) {
  const t = getDictionary(locale);
  const base = `/apps/${app.slug}`;
  return (
    <>
      <a href="#main" className="skip-link">{t.a11y.skip}</a>
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
          <BackToStudio href={localizePath(locale, "/apps")} label={t.common.backToStudio} hint={t.common.allApps} />
          <Link href={localizePath(locale, base)} className="flex min-w-0 items-center gap-2.5 font-display text-lg font-bold text-ink">
            <AppIcon app={app} size={32} />
            {app.name}
          </Link>
          {nav.length > 0 && (
            <nav aria-label={t.a11y.mainNav} className="ml-4 hidden md:block">
              <ul className="flex gap-6 text-sm">
                {nav.map((n) => (
                  <li key={n.href}><a href={n.href} className="text-muted hover:text-accent">{n.label}</a></li>
                ))}
              </ul>
            </nav>
          )}
          <div className="ml-auto flex items-center gap-2">
            {actions}
            <LanguageSwitch
              locale={locale}
              label={t.languageSwitch.short}
              hint={t.languageSwitch.hint}
              className="rounded-md border border-line px-2 py-1 text-xs font-semibold text-muted hover:border-accent hover:text-ink"
            />
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <nav aria-label={t.a11y.footerNav}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li><Link href={localizePath(locale, `${base}/support`)} className="text-muted hover:text-accent">{t.common.support}</Link></li>
              <li><Link href={localizePath(locale, `${base}/privacy`)} className="text-muted hover:text-accent">{t.common.privacy}</Link></li>
              <li><Link href={localizePath(locale, `${base}/terms`)} className="text-muted hover:text-accent">{t.common.terms}</Link></li>
            </ul>
          </nav>
          <Link href={localizePath(locale)} className="inline-flex items-center gap-2 text-muted hover:text-ink">
            <CatMark className="h-4 w-4" />
            {t.common.madeBy}
          </Link>
        </div>
      </footer>
    </>
  );
}
