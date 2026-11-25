"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { parsePath } from "@/i18n/config";

/** desktopOnly: hidden on phones, where the footer already links it (keeps the strip from overflowing). */
type Item = { href: string; internal: string; label: string; desktopOnly?: boolean };

/** Main studio links with the current section marked (aria-current + accent underline). */
export default function NavLinks({ items }: { items: Item[] }) {
  const { internal } = parsePath(usePathname() ?? "/");
  const firstHelp = items.findIndex((i) => i.desktopOnly);
  return (
    <ul className="-mx-2 flex items-center gap-1 overflow-x-auto">
      {items.map((item, i) => {
        // "/" would prefix-match every page, so Home is only active on the home page itself.
        const active = internal === item.internal || (item.internal !== "/" && internal.startsWith(`${item.internal}/`));
        return (
          <li
            key={item.href}
            className={`${item.desktopOnly ? "max-sm:hidden" : ""} ${i === firstHelp ? "ml-2 border-l border-line pl-3" : ""}`}
          >
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center whitespace-nowrap rounded-md px-2 text-sm transition-colors hover:text-ink ${
                active ? "text-ink underline decoration-accent decoration-2 underline-offset-[10px]" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
