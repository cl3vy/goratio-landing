export default function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <p className="eyebrow" data-reveal="">
          FAQ
        </p>
        <h2 className="section-title" data-reveal="" data-delay="60">
          The questions a data buyer actually asks.
        </h2>
        <div className="faq" data-stagger="">
          <div className="faq-item" data-reveal="">
            <button className="faq-q">
              Can&apos;t a tool just auto-generate this?{" "}
              <span className="pm">+</span>
            </button>
            <div className="faq-a">
              <p>
                A tool generates a <em>guess</em> from your column names —
                inheriting the ambiguity you&apos;re trying to fix. We capture
                your team&apos;s real logic and a human verifies every
                definition before your AI ever sees it.
              </p>
            </div>
          </div>
          <div className="faq-item" data-reveal="">
            <button className="faq-q">
              How long does it take? <span className="pm">+</span>
            </button>
            <div className="faq-a">
              <p>
                Discovery is about one week. A working, connected layer lands in
                weeks — not quarters. Fixed-scope, so you know what you&apos;re
                getting.
              </p>
            </div>
          </div>
          <div className="faq-item" data-reveal="">
            <button className="faq-q">
              Are we locked in? <span className="pm">+</span>
            </button>
            <div className="faq-a">
              <p>
                No. It&apos;s built in code, in your stack, and fully handed
                over. The retainer is optional — you own everything.
              </p>
            </div>
          </div>
          <div className="faq-item" data-reveal="">
            <button className="faq-q">
              Does it work with our tools and AI? <span className="pm">+</span>
            </button>
            <div className="faq-a">
              <p>
                Snowflake, BigQuery, Databricks, dbt, Cube — and any LLM or
                agent. The semantic layer is the neutral source of truth they
                all read from.
              </p>
            </div>
          </div>
          <div className="faq-item" data-reveal="">
            <button className="faq-q">
              What about security? <span className="pm">+</span>
            </button>
            <div className="faq-a">
              <p>
                [FILL: where it runs, data handling, NDAs, access controls.] The
                layer lives in your environment — we don&apos;t move your data
                out of it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
