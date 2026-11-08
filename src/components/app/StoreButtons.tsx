import type { StoreLink } from "@/content/apps";
import type { Dictionary } from "@/i18n/dictionaries";

const names = { "google-play": "Google Play", "app-store": "App Store" } as const;

/**
 * Text buttons for the stores. When a link isn't confirmed, shows "Link pending"
 * instead of a button that goes nowhere.
 * Note: before launch, consider swapping these for the official badges from each store.
 */
export default function StoreButtons({ stores, t }: { stores: StoreLink[]; t: Dictionary["common"] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {stores.map((s) => (
        <li key={s.store}>
          {s.url ? (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col rounded-xl bg-ink px-5 py-2.5 text-canvas transition-opacity hover:opacity-90"
            >
              <span className="text-[11px] leading-none opacity-80">{s.store === "app-store" ? t.downloadOn : t.getOn}</span>
              <span className="mt-1 text-lg font-semibold leading-none">{names[s.store]}</span>
            </a>
          ) : (
            <span className="inline-flex flex-col rounded-xl border border-dashed border-line px-5 py-2.5 text-muted">
              <span className="text-[11px] leading-none">{names[s.store]}</span>
              <span className="mt-1 text-sm font-semibold leading-none">{t.linkPending}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
