"use client";

import { useState } from "react";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(""); // kept for UI, not used in this demo
  const [owner, setOwner] = useState(""); // kept for UI, not used in this demo
  const [repo, setRepo] = useState("");   // kept for UI, not used in this demo

  const [busy, setBusy] = useState(false);
  const [output, setOutput] = useState("Output will be shown here...");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setOutput("Running…");

    try {
      const res = await fetch("/api/set-git-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || "Request failed");
      setOutput(`✔ ${data.message}`);
    } catch (err: any) {
      setOutput(`✖ ${err?.message || "Failed to run command"}`);
    } finally {
      setBusy(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.6rem",
    border: "1px solid #ccc",
    borderRadius: 4,
  };

  return (
    <main style={{ padding: "2rem", maxWidth: 720 }}>
      <h1>GitHub Automation Tool</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "0.9rem", marginTop: "1rem" }}
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
          <label htmlFor="token" style={{ fontWeight: 600 }}>
            Token 
          </label>
          <input
            id="token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="owner" style={{ fontWeight: 600 }}>
            Owner
          </label>
          <input
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="repo" style={{ fontWeight: 600 }}>
            Repo
          </label>
          <input
            id="repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          aria-label="Execute Git Command"
          style={{
            justifySelf: "start",
            padding: "0.65rem 1.1rem",
            fontWeight: 700,
            background: busy ? "#a9a2f9" : "#6f63f6",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: busy ? "not-allowed" : "pointer",
          }}
        >
          {busy ? "Executing…" : "Execute Git Command"}
        </button>

        <small id="form-help">
          This demo sends your username to a server API which runs{" "}
          <code>git config --global user.name</code> and returns the result.
        </small>
      </form>

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
