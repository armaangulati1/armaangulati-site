"use client";

import {
  ArrowDefs,
  Caption,
  DiagramFrame,
  Edge,
  Node,
  PulseDot,
} from "./primitives";

// clinical-ops-copilot: live FHIR + notes -> fusion (provenance) -> policy check
// -> decide -> human approval gate -> actions. The X12 278 request/response lane
// sits at the payer-format edge; the LLM-as-judge is shown grayed and dashed,
// labeled "excluded after failed validation" (that detail is the brand).
export function CopilotArchitecture() {
  return (
    <DiagramFrame
      title="Clinical Ops Copilot architecture"
      desc="Live FHIR data and free-text notes are fused with provenance, checked against payer policy, and turned into a prior-auth decision. Every action passes a human approval gate before an email or task is created. An X12 278 request is parsed into the case input and a 278 response is generated from the decision. A separate LLM-as-judge is shown grayed out and dashed because it was excluded from scoring after it failed its own validation."
      viewBox="0 0 860 380"
      minWidth={780}
    >
      <ArrowDefs />

      {/* main pipeline */}
      <Node x={12} y={120} w={122} h={60} lines={["FHIR server", "+ free-text notes"]} />
      <Node x={168} y={120} w={118} h={60} lines={["Fusion"]} sub="with provenance" tone="brand" />
      <Node x={320} y={120} w={104} h={60} lines={["Policy check"]} sub="payer rules" />
      <Node x={458} y={120} w={126} h={60} lines={["Decide"]} sub="submit / RMI / deny-risk" tone="brand" />
      <Node x={618} y={120} w={100} h={60} lines={["Human", "approval gate"]} tone="gate" />
      <Node x={752} y={120} w={96} h={60} lines={["Actions"]} sub="email / task" />

      <Edge d="M 134 150 L 166 150" delay={0} />
      <Edge d="M 286 150 L 318 150" delay={0.1} />
      <Edge d="M 424 150 L 456 150" delay={0.2} />
      <Edge d="M 584 150 L 616 150" delay={0.3} />
      <Edge d="M 718 150 L 750 150" delay={0.4} />

      {/* X12 278 request lane feeds the pipeline input */}
      <Node x={12} y={270} w={150} h={54} lines={["X12 278 request"]} sub="parser to Case input" />
      <Edge d="M 78 270 C 78 230, 70 210, 66 182" delay={0.5} />

      {/* X12 278 response generated from the decision */}
      <Node x={458} y={270} w={150} h={54} lines={["X12 278 response"]} sub="A1 / A4, never A3" />
      <Edge d="M 521 182 C 521 220, 528 240, 533 268" delay={0.55} />

      {/* excluded judge: grayed + dashed, off the decision */}
      <Node
        x={648}
        y={270}
        w={200}
        h={54}
        lines={["LLM-as-judge"]}
        sub="excluded after failed validation"
        tone="excluded"
      />
      <Edge d="M 566 182 C 600 230, 680 250, 720 268" delay={0.6} variant="excluded" />

      <Caption x={668} y={210} anchor="middle">
        no action without a human
      </Caption>

      {/* one looping request pulse across the main pipeline */}
      <PulseDot
        points={[
          { x: 73, y: 150 },
          { x: 227, y: 150 },
          { x: 372, y: 150 },
          { x: 521, y: 150 },
          { x: 668, y: 150 },
          { x: 800, y: 150 },
        ]}
      />
    </DiagramFrame>
  );
}
