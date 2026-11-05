import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { createReadmeUrlTransform } from "@/lib/readme.mjs";
import snapshot from "@/content/projects/autonomous-ml-toolkit/snapshot.json";

export default function Readme({ content }: { content: string }) {
  return (
    <div className="readme">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        skipHtml
        urlTransform={createReadmeUrlTransform(snapshot)}
        components={{
          h1: ({ id, children }) => <h2 id={id}>{children}</h2>,
          h2: ({ id, children }) => <h3 id={id}>{children}</h3>,
          h3: ({ id, children }) => <h4 id={id}>{children}</h4>,
          h4: ({ id, children }) => <h5 id={id}>{children}</h5>,
          h5: ({ id, children }) => <h6 id={id}>{children}</h6>,
          table: ({ children }) => (
            <div
              className="table-scroll"
              role="region"
              aria-label="README table"
              tabIndex={0}
            >
              <table>{children}</table>
            </div>
          ),
          pre: ({ children }) => (
            <pre tabIndex={0} aria-label="Code example">
              {children}
            </pre>
          ),
          // Snapshot images keep their original aspect ratio and public local source.
          img: ({ src, alt, title }) =>
            typeof src === "string" && src ? (
              // eslint-disable-next-line @next/next/no-img-element -- Original README images have variable dimensions.
              <img src={src} alt={alt ?? ""} title={title} loading="lazy" />
            ) : null,
          a: ({ href, children }) => (
            <a
              href={href}
              {...(href?.startsWith("#")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
