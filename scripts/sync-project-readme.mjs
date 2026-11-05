import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repository = "ThinhTran2208/autonomous-ml-toolkit";
const args = process.argv.slice(2);
const sourceIndex = args.indexOf("--source");
const refIndex = args.indexOf("--ref");
const source = sourceIndex >= 0 ? args[sourceIndex + 1] : null;
const ref = refIndex >= 0 ? args[refIndex + 1] : "main";

if (!source || source.startsWith("--") || !ref || ref.startsWith("-")) {
  console.error(
    'Usage: npm run sync:readme -- --source "C:/path/to/autonomous-ml-toolkit" [--ref main]',
  );
  process.exit(1);
}

function git(...gitArgs) {
  return execFileSync("git", ["-C", path.resolve(source), ...gitArgs], {
    maxBuffer: 25 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

try {
  // Read a single immutable Git revision. Never change the source checkout.
  const commit = git("rev-parse", "--verify", ref + "^{commit}")
    .toString()
    .trim();
  const markdown = git("show", commit + ":README.md");
  const readmeSha = git("rev-parse", commit + ":README.md")
    .toString()
    .trim();
  const tree = unified().use(remarkParse).parse(markdown.toString("utf8"));
  const nodes = [];
  function walk(node) {
    nodes.push(node);
    for (const child of node.children ?? []) walk(child);
  }
  walk(tree);
  const definitions = new Map(
    nodes
      .filter((node) => node.type === "definition")
      .map((node) => [node.identifier, node.url]),
  );
  const imageUrls = new Set(
    nodes.flatMap((node) => {
      if (node.type === "image") return [node.url];
      if (node.type === "imageReference" && definitions.has(node.identifier))
        return [definitions.get(node.identifier)];
      return [];
    }),
  );
  const images = {};
  const assets = [];

  for (const url of imageUrls) {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url)) {
      throw new Error(
        "Remote README images must first be saved into the source repository; no private remote image is left in the snapshot.",
      );
    }
    const repoPath = decodeURIComponent(
      new URL(url, "https://snapshot.invalid/README.md").pathname,
    ).replace(/^\//, "");
    const extension = path.extname(repoPath).toLowerCase();
    if (
      ![".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"].includes(
        extension,
      )
    ) {
      throw new Error("Unsupported README image extension: " + extension);
    }
    const bytes = git("show", commit + ":" + repoPath);
    const filename =
      createHash("sha256").update(bytes).digest("hex").slice(0, 16) + extension;
    images[url] = "/projects/autonomous-ml-toolkit/" + filename;
    assets.push({ filename, bytes });
  }

  // Finish all source reads before replacing the working snapshot.
  const contentDir = path.join(
    root,
    "src/content/projects/autonomous-ml-toolkit",
  );
  const assetDir = path.join(root, "public/projects/autonomous-ml-toolkit");
  await mkdir(contentDir, { recursive: true });
  await mkdir(assetDir, { recursive: true });
  for (const asset of assets)
    await writeFile(path.join(assetDir, asset.filename), asset.bytes);
  await writeFile(path.join(contentDir, "README.md"), markdown);
  await writeFile(
    path.join(contentDir, "snapshot.json"),
    JSON.stringify(
      {
        repository,
        branch: ref,
        readmePath: "README.md",
        readmeSha,
        commit,
        capturedAt: new Date().toISOString().slice(0, 10),
        images,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    "Updated README and " +
      assets.length +
      " local image(s) from " +
      repository +
      " at " +
      commit.slice(0, 12) +
      ".",
  );
} catch (error) {
  console.error(
    "README update failed. Check the source checkout, ref, and tracked image files.",
  );
  console.error(
    error instanceof Error ? error.message.split("\n")[0] : String(error),
  );
  process.exitCode = 1;
}
