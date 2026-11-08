import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, localizePath, parsePath, type Locale } from "@/i18n/config";

function browserLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().slice(0, 2), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang } of ranked) {
    if (lang === "es" || lang === "en") return lang;
  }
  return defaultLocale;
}

const YEAR = 60 * 60 * 24 * 365;

function withLocale(res: NextResponse, locale: Locale) {
  res.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: YEAR, sameSite: "lax" });
  return res;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale, internal } = parsePath(pathname);
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;

  // "/es/..." is never shown: Spanish lives without a prefix.
  if (locale === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = localizePath(defaultLocale, internal);
    return withLocale(NextResponse.redirect(url, 308), defaultLocale);
  }

  // Pages that can't read params (not-found) get the language from this header.
  const headers = new Headers(request.headers);

  if (locale) {
    headers.set("x-locale", locale);
    return withLocale(NextResponse.next({ request: { headers } }), locale);
  }

  // No prefix: Spanish, unless this visitor prefers English and hasn't chosen Spanish.
  const preferred = isLocale(saved) ? saved : browserLocale(request);
  if (preferred !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = localizePath(preferred, internal);
    return NextResponse.redirect(url);
  }

  headers.set("x-locale", defaultLocale);
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${internal === "/" ? "" : internal}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip Next internals, metadata images and any file with an extension.
  matcher: ["/((?!_next|api|.*opengraph-image|.*\\..*).*)"],
};
