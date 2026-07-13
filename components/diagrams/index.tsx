import type { ComponentType } from "react";

import { CopilotArchitecture } from "./copilot-architecture";
import { ExtractionPipeline } from "./extraction-pipeline";
import { ReferralPlatform } from "./referral-platform";
import { ReviewConsole } from "./review-console";

// Maps the frontmatter `diagram` field to its animated SVG component.
const registry: Record<string, ComponentType> = {
  AgentArchitectureDiagram: CopilotArchitecture,
  ExtractionPipelineDiagram: ExtractionPipeline,
  ReferralPlatformDiagram: ReferralPlatform,
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
  ReferralPlatform,
  ReviewConsole,
};
