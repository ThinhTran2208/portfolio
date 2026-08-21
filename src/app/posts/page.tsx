import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function PostsPage() {
  return (
    <SiteShell>
      <Reveal>
        <section className="pageIntro minimalPageIntro">
          <h1>Posts</h1>
          <p className="muted">
            Technical notes, learning logs and occasional thoughts.
          </p>
        </section>
      </Reveal>

      <Reveal delay={80}>
        <section className="contentSection firstSection">
          <SectionHeading title="Post" />
          <div className="postList">
            <article className="postRow minimalPostRow">
              <div className="postThumb blankPostThumbnail" aria-label="Post thumbnail placeholder" />
              <div className="postMain">
                <h3>What I learned from my first serious AI project</h3>
                <p>Notes on models, mistakes, experiments and iteration.</p>
                <div className="postMeta">
                  <span>2026-08-21</span>
                  <span>◉ 128</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </Reveal>
    </SiteShell>
  );
}
