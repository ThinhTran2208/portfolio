import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { JourneyList } from "@/components/ContentLists";

export const metadata = { title: "Journey & News | Tran Tan Thinh" };

export default function NewsPage() {
  return (
    <SiteShell>
      <header className="page-intro">
        <Link className="back-link" href="/#journey">
          ← Home / Journey
        </Link>
        <h1>Journey &amp; News</h1>
        <p className="muted">
          Education, projects, and learning milestones, most recent first.
        </p>
      </header>
      <JourneyList />
    </SiteShell>
  );
}
