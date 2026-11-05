import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <nav aria-label="Archives">
        <Link href="/works">Works</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/news">News</Link>
      </nav>
    </footer>
  );
}
