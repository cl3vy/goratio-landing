export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="#top" className="wordmark">
              <span className="dot" />
              <span className="grad-text">Goratio</span>
            </a>
            <p className="tagline">
              We build the semantic layer that lets your AI understand your
              business.
            </p>
          </div>
          <div>
            <h4>Navigate</h4>
            <ul>
              <li>
                <a href="#how">How it works</a>
              </li>
              <li>
                <a href="#approach">Approach</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#book">Book a Data Audit</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">hello@goratio.com</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Goratio. All rights reserved.</span>
          <span className="built-by">
            <span className="h">◆</span> Built by humans
          </span>
        </div>
      </div>
    </footer>
  );
}
