export const STUDIO_THEME_KEY = "nekodojo-theme";

/*
 * Runs while the HTML is parsed, before the first paint, so the studio never flashes
 * the wrong theme: a saved choice wins, otherwise the system preference. It only sets
 * <html data-theme>; the light tokens live under [data-theme="light"] .theme-studio,
 * so app pages (with their own identities) are not affected.
 * A plain inline <script> on purpose: next/script "beforeInteractive" queues inline code
 * until Next's runtime loads, which is after the first paint.
 */
const code = `try{var t=localStorage.getItem("${STUDIO_THEME_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){}`;

export default function StudioThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
