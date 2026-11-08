import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

type Look = { title: string; subtitle: string; canvas: string; ink: string; accent: string; label: string };

/** Share preview in each identity's colors. */
export function ogImage({ title, subtitle, canvas, ink, accent, label }: Look) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: canvas, color: ink }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: accent }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: accent }} />
          {label}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
          <div style={{ marginTop: 28, fontSize: 40, opacity: 0.75 }}>{subtitle}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
