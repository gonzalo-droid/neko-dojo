import localFont from "next/font/local";

/*
 * App display fonts as the studio uses them: only to preview each identity on the
 * catalog cards. Same files and variable names as the app fonts, but not preloaded,
 * so studio pages don't download four extra font files up front.
 */
export const playfairPreview = localFont({
  src: "./files/playfair-display-latin-wght-normal.woff2",
  weight: "400 900",
  style: "normal",
  variable: "--font-playfair",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

export const outfitPreview = localFont({
  src: [
    { path: "./files/outfit-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./files/outfit-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});

export const soraPreview = localFont({
  src: [
    { path: "./files/sora-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./files/sora-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sora",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});
