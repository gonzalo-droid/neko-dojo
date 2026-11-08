import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { apps } from "@/content/apps";
import { CONTACT_EMAIL, INSTAGRAM_URL, tagline } from "@/content/site";
import CatMark from "@/components/shared/CatMark";
import LanguageSwitch from "@/components/shared/LanguageSwitch";

export default function StudioFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 text-ink">
            <CatMark className="h-6 w-6 text-accent" />
            <span className="font-display font-bold">Nekodojo</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">{tagline[locale]}</p>
          <LanguageSwitch
            locale={locale}
            label={t.languageSwitch.label}
            hint={t.languageSwitch.hint}
            className="mt-6 inline-block text-sm text-muted underline underline-offset-4 hover:text-ink"
          />
        </div>
        <nav aria-label={t.a11y.footerNav}>
          <p className="text-sm font-semibold text-ink">{t.nav.apps}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link href={localizePath(locale, `/apps/${app.slug}`)} className="text-muted hover:text-ink">
                  {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold text-ink">Nekodojo</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href={localizePath(locale, "/studio")} className="text-muted hover:text-ink">{t.nav.studio}</Link></li>
            <li><Link href={localizePath(locale, "/support")} className="text-muted hover:text-ink">{t.nav.support}</Link></li>
            <li><Link href={localizePath(locale, "/legal")} className="text-muted hover:text-ink">{t.legal.title}</Link></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="text-muted hover:text-ink">{CONTACT_EMAIL}</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">Instagram</a></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-10 text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} Nekodojo. {t.footer.rights}
      </p>
    </footer>
  );
}
