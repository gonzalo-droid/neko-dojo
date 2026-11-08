"use server";

import { deliver, isFormsConnected } from "./provider";
import { hasErrors, validateContact, validateWaitlist, type FieldErrors } from "./validation";

export type FormState = { status: "idle" | "invalid" | "demo" | "sent" | "error"; errors?: FieldErrors };

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "");

export async function submitWaitlist(_prev: FormState, fd: FormData): Promise<FormState> {
  if (text(fd, "company")) return { status: "sent" }; // honeypot: bots fill hidden fields
  const data = { email: text(fd, "email"), consent: fd.get("consent") === "on" };
  const errors = validateWaitlist(data);
  if (hasErrors(errors)) return { status: "invalid", errors };
  if (!isFormsConnected()) return { status: "demo" };
  try {
    await deliver({ kind: "waitlist", email: data.email.trim(), app: text(fd, "app"), locale: text(fd, "locale") });
    return { status: "sent" };
  } catch (err) {
    console.error("waitlist delivery failed", err);
    return { status: "error" };
  }
}

export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  if (text(fd, "company")) return { status: "sent" };
  const data = { name: text(fd, "name"), email: text(fd, "email"), message: text(fd, "message") };
  const errors = validateContact(data);
  if (hasErrors(errors)) return { status: "invalid", errors };
  if (!isFormsConnected()) return { status: "demo" };
  try {
    await deliver({
      kind: "contact",
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      app: text(fd, "app"),
      locale: text(fd, "locale"),
    });
    return { status: "sent" };
  } catch (err) {
    console.error("contact delivery failed", err);
    return { status: "error" };
  }
}
