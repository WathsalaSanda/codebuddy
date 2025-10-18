"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [command, setCommand] = useState("git status");
  const [busy, setBusy] = useState(false);
  const [output, setOutput] = useState("Output will be shown here...");

  // Ensure theme class is applied on first load (matches ThemeToggle)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(saved);
    }
  }, []);

  // Simulated "git" outputs (no backend route, no shell)
  function simulateGitCommand(cmd: string, user: string): string {
    const u = user || "anonymous";
    const c = cmd.trim().toLowerCase();

    if (c === "git status") {
      return `On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean`;
    }
    if (c.startsWith("git commit")) {
      return `[main 1a2b3c4] Commit by ${u}
 1 file changed, 2 insertions(+)`;
    }
    if (c === "git push") {
      return `Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Pushing as ${u}...
Done.`;
    }
    if (c.startsWith("git config --global user.name")) {
      return `Updated global user.name to "${u}" (simulated)`;
    }
    return `⚠ Unknown command: "${cmd}"
Try: git status, git commit -m "msg", git push, or git config --global user.name`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setOutput("Running simulated command…");

    // Small delay for UX
    setTimeout(() => {
      const simulated = simulateGitCommand(command, username);
      setOutput(`$ ${command}\n\n${simulated}`);
      setBusy(false);
    }, 800);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.6rem",
    border: "1px solid var(--border-color)",
    borderRadius: 6,
    background: "var(--input-bg)",
    color: "var(--text-color)",
  };

  return (
    <main style={{ padding: "2rem", maxWidth: 720, margin: "0 auto" }}>
      <h1>CodeBuddy Git Command Simulator</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}
        aria-describedby="form-help"
      >
        <div>
          <label htmlFor="username" style={{ fontWeight: 600 }}>
            GitHub Username
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="command" style={{ fontWeight: 600 }}>
            Git Command
          </label>
          <input
            id="command"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder='e.g., git status or git commit -m "msg"'
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          aria-label="Execute Git Command"
          className="btn"
        >
          {busy ? "Executing…" : "Execute Git Command"}
        </button>

        <small id="form-help">
          This is a safe **simulation** for teaching/demo purposes (no shell
          commands; no GitHub writes). Enter 3 different commands to demonstrate
          multiple outputs as per rubric.
        </small>
      </form>

      <pre className="output-box">{output}</pre>
    </main>
  );
}
