"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

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
    // also set a data attribute if your CSS ever needs it
    root.setAttribute("data-theme", next);
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
        border: "1px solid var(--border-color)",
        background: isDark ? "var(--toggle-dark-bg)" : "var(--toggle-light-bg)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: isDark ? "flex-end" : "flex-start",
        padding: "4px",
        transition: "background 0.3s ease",
      }}
    >
      <span aria-hidden style={{ position: "absolute", left: "10px", fontSize: 14, opacity: isDark ? 0.35 : 1 }}>
        ☀
      </span>
      <span aria-hidden style={{ position: "absolute", right: "10px", fontSize: 14, opacity: isDark ? 1 : 0.35 }}>
        🌙
      </span>

      <span
        aria-hidden
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: isDark ? "#3a4050" : "#ffffff",
          border: "1px solid var(--border-color)",
          transition: "transform 0.3s ease, background 0.3s ease",
          transform: `translateX(${isDark ? "-2px" : "2px"})`,
        }}
      />
    </button>
  );
}
