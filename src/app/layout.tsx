import "./globals.css";
import Header from "./header";
import Footer from "./footer";

export const metadata = {
  title: "CodeBuddy App",
  description: "Assignment 1 - Next.js Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        {/* this grows to push footer down */}
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

