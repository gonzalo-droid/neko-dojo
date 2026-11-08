"use client";

import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localizePath, parsePath, type Locale } from "@/i18n/config";
import { FlagES, FlagUS } from "./Flag";

type Props = { locale: Locale; label: string; hint: string; className?: string };

/**
 * Goes to the same page in the other language and remembers the choice
 * (so Spanish, which has no /es in the URL, isn't redirected back to English).
 * A plain <a> on purpose: a full load updates <html lang> and avoids a cached redirect.
 */
export default function LanguageSwitch({ locale, label, hint, className = "" }: Props) {
  const pathname = usePathname();
  const target: Locale = locale === "es" ? "en" : "es";
  const { internal } = parsePath(pathname ?? "/");
  const Flag = target === "es" ? FlagES : FlagUS;
  return (
    <a
      href={localizePath(target, internal)}
      hrefLang={target}
      lang={target}
      aria-label={hint}
      title={hint}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
      className={`inline-flex items-center gap-1.5 ${className}`}
    >
      <Flag className="h-3 w-[18px] shrink-0 rounded-[2px] ring-1 ring-black/10" />
      {label}
    </a>
  );
}
