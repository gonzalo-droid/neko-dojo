import Link from "next/link";
import Image from "next/image";
import { localizePath, type Locale } from "@/i18n/config";
import CatMark from "@/components/shared/CatMark";
import type { AqContent } from "../content";
import InstagramIcon from "./Instagram";

type Props = { c: AqContent["footer"]; locale: Locale; email: string; instagramUrl: string; madeBy: string; rights: string; navLabel: string };

export default function Footer({ c, locale, email, instagramUrl, madeBy, rights, navLabel }: Props) {
  const base = "/apps/animequote";
  const link = "text-sm text-muted transition-colors duration-200 hover:text-accent";
  return (
    <footer className="border-t border-accent/10 bg-surface/30 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/apps/animequote/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-[10px] object-cover" />
            <span className="font-semibold text-ink">AnimeQuote</span>
          </div>
          <nav className="flex flex-col items-center gap-3" aria-label={navLabel}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link href={localizePath(locale, `${base}/privacy`)} className={link}>{c.privacy}</Link>
              <span className="select-none text-accent/20" aria-hidden="true">·</span>
              <Link href={localizePath(locale, `${base}/terms`)} className={link}>{c.terms}</Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link href={localizePath(locale, `${base}/support`)} className={link}>{c.support}</Link>
              <span className="select-none text-accent/20" aria-hidden="true">·</span>
              <a href={`mailto:${email}`} className={link}>{c.contact}</a>
              <span className="select-none text-accent/20" aria-hidden="true">·</span>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={`${link} flex items-center gap-1.5`}>
                <InstagramIcon size={14} />
                Instagram
              </a>
            </div>
          </nav>
          <div className="h-px w-full max-w-xs bg-accent/10" />
          <Link href={localizePath(locale)} className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
            <CatMark className="h-4 w-4" />
            {madeBy}
          </Link>
          <p className="text-xs text-muted">© {new Date().getFullYear()} NekoDojo. {rights}</p>
        </div>
      </div>
    </footer>
  );
}
