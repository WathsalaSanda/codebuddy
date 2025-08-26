"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./components/themetoggle"; // 👈 ADD THIS

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
    try { localStorage.setItem("lastVisitedTab", pathname); } catch {}
  }, [pathname]);

  const linkStyle = (href: string): React.CSSProperties => ({
    padding: "0.25rem 0.5rem",
    borderBottom: pathname === href ? "2px solid #222" : "2px solid transparent",
    fontWeight: pathname === href ? 700 : 400,
  });

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#9b8cf5",
        color: "#111",
        borderBottom: "1px solid #7b6ef0",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div><strong>Student Number:</strong> 22106532</div>

      {/* RIGHT SIDE: desktop tabs + theme toggle + hamburger */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Desktop tabs */}
        <div className="desktop-links" style={{ display: "none", gap: "1rem" }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={linkStyle(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* 👇 THEME TOGGLE BUTTONS */}
        <ThemeToggle />

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="hamburger"
          style={{ fontSize: "1.5rem", background: "transparent", border: "none", cursor: "pointer" }}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      <nav
        style={{
          position: "absolute",
          top: "64px",
          right: "20px",
          background: "#fff",
          color: "#111",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "0.6rem 0.8rem",
          display: open ? "block" : "none",
        }}
      >
        {LINKS.map((l) => (
          <div key={l.href} style={{ margin: "0.35rem 0" }}>
            <Link href={l.href} onClick={() => setOpen(false)} style={linkStyle(l.href)}>
              {l.label}
            </Link>
          </div>
        ))}

       
      </nav>

      <style jsx>{`
        @media (min-width: 900px) {
          nav { display: none !important; }
          .desktop-links { display: flex !important; }
          .hamburger { display: none !important; }
        }
      `}</style>
    </header>
  );
}
