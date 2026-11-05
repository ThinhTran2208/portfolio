import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#journey", label: "Journey" },
  { href: "/#projects", label: "Projects" },
  { href: "/#academic", label: "Academic" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark">
        Tấn Thịnh<span className="home-label"> / home</span>
      </Link>
      <nav aria-label="Main navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
