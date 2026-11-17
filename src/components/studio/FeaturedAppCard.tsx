import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { liveStores, type AppEntry } from "@/content/apps";
import type { Dictionary } from "@/i18n/dictionaries";
import AppIcon from "@/components/shared/AppIcon";
import StatusBadge from "@/components/shared/StatusBadge";

const storeNames = { "google-play": "Google Play", "app-store": "App Store" } as const;

/** Relative luminance of a #rrggbb color (WCAG). */
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// The card keeps the app's own canvas whatever the studio theme is, so its status dot
// must follow the card, not the page: dark-friendly greens vanish on a light card.
const statusOnLight = { "--app-ok": "#11704a", "--app-warn": "#8a5800" } as React.CSSProperties;
const statusOnDark = { "--app-ok": "#34d399", "--app-warn": "#fbbf24" } as React.CSSProperties;

/**
 * Wide card for a published app, painted in its own identity: what it is, a real
 * screenshot when there is one, and the store links right there (no extra page in between).
 */
export default function FeaturedAppCard({ app, locale, t }: { app: AppEntry; locale: Locale; t: Dictionary }) {
  const p = app.preview;
  const stores = liveStores(app);
  const href = localizePath(locale, `/apps/${app.slug}`);
  const rating = app.rating?.toLocaleString(locale === "es" ? "es-PE" : "en-US", { minimumFractionDigits: 1 });

  return (
    <article
      className="relative grid overflow-hidden rounded-3xl ring-1 ring-white/5 sm:grid-cols-[minmax(0,1fr)_auto]"
      style={{ background: p.canvas, color: p.ink, ...(luminance(p.canvas) > 0.4 ? statusOnLight : statusOnDark) }}
    >
      <div className="flex min-w-0 flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <AppIcon app={app} size={52} />
          <span className="rounded-full px-2.5 py-1" style={{ background: `${p.ink}12` }}>
            <StatusBadge status={app.status} label={t.status[app.status]} />
          </span>
        </div>
        <h3 className="mt-8 text-4xl font-bold leading-tight tracking-tight" style={{ fontFamily: `var(${p.fontVar})` }}>
          <Link href={href} className="hover:underline hover:decoration-2 hover:underline-offset-4">
            {app.name}
          </Link>
        </h3>
        <p className="mt-2 text-lg leading-snug" style={{ fontFamily: `var(${p.fontVar})` }}>{app.tagline[locale]}</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: p.muted }}>{app.summary[locale]}</p>
        {rating && (
          <p className="mt-4 text-sm font-semibold" aria-label={t.common.rating(rating)}>
            <span aria-hidden="true" style={{ color: p.accent }}>★</span> {rating}
            <span className="font-normal" style={{ color: p.muted }}> · {stores.map((s) => storeNames[s.store]).join(" · ")}</span>
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          {stores.length > 0 ? (
            stores.map((s, i) => (
              <a
                key={s.store}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90"
                style={i === 0 ? { background: p.ink, color: p.canvas } : { boxShadow: `inset 0 0 0 1.5px ${p.ink}`, color: p.ink }}
              >
                {s.store === "app-store" ? t.common.downloadOn : t.common.getOn} {storeNames[s.store]}
              </a>
            ))
          ) : (
            <p className="text-sm" style={{ color: p.muted }}>{t.common.storesPending}</p>
          )}
          <Link
            href={href}
            className="inline-flex min-h-11 items-center text-sm font-semibold underline decoration-2 underline-offset-4"
            style={{ color: p.accent }}
          >
            {t.common.openApp}
          </Link>
        </div>
      </div>

      {app.screenshot && (
        <div className="relative hidden w-[230px] self-end px-6 pt-8 sm:block" aria-hidden="false">
          <Image
            src={app.screenshot.src}
            alt={app.screenshot.alt[locale]}
            width={app.screenshot.width}
            height={app.screenshot.height}
            sizes="200px"
            className="-mb-16 h-auto w-full drop-shadow-2xl"
          />
        </div>
      )}
    </article>
  );
}
