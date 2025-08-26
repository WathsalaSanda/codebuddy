"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#998bf5ff",
        borderBottom: "1px solid #ddd",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div><strong>Student Number:</strong> 22106532</div>

      {/* Hamburger button (mobile) */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        style={{
          fontSize: "1.5rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        className="hamburger"
      >
        ☰
      </button>

      {/* Dropdown menu (mobile) */}
      <nav
        style={{
          position: "absolute",
          top: "64px",
          right: "20px",
          background: "#998bf5ff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "0.75rem 1rem",
          display: open ? "block" : "none",
        }}
      >
        <div style={{ margin: "0.5rem 0" }}><Link href="/">Home</Link></div>
        <div style={{ margin: "0.5rem 0" }}><Link href="/about">About</Link></div>
      </nav>

      {/* Desktop links */}
      <div className="desktop-links" style={{ display: "none", gap: "1rem" }}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          nav { display: none !important; }
          .desktop-links { display: flex !important; }
          .hamburger { display: none !important; }
        }
      `}</style>
    </header>
  );
}
