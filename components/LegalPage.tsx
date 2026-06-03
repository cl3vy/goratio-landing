import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <nav className="nav">
        <Link href="/" className="wordmark">
          <span className="dot" />
          <span className="grad-text">Ratio</span>
        </Link>
        <div className="nav-right">
          <Link href="/#book" className="btn btn-primary">
            Book a Data Audit
          </Link>
        </div>
      </nav>

      <main className="legal">
        <div className="wrap">
          <Link href="/" className="legal-back">
            ← Back to home
          </Link>
          <h1>{title}</h1>
          <p className="legal-updated">Last updated · {updated}</p>
          <div className="legal-body">{children}</div>
        </div>
      </main>

      <Footer />
    </>
  );
}
