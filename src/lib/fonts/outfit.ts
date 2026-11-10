import localFont from "next/font/local";

export const outfit = localFont({
  src: [
    { path: "./files/outfit-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./files/outfit-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
