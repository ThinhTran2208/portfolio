import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
    </footer>
  );
}
