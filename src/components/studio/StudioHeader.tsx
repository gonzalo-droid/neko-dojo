import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import CatMark from "@/components/shared/CatMark";
import LanguageSwitch from "@/components/shared/LanguageSwitch";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";

export default function StudioHeader({ locale, t }: { locale: Locale; t: Dictionary }) {
  const links = [
    { href: "/apps", label: t.nav.apps },
    { href: "/studio", label: t.nav.studio },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
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
          <NavLinks items={links.map((l) => ({ href: localizePath(locale, l.href), internal: l.href, label: l.label }))} />
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle toLight={t.theme.toLight} toDark={t.theme.toDark} />
          <LanguageSwitch
            locale={locale}
            label={t.languageSwitch.short}
            hint={t.languageSwitch.hint}
            className="rounded-md border border-line px-1 py-0.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:border-accent"
          />
        </div>
      </div>
    </header>
  );
}
