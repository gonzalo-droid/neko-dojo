"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AqContent } from "../content";

const STORAGE_KEY = "hideDownloadBar";

export default function StickyDownloadBar({ c, playUrl, appStoreUrl, labels }: { c: AqContent["sticky"]; playUrl: string; appStoreUrl: string; labels: AqContent["badges"] }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is only available client-side.
        setDismissed(true);
        return;
      }
    } catch {}
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-accent/20 bg-surface/95 px-4 py-3 backdrop-blur-sm sm:hidden"
        >
          <span className="shrink-0 text-sm font-semibold text-ink">{c.title}</span>
          <div className="flex items-center gap-2">
            <a href={playUrl} target="_blank" rel="noopener noreferrer" aria-label={labels.gpLabel} className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-on-accent">Google Play</a>
            <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" aria-label={labels.asLabel} className="rounded-lg border border-accent/40 px-3 py-2 text-xs font-semibold text-accent">App Store</a>
            <button onClick={handleClose} aria-label={c.close} className="p-1 text-muted hover:text-accent">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
