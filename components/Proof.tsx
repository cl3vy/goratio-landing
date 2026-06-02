const citeStyle = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  color: "var(--muted-2)",
  marginTop: "8px",
} as const;

export default function Proof() {
  return (
    <section id="proof">
      <div className="wrap">
        <p className="eyebrow" data-reveal="">
          Proof &amp; results
        </p>
        <h2 className="section-title" data-reveal="" data-delay="60">
          The shift you can feel within weeks.
        </h2>
        <div className="proof-toggle" data-reveal="" data-delay="120">
          <span className="proof-slide" />
          <button className="before active" data-mode="before">
            Before Goratio
          </button>
          <button className="after" data-mode="after">
            After Goratio
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
              <span data-count="3" data-suffix="×">
                0
              </span>
            </div>
            <p>
              faster AI tool onboarding <cite style={citeStyle}>[FILL]</cite>
            </p>
          </div>
          <div className="proof-tile" data-reveal="">
            <div className="stat">
              <span data-count="92" data-suffix="%">
                0
              </span>
            </div>
            <p>
              of metrics with a named owner{" "}
              <cite style={citeStyle}>[FILL]</cite>
            </p>
          </div>
          <div className="proof-tile" data-reveal="">
            <div className="stat">
              <span data-count="0" data-prefix="" data-suffix="">
                0
              </span>
            </div>
            <p>
              arguments about which number is right{" "}
              <cite style={citeStyle}>[FILL]</cite>
            </p>
          </div>
        </div>

        <div className="pullquote" data-reveal="" data-delay="80">
          <q>
            For the first time, when the AI gives our execs a number, nobody
            opens a side spreadsheet to check it. That&apos;s the whole game.
          </q>
          <div className="by">
            <div className="ava">JK</div>
            <div className="meta">
              <b>[Name], [Role]</b>
              <span>[Company] · logo placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
