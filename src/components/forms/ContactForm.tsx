"use client";

import { useActionState, useState } from "react";
import { submitContact, type FormState } from "@/lib/forms/actions";
import { validateContact, type FieldErrors } from "@/lib/forms/validation";
import type { Dictionary } from "@/i18n/dictionaries";
import { DemoNotice, FieldError, inputClass } from "./Field";

type Props = {
  t: Dictionary["forms"];
  locale: string;
  connected: boolean;
  app?: string;
  options?: { value: string; label: string }[];
};

export default function ContactForm({ t, locale, connected, app, options }: Props) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const errors = clientErrors ?? state.errors ?? {};

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const fd = new FormData(e.currentTarget);
    const found = validateContact({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    });
    if (Object.keys(found).length) {
      e.preventDefault();
      setClientErrors(found);
    } else setClientErrors(null);
  }

  const field = (key: "name" | "email" | "message") => ({
    id: `ct-${key}`,
    name: key,
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `ct-${key}-err` : undefined,
    onChange: () => clientErrors?.[key] && setClientErrors({ ...clientErrors, [key]: undefined }),
    className: inputClass,
  });

  return (
    <form action={action} onSubmit={onSubmit} noValidate className="space-y-4">
      {!connected && <DemoNotice text={t.demoNotice} />}
      <input type="hidden" name="locale" value={locale} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {app ? (
        <input type="hidden" name="app" value={app} />
      ) : options ? (
        <div>
          <label htmlFor="ct-app" className="text-sm font-medium text-ink">{t.app}</label>
          <select id="ct-app" name="app" className={inputClass}>
            {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className="text-sm font-medium text-ink">{t.name}</label>
          <input {...field("name")} type="text" autoComplete="name" placeholder={t.namePlaceholder} />
          <FieldError id="ct-name-err" message={errors.name && t.errors[errors.name]} />
        </div>
        <div>
          <label htmlFor="ct-email" className="text-sm font-medium text-ink">{t.email}</label>
          <input {...field("email")} type="email" autoComplete="email" placeholder={t.emailPlaceholder} />
          <FieldError id="ct-email-err" message={errors.email && t.errors[errors.email]} />
        </div>
      </div>
      <div>
        <label htmlFor="ct-message" className="text-sm font-medium text-ink">{t.message}</label>
        <textarea {...field("message")} rows={5} placeholder={t.messagePlaceholder} />
        <FieldError id="ct-message-err" message={errors.message && t.errors[errors.message]} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? t.sending : t.send}
      </button>
      <p aria-live="polite" className="text-sm text-ink">
        {state.status === "demo" && t.demoResult}
        {state.status === "sent" && t.sent}
        {state.status === "error" && t.errors.failed}
      </p>
    </form>
  );
}
