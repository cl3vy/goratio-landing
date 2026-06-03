export default function Proof() {
  return (
    <section id="proof">
      <div className="wrap">
        <p className="eyebrow" data-reveal="">
          The outcome
        </p>
        <h2 className="section-title" data-reveal="" data-delay="60">
          The shift you can feel within weeks.
        </h2>
        <div className="proof-toggle" data-reveal="" data-delay="120">
          <span className="proof-slide" />
          <button className="before active" data-mode="before">
            Before Ratio
          </button>
          <button className="after" data-mode="after">
            After Ratio
          </button>
        </div>
        <div className="proof-list">
          <div className="proof-row is-before">
            <span className="mk">✕</span>
            <span className="txt">AI answers contradict each other</span>
          </div>
          <div className="proof-row is-before">
            <span className="mk">✕</span>
            <span className="txt">Execs don&apos;t trust dashboards</span>
          </div>
          <div className="proof-row is-before">
            <span className="mk">✕</span>
            <span className="txt">Months to onboard a new AI tool</span>
          </div>
          <div className="proof-row is-before">
            <span className="mk">✕</span>
            <span className="txt">Knowledge trapped in one head</span>
          </div>
        </div>

        <div className="proof-tiles" data-stagger="">
          <div className="proof-tile" data-reveal="">
            <div className="stat">
              <span data-count="100" data-suffix="%">
                0
              </span>
            </div>
            <p>of in-scope metrics documented, owned, and human-verified.</p>
          </div>
          <div className="proof-tile" data-reveal="">
            <div className="stat">
              <span data-count="1">0</span>
            </div>
            <p>source of truth your AI, BI, and agents all read from.</p>
          </div>
          <div className="proof-tile" data-reveal="">
            <div className="stat">
              <span data-count="0">0</span>
            </div>
            <p>automated guesses — a human signs off on every definition.</p>
          </div>
        </div>

        <div className="pullquote" data-reveal="" data-delay="80">
          <q>
            The bar we build to: when your AI gives an exec a number, nobody
            opens a side spreadsheet to check it. That&apos;s the whole game.
          </q>
          <div className="by">
            <div className="meta">
              <b>Our promise</b>
              <span>Every number, traceable to a verified definition.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
