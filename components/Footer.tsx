import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/#top" className="wordmark">
              <span className="dot" />
              <span className="grad-text">Ratio</span>
            </Link>
            <p className="tagline">
              We build the semantic layer that lets your AI understand your
              business.
            </p>
          </div>
          <div>
            <h4>Navigate</h4>
            <ul>
              <li>
                <Link href="/#how">How it works</Link>
              </li>
              <li>
                <Link href="/#approach">Approach</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
              <li>
                <Link href="/#book">Book a Data Audit</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="mailto:hello@ratio.com">hello@ratio.com</a>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/security">Security</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ratio. All rights reserved.</span>
          <span className="built-by">
            <span className="h">◆</span> Built by humans
          </span>
        </div>
      </div>
    </footer>
  );
}
