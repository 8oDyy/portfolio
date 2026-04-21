import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hugo Boulicaut-Raffort — Portfolio";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f5f2ec",
          color: "#0e0e0e",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          <span>Portfolio / Éd. 2026</span>
          <span>N° 00</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 160,
            lineHeight: 0.95,
            fontWeight: 600,
            letterSpacing: "-0.04em",
          }}
        >
          <span>Hugo</span>
          <span style={{ fontStyle: "italic", fontWeight: 500 }}>Boulicaut–</span>
          <span style={{ fontStyle: "italic", fontWeight: 500 }}>Raffort</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          <span>Dév. fullstack — Annecy</span>
          <span style={{ color: "#0e0e0e", background: "#e8ff00", padding: "4px 12px" }}>
            © 2026
          </span>
        </div>
      </div>
    ),
    size,
  );
}
