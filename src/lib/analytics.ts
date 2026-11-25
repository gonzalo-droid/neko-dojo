/**
 * GA4 event, sent only when the visitor accepted analytics: gtag exists only after consent
 * (components/shared/Consent). Without it, this does nothing.
 */
export function track(name: string, params: Record<string, string | number | boolean>) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", name, params);
}
