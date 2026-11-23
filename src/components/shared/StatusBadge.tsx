import type { AppStatus } from "@/content/apps";

// Theme tokens, so the dot stays visible on light and dark canvases.
const tone: Record<AppStatus, string> = {
  available: "bg-ok",
  testing: "bg-current", // the text colour: visible on any canvas, including accent-coloured heroes
  "in-development": "bg-warn",
  pending: "bg-muted",
};

export default function StatusBadge({ status, label, className = "" }: { status: AppStatus; label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-medium ${className}`}>
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${tone[status]}`} />
      {label}
    </span>
  );
}
