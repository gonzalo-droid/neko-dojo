import localFont from "next/font/local";

/** Funnel Display, the studio's display face: square shoulders that echo the block cat. Fontsource (OFL). */
export const funnelDisplay = localFont({
  src: [
    { path: "./files/funnel-display-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./files/funnel-display-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-funnel-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
