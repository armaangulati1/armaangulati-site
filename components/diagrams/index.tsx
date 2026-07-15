import type { ComponentType } from "react";

import { CopilotArchitecture } from "./copilot-architecture";
import { ExtractionPipeline } from "./extraction-pipeline";
import { HandoffLensArchitecture } from "./handoff-lens-architecture";
import { LedgerSimArchitecture } from "./ledgersim-architecture";
import { ReferralPlatform } from "./referral-platform";
import { RepSignalArchitecture } from "./repsignal-architecture";
import { ReviewConsole } from "./review-console";

// Maps the frontmatter `diagram` field to its animated SVG component.
const registry: Record<string, ComponentType> = {
  AgentArchitectureDiagram: CopilotArchitecture,
  ExtractionPipelineDiagram: ExtractionPipeline,
  HandoffLensArchitectureDiagram: HandoffLensArchitecture,
  LedgerSimArchitectureDiagram: LedgerSimArchitecture,
  ReferralPlatformDiagram: ReferralPlatform,
  RepSignalArchitectureDiagram: RepSignalArchitecture,
  ReviewConsoleDiagram: ReviewConsole,
};

export function ProjectDiagram({ name }: { name?: string }) {
  if (!name) return null;
  const Component = registry[name];
  if (!Component) return null;
  return <Component />;
}

export {
  CopilotArchitecture,
  ExtractionPipeline,
  HandoffLensArchitecture,
  LedgerSimArchitecture,
  ReferralPlatform,
  RepSignalArchitecture,
  ReviewConsole,
};
