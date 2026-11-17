"use client";

import { useEffect, useSyncExternalStore } from "react";
import { STUDIO_THEME_KEY } from "./StudioThemeScript";

type Theme = "light" | "dark";
const LIGHT_QUERY = "(prefers-color-scheme: light)";

function saved(): Theme | null {
  try {
    const t = localStorage.getItem(STUDIO_THEME_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerSnapshot = (): Theme => "dark";

/** Sun/moon button for the studio. The icon is chosen by CSS, so it is right from the first paint. */
export default function ThemeToggle({ toLight, toDark, className = "" }: { toLight: string; toDark: string; className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Entering the studio by client navigation from a page that did not run the script,
  // or following the system while the visitor has not chosen a theme.
  useEffect(() => {
    const media = matchMedia(LIGHT_QUERY);
    const apply = () => {
      document.documentElement.dataset.theme = saved() ?? (media.matches ? "light" : "dark");
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STUDIO_THEME_KEY, next);
    } catch {
      /* private mode: the choice lasts for this page only */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? toDark : toLight}
      title={theme === "light" ? toDark : toLight}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {/* The icon announces the theme you switch to: a sun while dark, a moon while light. */}
      <svg className="studio-light:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="hidden studio-light:block" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
