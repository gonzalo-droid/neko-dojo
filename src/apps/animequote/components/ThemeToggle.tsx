"use client";

import { useSyncExternalStore } from "react";

// data-aq-theme on <html> is the source of truth. The server sets it from the
// "aq-theme" cookie, so a saved dark theme is painted from the first frame.
const root = () => document.documentElement;

function subscribe(onChange: () => void) {
  const el = root();
  const observer = new MutationObserver(onChange);
  observer.observe(el, { attributes: true, attributeFilter: ["data-aq-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = () => root().dataset.aqTheme === "dark";
const getServerSnapshot = () => false;

export default function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const el = root();
    const next = !dark;
    if (next) el.dataset.aqTheme = "dark";
    else delete el.dataset.aqTheme;
    document.cookie = `aq-theme=${next ? "dark" : "light"}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? toLight : toDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-accent/10 hover:text-accent"
    >
      <svg className="theme-dark:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="hidden theme-dark:block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
