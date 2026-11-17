export const STUDIO_THEME_KEY = "nekodojo-theme";

/*
 * Runs while the HTML is parsed, before the first paint, so the studio never flashes
 * the wrong theme: a saved choice wins, otherwise light (the default). It only sets
 * <html data-theme>; the dark tokens live under [data-theme="dark"] .theme-studio,
 * so app pages (with their own identities) are not affected.
 * A plain inline <script> on purpose: next/script "beforeInteractive" queues inline code
 * until Next's runtime loads, which is after the first paint.
 */
const code = `try{var t=localStorage.getItem("${STUDIO_THEME_KEY}");if(t!=="light"&&t!=="dark")t="light";document.documentElement.dataset.theme=t}catch(e){}`;

export default function StudioThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
