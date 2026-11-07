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
  year?: number;
  description: string;
  url?: string;
  image?: AcademicImage;
};

export type AcademicImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Certificate = {
  title: string;
  issuer: string;
  issuedOn: string;
  caption: string;
  image: AcademicImage;
};

// Add verified records here. Education and GPA remain in Journey.
export const publications: Publication[] = [];
export const awards: Award[] = [
  {
    title: "Academic Encouragement Scholarship",
    organization: "Ho Chi Minh City University of Technology (HCMUT), VNU-HCM",
    description:
      "A scholarship for students with outstanding academic and conduct performance, awarded each semester based on academic results, conduct scores, and available scholarship quotas.",
    image: {
      src: "/journey/hcmut-logo.png",
      alt: "Ho Chi Minh City University of Technology logo",
      width: 1208,
      height: 1220,
    },
  },
];

export const certificates: Certificate[] = [
  {
    title: "Python — Certificate of Completion",
    issuer: "Kaggle",
    issuedOn: "2026-11-07",
    caption:
      "i used c++ in the past, but now i learn python to prepare for the ML project :) I quite like its simplicity haha",
    image: {
      src: "/academic/kaggle-python-certificate.png",
      alt: "Kaggle Python course completion certificate for Trần Tấn Thịnh, dated November 7, 2026",
      width: 4800,
      height: 2960,
    },
  },
];
