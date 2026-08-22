export type NewsEntry = {
  period: string;
  title: string;
  details: string[];
};

export const newsEntries: NewsEntry[] = [
  {
    period: "01/08/2026 — 01/09/2026",
    title: "Outfit Style Evaluation and Recommendation",
    details: [
      "Started the project “Outfit Style Evaluation and Recommendation Using CLIP and Vision LLMs on FastAPI Web Application”.",
    ],
  },
  {
    period: "01/07/2026 — 01/09/2026",
    title: "Machine Learning course",
    details: [
      "Joined the Machine Learning course at HCMUT EE Machine Learning & IoT Lab.",
    ],
  },
  {
    period: "01/09/2025 — 01/06/2026",
    title: "Computer Science at HCMUT",
    details: [
      "Started studying Computer Science at HCMUT.",
      "Achieved a 4.0 GPA in both semesters.",
    ],
  },
];
