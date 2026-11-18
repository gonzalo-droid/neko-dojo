import localFont from "next/font/local";

/*
 * Archivo (variable: wght 400–800, wdth 70–100), the Cazadores Perú body and title face.
 * Titles use the condensed cut (wdth 70, weight 800); see .ph-cond in globals.css.
 * Subset from the app's own font file (docs/licenses/Archivo-OFL.txt in HunterXPeru).
 */
export const archivo = localFont({
  src: "./files/archivo-latin-wght-wdth-normal.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "70% 100%" }],
  fallback: ["system-ui", "sans-serif"],
});
