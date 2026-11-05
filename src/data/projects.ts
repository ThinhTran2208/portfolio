import toolkitSnapshot from "@/content/projects/autonomous-ml-toolkit/snapshot.json";
import fashionSnapshot from "@/content/projects/ai-fashion-assistant/snapshot.json";
import type { ReadmeSnapshot } from "@/types/readme";

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  github?: string;
  image?: { src: string; alt: string; width?: number; height?: number };
  readme?: ReadmeSnapshot;
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
      src: Object.values(toolkitSnapshot.images)[0],
      alt: "MLflow interface comparing Iris experiment runs by cross-validation accuracy",
    },
    readme: toolkitSnapshot,
  },
  {
    slug: "ai-fashion-assistant",
    title: "outfit-compatibility-system",
    description:
      "A modular outfit compatibility pipeline with frozen FashionCLIP embeddings, leave-one-out diagnosis, and grounded VLM explanations. Replacement recommendations remain future work.",
    technologies: ["Python", "PyTorch", "FashionCLIP", "Qwen3-VL"],
    github: "https://github.com/ThinhTran2208/outfit-compatibility-system",
    image: {
      src: "/projects/ai-fashion-assistant/team-presentation.jpg",
      alt: "Fashion Outfit Compatibility System project team in front of a presentation screen",
      width: 2048,
      height: 1365,
    },
    readme: fashionSnapshot,
  },
];
