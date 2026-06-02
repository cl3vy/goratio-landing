export default function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="wordmark">
        <span className="dot" />
        <span className="grad-text">Goratio</span>
      </a>
      <div className="nav-links">
        <a href="#how">How it works</a>
        <a href="#approach">Approach</a>
        <a href="#faq">FAQ</a>
      </div>
      <div className="nav-right">
        <a href="#book" className="btn btn-primary">
          Book a Data Audit
        </a>
      </div>
    </nav>
  );
}
