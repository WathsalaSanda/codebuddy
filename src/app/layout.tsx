import "./globals.css";
import Header from "./header"; // import client header
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
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
