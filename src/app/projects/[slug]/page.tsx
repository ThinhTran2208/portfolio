import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import Readme from "@/components/Readme";
import { projects } from "@/data/projects";
import snapshot from "@/content/projects/autonomous-ml-toolkit/snapshot.json";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project ? project.title + " | Tran Tan Thinh" : "Project not found",
    description: project?.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const content = project.readme
    ? await readFile(
        path.join(
          process.cwd(),
          "src/content/projects",
          project.slug,
          "README.md",
        ),
        "utf8",
      )
    : null;

  return (
    <SiteShell>
      <header className="page-intro project-detail-header">
        <Link className="back-link" href="/works">
          ← Back to Projects
        </Link>
        <h1>{project.title}</h1>
        {project.subtitle && <p className="subtitle">{project.subtitle}</p>}
        <p>{project.description}</p>
        <p className="technologies">{project.technologies.join(" · ")}</p>
        {project.github && (
          <a
            className="small"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </header>
      {project.notes && (
        <div className="project-notes">
          {project.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      )}
      {content && (
        <>
          <div className="readme-meta">
            <span>
              Repository README · Snapshot from {snapshot.branch} ·{" "}
              {snapshot.capturedAt}
            </span>
            <span>Repository links require GitHub access.</span>
          </div>
          <Readme content={content} />
        </>
      )}
    </SiteShell>
  );
}
