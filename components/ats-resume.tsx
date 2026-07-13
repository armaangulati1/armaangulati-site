// Semantic-HTML mirror of the resume for SEO/ATS and as the accessible
// alternative to the embedded PDF (spec §14). Wording is byte-faithful to
// outputs/artifacts/canonical_resume_AI_fulltext_2026-07-08.txt.

const skills: { label: string; body: string }[] = [
  {
    label: "AI / ML",
    body: "LLM system design & application development (Claude, OpenAI & Google Gemini APIs), agentic systems & orchestration (tool-calling, multi-step router → validator → verifier pipelines), Model Context Protocol (MCP), agent identity & auth validation, RAG (retrieval-augmented generation, reranking, RAGAS), context engineering, structured/constrained generation & schema validation (Pydantic/JSON), evaluation harnesses (precision/recall/F1, LLM-as-judge, CI eval gates), prompt engineering, multimodal AI, vector embeddings & semantic search (Chroma)",
  },
  {
    label: "Backend & Full-Stack",
    body: "FastAPI, Streamlit, REST APIs & third-party API/webhook integrations, Docker, CI/CD (GitHub Actions), testing (pytest), observability (Langfuse), Git/GitHub, Poetry, Jupyter; AI-assisted / live coding",
  },
  {
    label: "Languages",
    body: "Python (Pandas, NumPy, Matplotlib), Java, SQL, MATLAB",
  },
  {
    label: "Healthcare",
    body: "FHIR (resource modeling & validation, live REST API, batch/transaction bundles, Synthea, local HAPI server), clinical NLP / chart abstraction, prior-authorization / RCM workflows, PHI redaction & de-identification",
  },
  {
    label: "Data & Tools",
    body: "Data cleaning & preprocessing, statistical analysis, data visualization, Excel (pivots), Figma",
  },
];

const experience: { role: string; dates: string; bullets: string[] }[] = [
  {
    role: "AI / Software Developer (Part-Time), Trust.care",
    dates: "May 2024 – Present",
    bullets: [
      "Architected a full-stack, AI-powered referral platform (FastAPI, Streamlit, LangChain, Chroma) connecting healthcare providers with community-based organizations (CBOs) for Medicaid Marketplace referrals; built ground-up as a two-person engineering effort, now processing 5.12M+ outreach messages to a ~955K-member Medicaid cohort across 100+ CBOs.",
      "Designed the LLM system architecture: orchestrated Claude, OpenAI, and Google Gemini models via LangChain over a Chroma vector store, enabling multimodal (text + document/image) semantic search, plus a reply-classification pipeline that analyzed 118K+ inbound member replies by intent, separating high-signal responses from noise.",
      "Built autonomous, tool-calling agents with an agent identity & authentication layer, giving each agent a verifiable identity to securely validate and act on people-initiated operations, addressing a core trust challenge in agent-based systems.",
      "Drove the platform from concept to production: 19.2% cohort engagement, ~12.8x the published Medicaid SMS benchmark, contributing to 35K+ reported Medicaid enrollments and re-enrollments.",
    ],
  },
  {
    role: "Data Analyst Intern, Sycamore Informatics",
    dates: "May 2024 – Aug 2024",
    bullets: [
      "Investigated pharmaceutical fraud by consolidating 4-5 raw financial extracts and building chunked pandas pipelines over larger-than-memory datasets, surfacing anomalous activity patterns for internal review.",
      "Applied statistical methods and data visualization to make fraud signals interpretable for non-technical stakeholders, partnering cross-functionally to strengthen data integrity.",
    ],
  },
  {
    role: "Technical Intern, Harmony Health",
    dates: "May 2023 – Aug 2023",
    bullets: [
      "Built predictive models (campaign response, no-show risk, enrollment likelihood) from healthcare campaign data; the no-show model was used to prioritize outreach lists, outperforming the prior targeting approach.",
    ],
  },
];

const projects: { name: string; dates: string; bullets: string[] }[] = [
  {
    name: "Clinical Prior-Authorization Agent, deployed MCP-powered agentic system",
    dates: "2026",
    bullets: [
      "Built and deployed an end-to-end agentic system automating a clinical prior-authorization workflow: authored two Model Context Protocol (MCP) servers (read + action) and an LLM agent that reads structured clinical facts from a live FHIR server (HAPI/Synthea), fuses them with free-text note extraction (with provenance), checks payer policy, and decides (submit / request-more-info / deny-risk), gated by a human-in-the-loop approval step and a deterministic guardrail.",
      "Engineered a rigorous eval harness (93.7% macro-F1 on a held-out set, per-class precision/recall/F1, trajectory + LLM-as-judge with judge validation, CI regression gate); added PHI redaction, prompt-injection defense, retries/idempotency, and deployed the MCP server live (Docker, Fly.io, StreamableHTTP, token auth) (GitHub).",
    ],
  },
  {
    name: "ChartExtractor, agentic clinical data-extraction platform",
    dates: "2026",
    bullets: [
      "Built an agentic pipeline (router → extractors → validator → verifier) extracting structured oncology variables from clinical notes into schema-validated JSON; 93.6% macro-F1 against a ≥85% CI deploy gate, with a per-field eval harness, containerized deploy, and a live demo + API (demo · GitHub).",
    ],
  },
];

const education = {
  school: "Washington University in St. Louis",
  dates: "May 2026",
  lines: [
    "Bachelor of Engineering in Biomedical Engineering. Partial scholarship, College of Arts & Sciences.",
    "WashU's undergraduate Biomedical Engineering program is ranked #6 in the nation (U.S. News 2026); the university ranks #20 among National Universities (McKelvey School of Engineering).",
    "Relevant coursework: Optimization, Statistics, Engineering Mathematics, Differential Equations, Signal & Image Processing, Quantitative Physiology.",
    "High school: 4.65 GPA; ranked #38 in California.",
  ],
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-metric text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </h3>
  );
}

export function AtsResume() {
  return (
    <div className="prose-none text-foreground">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Armaan Gulati
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        New York, NY · 510-514-3075 · gulatiarmaan@gmail.com ·
        linkedin.com/in/armaan-gulati · github.com/armaangulati1
      </p>

      <section className="mt-8">
        <SectionHeading>Objective</SectionHeading>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          Applied-AI / forward-deployed engineer seeking to build LLM-powered
          products in healthcare. Biomedical engineer who designs and ships
          agentic systems end to end on the Claude and OpenAI APIs, from clinical
          data extraction to full-stack production deployment.
        </p>
      </section>

      <section className="mt-8">
        <SectionHeading>Skills</SectionHeading>
        <dl className="mt-2 space-y-2">
          {skills.map((s) => (
            <div key={s.label} className="text-[15px] leading-relaxed">
              <dt className="inline font-semibold text-foreground">
                {s.label}:{" "}
              </dt>
              <dd className="inline text-muted-foreground">{s.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8">
        <SectionHeading>Experience</SectionHeading>
        <div className="mt-3 space-y-6">
          {experience.map((e) => (
            <div key={e.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-base font-semibold text-foreground">
                  {e.role}
                </h4>
                <span className="text-metric text-sm text-muted-foreground">
                  {e.dates}
                </span>
              </div>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-muted-foreground">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionHeading>Projects</SectionHeading>
        <div className="mt-3 space-y-6">
          {projects.map((p) => (
            <div key={p.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-base font-semibold text-foreground">
                  {p.name}
                </h4>
                <span className="text-metric text-sm text-muted-foreground">
                  {p.dates}
                </span>
              </div>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-muted-foreground">
                {p.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionHeading>Education</SectionHeading>
        <div className="mt-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="text-base font-semibold text-foreground">
              {education.school}
            </h4>
            <span className="text-metric text-sm text-muted-foreground">
              {education.dates}
            </span>
          </div>
          <div className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-muted-foreground">
            {education.lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
