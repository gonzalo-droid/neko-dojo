import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import CatMark from "@/components/shared/CatMark";
import LanguageSwitch from "@/components/shared/LanguageSwitch";

export default function StudioHeader({ locale, t }: { locale: Locale; t: Dictionary }) {
  const links = [
    { href: "/apps", label: t.nav.apps },
    { href: "/studio", label: t.nav.studio },
    { href: "/support", label: t.nav.support },
    { href: "/legal", label: t.nav.legal },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3 sm:px-6">
        <Link href={localizePath(locale)} className="flex items-center gap-2.5 text-ink">
          <CatMark className="h-7 w-7 text-accent" />
          <span className="font-display text-lg font-bold tracking-tight">Nekodojo</span>
        </Link>
        <nav aria-label={t.a11y.mainNav} className="order-3 w-full sm:order-none sm:w-auto">
          <ul className="-mx-2 flex gap-1 overflow-x-auto">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={localizePath(locale, link.href)}
                  className="block rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitch
          locale={locale}
          label={t.languageSwitch.short}
          hint={t.languageSwitch.hint}
          className="ml-auto rounded-md border border-line px-2.5 py-1 text-xs font-semibold tracking-wide text-muted transition-colors hover:border-accent hover:text-ink"
        />
      </div>
    </header>
  );
}
