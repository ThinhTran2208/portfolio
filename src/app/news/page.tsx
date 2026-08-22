import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { newsEntries } from "@/data/news";

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
            {newsEntries.map((entry) => (
              <div className="newsGroup" key={entry.period}>
                <div className="newsDate">
                  <strong>{entry.period}</strong>
                </div>
                <div className="newsItems">
                  {entry.details.map((detail) => (
                    <div className="newsItem" key={detail}>
                      <span className="newsNode" />
                      <p>{detail}</p>
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
