"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/works", label: "Works" },
  { href: "/posts", label: "Posts" },
  { href: "/news", label: "News" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="siteHeader greenHeader">
      <div className="siteHeaderInner minimalHeader">
        <Link href="/" className="headerName" aria-label="Home">
          Tran Tan Thinh
        </Link>

        <nav className="navLinks decoratedNav" aria-label="Main navigation">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "navLink active" : "navLink"}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
