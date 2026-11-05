import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { createReadmeUrlTransform } from "../src/lib/readme.mjs";

const snapshot = JSON.parse(
  await readFile(
    new URL(
      "../src/content/projects/autonomous-ml-toolkit/snapshot.json",
      import.meta.url,
    ),
    "utf8",
  ),
);
const transform = createReadmeUrlTransform(snapshot);
const readme = await readFile(
  new URL(
    "../src/content/projects/autonomous-ml-toolkit/README.md",
    import.meta.url,
  ),
);
const render = (text) =>
  renderToStaticMarkup(
    React.createElement(
      Markdown,
      {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
        skipHtml: true,
        urlTransform: transform,
      },
      text,
    ),
  );

test("snapshot bytes match the original GitHub README blob", () => {
  const hash = createHash("sha1")
    .update("blob " + readme.length + "\0")
    .update(readme)
    .digest("hex");
  assert.equal(hash, snapshot.readmeSha);
});

test("relative source links use the correct repository, branch, and fragment", () => {
  assert.equal(
    transform("docs/api.md#artifacts-and-metric-interpretation", "href"),
    "https://github.com/" +
      snapshot.repository +
      "/blob/main/docs/api.md#artifacts-and-metric-interpretation",
  );
  assert.equal(
    transform("./examples/iris.yaml", "href"),
    "https://github.com/" +
      snapshot.repository +
      "/blob/main/examples/iris.yaml",
  );
  assert.equal(
    transform("/LICENSE", "href"),
    "https://github.com/" + snapshot.repository + "/blob/main/LICENSE",
  );
  assert.equal(transform("#supported-scope", "href"), "#supported-scope");
  assert.equal(
    transform("https://example.com/paper", "href"),
    "https://example.com/paper",
  );
});

test("README headings retain working anchors; tables and code render", () => {
  const html = render(readme.toString("utf8"));
  assert.match(html, /id="supported-scope"/);
  assert.match(html, /href="#supported-scope"/);
  assert.match(html, /<table>/);
  assert.match(html, /language-powershell/);
  assert.match(html, /AI agents assisted implementation/);
});

test("all rendered README images map to nonempty local public files", async () => {
  const html = render(readme.toString("utf8"));
  for (const source of html.matchAll(/<img[^>]*src="([^"]+)"/g)) {
    assert.ok(source[1].startsWith("/projects/autonomous-ml-toolkit/"));
    const image = await readFile(
      new URL("../public" + source[1], import.meta.url),
    );
    assert.ok(image.length > 100);
  }
  assert.ok(Object.keys(snapshot.images).length > 0);
  assert.equal(transform("https://private.example/image.jpg", "src"), "");
});

test("Markdown cannot execute raw HTML or script URLs", () => {
  const html = render(
    "<script>alert(1)</script>\n\n[bad](javascript:alert%281%29)\n\n<img src=x onerror=alert(1)>\n\n[bad data](data:text/html,unsafe)",
  );
  assert.doesNotMatch(
    html,
    /<script|<img|javascript:|data:text\/html|onerror/i,
  );
});

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const fashionDir = new URL(
  "../src/content/projects/ai-fashion-assistant/",
  import.meta.url,
);
const fashionSnapshot = JSON.parse(
  await readFile(new URL("snapshot.json", fashionDir), "utf8"),
);
const vietnamese = await readFile(
  new URL(fashionSnapshot.sourceFile, fashionDir),
);
const english = await readFile(new URL("README.md", fashionDir), "utf8");
const markdownNodes = (text) => {
  const nodes = [];
  const visit = (node) => {
    nodes.push(node);
    for (const child of node.children ?? []) visit(child);
  };
  visit(unified().use(remarkParse).use(remarkGfm).parse(text));
  return nodes;
};

test("Vietnamese README is preserved exactly and translation identifies its source", () => {
  const hash = createHash("sha1")
    .update("blob " + vietnamese.length + "\0")
    .update(vietnamese)
    .digest("hex");
  assert.equal(hash, fashionSnapshot.readmeSha);
  assert.equal(fashionSnapshot.translationSourceSha, hash);
  assert.equal(fashionSnapshot.sourceLanguage, "vi");
  assert.equal(fashionSnapshot.language, "en");
});

test("complete translation preserves section structure, tables, JSON contracts, and pipeline", () => {
  const original = markdownNodes(vietnamese.toString("utf8"));
  const translated = markdownNodes(english);
  assert.deepEqual(
    translated
      .filter((node) => node.type === "heading")
      .map((node) => node.depth),
    original
      .filter((node) => node.type === "heading")
      .map((node) => node.depth),
  );
  assert.equal(
    translated.filter((node) => node.type === "table").length,
    original.filter((node) => node.type === "table").length,
  );
  const jsonBlocks = (nodes) =>
    nodes
      .filter((node) => node.type === "code" && node.lang === "json")
      .map((node) => JSON.parse(node.value));
  assert.deepEqual(jsonBlocks(translated), jsonBlocks(original));
  const pipeline = (nodes) =>
    nodes.find((node) => node.type === "code" && node.lang === "mermaid").value;
  assert.equal(pipeline(translated), pipeline(original));
  for (const value of [
    "114,806",
    "17,316",
    "363",
    "ROC-AUC",
    "Recall@200",
    "Recall@5",
    "LOO Top-1 Localization Accuracy",
    "Qwen/Qwen3-VL-4B-Instruct",
  ]) {
    assert.ok(english.includes(value), "Translation retains " + value);
  }
  assert.match(english, /have not been implemented and remain future work/);
  assert.match(english, /renders Vietnamese text using reviewed templates/);
});

test("fashion snapshot uses its own repository and renders formulas without trusting HTML", () => {
  const fashionTransform = createReadmeUrlTransform(fashionSnapshot);
  assert.equal(
    fashionTransform("docs/VLM_EXPLANATION_V1.md", "href"),
    "https://github.com/ThinhTran2208/outfit-compatibility-system/blob/main/docs/VLM_EXPLANATION_V1.md",
  );
  assert.equal(fashionTransform("#overview", "href"), "#overview");
  const html = renderToStaticMarkup(
    React.createElement(
      Markdown,
      {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeSlug, [rehypeKatex, { trust: false }]],
        skipHtml: true,
        urlTransform: fashionTransform,
      },
      english,
    ),
  );
  assert.match(html, /class="katex"/);
  assert.match(html, /id="overview"/);
  assert.match(html, /id="disclaimer"/);
  assert.match(html, /not_implemented/);
  assert.doesNotMatch(html, /katex-error|<script/i);
});
