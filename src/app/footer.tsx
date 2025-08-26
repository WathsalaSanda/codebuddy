export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "2rem",
        padding: "1rem 2rem",
        background: "#998bf5ff",
        borderTop: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}
    >
      <span>© 2025 | Wathsala Sandamali Galle Arachchige</span>
      <span>Student Number: 22106532</span>
      <span>{new Date().toLocaleDateString()}</span>
    </footer>
  );
}
