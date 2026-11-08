import Image from "next/image";
import type { AqContent } from "../content";

const IMG = "/apps/animequote";
const phoneShadow = "drop-shadow-[0_24px_30px_color-mix(in_srgb,var(--app-accent)_25%,transparent)]";

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex justify-center py-4">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 sm:h-[380px] sm:w-[380px]" aria-hidden="true" />
      <Image src={src} alt={alt} width={260} height={549} sizes="(min-width: 640px) 250px, 220px" className={`relative h-auto w-[220px] sm:w-[250px] ${phoneShadow}`} />
    </div>
  );
}

function ShareCards({ alt1, alt2 }: { alt1: string; alt2: string }) {
  const card = "overflow-hidden rounded-2xl shadow-xl shadow-accent/20 ring-1 ring-accent/15";
  return (
    <div className="relative flex items-start justify-center gap-4 py-4">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent2/10 sm:h-[380px] sm:w-[380px]" aria-hidden="true" />
      <div className={`relative ${card}`}>
        <Image src={`${IMG}/quote_01.png`} alt={alt1} width={210} height={263} sizes="(min-width: 640px) 190px, 150px" className="h-auto w-[150px] sm:w-[190px]" />
      </div>
      <div className={`relative mt-12 ${card}`}>
        <Image src={`${IMG}/quote_02.png`} alt={alt2} width={210} height={263} sizes="(min-width: 640px) 190px, 150px" className="h-auto w-[150px] sm:w-[190px]" />
      </div>
    </div>
  );
}

function Row({ title, children, media, mediaFirst = false }: { title: string; children: React.ReactNode; media: React.ReactNode; mediaFirst?: boolean }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={mediaFirst ? "md:order-2" : undefined}>
        <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">{title}</h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{children}</p>
      </div>
      <div className={mediaFirst ? "md:order-1" : undefined}>{media}</div>
    </div>
  );
}

export default function AppShowcase({ c }: { c: AqContent["showcase"] }) {
  return (
    <section id="app" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">{c.title}</h2>
        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
          <Row title={c.share.title} mediaFirst media={<ShareCards alt1={c.share.alt1} alt2={c.share.alt2} />}>
            {c.share.body}
          </Row>
          <Row title={c.notifications.title} media={<Phone src={`${IMG}/setting_app.png`} alt={c.notifications.alt} />}>
            {c.notifications.body}
          </Row>
          <Row title={c.widget.title} mediaFirst media={<Phone src={`${IMG}/widget_app.png`} alt={c.widget.alt} />}>
            {c.widget.body}
          </Row>
        </div>
        <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-3 md:gap-10">
          {c.basics.map((item) => (
            <div key={item.title} className="border-t border-accent/25 pt-5">
              <h3 className="font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
