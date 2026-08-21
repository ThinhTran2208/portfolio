export default function ProjectCard({
  title,
  description,
  stack,
}: {
  index?: number;
  title: string;
  description: string;
  stack: string;
  variant?: number;
}) {
  return (
    <article className="projectCard minimalProjectCard">
      <div className="projectVisual blankThumbnail" aria-label="Project thumbnail placeholder" />
      <div className="projectBody">
        <div className="projectTop">
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
        <div className="techLabel">TECH STACK</div>
        <div className="tech">{stack}</div>
      </div>
    </article>
  );
}
