// Real screenshots captured from the live demos during the build
// (scripts/capture-screenshots.mjs). Keyed by project slug. Alt text is
// mandatory (spec §14).

export type Screenshot = { src: string; alt: string };

export const screenshots: Record<string, Screenshot> = {
  "chartextract-ui": {
    src: "/screenshots/chartextract-ui.jpg",
    alt: "The ChartExtract-UI review console in demo mode: a synthetic oncology progress note on the left, an extraction-and-review panel on the right, and a review-threshold slider set to 0.90.",
  },
  chartextractor: {
    src: "/screenshots/chartextractor.jpg",
    alt: "The ChartExtractor Streamlit demo: a Clinical Text Extractor with a confidence-threshold slider, a paste box for clinical text, and Extract and Eval metrics tabs.",
  },
};
