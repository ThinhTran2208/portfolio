import Image from "next/image";
import Link from "next/link";
import { journeyEntries } from "@/data/news";
import { publishedWriting } from "@/data/writing";
import { publications, awards } from "@/data/academic";
import { profile } from "@/data/profile";

export function ContactLinks() {
  return (
    <div className="inline-links contact-links">
      {[...profile.links, ...(profile.cv ? [profile.cv] : [])].map((link) => (
        <a
          key={link.href}
          href={link.href}
          {...(link.href.startsWith("https:")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function JourneyList() {
  return (
    <ol className="journey-list">
      {journeyEntries.map((entry) => (
        <li
          className={"dated-row journey-row" + (entry.image ? " has-logo" : "")}
          key={entry.startDate + entry.title}
        >
          <div className="date-label journey-date" title={entry.period}>
            {entry.dateLabel}
          </div>
          {entry.image && (
            <div className="journey-logo">
              <Image
                src={entry.image.src}
                alt={entry.image.alt}
                width={64}
                height={64}
                sizes="(max-width: 600px) 48px, 64px"
              />
            </div>
          )}
          <div className="journey-content">
            <h3>
              {entry.href ? (
                <Link href={entry.href}>{entry.title}</Link>
              ) : (
                entry.title
              )}
            </h3>
            {entry.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function AcademicList() {
  return (
    <div className="academic-groups">
      <div>
        <h3>Publications</h3>
        {publications.length ? (
          <ul className="plain-list">
            {publications.map((item) => (
              <li key={item.title + item.year}>
                <h4>{item.title}</h4>
                <p>{item.authors.join(", ")}</p>
                <p className="muted">
                  {item.venue} · {item.year} · {item.status}
                </p>
                <div className="inline-links">
                  {item.paperUrl && <a href={item.paperUrl}>Paper</a>}
                  {item.codeUrl && <a href={item.codeUrl}>Code</a>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No publications to list yet.</p>
        )}
      </div>
      <div>
        <h3>Awards &amp; Honors</h3>
        {awards.length ? (
          <ul className="plain-list">
            {awards.map((item) => (
              <li key={item.title + item.year}>
                <h4>
                  {item.url ? <a href={item.url}>{item.title}</a> : item.title}
                </h4>
                <p className="muted">
                  {item.organization} · {item.year}
                </p>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No awards or honors to list yet.</p>
        )}
      </div>
    </div>
  );
}

export function WritingList() {
  return publishedWriting.length ? (
    <ul className="writing-list">
      {publishedWriting.map((item) => (
        <li className="dated-row" key={item.title}>
          <time className="date-label" dateTime={item.date}>
            {new Date(item.date + "T00:00:00Z").toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            })}
          </time>
          <div>
            <h3>
              {item.href ? <a href={item.href}>{item.title}</a> : item.title}
            </h3>
            <p>{item.description}</p>
            <p className="muted small">{item.kind}</p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="empty-state">
      No published writing yet. Technical articles, learning notes, and paper
      notes will appear here.
    </p>
  );
}

export function ActivityImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      className="activity-image"
      src={src}
      alt={alt}
      width={560}
      height={350}
    />
  );
}
