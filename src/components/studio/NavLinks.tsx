"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { parsePath } from "@/i18n/config";

type Item = { href: string; internal: string; label: string };

/** Main studio links with the current section marked (aria-current + accent underline). */
export default function NavLinks({ items }: { items: Item[] }) {
  const { internal } = parsePath(usePathname() ?? "/");
  return (
    <ul className="-mx-2 flex gap-1 overflow-x-auto">
      {items.map((item) => {
        const active = internal === item.internal || internal.startsWith(`${item.internal}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`block rounded-md px-2 py-2 text-sm transition-colors hover:text-ink ${
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
