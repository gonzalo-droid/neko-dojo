import type { AppStatus } from "@/content/apps";

const tone: Record<AppStatus, string> = {
  available: "#34d399",
  "in-development": "#fbbf24",
  pending: "#a49bb5",
};

export default function StatusBadge({ status, label, className = "" }: { status: AppStatus; label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-medium ${className}`}>
      <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: tone[status] }} />
      {label}
    </span>
  );
}
