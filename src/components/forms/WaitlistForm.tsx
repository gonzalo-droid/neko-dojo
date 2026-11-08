"use client";

import { useActionState, useState } from "react";
import { submitWaitlist, type FormState } from "@/lib/forms/actions";
import { validateWaitlist, type FieldErrors } from "@/lib/forms/validation";
import type { Dictionary } from "@/i18n/dictionaries";
import { DemoNotice, FieldError, inputClass } from "./Field";

type Props = {
  t: Dictionary["forms"];
  locale: string;
  connected: boolean;
  /** Fixed app, or a list to choose from. */
  app?: string;
  options?: { value: string; label: string }[];
  idPrefix?: string;
};

export default function WaitlistForm({ t, locale, connected, app, options, idPrefix = "wl" }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitWaitlist, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const errors = clientErrors ?? state.errors ?? {};
  const id = (k: string) => `${idPrefix}-${k}`;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const fd = new FormData(e.currentTarget);
    const found = validateWaitlist({ email: String(fd.get("email") ?? ""), consent: fd.get("consent") === "on" });
    if (Object.keys(found).length) {
      e.preventDefault();
      setClientErrors(found);
    } else setClientErrors(null);
  }

  return (
    <form action={action} onSubmit={onSubmit} noValidate className="space-y-4">
      {!connected && <DemoNotice text={t.demoNotice} />}
      <input type="hidden" name="locale" value={locale} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {app ? (
        <input type="hidden" name="app" value={app} />
      ) : options ? (
        <div>
          <label htmlFor={id("app")} className="text-sm font-medium text-ink">{t.app}</label>
          <select id={id("app")} name="app" className={inputClass}>
            {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      ) : null}
      <div>
        <label htmlFor={id("email")} className="text-sm font-medium text-ink">{t.email}</label>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t.emailPlaceholder}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? id("email-err") : undefined}
          onChange={() => clientErrors?.email && setClientErrors({ ...clientErrors, email: undefined })}
          className={inputClass}
        />
        <FieldError id={id("email-err")} message={errors.email && t.errors[errors.email]} />
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            name="consent"
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? id("consent-err") : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--app-accent)]"
          />
          <span>{t.consent}</span>
        </label>
        <FieldError id={id("consent-err")} message={errors.consent && t.errors[errors.consent]} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? t.sending : t.joinWaitlist}
      </button>
      <p aria-live="polite" className="text-sm text-ink">
        {state.status === "demo" && t.demoResult}
        {state.status === "sent" && t.joined}
        {state.status === "error" && t.errors.failed}
      </p>
    </form>
  );
}
