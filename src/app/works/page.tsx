import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export default function WorksPage() {
  return (
    <SiteShell>
      <Reveal>
        <section className="pageIntro minimalPageIntro">
          <h1>Works</h1>
          <p className="muted">
            Selected projects, experiments and things I am currently building.
          </p>
        </section>
      </Reveal>

      <Reveal delay={80}>
        <section className="contentSection firstSection">
          <SectionHeading title="Project" />
          <div className="projectGrid singleCardGrid">
            <ProjectCard
              title="AI Fashion Assistant"
              description="A visual AI experiment for outfit understanding and recommendation."
              stack="Python · PyTorch · CLIP"
            />
          </div>
        </section>
      </Reveal>
    </SiteShell>
  );
}
