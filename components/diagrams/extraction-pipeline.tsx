"use client";

import {
  ArrowDefs,
  Caption,
  DiagramFrame,
  Edge,
  Node,
  PulseDot,
} from "./primitives";

// ChartExtractor: note -> router -> four grouped extractors -> validator ->
// verifier -> schema-validated JSON, with the eval harness + CI gate as a side
// rail that gates every deploy at >= 85% macro-F1.
export function ExtractionPipeline() {
  return (
    <DiagramFrame
      title="ChartExtractor pipeline"
      desc="A clinical note enters a router that fans out to four grouped extractors: tumor, clinical, molecular, and treatment. Their typed fields pass through a validator and a verifier into a schema-validated OncologyExtract JSON record with per-field confidence and needs-review flags. A side rail runs the eval harness and a continuous-integration gate that blocks any deploy scoring below 85 percent macro-F1 on the CI gold set."
      viewBox="0 0 820 380"
      minWidth={760}
    >
      <ArrowDefs />

      <Node x={12} y={144} w={96} h={56} lines={["Clinical", "note"]} />
      <Node x={140} y={144} w={92} h={56} lines={["Router"]} tone="brand" />

      {/* four grouped extractors */}
      <Node x={262} y={40} w={122} h={44} lines={["Tumor extractor"]} />
      <Node x={262} y={104} w={122} h={44} lines={["Clinical extractor"]} />
      <Node x={262} y={168} w={122} h={44} lines={["Molecular extractor"]} />
      <Node x={262} y={232} w={122} h={44} lines={["Treatment extractor"]} />

      <Node x={412} y={144} w={96} h={56} lines={["Validator"]} sub="types + enums" />
      <Node x={536} y={144} w={96} h={56} lines={["Verifier"]} sub="re-check" tone="brand" />
      <Node
        x={660}
        y={144}
        w={148}
        h={56}
        lines={["OncologyExtract"]}
        sub="+ confidence, needs_review"
        tone="success"
      />

      {/* note -> router */}
      <Edge d="M 108 172 L 138 172" delay={0} />
      {/* router -> each extractor */}
      <Edge d="M 232 172 C 245 172, 248 62, 260 62" delay={0.1} />
      <Edge d="M 232 172 C 245 172, 248 126, 260 126" delay={0.15} />
      <Edge d="M 232 172 C 245 172, 248 190, 260 190" delay={0.2} />
      <Edge d="M 232 172 C 245 172, 248 254, 260 254" delay={0.25} />
      {/* extractors -> validator */}
      <Edge d="M 384 62 C 398 62, 400 172, 410 172" delay={0.3} arrow={false} />
      <Edge d="M 384 126 C 398 126, 400 172, 410 172" delay={0.32} arrow={false} />
      <Edge d="M 384 190 C 398 190, 400 172, 410 172" delay={0.34} arrow={false} />
      <Edge d="M 384 254 C 398 254, 400 172, 410 172" delay={0.36} />
      {/* validator -> verifier -> json */}
      <Edge d="M 508 172 L 534 172" delay={0.42} />
      <Edge d="M 632 172 L 658 172" delay={0.48} />

      {/* side rail: eval harness + CI gate */}
      <Node x={412} y={300} w={120} h={48} lines={["eval.py harness"]} />
      <Node x={560} y={300} w={140} h={48} lines={["CI gate"]} sub="blocks deploy < 85%" tone="gate" />
      <Edge d="M 720 200 C 720 260, 560 260, 520 298" delay={0.55} />
      <Edge d="M 532 324 L 558 324" delay={0.6} />
      <Caption x={472} y={368} anchor="middle">
        runs on every commit
      </Caption>

      <PulseDot
        points={[
          { x: 60, y: 172 },
          { x: 186, y: 172 },
          { x: 323, y: 126 },
          { x: 460, y: 172 },
          { x: 584, y: 172 },
          { x: 734, y: 172 },
        ]}
      />
    </DiagramFrame>
  );
}
