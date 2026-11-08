/** Provisional Nekodojo mark: a geometric cat head. Replace with the final logo. */
export default function CatMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <path d="M5 27V6l7 6h8l7-6v21z" fill="currentColor" />
      <path d="M11 18h3v2h-3zM18 18h3v2h-3z" fill="var(--app-canvas, #0d0b14)" />
    </svg>
  );
}
