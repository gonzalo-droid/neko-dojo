/** Shared by the browser (instant feedback) and the server action (source of truth). */
export type ErrorCode =
  | "emailRequired"
  | "emailInvalid"
  | "nameRequired"
  | "messageShort"
  | "consentRequired";

export type FieldErrors = Partial<Record<"email" | "name" | "message" | "consent", ErrorCode>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function checkEmail(email: string): ErrorCode | undefined {
  if (!email.trim()) return "emailRequired";
  if (!EMAIL.test(email.trim())) return "emailInvalid";
}

export function validateWaitlist(data: { email: string; consent: boolean }): FieldErrors {
  const errors: FieldErrors = {};
  const email = checkEmail(data.email);
  if (email) errors.email = email;
  if (!data.consent) errors.consent = "consentRequired";
  return errors;
}

export function validateContact(data: { name: string; email: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "nameRequired";
  const email = checkEmail(data.email);
  if (email) errors.email = email;
  if (data.message.trim().length < 10) errors.message = "messageShort";
  return errors;
}

export const hasErrors = (e: FieldErrors) => Object.keys(e).length > 0;
