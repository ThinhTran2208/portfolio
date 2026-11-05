import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { WritingList } from "@/components/ContentLists";

export const metadata = { title: "Writing & Notes | Tran Tan Thinh" };

export default function PostsPage() {
  return (
    <SiteShell>
      <header className="page-intro">
        <Link className="back-link" href="/#writing">
          ← Home / Writing
        </Link>
        <h1>Writing &amp; Notes</h1>
        <p className="muted">
          Technical articles, learning notes, and paper notes.
        </p>
      </header>
      <WritingList />
    </SiteShell>
  );
}
