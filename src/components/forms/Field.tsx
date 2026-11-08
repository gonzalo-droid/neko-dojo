export const inputClass =
  "mt-1.5 block w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-base text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none aria-[invalid=true]:border-danger";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-danger" role="alert">
      {message}
    </p>
  );
}

export function DemoNotice({ text }: { text: string }) {
  return (
    <p className="rounded-lg border border-dashed border-line bg-surface px-3.5 py-2.5 text-sm text-muted">
      {text}
    </p>
  );
}
