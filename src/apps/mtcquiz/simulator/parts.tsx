import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate, getApp } from "@/content/apps";
import { MTC_BASE, MTC_EXAM } from "@/lib/mtc";
import StoreButtons from "@/components/app/StoreButtons";
import AppIcon from "@/components/shared/AppIcon";
import { simulatorContent } from "../simulator-content";

const app = getApp("mtcquiz");

// Google Play passes this referrer to the install, so Play Console counts the installs that came from the simulator.
const PLAY_REFERRER = encodeURIComponent("utm_source=nekodojo&utm_medium=web&utm_campaign=simulador_mtc");
const stores = app.stores.map((s) => (s.store === "google-play" && s.url ? { ...s, url: `${s.url}&referrer=${PLAY_REFERRER}` } : s));

/** The pitch for the app, shown on every simulator page and with each result. */
export function AppCta({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = getDictionary(locale);
  const c = simulatorContent[locale].app;
  return (
    <aside aria-labelledby={compact ? undefined : "app-cta-title"} aria-label={compact ? c.title : undefined} className="overflow-hidden rounded-3xl bg-accent text-on-accent">
      <div className={`grid items-center gap-8 p-6 sm:p-8 ${compact ? "" : "md:grid-cols-[1fr_auto]"}`}>
        <div>
          <div className="flex items-center gap-3">
            <AppIcon app={app} size={48} />
            <h2 id={compact ? undefined : "app-cta-title"} className="font-display text-2xl font-bold sm:text-3xl">{c.title}</h2>
          </div>
          <p className="mt-4 max-w-xl leading-relaxed opacity-90">{c.body}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
            {c.bullets.map((b) => (
              <li key={b} className="flex items-center gap-1.5">
                <span aria-hidden="true">✓</span>
                {b}
              </li>
            ))}
          </ul>
          {/* The store links are tracked as store_click by components/shared/Consent. */}
          <div className="mt-6 [&_a]:bg-on-accent [&_a]:text-accent">
            <StoreButtons stores={stores} t={t.common} size={compact ? "sm" : "md"} />
          </div>
          <Link href={localizePath(locale, "/apps/mtcquiz")} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
            {c.link}
          </Link>
        </div>
        {!compact && (
          <div className="mx-auto hidden w-44 overflow-hidden rounded-[1.8rem] border-[6px] border-ink bg-surface shadow-2xl md:block">
            <Image src="/apps/mtcquiz/exam.webp" alt="" width={920} height={2000} sizes="11rem" className="h-auto w-full" />
          </div>
        )}
      </div>
    </aside>
  );
}

/** In-page links shared by the simulator pages (AppChrome nav). */
export function simulatorNav(locale: Locale) {
  const c = simulatorContent[locale];
  return [
    { href: localizePath(locale, MTC_BASE), label: c.breadcrumb.simulator },
    { href: localizePath(locale, `${MTC_BASE}/balotario`), label: c.breadcrumb.bank },
    { href: localizePath(locale, "/apps/mtcquiz"), label: "App MTCQuiz" },
  ];
}

/** Disclaimer plus where the test rules come from. */
export function SimulatorNotice({ locale }: { locale: Locale }) {
  const c = simulatorContent[locale];
  return (
    <div className="space-y-2 border-l-4 border-accent2 pl-4 text-sm leading-relaxed text-ink">
      <p>{c.disclaimer}</p>
      <p className="text-muted">
        {c.verified(formatDate(MTC_EXAM.verified, locale))}{" "}
        <a href={MTC_EXAM.source} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline underline-offset-4">
          {c.officialLink}
        </a>
      </p>
    </div>
  );
}
