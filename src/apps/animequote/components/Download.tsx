import type { AqContent } from "../content";
import StoreBadges from "./StoreBadges";
import InstagramIcon from "./Instagram";

type Props = { c: AqContent; playUrl: string; appStoreUrl: string; instagramUrl: string };

export default function Download({ c, playUrl, appStoreUrl, instagramUrl }: Props) {
  const d = c.downloadSection;
  return (
    <section id="download" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-4xl rounded-3xl border border-accent/15 bg-surface px-6 py-12 text-center shadow-xl shadow-accent/10 md:px-12 md:py-16">
        <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">{d.title}</h2>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">{d.body}</p>
        <div className="mt-10">
          <StoreBadges c={c.badges} playUrl={playUrl} appStoreUrl={appStoreUrl} showQr />
        </div>
        <ul className="mt-10 flex flex-col flex-wrap justify-center gap-x-8 gap-y-2 sm:flex-row">
          {d.trust.map((point) => (
            <li key={point} className="flex items-center justify-center gap-2 text-sm text-muted">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-accent" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex justify-center">
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-accent">
          <InstagramIcon />
          {d.instagram}
        </a>
      </div>
    </section>
  );
}
