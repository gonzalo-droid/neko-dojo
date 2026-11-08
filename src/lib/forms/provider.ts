/**
 * Where form submissions go. Server-only: never import this from a client component.
 *
 * Today no service is configured, so every form runs in demo mode and nothing is
 * sent or stored. To connect one, set FORMS_PROVIDER in Vercel and add a case below.
 * Example already wired: FORMS_PROVIDER=webhook + FORMS_WEBHOOK_URL (Zapier, Make,
 * a Google Apps Script, a Supabase Edge Function…). Never put secrets in the code.
 */
export type Submission =
  | { kind: "waitlist"; email: string; app: string; locale: string }
  | { kind: "contact"; name: string; email: string; app: string; message: string; locale: string };

export function isFormsConnected(): boolean {
  return Boolean(process.env.FORMS_PROVIDER);
}

export async function deliver(submission: Submission): Promise<void> {
  switch (process.env.FORMS_PROVIDER) {
    case "webhook": {
      const url = process.env.FORMS_WEBHOOK_URL;
      if (!url) throw new Error("FORMS_WEBHOOK_URL is missing");
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...submission, receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook answered ${res.status}`);
      return;
    }
    default:
      throw new Error(`Unknown FORMS_PROVIDER: ${process.env.FORMS_PROVIDER}`);
  }
}
