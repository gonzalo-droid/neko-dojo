import type { StoreLink } from "@/content/apps";
import type { Dictionary } from "@/i18n/dictionaries";

const names = { "google-play": "Google Play", "app-store": "App Store" } as const;

/**
 * Text buttons for the stores that have a confirmed link. When none is confirmed,
 * one honest line replaces the buttons, so nothing looks clickable that goes nowhere.
 * Note: before launch, consider swapping these for the official badges from each store.
 */
export default function StoreButtons({ stores, t, size = "md" }: { stores: StoreLink[]; t: Dictionary["common"]; size?: "sm" | "md" }) {
  const live = stores.filter((s) => s.url);
  if (live.length === 0) {
    return <p className="max-w-md rounded-xl border border-dashed border-line px-4 py-3 text-sm text-muted">{t.storesPending}</p>;
  }
  const pad = size === "sm" ? "px-4 py-2" : "px-5 py-2.5";
  return (
    <ul className="flex flex-wrap gap-3">
      {live.map((s) => (
        <li key={s.store}>
          <a
            href={s.url!}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 flex-col justify-center rounded-xl bg-ink ${pad} text-canvas transition-opacity hover:opacity-90`}
          >
            <span className="text-[11px] leading-none opacity-80">{s.store === "app-store" ? t.downloadOn : t.getOn}</span>
            <span className={`mt-1 ${size === "sm" ? "text-base" : "text-lg"} font-semibold leading-none`}>{names[s.store]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
