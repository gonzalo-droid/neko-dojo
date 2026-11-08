import type { Faq } from "@/content/apps";

/** Native disclosure: keyboard and screen-reader friendly with no JavaScript. */
export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <span aria-hidden="true" className="text-xl text-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-2xl pb-5 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
