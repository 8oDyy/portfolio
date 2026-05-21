import { ImageResponse } from "next/og";

// Apple touch icon — raster requis par iOS (le SVG n'y est pas rendu).
// Reprend EXACTEMENT le monogramme géométrique du favicon (icon.svg) :
// « H » à barres pleines, pollen sur fond encre. iOS applique son propre masque arrondi.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const POLLEN = "#e8ff00";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0e0e",
        }}
      >
        <div style={{ position: "relative", display: "flex", width: 92, height: 104 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 22, height: 104, background: POLLEN }} />
          <div style={{ position: "absolute", right: 0, top: 0, width: 22, height: 104, background: POLLEN }} />
          <div style={{ position: "absolute", left: 0, top: 41, width: 92, height: 22, background: POLLEN }} />
        </div>
      </div>
    ),
    size,
  );
}
