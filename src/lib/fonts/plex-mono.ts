import localFont from "next/font/local";

/** IBM Plex Mono for IDs, dates and labels in the Cazadores Perú identity. */
export const plexMono = localFont({
  src: [
    { path: "./files/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./files/ibm-plex-mono-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});
