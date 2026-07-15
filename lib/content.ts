// All copy here is fact-locked against memory/facts.md. Every metric carries its
// mandated qualifier. Values render in Geist Mono; qualifiers render in muted text.

export type Metric = {
  value: string;
  label: string;
  qualifier: string;
  mono?: boolean; // metric numbers render in mono; statements render in sans
};

export type Project = {
  slug: string;
  name: string;
  problem: string;
  metrics: Metric[];
  tags: string[];
};

// Home proof strip (spec §11): 19.2% / 93.7% held-out / honest-evals tile.
export const proofStats: Metric[] = [
  {
    value: "19.2%",
    label: "cohort engagement",
    qualifier: "~12.8x the published Medicaid SMS benchmark",
    mono: true,
  },
  {
    value: "93.7%",
    label: "macro-F1",
    qualifier: "on a held-out set of synthetic cases",
    mono: true,
  },
  {
    value: "I publish the failures",
    label: "honest evals",
    qualifier:
      "The LLM judge that failed its own agreement checks and the fine-tune that lost out-of-distribution are both in the repos.",
    mono: false,
  },
];

// Featured projects (spec §11): 3 cards, one-line problem + 2 metrics + tags.
export const featuredProjects: Project[] = [
  {
    slug: "clinical-ops-copilot",
    name: "clinical-ops-copilot",
    problem:
      "An agentic prior-authorization workflow over live FHIR data, gated by a human approval step and a deterministic guardrail.",
    metrics: [
      {
        value: "93.7%",
        label: "macro-F1",
        qualifier: "held-out split, synthetic data",
        mono: true,
      },
      {
        value: "16/16",
        label: "X12 278 decision agreement",
        qualifier: "held-out eval, synthetic data",
        mono: true,
      },
    ],
    tags: ["healthcare", "agents", "evals", "FHIR"],
  },
  {
    slug: "chartextractor",
    name: "ChartExtractor",
    problem:
      "A router to extractors to validator to verifier pipeline pulling structured oncology variables out of clinical notes.",
    metrics: [
      {
        value: "93.6%",
        label: "macro-F1",
        qualifier: "on its evaluation set (CI gold, synthetic)",
        mono: true,
      },
      {
        value: "~40 pts",
        label: "synthetic-to-real gap",
        qualifier: "disclosed as a headline, not hidden",
        mono: true,
      },
    ],
    tags: ["healthcare", "evals", "LoRA"],
  },
  {
    slug: "handoff-lens",
    name: "handoff-lens",
    problem:
      "A design-to-code readiness assistant that reads a Figma file through the public Figma REST API, runs deterministic checks, and writes a customer-facing summary.",
    metrics: [
      {
        value: "1.000 / 1.000",
        label: "precision / recall, deterministic checks",
        qualifier: "on its 6-fixture self-authored set; 11/11 planted findings",
        mono: true,
      },
      {
        value: "schema-valid",
        label: "all 6 LLM summaries, live run",
        qualifier: "liveness and schema-validity only, explicitly not an accuracy score",
        mono: false,
      },
    ],
    tags: ["design-tools", "agents", "evals"],
  },
  {
    slug: "ledgersim",
    name: "LedgerSim",
    problem:
      "A weekend-scale core-banking ledger: a double-entry engine, product-contract hooks, and a Claude layer that turns plain-English product specs into validated parameters.",
    metrics: [
      {
        value: "114/114",
        label: "field checks correct",
        qualifier: "on its 19-spec self-authored golden set, single live run",
        mono: true,
      },
      {
        value: "3 bugs",
        label: "surfaced live, each regression-tested",
        qualifier: "found by running the eval live rather than assuming it passed",
        mono: true,
      },
    ],
    tags: ["fintech", "agents", "evals"],
  },
  {
    slug: "repsignal",
    name: "RepSignal",
    problem:
      "A TypeScript and Node.js conversation-intelligence integration: a webhook ingests a sales-call transcript, a shared Zod schema validates it, and Claude returns a schema-validated coaching scorecard.",
    metrics: [
      {
        value: "77/84",
        label: "field checks",
        qualifier: "on its self-authored synthetic 14-transcript eval set, representative live run",
        mono: true,
      },
      {
        value: "3 bugs",
        label: "surfaced live, each fixed",
        qualifier: "found by running the eval live, first two regression-tested",
        mono: true,
      },
    ],
    tags: ["typescript", "integrations", "agents"],
  },
  {
    slug: "chartextract-ui",
    name: "ChartExtract-UI",
    problem:
      "A human-in-the-loop review console over the ChartExtractor API, with per-field confidence and evidence provenance.",
    metrics: [
      {
        value: "55",
        label: "tests (Vitest + RTL)",
        qualifier: "GitHub Actions CI + Pages deploy",
        mono: true,
      },
      {
        value: "per-field",
        label: "confidence + provenance",
        qualifier: "threshold routing, synthetic notes, one-day build",
        mono: false,
      },
    ],
    tags: ["frontend", "healthcare", "HITL"],
  },
];

// Trust.care experience block (spec §6): 4 sentences, company named "Trust.care".
export const experience = {
  employer: "Trust.care",
  sentences: [
    "At Trust.care, I was one of two engineers building an AI-powered referral platform embedded directly with Medicaid providers and community-based organizations.",
    "The population set the design: 63.8% of the cohort had no email, so the system was SMS-first by necessity, not by preference.",
    "It reached a ~955K-member Medicaid cohort across 100+ CBOs and processed 5.12M+ outreach messages, with a reply-classification pipeline separating high-signal responses from noise.",
    "The work contributed to 35,000+ reported Medicaid enrollments and re-enrollments, at 19.2% cohort engagement, roughly 12.8x the published Medicaid SMS benchmark.",
  ],
  stats: [
    {
      value: "5.12M+",
      label: "outreach messages",
      qualifier: "to a ~955K-member Medicaid cohort",
      mono: true,
    },
    {
      value: "118K+",
      label: "replies classified",
      qualifier: "by intent, high-signal separated from noise",
      mono: true,
    },
  ] as Metric[],
};

// Engineering philosophy (spec §6): 4 principles.
export const philosophy = [
  {
    title: "Build next to the user.",
    body: "Forward deployed by instinct. The clearest requirements come from sitting with the people who live the problem, not from a spec.",
  },
  {
    title: "Evaluate honestly, publish the failures.",
    body: "Every project ships with an eval harness and the numbers that did not work, including the ones that embarrass the demo.",
  },
  {
    title: "Guardrails before autonomy.",
    body: "Human approval gates and deterministic checks come first. An agent earns the right to act by proving it can be stopped.",
  },
  {
    title: "One size fits none.",
    body: "Design for the actual population. A cohort where most members have no email does not want to be reached by email.",
  },
];
