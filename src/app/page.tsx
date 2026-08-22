import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { newsEntries } from "@/data/news";

export default function Home() {
  const highlightedProject = projects[0];
  const recentNews = newsEntries.slice(0, 2);

  return (
    <SiteShell>
      <Reveal>
        <section className="hero">
          <div className="heroVisual minimalHero">
            <div className="heroGrid" />

            <div className="heroLeft minimalHeroCopy">
              <h1 className="heroTitle">
                BUILD
                <span>LEARN</span>
                CREATE
              </h1>
            </div>

            <div className="heroRight minimalHeroRight">
              <div className="heroOrbital heroPhotoOrbital">
                <div className="orbit orbitA" />
                <div className="orbit orbitB" />
                <div className="orbit orbitC" />
                <div className="heroCirclePhoto">
                  <Image
                    src="/01.jpg"
                    alt="Portfolio photo"
                    fill
                    priority
                    className="heroCircleImage"
                    sizes="160px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={80}>
        <section className="profile minimalProfile">
          <div className="profileCopy">
            <h1>Tấn Thịnh</h1>
            <p className="lead">
              Computer Science Student · AI · Machine Learning · Computer Vision
            </p>
            <p className="muted">
              I&apos;m a Computer Science student interested in understanding how
              intelligent systems work and turning ideas into useful software products.
              This is placeholder content and will be replaced later.
            </p>
          </div>

          <div className="avatarWrap">
            <div className="avatarPlaceholder avatarPhotoFrame">
              <Image
                src="/02.jpg"
                alt="Profile photo"
                fill
                className="avatarPhoto"
                sizes="142px"
              />
            </div>
            <div className="avatarScan" />
          </div>
        </section>
      </Reveal>

      {highlightedProject && (
        <Reveal delay={80}>
          <section className="contentSection homeWorksSection">
            <SectionHeading
              title="Selected Project"
              copy="My highlighted projects."
            />
            <div className="projectGrid singleCardGrid">
              <ProjectCard
                title={highlightedProject.title}
                description={highlightedProject.description}
                stack={highlightedProject.stack}
              />
            </div>
            <Link className="textLink" href="/works">
              <span>View work</span>
              <b>↗</b>
            </Link>
          </section>
        </Reveal>
      )}

      <Reveal delay={80}>
        <section className="contentSection homeTimelineSection">
          <SectionHeading
            title="Timeline"
            copy="My recent updates from News."
          />

          <div className="timeline">
            <div className="timelineTrack" />
            {recentNews.map((entry) => (
              <div className="timelineItem" key={entry.period}>
                <div className="timelineYear">
                  {entry.period.split(" — ")[0].slice(3)}
                </div>
                <div className="timelineNode" />
                <div className="timelineContent">
                  <strong>{entry.title}</strong>
                  {entry.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={80}>
        <section className="contentSection contactPanel minimalContact">
          <div className="reachBlock">
            <h2>Reach me through</h2>

            <div className="contactLinks socialContactLinks">
              <a href="mailto:abcthinh2208@gmail.com" className="contactChip">
                <span className="contactIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 5.5h18v13H3z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <span>
                  <small>Email</small>
                  abcthinh2208@gmail.com
                </span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61580501352874"
                target="_blank"
                rel="noreferrer"
                className="contactChip"
              >
                <span className="contactIcon facebookIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M13.7 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5H17V4a22 22 0 0 0-2.4-.1c-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8z" />
                  </svg>
                </span>
                <span>
                  <small>Facebook</small>
                  facebook.com/profile
                </span>
              </a>

              <a
                href="https://github.com/ThinhTran2208"
                target="_blank"
                rel="noreferrer"
                className="contactChip"
              >
                <span className="contactIcon githubIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5A3.9 3.9 0 0 1 7 8.1a3.6 3.6 0 0 1 .1-2.7s.8-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5z" />
                  </svg>
                </span>
                <span>
                  <small>GitHub</small>
                  ThinhTran2208
                </span>
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </SiteShell>
  );
}
