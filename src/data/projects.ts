import snapshot from "@/content/projects/autonomous-ml-toolkit/snapshot.json";

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  github?: string;
  image?: { src: string; alt: string };
  notes?: string[];
  readme?: boolean;
};

export const projects: Project[] = [
  {
    slug: "autonomous-ml-toolkit",
    title: "autonomous-ml-toolkit",
    subtitle: "ML Experiment & Evaluation Toolkit",
    description:
      "A YAML-driven toolkit for tabular classification and regression experiments, with scikit-learn pipelines, training-only cross-validation, MLflow tracking, and Markdown reports.",
    technologies: ["Python", "scikit-learn", "MLflow", "YAML"],
    github: "https://github.com/ThinhTran2208/autonomous-ml-toolkit",
    image: {
      src: Object.values(snapshot.images)[0],
      alt: "MLflow interface comparing Iris experiment runs by cross-validation accuracy",
    },
    readme: true,
  },
  {
    slug: "ai-fashion-assistant",
    title: "AI Fashion Assistant",
    description:
      "An experimental AI system for understanding outfits and recommending compatible fashion items.",
    technologies: ["Python", "PyTorch", "Computer Vision"],
    notes: [
      "The project explores outfit style evaluation and recommendation using CLIP and Vision LLMs in a FastAPI web application.",
    ],
  },
];
