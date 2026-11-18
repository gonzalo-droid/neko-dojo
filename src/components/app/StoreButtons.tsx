import type { StoreLink } from "@/content/apps";
import type { Dictionary } from "@/i18n/dictionaries";
import StoreIcon, { storeNames as names } from "@/components/shared/StoreIcon";

/**
 * Store buttons with each store's icon, for the stores that have a confirmed link.
 * With showPending, a store without a link appears as a muted "coming soon" badge
 * that isn't clickable (also when no store has a link yet, for an app on its way).
 * Without showPending and with no confirmed link, one honest line replaces the
 * buttons, so nothing looks clickable that goes nowhere.
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
  if (live.length === 0 && !(showPending && stores.length > 0)) {
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
