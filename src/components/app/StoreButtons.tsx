import Image from "next/image";
import type { StoreLink } from "@/content/apps";
import type { Dictionary } from "@/i18n/dictionaries";

const names = { "google-play": "Google Play", "app-store": "App Store" } as const;

function StoreIcon({ store, size }: { store: StoreLink["store"]; size: number }) {
  if (store === "google-play") {
    return <Image src="/stores/google-play.png" alt="" width={size} height={size} loading="eager" className="shrink-0" />;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

/**
 * Store buttons with each store's icon, for the stores that have a confirmed link.
 * With showPending, a store without a link appears as a muted "coming soon" badge
 * that isn't clickable. When no link is confirmed at all, one honest line replaces
 * the buttons, so nothing looks clickable that goes nowhere.
 */
export default function StoreButtons({
  stores,
  t,
  size = "md",
  showPending = false,
}: {
  stores: StoreLink[];
  t: Dictionary["common"];
  size?: "sm" | "md";
  showPending?: boolean;
}) {
  const live = stores.filter((s) => s.url);
  if (live.length === 0) {
    return <p className="max-w-md rounded-xl border border-dashed border-line px-4 py-3 text-sm text-muted">{t.storesPending}</p>;
  }
  const shown = showPending ? stores : live;
  const pad = size === "sm" ? "px-4 py-2" : "px-5 py-2.5";
  const icon = size === "sm" ? 22 : 26;
  const label = size === "sm" ? "text-base" : "text-lg";
  return (
    <ul className="flex flex-wrap gap-3">
      {shown.map((s) => (
        <li key={s.store}>
          {s.url ? (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 items-center gap-3 rounded-xl bg-ink ${pad} text-canvas transition-opacity hover:opacity-90`}
            >
              <StoreIcon store={s.store} size={icon} />
              <span className="flex flex-col">
                <span className="text-[11px] leading-none opacity-80">{s.store === "app-store" ? t.downloadOn : t.getOn}</span>
                <span className={`mt-1 ${label} font-semibold leading-none`}>{names[s.store]}</span>
              </span>
            </a>
          ) : (
            <span className={`inline-flex min-h-11 items-center gap-3 rounded-xl border border-dashed border-current ${pad} opacity-70`}>
              <StoreIcon store={s.store} size={icon} />
              <span className="flex flex-col">
                <span className="text-[11px] leading-none">{t.comingSoonOn}</span>
                <span className={`mt-1 ${label} font-semibold leading-none`}>{names[s.store]}</span>
              </span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
