"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme or fallback to system
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      apply(saved);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    apply(prefersDark ? "dark" : "light");
  }, []);

  function apply(next: "light" | "dark") {
    setIsDark(next === "dark");
    localStorage.setItem("theme", next);
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
  }

  function toggle() {
    apply(isDark ? "light" : "dark");
  }

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "relative",
        width: "70px",
        height: "32px",
        borderRadius: "9999px",
        border: "1px solid #aaa",
        background: isDark ? "#1f2430" : "#f5f5f5",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: isDark ? "flex-end" : "flex-start",
        padding: "4px",
        transition: "background 0.3s ease",
      }}
    >
      {/* Track icons */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "10px",
          fontSize: "14px",
          opacity: isDark ? 0.3 : 1,
        }}
      >
        ☀
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "10px",
          fontSize: "14px",
          opacity: isDark ? 1 : 0.3,
        }}
      >
        🌙
      </span>

      {/* Thumb */}
      <span
        aria-hidden
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: isDark ? "#3a4050" : "#ffffff",
          border: "1px solid #aaa",
          transition: "transform 0.3s ease, background 0.3s ease",
          transform: `translateX(${isDark ? "-2px" : "2px"})`,
        }}
      />
    </button>
  );
}
