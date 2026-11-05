export type Experiment = {
  title: string;
  description: string;
  href: string;
  kind: "Experiment" | "Notebook" | "Demo";
};

export type PersonalActivity = {
  title: string;
  description: string;
  href?: string;
  image?: { src: string; alt: string };
};

// These sections appear only after real content is added.
export const experiments: Experiment[] = [];
export const personalActivities: PersonalActivity[] = [];
