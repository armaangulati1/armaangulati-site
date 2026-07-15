"use client";

import {
  ArrowDefs,
  Caption,
  DiagramFrame,
  Edge,
  Node,
  PulseDot,
} from "./primitives";

// RepSignal: a sales-call transcript arrives at a webhook, is validated against a
// shared Zod schema, and is passed to Claude with forced tool-use, which emits a
// schema-validated coaching scorecard. The scorecard is served by a typed REST API
// and rendered by a React dashboard. A side rail scores the extractor against a
// self-authored synthetic 14-transcript eval set and runs CI.
export function RepSignalArchitecture() {
  return (
    <DiagramFrame
      title="RepSignal architecture"
      desc="A sales-call transcript arrives at a Node.js webhook and is validated against a shared Zod schema that is the single source of truth for both apps. The validated transcript is passed to Claude with forced tool-use, which emits a coaching scorecard (talk/listen ratio, discovery questions, objections, next-step secured, risk flags, coaching tips) that is itself validated against the same schema. The scorecard is served by a typed REST API and rendered by a React and TypeScript dashboard. A side rail runs the eval harness, a self-authored synthetic 14-transcript set that scored 77 of 84 field checks, plus 35 offline Vitest tests, ESLint, and continuous integration."
      viewBox="0 0 840 380"
      minWidth={780}
    >
      <ArrowDefs />

      <Node x={12} y={150} w={116} h={56} lines={["Transcript", "webhook"]} sub="POST, Node + Express" />
      <Node
        x={152}
        y={150}
        w={120}
        h={56}
        lines={["Zod validation"]}
        sub="shared schema pkg"
        tone="gate"
      />
      <Node
        x={296}
        y={150}
        w={122}
        h={56}
        lines={["Claude", "tool-use"]}
        sub="claude-sonnet-5"
        tone="brand"
      />
      <Node
        x={442}
        y={150}
        w={122}
        h={56}
        lines={["Coaching", "scorecard"]}
        sub="Zod-validated"
        tone="success"
      />

      {/* two typed consumers */}
      <Node x={596} y={92} w={150} h={48} lines={["Typed REST API"]} sub="GET /scorecards/:id" />
      <Node x={596} y={216} w={150} h={48} lines={["React dashboard"]} sub="Vite + TypeScript" />

      {/* webhook -> validate -> LLM -> scorecard */}
      <Edge d="M 128 178 L 150 178" delay={0} />
      <Edge d="M 272 178 L 294 178" delay={0.1} />
      <Edge d="M 418 178 L 440 178" delay={0.18} />
      {/* scorecard -> api + dashboard */}
      <Edge d="M 564 178 C 578 178, 578 116, 594 116" delay={0.26} />
      <Edge d="M 564 178 C 578 178, 578 240, 594 240" delay={0.3} />

      {/* side rail: synthetic eval set + CI */}
      <Node x={296} y={300} w={158} h={50} lines={["Eval harness"]} sub="14 synthetic transcripts" />
      <Node x={488} y={300} w={150} h={50} lines={["CI + 35 tests"]} sub="Vitest + ESLint" tone="gate" />
      <Edge d="M 352 206 C 352 254, 332 266, 372 298" delay={0.4} />
      <Edge d="M 454 325 L 486 325" delay={0.48} />
      <Caption x={430} y={370} anchor="middle">
        77/84 field checks on its self-authored synthetic 14-transcript eval set
      </Caption>

      <PulseDot
        points={[
          { x: 70, y: 178 },
          { x: 212, y: 178 },
          { x: 357, y: 178 },
          { x: 503, y: 178 },
          { x: 671, y: 116 },
        ]}
      />
    </DiagramFrame>
  );
}
