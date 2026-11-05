export type Writing = {
  title: string;
  date: string;
  description: string;
  kind: "Technical article" | "Learning note" | "Paper note";
  status: "published" | "draft" | "placeholder";
  href?: string;
};

export const writing: Writing[] = [
  {
    title: "What I learned from my first serious AI project",
    date: "2026-08-21",
    description: "Notes on models, mistakes, experiments and iteration.",
    kind: "Learning note",
    status: "placeholder",
  },
];

export const publishedWriting = writing.filter(
  (entry) => entry.status === "published",
);
