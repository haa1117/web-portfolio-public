import { ImageResponse } from "next/og";
import { stats } from "@/lib/data";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
          padding: 80, background: "radial-gradient(circle at 20% 20%, #1e1b4b 0%, #04050a 60%)", color: "white", fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 8, color: "#22d3ee", textTransform: "uppercase" }}>Portfolio</div>
        <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -4, marginTop: 20, lineHeight: 1 }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 28, color: "#a78bfa" }}>{site.role}</div>
        <div style={{ fontSize: 28, marginTop: 40, color: "rgba(255,255,255,0.6)" }}>{`${stats.projects} projects · ${stats.play} Google Play apps · web, AI & data`}</div>
      </div>
    ),
    size,
  );
}
