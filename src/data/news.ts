export type NewsEntry = {
  startDate: string;
  dateLabel: string;
  period: string;
  title: string;
  details: string[];
};

export const newsEntries: NewsEntry[] = [
  {
    startDate: "2026-08-01",
    dateLabel: "Aug – Sep 2026",
    period: "01/08/2026 — 01/09/2026",
    title: "Outfit Style Evaluation and Recommendation",
    details: [
      "Started the project “Outfit Style Evaluation and Recommendation Using CLIP and Vision LLMs on FastAPI Web Application”.",
    ],
  },
  {
    startDate: "2026-07-01",
    dateLabel: "Jul – Sep 2026",
    period: "01/07/2026 — 01/09/2026",
    title: "Machine Learning course",
    details: [
      "Joined the Machine Learning course at HCMUT EE Machine Learning & IoT Lab.",
    ],
  },
  {
    startDate: "2025-09-01",
    dateLabel: "Sep 2025 – Jun 2026",
    period: "01/09/2025 — 01/06/2026",
    title: "Computer Science at HCMUT",
    details: [
      "Started studying Computer Science at HCMUT.",
      "Achieved a 4.0 GPA in both semesters.",
    ],
  },
];

// Sort recorded dates without inferring completion or current status.
export const journeyEntries = [...newsEntries].sort((a, b) =>
  b.startDate.localeCompare(a.startDate),
);
