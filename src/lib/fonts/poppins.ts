import localFont from "next/font/local";

export const poppins = localFont({
  src: [
    { path: "./files/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./files/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
