"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { localizePath, type Locale } from "@/i18n/config";
import LanguageSwitch from "@/components/shared/LanguageSwitch";
import BackToStudio from "@/components/shared/BackToStudio";
import type { AqContent } from "../content";
import ThemeToggle from "./ThemeToggle";

type Props = {
  c: AqContent;
  locale: Locale;
  studioLabel: string;
  allAppsLabel: string;
  mainNavLabel: string;
  lang: { short: string; hint: string };
};

export default function Header({ c, locale, studioLabel, allAppsLabel, mainNavLabel, lang }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-accent/10 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <BackToStudio href={localizePath(locale, "/apps")} label={studioLabel} hint={allAppsLabel} />
          <Link href={localizePath(locale, "/apps/animequote")} aria-label="AnimeQuote" className="group flex items-center gap-3">
            <Image src="/apps/animequote/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-[10px] object-cover" priority />
            <span className="hidden font-semibold text-ink transition-colors duration-200 group-hover:text-accent min-[420px]:inline">AnimeQuote</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 sm:flex" aria-label={mainNavLabel}>
          {c.nav.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-muted transition-colors duration-200 hover:text-accent">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <LanguageSwitch
            locale={locale}
            label={lang.short}
            hint={lang.hint}
            className="inline-flex h-9 items-center rounded-lg px-2 text-xs font-semibold text-muted transition-colors hover:bg-accent/10 hover:text-accent"
          />
          <ThemeToggle toLight={c.themeToLight} toDark={c.themeToDark} />
          <motion.a
            href="#download"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-semibold sm:px-4 text-on-accent transition-opacity duration-200 hover:opacity-90"
          >
            {c.download}
          </motion.a>
        </div>
      </div>
    </header>
  );
}
