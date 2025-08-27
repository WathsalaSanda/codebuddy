export default function AboutPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>About This Project</h1>
      <br />

      <p>
        <strong>Name:</strong> Wathsala Sandamali Galle Arachchige
      </p>
      <p>
        <strong>Student Number:</strong> 22106532
      </p>

      <div style={{ marginTop: "2rem" }}>
        {/* Left-aligned heading */}
        <h2 style={{ textAlign: "left", marginBottom: "1rem" }}>Demo Video</h2>

        {/* Video player */}
        <video
          src="/demo.mp4"
          controls
          width="600"
          style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </main>
  );
}
