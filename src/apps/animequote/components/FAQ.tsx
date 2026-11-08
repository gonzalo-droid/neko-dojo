"use client";

import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import type { AqContent } from "../content";

export default function FAQ({ c, email }: { c: AqContent["faq"]; email: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="faq" className="scroll-mt-20 px-4 py-20 sm:px-6 md:py-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">{c.title}</h2>
            <p className="mt-4 max-w-xs leading-relaxed text-muted">
              {c.intro}{" "}
              <a href={`mailto:${email}`} className="font-medium text-accent underline underline-offset-4 hover:opacity-80">{email}</a>.
            </p>
          </div>
          <div className="border-t border-accent/20">
            {c.items.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `aq-faq-${index}`;
              return (
                <div key={item.q} className="border-b border-accent/20">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-lg font-semibold text-ink">{item.q}</span>
                    <motion.svg animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-accent" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </motion.svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={panelId} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">
                        <p className="max-w-xl pb-5 leading-relaxed text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
