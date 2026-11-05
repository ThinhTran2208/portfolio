export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  status: "preprint" | "submitted" | "accepted" | "published";
  paperUrl?: string;
  codeUrl?: string;
};

export type Award = {
  title: string;
  organization: string;
  year: number;
  description: string;
  url?: string;
};

// Add verified records here. Education and GPA remain in Journey.
export const publications: Publication[] = [];
export const awards: Award[] = [];
