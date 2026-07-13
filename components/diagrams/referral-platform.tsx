"use client";

import {
  ArrowDefs,
  Caption,
  DiagramFrame,
  Edge,
  Node,
  PulseDot,
} from "./primitives";

// Trust Marketplace: a ~955K Medicaid cohort (63.8% no email) reached SMS-first,
// inbound replies classified by intent (~36% high-signal), routed to referral
// and enrollment. Vulnerability scoring is an input that concentrates outreach.
export function ReferralPlatform() {
  return (
    <DiagramFrame
      title="Trust Marketplace referral flow"
      desc="A roughly 955,000-member Medicaid cohort, of which 63.8 percent have no email, is reached SMS-first. Inbound replies are classified by intent, separating about 36 percent high-signal responses from noise, and routed to referral and enrollment. A vulnerability-scoring system is an input that concentrates outreach on the highest-need members rather than messaging the full cohort uniformly."
      viewBox="0 0 860 320"
      minWidth={780}
    >
      <ArrowDefs />

      <Node x={12} y={150} w={128} h={62} lines={["~955K cohort"]} sub="63.8% no email" />
      <Node x={176} y={150} w={128} h={62} lines={["SMS-first", "outreach"]} tone="brand" />
      <Node x={340} y={150} w={124} h={62} lines={["Inbound replies"]} sub="118.2K+ classified" />
      <Node x={500} y={150} w={140} h={62} lines={["Intent", "classification"]} sub="~36% high-signal" tone="brand" />
      <Node x={676} y={150} w={168} h={62} lines={["Referral + enrollment"]} sub="35K+ reported" tone="success" />

      <Edge d="M 140 181 L 174 181" delay={0} />
      <Edge d="M 304 181 L 338 181" delay={0.12} />
      <Edge d="M 464 181 L 498 181" delay={0.24} />
      <Edge d="M 640 181 L 674 181" delay={0.36} />

      {/* vulnerability scoring feeds outreach as an input */}
      <Node x={176} y={44} w={150} h={48} lines={["Vulnerability scoring"]} sub="concentrates outreach" />
      <Edge d="M 240 92 L 240 148" delay={0.44} />
      <Caption x={251} y={128} anchor="start">
        input
      </Caption>

      <PulseDot
        points={[
          { x: 76, y: 181 },
          { x: 240, y: 181 },
          { x: 402, y: 181 },
          { x: 570, y: 181 },
          { x: 760, y: 181 },
        ]}
      />
    </DiagramFrame>
  );
}
