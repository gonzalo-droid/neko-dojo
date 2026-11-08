"use client";

import { useState, useEffect } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { AqContent } from "../content";
import StoreBadges from "./StoreBadges";

const ROTATE_MS = 4500;

export default function Hero({ c, playUrl, appStoreUrl }: { c: AqContent; playUrl: string; appStoreUrl: string }) {
  const screens = c.hero.screens;
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const timer = setInterval(() => setActive((prev) => (prev + 1) % screens.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [isPaused, reduceMotion, screens.length]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:min-h-[calc(100svh-61px)] lg:grid-cols-2 lg:gap-8 lg:py-0">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="text-left">
            <h1 className="text-balance font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {c.hero.title}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{c.hero.body}</p>
            <div className="mt-10">
              <StoreBadges c={c.badges} playUrl={playUrl} appStoreUrl={appStoreUrl} align="start" showDivider={false} showCaptions={false} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            className="relative flex flex-col items-center"
          >
            <div
              className="pointer-events-none absolute left-1/2 top-[44%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px]"
              aria-hidden="true"
            />
            <div className="relative aspect-[1408/2974] w-[230px] drop-shadow-[0_28px_36px_color-mix(in_srgb,var(--app-accent)_28%,transparent)] sm:w-[260px] lg:w-[clamp(230px,calc((100svh_-_230px)_*_0.4734),320px)]">
              {screens.map((screen, i) => (
                <motion.div
                  key={screen.src}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                  aria-hidden={i !== active}
                >
                  <Image src={screen.src} alt={screen.alt} fill sizes="(min-width: 1024px) 320px, (min-width: 640px) 260px, 230px" className="object-contain" priority={i === 0} />
                </motion.div>
              ))}
            </div>
            <div role="group" aria-label={c.hero.screensLabel} className="relative mt-6 flex items-center justify-center gap-2">
              {screens.map((screen, i) => (
                <button
                  key={screen.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    i === active ? "bg-accent text-on-accent" : "text-muted hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  {screen.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
