export default function HowItWorks() {
  return (
    <section id="how">
      <div className="wrap">
        <p className="eyebrow" data-reveal="">
          How it works
        </p>
        <h2 className="section-title" data-reveal="" data-delay="60">
          From &quot;our AI can&apos;t be trusted&quot; to production-ready, in
          weeks, not quarters.
        </h2>
        <div className="stepper" id="stepper">
          <div className="step-track" />
          <div className="step-fill" />
          <div className="steps">
            <div className="step on">
              <div className="dot">1</div>
              <div className="when">~1 week</div>
              <h3>Discovery &amp; Audit</h3>
              <p>We map your stack and find exactly where definitions break.</p>
            </div>
            <div className="step">
              <div className="dot">2</div>
              <div className="when">weeks</div>
              <h3>We hand-build your layer</h3>
              <p>Metrics defined in code, each one verified by us.</p>
            </div>
            <div className="step">
              <div className="dot">3</div>
              <div className="when">connect</div>
              <h3>Connect to your AI &amp; stack</h3>
              <p>Warehouse, BI and agents all route through the truth.</p>
            </div>
            <div className="step">
              <div className="dot">4</div>
              <div className="when">handover</div>
              <h3>Handover &amp; care</h3>
              <p>Docs, training, optional retainer. You own it.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
