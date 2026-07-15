"use client";

import {
  ArrowDefs,
  Caption,
  DiagramFrame,
  Edge,
  Node,
  PulseDot,
} from "./primitives";

// handoff-lens: a Figma file is read through the public Figma REST API, parsed,
// and run through five deterministic check functions (six checks) that feed a
// transparent score; an LLM layer narrates the findings into a readiness
// summary. Two separate evals sit on a side rail and are never combined.
export function HandoffLensArchitecture() {
  return (
    <DiagramFrame
      title="handoff-lens architecture"
      desc="A Figma file is ingested through the public Figma REST API and parsed into a node tree. Five deterministic readiness check functions produce six checks and a transparent score computed as 100 minus penalties. An LLM layer built on Claude narrates the findings into a customer-facing readiness summary. A side rail holds two separate evals that are never combined: a deterministic eval that scored precision and recall of 1.000 on a 6-fixture self-authored set, and an LLM eval verified for liveness and schema-validity only."
      viewBox="0 0 840 380"
      minWidth={780}
    >
      <ArrowDefs />

      <Node x={12} y={150} w={102} h={56} lines={["Figma file"]} />
      <Node x={140} y={150} w={122} h={56} lines={["Figma REST API"]} sub="public" tone="brand" />
      <Node x={288} y={150} w={96} h={56} lines={["Parser"]} sub="node tree" />

      {/* deterministic checks + score */}
      <Node x={410} y={92} w={166} h={48} lines={["6 readiness checks"]} sub="5 functions" />
      <Node x={410} y={206} w={166} h={48} lines={["Score = 100 - penalties"]} sub="explainable" />

      <Node
        x={612}
        y={148}
        w={168}
        h={60}
        lines={["Readiness summary"]}
        sub="customer-facing"
        tone="success"
      />

      {/* file -> api -> parser */}
      <Edge d="M 114 178 L 138 178" delay={0} />
      <Edge d="M 262 178 L 286 178" delay={0.1} />
      {/* parser -> checks + score */}
      <Edge d="M 384 178 C 397 178, 397 116, 408 116" delay={0.18} />
      <Edge d="M 384 178 C 397 178, 397 230, 408 230" delay={0.22} />
      {/* checks + score -> summary */}
      <Edge d="M 576 116 C 596 116, 596 178, 610 178" delay={0.3} arrow={false} />
      <Edge d="M 576 230 C 596 230, 596 178, 610 178" delay={0.34} />

      {/* side rail: two separate evals */}
      <Node x={398} y={300} w={172} h={50} lines={["Deterministic eval"]} sub="P/R 1.000, 6-fixture set" />
      <Node x={598} y={300} w={172} h={50} lines={["LLM eval"]} sub="liveness + schema only" />
      <Edge d="M 493 140 L 486 298" delay={0.44} />
      <Edge d="M 696 208 L 686 298" delay={0.5} />
      <Caption x={584} y={370} anchor="middle">
        two evals, never one number
      </Caption>

      <PulseDot
        points={[
          { x: 63, y: 178 },
          { x: 201, y: 178 },
          { x: 336, y: 178 },
          { x: 493, y: 116 },
          { x: 696, y: 178 },
        ]}
      />
    </DiagramFrame>
  );
}
