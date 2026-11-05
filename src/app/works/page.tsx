import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = { title: "Projects | Tran Tan Thinh" };

export default function WorksPage() {
  return (
    <SiteShell>
      <header className="page-intro">
        <Link className="back-link" href="/#projects">
          ← Home / Projects
        </Link>
        <h1>Projects</h1>
        <p className="muted">
          Software projects and explorations in AI and machine learning.
        </p>
      </header>
      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SiteShell>
  );
}
