"use client";

import {
  ArrowDefs,
  Caption,
  DiagramFrame,
  Edge,
  Node,
  PulseDot,
} from "./primitives";

// ChartExtract-UI: the extraction API returns per-field confidence + evidence
// quotes; a threshold rule (confidence < review_threshold) routes fields to
// approve or correct; the final review state exports as gold-label JSON.
export function ReviewConsole() {
  return (
    <DiagramFrame
      title="ChartExtract-UI review flow"
      desc="The extraction API returns each field with a confidence score and the supporting evidence quote. A threshold rule routes any field whose confidence is below the review threshold to human review. The reviewer approves or corrects each field, and the final review state is exported as a gold-label JSON file."
      viewBox="0 0 860 300"
      minWidth={780}
    >
      <ArrowDefs />

      <Node x={12} y={120} w={128} h={60} lines={["Extraction API"]} sub="POST /extract" />
      <Node x={176} y={120} w={140} h={60} lines={["Per-field", "confidence"]} sub="+ evidence quote" tone="brand" />
      <Node x={352} y={120} w={128} h={60} lines={["Threshold", "routing"]} sub="conf < threshold" />
      <Node x={516} y={120} w={132} h={60} lines={["Approve /", "correct"]} tone="gate" />
      <Node x={684} y={120} w={164} h={60} lines={["Gold-label export"]} sub="buildCorrectionExport" tone="success" />

      <Edge d="M 140 150 L 174 150" delay={0} />
      <Edge d="M 316 150 L 350 150" delay={0.12} />
      <Edge d="M 480 150 L 514 150" delay={0.24} />
      <Edge d="M 648 150 L 682 150" delay={0.36} />

      <Caption x={416} y={104} anchor="middle">
        needs_review sorted to top
      </Caption>
      <Caption x={582} y={104} anchor="middle">
        human in the loop
      </Caption>

      <PulseDot
        points={[
          { x: 76, y: 150 },
          { x: 246, y: 150 },
          { x: 416, y: 150 },
          { x: 582, y: 150 },
          { x: 766, y: 150 },
        ]}
      />
    </DiagramFrame>
  );
}
