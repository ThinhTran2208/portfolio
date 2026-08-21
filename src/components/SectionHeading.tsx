export default function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="sectionHeading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
      </div>
      {copy && <p className="sectionCopy">{copy}</p>}
      <div className="headingRule">
        <span />
      </div>
    </div>
  );
}
