import Image from "next/image";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>GitHub Automation Tool</h1>

      <form style={{ display: "flex", flexDirection: "column", maxWidth: "400px", gap: "1rem" }}>
        <input type="text" placeholder="GitHub Username" required />
        <input type="password" placeholder="Token" required />
        <input type="text" placeholder="Owner" required />
        <input type="text" placeholder="Repo" required />
        <button type="submit">Execute Git Command</button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        <p>Output will be shown here...</p>
      </div>
    </main>
  );
}
