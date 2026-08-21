import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const groups = [
  {
    label: "01/08/2026 — 01/09/2026",
    items: [
      "Started the project “Outfit Style Evaluation and Recommendation Using CLIP and Vision LLMs on FastAPI Web Application”.",
    ],
  },
  {
    label: "01/07/2026 — 01/09/2026",
    items: [
      "Joined the Machine Learning course at HCMUT EE Machine Learning & IoT Lab.",
    ],
  },
  {
    label: "01/09/2025 — 01/06/2026",
    items: [
      "Started studying Computer Vision at HCMUT.",
      "Achieved a 4.0 GPA in both semesters.",
    ],
  },
];

export default function NewsPage() {
  return (
    <SiteShell>
      <Reveal>
        <section className="pageIntro minimalPageIntro">
          <h1>News</h1>
          <p className="muted">
            A lightweight log of milestones, updates and recent activity.
          </p>
        </section>
      </Reveal>

      <Reveal delay={80}>
        <section className="contentSection firstSection">
          <SectionHeading title="News" />
          <div className="newsList">
            {groups.map((group) => (
              <div className="newsGroup" key={group.label}>
                <div className="newsDate">
                  <strong>{group.label}</strong>
                </div>
                <div className="newsItems">
                  {group.items.map((item) => (
                    <div className="newsItem" key={item}>
                      <span className="newsNode" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </SiteShell>
  );
}
