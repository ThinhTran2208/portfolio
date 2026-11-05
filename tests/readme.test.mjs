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
