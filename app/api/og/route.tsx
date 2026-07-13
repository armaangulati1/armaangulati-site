import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { site } from "@/lib/site";

export const runtime = "nodejs";

// Self-hosted Geist, read from the installed package. next.config.ts traces
// these files into the serverless bundle (outputFileTracingIncludes) so the
// route works after deploy as well as locally.
const GEIST_DIR = join(
  process.cwd(),
  "node_modules/geist/dist/fonts/geist-sans",
);
const GEIST_MONO_DIR = join(
  process.cwd(),
  "node_modules/geist/dist/fonts/geist-mono",
);

const geistSemiBold = readFileSync(join(GEIST_DIR, "Geist-SemiBold.ttf"));
const geistRegular = readFileSync(join(GEIST_DIR, "Geist-Regular.ttf"));
const geistMonoMedium = readFileSync(
  join(GEIST_MONO_DIR, "GeistMono-Medium.ttf"),
);

// Palette from spec §7 (dark). Kept literal because next/og cannot read CSS vars.
const BG = "#0A0C10";
const SURFACE = "#11141A";
const BORDER = "#1F242E";
const TEXT = "#E7EAF0";
const MUTED = "#8B93A1";
const ACCENT = "#5B8DEF";

const SIZE = { width: 1200, height: 630 };

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? site.name).slice(0, 120);
  const subtitle = (searchParams.get("subtitle") ?? "").slice(0, 160);
  const metric = (searchParams.get("metric") ?? "").slice(0, 80);
  const eyebrow = (searchParams.get("eyebrow") ?? "armaangulati.com").slice(
    0,
    60,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          backgroundImage: `radial-gradient(circle at 88% 8%, ${SURFACE} 0%, ${BG} 55%)`,
          padding: "72px 80px",
          fontFamily: "Geist",
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "Geist Mono",
            fontSize: 26,
            color: MUTED,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 12,
              border: `1px solid ${BORDER}`,
              background: SURFACE,
              color: ACCENT,
              fontSize: 24,
              fontFamily: "Geist",
              fontWeight: 600,
            }}
          >
            AG
          </div>
          <span>{eyebrow}</span>
        </div>

        {/* title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 42 ? 62 : 74,
              fontWeight: 600,
              color: TEXT,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: MUTED,
                lineHeight: 1.35,
                maxWidth: 940,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* metric strip / footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {metric ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 24px",
                borderRadius: 14,
                border: `1px solid ${BORDER}`,
                background: SURFACE,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: ACCENT,
                }}
              />
              <span
                style={{
                  fontFamily: "Geist Mono",
                  fontSize: 30,
                  color: TEXT,
                }}
              >
                {metric}
              </span>
            </div>
          ) : (
            <span style={{ fontSize: 28, color: MUTED }}>
              Applied AI engineer, healthcare operations
            </span>
          )}
          <span
            style={{ fontFamily: "Geist Mono", fontSize: 24, color: MUTED }}
          >
            {site.name}
          </span>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
        { name: "Geist", data: geistSemiBold, weight: 600, style: "normal" },
        {
          name: "Geist Mono",
          data: geistMonoMedium,
          weight: 500,
          style: "normal",
        },
      ],
    },
  );
}
