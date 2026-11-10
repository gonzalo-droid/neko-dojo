import localFont from "next/font/local";

export const zenKaku = localFont({
  src: [
    { path: "./files/zen-kaku-gothic-new-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./files/zen-kaku-gothic-new-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-zen-kaku",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});
