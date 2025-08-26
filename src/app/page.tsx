"use client";

import { useState } from "react";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [output, setOutput] = useState("Output will be shown here...");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop page reload
    // Simulate a git command and echo back the inputs
    setOutput(
      [
        "✔ Simulated: Executed Git command to update README.md",
        `• Username: ${username || "(empty)"}`,
        `• Token: ${token ? "••••••••" : "(empty)"}`,
        `• Owner: ${owner || "(empty)"}`,
        `• Repo: ${repo || "(empty)"}`
      ].join("\n")
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: 720 }}>
      <h1>GitHub Automation Tool</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "0.9rem", marginTop: "1rem" }}
      >
        <div>
          <label htmlFor="username" style={{ fontWeight: 600 }}>GitHub Username</label><br />
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", border: "1px solid #ccc", borderRadius: 4 }}
          />
        </div>

        <div>
          <label htmlFor="token" style={{ fontWeight: 600 }}>Token</label><br />
          <input
            id="token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", border: "1px solid #ccc", borderRadius: 4 }}
          />
        </div>

        <div>
          <label htmlFor="owner" style={{ fontWeight: 600 }}>Owner</label><br />
          <input
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", border: "1px solid #ccc", borderRadius: 4 }}
          />
        </div>

        <div>
          <label htmlFor="repo" style={{ fontWeight: 600 }}>Repo</label><br />
          <input
            id="repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            style={{ width: "100%", padding: "0.6rem", border: "1px solid #ccc", borderRadius: 4 }}
          />
        </div>

        {/* The button you want */}
        <button
          type="submit"
          style={{
            justifySelf: "start",
            padding: "0.65rem 1.1rem",
            fontWeight: 700,
            background: "#9b8cf5",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
          aria-label="Execute Git Command"
        >
          Execute Git Command
        </button>
      </form>

      {/* Output area */}
      <pre
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "1rem",
          padding: "0.9rem",
          border: "1px solid #ddd",
          borderRadius: 6,
          background: "#fafafa",
        }}
      >
        {output}
      </pre>
    </main>
  );
}

