export type NewsEntry = {
  startDate: string;
  dateLabel: string;
  period: string;
  title: string;
  href?: string;
  image?: { src: string; alt: string };
  details: string[];
};

export const newsEntries: NewsEntry[] = [
  {
    startDate: "2026-11-05",
    dateLabel: "Nov 2026",
    period: "November 2026",
    title: "autonomous-ml-toolkit",
    href: "/projects/autonomous-ml-toolkit",
    details: [
      "A YAML-driven toolkit for tabular classification and regression experiments, with scikit-learn pipelines, training-only cross-validation, MLflow tracking, and Markdown reports.",
    ],
  },
  {
    startDate: "2026-08-01",
    dateLabel: "Aug – Sep 2026",
    period: "01/08/2026 — 01/09/2026",
    title: "outfit-compatibility-system",
    href: "/projects/ai-fashion-assistant",
    details: ["Started the outfit-compatibility-system project."],
  },
  {
    startDate: "2026-07-01",
    dateLabel: "Jul – Sep 2026",
    period: "01/07/2026 — 01/09/2026",
    title: "Machine Learning course",
    image: {
      src: "/journey/mliot-logo.png",
      alt: "HCMUT EE Machine Learning & IoT Lab logo",
    },
    details: [
      "Joined the Machine Learning course at HCMUT EE Machine Learning & IoT Lab.",
    ],
  },
  {
    startDate: "2025-09-01",
    dateLabel: "Sep 2025 – Jun 2026",
    period: "01/09/2025 — 01/06/2026",
    title: "Computer Science at HCMUT",
    image: {
      src: "/journey/hcmut-logo.png",
      alt: "Ho Chi Minh City University of Technology logo",
    },
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
