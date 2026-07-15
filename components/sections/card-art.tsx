// Static thumbnail card art for the index cards that have no live-demo
// screenshot (spec §5 Phase 3): clinical-ops-copilot and trust-marketplace get
// a simplified, static rendering of their architecture diagram; clinical-rag
// gets a typographic card. Rendered as plain SVG (no animation, no client JS)
// scaled inside the same aspect-[16/10] frame the screenshot cards use, so all
// five index cards are visually uniform in height.
//
// These are decorative summaries of the case-study diagram; each card's text
// already carries the real content, so the SVGs are aria-hidden.

const VB_W = 320;
const VB_H = 200;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="size-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="cardart-dots"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="var(--border)" opacity="0.5" />
        </pattern>
        <marker
          id="cardart-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <rect width={VB_W} height={VB_H} fill="url(#cardart-dots)" />
      {children}
    </svg>
  );
}

function Box({
  x,
  y,
  w,
  h,
  label,
  tone = "default",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tone?: "default" | "brand" | "gate" | "success";
}) {
  const fill =
    tone === "brand"
      ? "var(--brand-soft)"
      : tone === "gate"
        ? "color-mix(in srgb, var(--success) 12%, var(--card))"
        : "var(--card)";
  const stroke =
    tone === "brand"
      ? "var(--brand)"
      : tone === "gate" || tone === "success"
        ? "var(--success)"
        : "var(--border)";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={7}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
        fontWeight={600}
        fill="var(--foreground)"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        {label}
      </text>
    </g>
  );
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <line
      x1={x1}
      y1={y}
      x2={x2}
      y2={y}
      stroke="var(--muted-foreground)"
      strokeWidth={1.5}
      markerEnd="url(#cardart-arrow)"
    />
  );
}

// clinical-ops-copilot: chart -> policy -> approval gate -> action, with the
// excluded LLM-judge shown dashed and grayed (the brand war story).
function CopilotArt() {
  const y = 78;
  const h = 34;
  return (
    <Frame>
      <Box x={14} y={y} w={58} h={h} label="chart" />
      <Arrow x1={72} x2={90} y={y + h / 2} />
      <Box x={90} y={y} w={58} h={h} label="policy" />
      <Arrow x1={148} x2={166} y={y + h / 2} />
      <Box x={166} y={y} w={62} h={h} label="gate" tone="gate" />
      <Arrow x1={228} x2={246} y={y + h / 2} />
      <Box x={246} y={y} w={60} h={h} label="action" tone="brand" />
      {/* excluded judge */}
      <rect
        x={166}
        y={148}
        width={110}
        height={30}
        rx={7}
        fill="transparent"
        stroke="var(--muted-foreground)"
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />
      <text
        x={221}
        y={163}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fill="var(--muted-foreground)"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        judge excluded
      </text>
      <line
        x1={197}
        y1={112}
        x2={210}
        y2={148}
        stroke="var(--muted-foreground)"
        strokeWidth={1.5}
        strokeDasharray="4 3"
      />
    </Frame>
  );
}

// trust-marketplace: cohort -> SMS -> replies -> enroll, ending in a success node.
function TrustArt() {
  const y = 84;
  const h = 34;
  return (
    <Frame>
      <Box x={12} y={y} w={62} h={h} label="cohort" />
      <Arrow x1={74} x2={90} y={y + h / 2} />
      <Box x={90} y={y} w={58} h={h} label="SMS" tone="brand" />
      <Arrow x1={148} x2={164} y={y + h / 2} />
      <Box x={164} y={y} w={62} h={h} label="replies" />
      <Arrow x1={226} x2={242} y={y + h / 2} />
      <Box x={242} y={y} w={66} h={h} label="enroll" tone="success" />
      {/* scoring input feeding SMS */}
      <rect
        x={90}
        y={30}
        width={90}
        height={28}
        rx={7}
        fill="var(--card)"
        stroke="var(--border)"
        strokeWidth={1.5}
      />
      <text
        x={135}
        y={44}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fill="var(--muted-foreground)"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        vuln. scoring
      </text>
      <line
        x1={119}
        y1={58}
        x2={119}
        y2={y}
        stroke="var(--muted-foreground)"
        strokeWidth={1.5}
        markerEnd="url(#cardart-arrow)"
      />
    </Frame>
  );
}

// clinical-rag: typographic card, retrieval motif implied by a small pipeline.
function ClinicalRagArt() {
  return (
    <Frame>
      <text
        x={VB_W / 2}
        y={86}
        textAnchor="middle"
        fontSize={30}
        fontWeight={600}
        fill="var(--foreground)"
        style={{
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          letterSpacing: "-0.01em",
        }}
      >
        clinical-rag
      </text>
      <text
        x={VB_W / 2}
        y={112}
        textAnchor="middle"
        fontSize={11}
        fill="var(--muted-foreground)"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        hybrid retrieval · rerank · RAGAS
      </text>
      {/* subtle retrieval pipeline dots */}
      <g>
        {[112, 146, 180, 214].map((x, i) => (
          <g key={x}>
            <circle
              cx={x}
              cy={140}
              r={4}
              fill={i === 3 ? "var(--brand)" : "var(--card)"}
              stroke={i === 3 ? "var(--brand)" : "var(--border)"}
              strokeWidth={1.5}
            />
            {i < 3 ? (
              <line
                x1={x + 4}
                y1={140}
                x2={x + 30}
                y2={140}
                stroke="var(--border)"
                strokeWidth={1.5}
              />
            ) : null}
          </g>
        ))}
      </g>
    </Frame>
  );
}

// ledgersim: spec -> agent -> params -> double-entry ledger, with a golden-set
// eval feeding the agent from above.
function LedgerSimArt() {
  const y = 84;
  const h = 34;
  return (
    <Frame>
      <Box x={12} y={y} w={62} h={h} label="spec" />
      <Arrow x1={74} x2={90} y={y + h / 2} />
      <Box x={90} y={y} w={58} h={h} label="agent" tone="brand" />
      <Arrow x1={148} x2={164} y={y + h / 2} />
      <Box x={164} y={y} w={62} h={h} label="params" />
      <Arrow x1={226} x2={242} y={y + h / 2} />
      <Box x={242} y={y} w={66} h={h} label="ledger" tone="success" />
      {/* golden-set eval feeding the agent */}
      <rect
        x={90}
        y={30}
        width={90}
        height={28}
        rx={7}
        fill="var(--card)"
        stroke="var(--border)"
        strokeWidth={1.5}
      />
      <text
        x={135}
        y={44}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fill="var(--muted-foreground)"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        golden set
      </text>
      <line
        x1={119}
        y1={58}
        x2={119}
        y2={y}
        stroke="var(--muted-foreground)"
        strokeWidth={1.5}
        markerEnd="url(#cardart-arrow)"
      />
    </Frame>
  );
}

// handoff-lens: figma file -> checks -> score -> readiness summary, with the
// public Figma REST API feeding the checks from above.
function HandoffLensArt() {
  const y = 84;
  const h = 34;
  return (
    <Frame>
      <Box x={12} y={y} w={62} h={h} label="figma" />
      <Arrow x1={74} x2={90} y={y + h / 2} />
      <Box x={90} y={y} w={58} h={h} label="checks" tone="brand" />
      <Arrow x1={148} x2={164} y={y + h / 2} />
      <Box x={164} y={y} w={62} h={h} label="score" />
      <Arrow x1={226} x2={242} y={y + h / 2} />
      <Box x={242} y={y} w={66} h={h} label="summary" tone="success" />
      {/* public REST API feeding the checks */}
      <rect
        x={90}
        y={30}
        width={90}
        height={28}
        rx={7}
        fill="var(--card)"
        stroke="var(--border)"
        strokeWidth={1.5}
      />
      <text
        x={135}
        y={44}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fill="var(--muted-foreground)"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        public API
      </text>
      <line
        x1={119}
        y1={58}
        x2={119}
        y2={y}
        stroke="var(--muted-foreground)"
        strokeWidth={1.5}
        markerEnd="url(#cardart-arrow)"
      />
    </Frame>
  );
}

const registry: Record<string, () => React.ReactElement> = {
  "clinical-ops-copilot": CopilotArt,
  "trust-marketplace": TrustArt,
  "clinical-rag": ClinicalRagArt,
  ledgersim: LedgerSimArt,
  "handoff-lens": HandoffLensArt,
};

export function CardArt({ slug }: { slug: string }) {
  const Art = registry[slug];
  if (!Art) return null;
  return (
    <div className="flex size-full items-center justify-center bg-card p-2">
      <Art />
    </div>
  );
}

export function hasCardArt(slug: string): boolean {
  return slug in registry;
}
