"use client";

import { useState } from "react";

/** Shows the address as selectable text with a copy button (mail links don't work for everyone). */
export default function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <span className="select-all font-semibold text-ink">{email}</span>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setDone(true);
            setTimeout(() => setDone(false), 2000);
          } catch {
            /* clipboard refused: the address stays selectable */
          }
        }}
        className="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-sm font-semibold text-muted hover:border-accent hover:text-ink"
      >
        <span aria-live="polite">{done ? copied : copy}</span>
      </button>
    </span>
  );
}
