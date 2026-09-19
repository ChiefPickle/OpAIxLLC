import { ImageResponse } from "next/og";

export const alt = "OpAIx - AI-Powered Healthcare Solutions";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <svg
            width="88"
            height="88"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M22 12h-4l-3 9L9 3l-3 9H2"
              stroke="#22D3EE"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <div
              style={{
                color: "white",
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              OpAI
            </div>
            <div
              style={{
                color: "#22D3EE",
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              x
            </div>
            <div
              style={{
                color: "#94A3B8",
                fontSize: 48,
                fontWeight: 500,
                marginLeft: 22,
              }}
            >
              - AI-Powered
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            color: "#67E8F9",
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          Healthcare Solutions
        </div>
      </div>
    ),
    { ...size },
  );
}
