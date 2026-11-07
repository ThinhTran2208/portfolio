# Tran Tan Thinh — Portfolio

A content-focused Next.js portfolio, with a personal introduction, dated journey,
selected projects, academic records, and contact links. The design takes
inspiration from [Andrej Karpathy's site](https://karpathy.ai/).

## Local development

```sh
npm install
npm run dev
```

## Checks

```sh
npm run lint
npm test
npm run build
```

The focused tests verify the original README Git blob hash, Markdown anchors and
tables, relative GitHub links, public snapshot images, and rejection of raw HTML
and script URLs.

## Edit personal content

- `src/data/profile.ts`: name, email, portrait, social links, and optional real CV.
- `src/data/news.ts`: education and learning milestones. Dates are recorded facts;
  their end dates do not determine completion status.
- `src/data/projects.ts`: projects in display order, technology lists, actual
  repository links, and README snapshot metadata. Each slug gets a same-tab detail route.
- `src/data/academic.ts`: verified publications, awards, and certificates. Publication
  records include authors, venue, year, explicit publication status, and optional links.
  Award years are optional when unspecified. Certificate records include issuer,
  completion date, a personal caption, and the original certificate image.
- `src/data/writing.ts`: articles and notes. Only `status: "published"` appears
  on `/posts`; the homepage omits the empty Writing & Notes section. The old sample
  article is retained as `placeholder`, without fake views.
- `src/data/personal.ts`: real experiments, notebooks, demos, and personal activities.
  Experiments and Beyond Code stay hidden while their arrays are empty.

The introduction uses the supplied portrait at `public/profile-closeup.jpg`. The existing
group photograph at `public/02.jpg` is preserved without assigning identities
or claiming a specific event. The Fashion Outfit Compatibility System thumbnail
uses the supplied team photo at `public/projects/ai-fashion-assistant/team-presentation.jpg`.
No CV, publication, award, or hobby is fabricated.

## Routes

- `/`: the complete portfolio, with section anchors.
- `/works`, `/posts`, `/news`: retained project, writing, and journey archives.
- `/projects/autonomous-ml-toolkit`: original README, public local images, and
  separate GitHub link.
- `/projects/ai-fashion-assistant`: Fashion Outfit Compatibility System, with the
  English translation of its Vietnamese repository README. The existing URL is retained.

Light mode is the default. The color-theme button preserves an explicit choice in
browser storage; both themes use the same layout. Skip navigation, visible keyboard
focus, and keyboard-scrollable code/table regions support keyboard use.
Academic award and certificate thumbnails open an image preview on the same page.
The preview supports Escape, a close button, backdrop dismissal, and native dialog
focus handling. The Kaggle Python certificate is stored in `public/academic/`.

## README snapshot

The original private-repository README is saved verbatim in
`src/content/projects/autonomous-ml-toolkit/README.md`. Its source repository,
branch, capture date, original Git blob SHA, and local image mapping are recorded
in the adjacent `snapshot.json`. The initial snapshot was retrieved through the
authenticated GitHub connector on 2026-11-05.

Images are stored under `public/projects/autonomous-ml-toolkit/` and served from
this site. The browser and production build never authenticate to GitHub or fetch
the private README. The complete README includes the source's AI-assistance
disclosure and its limits on interpreting toy-dataset scores.

Relative document/source links resolve to the recorded GitHub branch. Those
external repository links still require GitHub access while the repository is
private. README headings use GitHub-style IDs and in-document anchors remain local.
Raw HTML is skipped; Markdown is parsed as content and never executed as MDX.

### Refresh from a local repository checkout

First update your authenticated local checkout of autonomous-ml-toolkit using
your normal Git workflow. Then, from this portfolio:

```powershell
npm run sync:readme -- --source "C:/path/to/autonomous-ml-toolkit" --ref main
npm test
npm run lint
npm run build
```

The command reads README.md and referenced Markdown images from one Git revision;
it does not change either repository's branches, commits, visibility, or remotes.
It saves image bytes locally and updates the manifest, capture date, and blob SHA.
All source reads finish before the current snapshot is replaced. Existing assets
are retained to avoid breaking old links. No access token is required in this
portfolio; use your already authenticated source checkout.

The updater supports inline and reference-style Markdown images tracked in the
source repository. If a future README uses remote images, it stops with an
explanation; save those images into the source repository before refreshing.
After any update, review the diff and the detail page before publishing.

### Fashion project translation

`src/content/projects/ai-fashion-assistant/README.md` is the complete English
translation of the README from `ThinhTran2208/outfit-compatibility-system` on
`main`. The unmodified Vietnamese source is retained in `README.vi.md`, and
`snapshot.json` records its Git blob SHA and the source SHA used for translation.
The page identifies the translation and links to the original Vietnamese README.

The source README currently has no image assets. Its tables, JSON examples,
pipeline Mermaid source, and mathematical definitions are retained; formulas
render with KaTeX. The translation preserves the distinction between the current
scorer/LOO/VLM delivery and the unimplemented replacement recommendation stage.
It also preserves the fact that the system itself renders Vietnamese explanations.

To refresh this translation, retrieve the latest README from the recorded source
branch, save its exact bytes as `README.vi.md`, translate the complete document
into `README.md`, and update `readmeSha`, `translationSourceSha`, and `capturedAt`
in its manifest together. Review both documents and run the checks above. The
`sync:readme` command remains specific to the English autonomous-ml-toolkit snapshot;
it does not overwrite the fashion translation or modify the upstream repository.
