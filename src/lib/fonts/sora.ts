import localFont from "next/font/local";

export const sora = localFont({
  src: [
    { path: "./files/sora-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./files/sora-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sora",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
