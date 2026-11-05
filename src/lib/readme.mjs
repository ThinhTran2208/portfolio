import { defaultUrlTransform } from "react-markdown";

/** Resolve README links without exposing credentials or requesting private images. */
export function createReadmeUrlTransform(snapshot) {
  const base = new URL(
    "https://github.com/" +
      snapshot.repository +
      "/blob/" +
      snapshot.branch.split("/").map(encodeURIComponent).join("/") +
      "/" +
      snapshot.readmePath,
  );

  return (url, key) => {
    const safe = defaultUrlTransform(url);
    if (!safe) return "";
    if (key === "src") return snapshot.images[url] ?? "";
    if (safe.startsWith("#")) return safe;
    if (/^[a-z][a-z\d+.-]*:/i.test(safe) || safe.startsWith("//")) return safe;
    // Root-relative Markdown paths refer to the repository, not this portfolio.
    if (safe.startsWith("/")) {
      return (
        base.origin +
        "/" +
        snapshot.repository +
        "/blob/" +
        snapshot.branch.split("/").map(encodeURIComponent).join("/") +
        safe
      );
    }
    return new URL(safe, base).href;
  };
}
