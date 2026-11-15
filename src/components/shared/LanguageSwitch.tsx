"use client";

import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localizePath, parsePath, type Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  /** Visible text of the link to the other language (e.g. "EN" or "English"). */
  label: string;
  /** What the link does, read after the visible text ("Ver esta página en inglés"). */
  hint: string;
  className?: string;
};

const codes: Record<Locale, string> = { es: "ES", en: "EN" };

/**
 * Segmented "ES | EN": the current language is marked, the other one is a link to
 * the same page in that language. The choice is remembered (Spanish has no /es in
 * the URL, so without the cookie it would be redirected back to English).
 * A plain <a> on purpose: a full load updates <html lang> and avoids a cached redirect.
 */
export default function LanguageSwitch({ locale, label, hint, className = "" }: Props) {
  const pathname = usePathname();
  const target: Locale = locale === "es" ? "en" : "es";
  const { internal } = parsePath(pathname ?? "/");
  const short = label.length <= 3;
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {short && (
        <span aria-hidden="true" className="rounded px-1.5 py-0.5 text-ink">
          {codes[locale]}
        </span>
      )}
      {short && <span aria-hidden="true" className="opacity-40">|</span>}
      <a
        href={localizePath(target, internal)}
        hrefLang={target}
        lang={target}
        aria-label={`${label}: ${hint}`}
        title={hint}
        onClick={() => {
          document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
        }}
        className={`inline-flex min-h-8 items-center rounded underline-offset-4 hover:underline ${short ? "px-1.5 py-0.5" : ""}`}
      >
        {label}
      </a>
    </span>
  );
}
