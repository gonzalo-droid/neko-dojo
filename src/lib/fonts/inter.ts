import localFont from "next/font/local";

export const inter = localFont({
  src: "./files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
