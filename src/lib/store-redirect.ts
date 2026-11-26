import { NextResponse, type NextRequest } from "next/server";
import type { AppEntry } from "@/content/apps";
import { localizePath, type Locale } from "@/i18n/config";

/** Which store the visitor's phone uses, from the User-Agent. null = desktop or unknown. */
export function storeFor(userAgent: string): "app-store" | "google-play" | null {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "app-store";
  if (/Android/i.test(userAgent)) return "google-play";
  return null;
}

/**
 * One link to share an app: phones go straight to their store, everyone else (desktop, or a store
 * that isn't public yet) lands on the app's page, which has every badge.
 */
export function storeRedirect(request: NextRequest, app: AppEntry, locale: Locale) {
  const store = storeFor(request.headers.get("user-agent") ?? "");
  const storeUrl = app.stores.find((s) => s.store === store)?.url;
  const target = storeUrl ?? new URL(localizePath(locale, `/apps/${app.slug}`), request.url);
  const res = NextResponse.redirect(target, 302);
  // The answer depends on the device: no shared caching, and no indexing of a redirect.
  res.headers.set("Cache-Control", "private, no-store");
  res.headers.set("Vary", "User-Agent");
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}
