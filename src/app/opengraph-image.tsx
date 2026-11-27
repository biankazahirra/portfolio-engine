import { ImageResponse } from "next/og";

export const alt = "Fidela Andina — Accounting & Finance Professional";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const petals = [0, 1, 2, 3, 4, 5];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#FBF7F2",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "72%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#4F7A5A",
              fontFamily: "monospace",
            }}
          >
            Accounting &amp; Finance Professional
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 96,
              lineHeight: 1.02,
              color: "#2A2B26",
            }}
          >
            Fidela Andina
          </div>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 3,
              marginTop: 32,
              background: "#4F7A5A",
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 660,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#5E6258",
            }}
          >
            Turning Financial Data Into Meaningful Insights.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 90,
            top: 150,
            width: 300,
            height: 300,
            display: "flex",
          }}
        >
          {petals.map((petal) => (
            <div
              key={petal}
              style={{
                position: "absolute",
                left: 115,
                top: 150,
                width: 70,
                height: 140,
                borderRadius: 999,
                background: petal % 2 === 0 ? "#E98FA6" : "#F3B7C6",
                transform: `rotate(${petal * 60}deg) translateY(-78px)`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: 120,
              top: 220,
              width: 60,
              height: 60,
              borderRadius: 999,
              background: "#F2C14E",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
