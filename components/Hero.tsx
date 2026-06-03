export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow" data-reveal="">
            Built by humans · Checked by humans
          </p>
          <h1 data-reveal="" data-delay="60">
            Your AI is guessing.
            <br />
            <span className="line2">
              Because your data never told it the truth.
            </span>
          </h1>
          <p className="lede" data-reveal="" data-delay="140">
            We hand-build a verified semantic layer for your business, so every
            AI agent understands your data like your best analyst does. Built by
            humans. Checked by humans. Nothing automated.
          </p>
          <div className="hero-cta" data-reveal="" data-delay="220">
            <a href="#book" className="btn btn-primary">
              Book a Free Data Audit <span className="arrow">→</span>
            </a>
            <a href="#solution" className="btn btn-ghost">
              See how it works
            </a>
          </div>
          <div className="hero-trust" data-reveal="" data-delay="300">
            <span>
              <b id="hero-metric-count" data-count="2400" data-suffix="+">
                0
              </b>{" "}
              metrics verified
            </span>
            <span>·</span>
            <span>Works with Snowflake, BigQuery, dbt, Cube &amp; any LLM</span>
          </div>
        </div>

        {/* ★ Interactive A */}
        <div className="iv-a" id="iv-a" data-reveal="" data-delay="200">
          <div className="iv-a-chips" />
          <div className="iv-a-panels">
            <div className="ans-panel left">
              <div className="ans-head">
                <span className="led" /> Raw LLM on your warehouse
              </div>
              <div className="table-pick" />
              <div className="ans-value" />
              <div className="ans-foot" />
            </div>
            <div className="vs-badge">vs</div>
            <div className="ans-panel right">
              <div className="ans-head">
                <span className="led" /> Through Ratio{" "}
                <span
                  className="chip verified right-chip"
                  style={{ opacity: 0, marginLeft: 6 }}
                >
                  ✓ verified
                </span>
              </div>
              <div className="ans-value" />
              <div className="ans-foot ans-why" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
