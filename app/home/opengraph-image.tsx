import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OpAIx: Individualized opioid prescribing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F8F8F5",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="72" height="32" viewBox="0 0 36 16">
            <polyline
              points="1,13 8,12 14,9 18,8 25,4 34,3"
              fill="none"
              stroke="#10233B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="34" cy="3" r="2" fill="#0E8A8C" />
          </svg>
          <div
            style={{
              fontSize: 32,
              color: "#10233B",
              fontFamily: "Georgia, serif",
            }}
          >
            OpAIx
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 52,
              lineHeight: 1.08,
              color: "#10233B",
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            Individualized opioid prescribing starts with understanding each
            patient.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#47546A",
              maxWidth: 760,
            }}
          >
            Helping surgeons estimate opioid needs at hospital discharge.
            Pittsburgh.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
