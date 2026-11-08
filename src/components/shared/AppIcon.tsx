import Image from "next/image";
import type { AppEntry } from "@/content/apps";

export default function AppIcon({ app, size = 48, className = "" }: { app: AppEntry; size?: number; className?: string }) {
  const radius = Math.round(size * 0.24);
  if ("src" in app.icon) {
    return (
      <Image
        src={app.icon.src}
        alt=""
        width={size}
        height={size}
        className={className}
        style={{ borderRadius: radius, width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center font-bold ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: app.preview.accent,
        color: app.preview.canvas,
        fontFamily: `var(${app.preview.fontVar})`,
        fontSize: size * 0.48,
      }}
    >
      {app.icon.glyph}
    </span>
  );
}
