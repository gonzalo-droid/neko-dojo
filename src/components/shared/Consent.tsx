"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { localizePath, type Locale } from "@/i18n/config";
import { GA_MEASUREMENT_ID, SUCAMEC_WEB_QUIZ_URL } from "@/content/site";

const KEY = "nekodojo-consent";
const REOPEN = "nekodojo:consent-reopen";

// Only the banner's words, so the client bundle does not carry the whole dictionaries.
const text = {
  es: {
    label: "Aviso de cookies",
    body: "Usamos Google Analytics para saber qué páginas se visitan y mejorar el sitio. Solo se activa si aceptas.",
    more: "Más información",
    accept: "Aceptar",
    decline: "Rechazar",
  },
  en: {
    label: "Cookie notice",
    body: "We use Google Analytics to see which pages are visited and improve the site. It only turns on if you accept.",
    more: "Learn more",
    accept: "Accept",
    decline: "Decline",
  },
};

type Choice = "granted" | "denied" | null;

/**
 * Cookie notice + Google Analytics. GA is loaded only after "Accept"; "Decline" is just as
 * easy, and the choice can be changed later from the legal page (ConsentReopen).
 * Mounted inside each theme container so it takes that page's colours.
 */
const CHANGE = "nekodojo:consent-change";
const subscribe = (cb: () => void) => {
  window.addEventListener(CHANGE, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE, cb);
    window.removeEventListener("storage", cb);
  };
};
const readChoice = (): Choice => {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === "granted" || saved === "denied" ? saved : null;
  } catch {
    return null;
  }
};

export default function Consent() {
  // "server" = not hydrated yet: the server render and first paint show nothing.
  const stored = useSyncExternalStore(subscribe, readChoice, () => "server" as const);
  const locale: Locale = useSyncExternalStore(subscribe, () => (document.documentElement.lang === "en" ? "en" : "es"), () => "es");
  const [reopened, setReopened] = useState(false);
  // Kept for this page too, in case the browser blocks localStorage.
  const [picked, setPicked] = useState<Choice>(null);
  const pathname = usePathname();
  const choice = reopened ? null : (picked ?? stored);

  useEffect(() => {
    const reopen = () => {
      setPicked(null);
      setReopened(true);
    };
    window.addEventListener(REOPEN, reopen);
    return () => window.removeEventListener(REOPEN, reopen);
  }, []);

  // Outbound clicks we want to count. Matched by URL, so every store button on the site
  // (studio cards, app landings, AnimeQuote) is covered without touching their markup.
  useEffect(() => {
    if (choice !== "granted") return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (!a || !gtag) return;
      const host = a.hostname;
      if (host === "play.google.com" || host === "apps.apple.com") {
        gtag("event", "store_click", { store: host === "play.google.com" ? "google_play" : "app_store", link_url: a.href });
      } else if (a.href.startsWith(SUCAMEC_WEB_QUIZ_URL)) {
        gtag("event", "web_quiz_click", { link_url: a.href });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [choice]);

  const save = (next: "granted" | "denied") => {
    const wasGranted = readChoice() === "granted";
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    setReopened(false);
    setPicked(next);
    window.dispatchEvent(new Event(CHANGE));
    if (next === "denied" && wasGranted) {
      // GA is already running in this tab: drop its cookies and reload without it.
      for (const c of document.cookie.split("; ")) {
        const name = c.split("=")[0];
        if (!name.startsWith("_ga")) continue;
        const host = location.hostname.replace(/^www\./, "");
        for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
          document.cookie = `${name}=; max-age=0; path=/${domain}`;
        }
      }
      location.reload();
    }
  };

  // Internal admin panels: no notice and no GA on our own visits.
  if (pathname.endsWith("/admin")) return null;

  const t = text[locale];
  return (
    <>
      {choice === "granted" && process.env.NODE_ENV === "production" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}
      {choice === null && (
        <section
          aria-label={t.label}
          className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-line bg-surface p-3 text-ink shadow-lg sm:bottom-4 sm:left-6 sm:right-auto sm:max-w-sm sm:p-5"
        >
          <p className="text-[13px] leading-snug sm:text-sm sm:leading-relaxed">
            {t.body}{" "}
            <a href={`${localizePath(locale, "/legal")}#cookies`} className="font-semibold underline underline-offset-4 hover:text-accent">
              {t.more}
            </a>
          </p>
          {/* Same size and weight: declining must be as easy as accepting. */}
          <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-3">
            <button type="button" onClick={() => save("denied")} className="min-h-11 rounded-lg border border-line px-4 text-sm font-semibold transition-colors hover:border-accent">
              {t.decline}
            </button>
            <button type="button" onClick={() => save("granted")} className="min-h-11 rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90">
              {t.accept}
            </button>
          </div>
        </section>
      )}
    </>
  );
}

/** Button on the legal page that shows the notice again, to change the choice. */
export function ConsentReopen({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(REOPEN))} className={className}>
      {label}
    </button>
  );
}
