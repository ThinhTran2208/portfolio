import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import ProjectCard from "@/components/ProjectCard";
import {
  AcademicList,
  ActivityImage,
  ContactLinks,
  JourneyList,
  WritingList,
} from "@/components/ContentLists";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { experiments, personalActivities } from "@/data/personal";

export default function Home() {
  return (
    <SiteShell>
      <section
        className="introduction"
        id="introduction"
        aria-labelledby="intro-heading"
      >
        <Image
          className="portrait"
          src={profile.portrait}
          alt="Portrait of Tran Tan Thinh"
          width={190}
          height={210}
          sizes="(max-width: 600px) 128px, 190px"
          preload
        />
        <div>
          <p className="eyebrow">Computer Science · HCMUT</p>
          <h1 id="intro-heading">{profile.name}</h1>
          <p className="native-name" lang="vi">
            {profile.nativeName}
          </p>
          <p className="intro-copy">
            I&apos;m a Computer Science student at HCMUT, interested in AI,
            Machine Learning, and Computer Vision.
          </p>
          <ContactLinks />
        </div>
      </section>
      <section
        className="content-section"
        id="journey"
        aria-labelledby="journey-heading"
      >
        <div className="section-heading">
          <h2 id="journey-heading">Journey</h2>
          <Link href="/news">
            All updates <span aria-hidden="true">→</span>
          </Link>
        </div>
        <JourneyList />
      </section>
      <section
        className="content-section"
        id="projects"
        aria-labelledby="projects-heading"
      >
        <div className="section-heading">
          <h2 id="projects-heading">Selected Projects</h2>
          <Link href="/works">
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <section
        className="content-section"
        id="academic"
        aria-labelledby="academic-heading"
      >
        <h2 id="academic-heading">Academic Achievements</h2>
        <AcademicList />
      </section>
      <section
        className="content-section"
        id="writing"
        aria-labelledby="writing-heading"
      >
        <div className="section-heading">
          <h2 id="writing-heading">Writing &amp; Notes</h2>
          <Link href="/posts">
            All writing <span aria-hidden="true">→</span>
          </Link>
        </div>
        <WritingList />
      </section>
      {experiments.length > 0 && (
        <section
          className="content-section"
          id="experiments"
          aria-labelledby="experiments-heading"
        >
          <h2 id="experiments-heading">Experiments</h2>
          <ul className="plain-list">
            {experiments.map((item) => (
              <li key={item.href}>
                <h3>
                  <a href={item.href}>{item.title}</a>
                </h3>
                <p>{item.description}</p>
                <p className="muted small">{item.kind}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {personalActivities.length > 0 && (
        <section
          className="content-section"
          id="beyond-code"
          aria-labelledby="beyond-heading"
        >
          <h2 id="beyond-heading">Beyond Code</h2>
          <ul className="plain-list">
            {personalActivities.map((item) => (
              <li key={item.title}>
                <h3>
                  {item.href ? (
                    <a href={item.href}>{item.title}</a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p>{item.description}</p>
                {item.image && <ActivityImage {...item.image} />}
              </li>
            ))}
          </ul>
        </section>
      )}
      <section
        className="content-section contact-section"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading">Contact</h2>
        <p>
          You can reach me at{" "}
          <a href={"mailto:" + profile.email}>{profile.email}</a>.
        </p>
        <ContactLinks />
      </section>
    </SiteShell>
  );
}
