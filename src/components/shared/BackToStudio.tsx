import Link from "next/link";
import CatMark from "./CatMark";

/** Quiet link from an app back to the studio's catalog. Compact on phones. */
export default function BackToStudio({ href, label, hint }: { href: string; label: string; hint: string }) {
  return (
    <Link
      href={href}
      aria-label={hint}
      title={hint}
      className="inline-flex shrink-0 items-center gap-1 rounded-md py-1 pr-1 text-xs text-muted transition-colors hover:text-accent"
    >
      <span aria-hidden="true">←</span>
      <CatMark className="h-4 w-4 sm:hidden" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
