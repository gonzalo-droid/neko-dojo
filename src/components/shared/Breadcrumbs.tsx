import Link from "next/link";
import { localizePath, type Locale } from "@/i18n/config";
import { breadcrumbList, type Crumb } from "@/lib/structured-data";
import JsonLd from "./JsonLd";

/** Visible trail plus its BreadcrumbList. The last item is the current page. */
export default function Breadcrumbs({ locale, crumbs, label }: { locale: Locale; crumbs: Crumb[]; label: string }) {
  return (
    <>
      <nav aria-label={label} className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">{c.name}</span>
                ) : (
                  <Link href={localizePath(locale, c.path)} className="hover:text-accent">{c.name}</Link>
                )}
                {!last && <span aria-hidden="true">›</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbList(locale, crumbs)} />
    </>
  );
}
