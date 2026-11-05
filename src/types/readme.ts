export type ReadmeSnapshot = {
  repository: string;
  branch: string;
  readmePath: string;
  readmeSha: string;
  capturedAt: string;
  images: Record<string, string>;
  isPrivate?: boolean;
  sourceLanguage?: string;
  language?: string;
  sourceFile?: string;
  translationSourceSha?: string;
};
