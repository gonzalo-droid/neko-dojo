import localFont from "next/font/local";

export const playfair = localFont({
  src: "./files/playfair-display-latin-wght-normal.woff2",
  weight: "400 900",
  style: "normal",
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
