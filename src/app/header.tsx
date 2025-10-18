"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./components/themetoggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/themes", label: "Themes" },
  { href: "/docker", label: "Docker" },
  { href: "/prisma-sequelize", label: "Prisma/Sequelize" },
  { href: "/tests", label: "Tests" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      localStorage.setItem("lastVisitedTab", pathname);
    } catch {}
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="site-header">
      <div>
        <strong>Student Number:</strong> 22106532
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Desktop links */}
        <nav className="desktop-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`menu-item ${isActive(l.href) ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="hamburger"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      <nav
        id="mobile-menu"
        className="mobile-menu"
        style={{ display: open ? "block" : "none" }}
        aria-label="Mobile"
      >
        {LINKS.map((l) => (
          <div key={l.href} style={{ margin: "0.35rem 0" }}>
            <Link
              href={l.href}
              className={`menu-item ${isActive(l.href) ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          </div>
        ))}
      </nav>

      <style jsx>{`
        @media (min-width: 900px) {
          .mobile-menu {
            display: none !important;
          }
          .desktop-links {
            display: flex !important;
            gap: 1rem;
          }
          .hamburger {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
