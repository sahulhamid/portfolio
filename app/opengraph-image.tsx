import { ImageResponse } from "next/og";
import { profile } from "@/lib/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tags = ["Node.js", "Python", "Kafka", "HDFS", "TypeScript"];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#2563eb", fontWeight: 600 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 700,
            color: "#18181b",
            marginTop: 20,
            maxWidth: 980,
          }}
        >
          {profile.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#6b7280",
            marginTop: 28,
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          Full stack products and backend microservices &amp; distributed data
          pipelines for high-volume telemetry
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 20,
                color: "#6b7280",
                border: "1.5px solid #e5e7eb",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
