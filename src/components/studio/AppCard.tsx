import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import type { AppEntry } from "@/content/apps";
import type { Dictionary } from "@/i18n/dictionaries";
import AppIcon from "@/components/shared/AppIcon";
import StatusBadge from "@/components/shared/StatusBadge";

/** A card painted in the app's own identity, so the catalog previews each landing. */
export default function AppCard({ app, locale, t, large = false }: { app: AppEntry; locale: Locale; t: Dictionary; large?: boolean }) {
  const p = app.preview;
  return (
    <Link
      href={localizePath(locale, `/apps/${app.slug}`)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1"
      style={{ background: p.canvas, color: p.ink }}
    >
      <div className="flex items-start justify-between gap-4">
        <AppIcon app={app} size={large ? 56 : 44} />
        <span className="rounded-full px-2.5 py-1" style={{ background: `${p.ink}12`, color: p.ink }}>
          <StatusBadge status={app.status} label={t.status[app.status]} />
        </span>
      </div>
      <div className={`flex flex-1 flex-col ${large ? "mt-16" : "mt-10"}`}>
        <h3
          className={`${large ? "text-4xl" : "text-3xl"} font-bold leading-tight tracking-tight`}
          style={{ fontFamily: `var(${p.fontVar})` }}
        >
          {app.name}
        </h3>
        <p className="mt-2 text-[15px] leading-snug" style={{ fontFamily: `var(${p.fontVar})`, color: p.ink }}>
          {app.tagline[locale]}
        </p>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: p.muted }}>
          {app.summary[locale]}
        </p>
        <span className="mt-auto inline-block pt-5 text-sm font-semibold underline decoration-2 underline-offset-4" style={{ color: p.accent }}>
          {t.common.openApp}
        </span>
      </div>
    </Link>
  );
}
