"use client";

import {
  ArrowDefs,
  Caption,
  DiagramFrame,
  Edge,
  Node,
  PulseDot,
} from "./primitives";

// LedgerSim: a plain-English product spec goes through a Claude agent layer that
// emits validated parameters, which configure two product contracts (savings,
// checking) whose postings land in an append-only double-entry ledger. A side
// rail scores the agent against a 19-spec golden set and runs CI.
export function LedgerSimArchitecture() {
  return (
    <DiagramFrame
      title="LedgerSim architecture"
      desc="A plain-English product spec enters an agent layer built on Claude, which converts it into validated contract parameters. The parameters configure one of two product contracts, a savings contract with daily accrual and a checking contract with hold-aware overdraft, whose postings are written to an append-only double-entry ledger that rejects unbalanced batches and uses Decimal-only money math. A side rail runs the eval harness, a 19-spec self-authored golden set that scored 114 of 114 field checks, plus 62 offline tests and continuous integration."
      viewBox="0 0 840 380"
      minWidth={780}
    >
      <ArrowDefs />

      <Node x={12} y={150} w={108} h={56} lines={["Product spec"]} sub="plain English" />
      <Node
        x={148}
        y={150}
        w={120}
        h={56}
        lines={["Agent layer"]}
        sub="claude-sonnet-5"
        tone="brand"
      />
      <Node x={296} y={150} w={114} h={56} lines={["Validated", "parameters"]} />

      {/* two product contracts */}
      <Node x={438} y={92} w={158} h={48} lines={["Savings contract"]} sub="daily accrual" />
      <Node x={438} y={206} w={158} h={48} lines={["Checking contract"]} sub="hold-aware overdraft" />

      <Node
        x={632}
        y={148}
        w={150}
        h={60}
        lines={["Double-entry ledger"]}
        sub="balanced, Decimal-only"
        tone="success"
      />

      {/* spec -> agent -> params */}
      <Edge d="M 120 178 L 146 178" delay={0} />
      <Edge d="M 268 178 L 294 178" delay={0.1} />
      {/* params -> each contract */}
      <Edge d="M 410 178 C 424 178, 424 116, 436 116" delay={0.18} />
      <Edge d="M 410 178 C 424 178, 424 230, 436 230" delay={0.22} />
      {/* contracts -> ledger */}
      <Edge d="M 596 116 C 616 116, 616 178, 630 178" delay={0.3} arrow={false} />
      <Edge d="M 596 230 C 616 230, 616 178, 630 178" delay={0.34} />

      {/* side rail: golden-set eval + CI */}
      <Node x={296} y={300} w={158} h={50} lines={["Eval harness"]} sub="19-spec golden set" />
      <Node x={488} y={300} w={150} h={50} lines={["CI + 62 tests"]} sub="ruff + Actions" tone="gate" />
      <Edge d="M 208 206 C 208 252, 300 258, 340 298" delay={0.42} />
      <Edge d="M 454 325 L 486 325" delay={0.5} />
      <Caption x={430} y={370} anchor="middle">
        114/114 field checks on its 19-spec self-authored set
      </Caption>

      <PulseDot
        points={[
          { x: 66, y: 178 },
          { x: 208, y: 178 },
          { x: 353, y: 178 },
          { x: 517, y: 116 },
          { x: 707, y: 178 },
        ]}
      />
    </DiagramFrame>
  );
}
