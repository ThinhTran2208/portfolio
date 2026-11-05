import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={"project-row" + (project.image ? " has-image" : "")}>
      {project.image && (
        <Link
          className="project-image"
          href={"/projects/" + project.slug}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={project.image.src}
            alt=""
            width={project.image.width ?? 300}
            height={project.image.height ?? 180}
            sizes="(max-width: 600px) 160px, 148px"
          />
        </Link>
      )}
      <div>
        <h3>
          <Link href={"/projects/" + project.slug}>{project.title}</Link>
        </h3>
        {project.subtitle && (
          <p className="project-subtitle">{project.subtitle}</p>
        )}
        <p>{project.description}</p>
        <p className="technologies">{project.technologies.join(" · ")}</p>
        <div className="inline-links">
          <Link href={"/projects/" + project.slug}>
            Project details <span aria-hidden="true">→</span>
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={project.title + " on GitHub (opens in a new tab)"}
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
