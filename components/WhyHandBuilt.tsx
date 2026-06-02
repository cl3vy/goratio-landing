export default function WhyHandBuilt() {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow" data-reveal="">
          The differentiator
        </p>
        <h2 className="section-title" data-reveal="" data-delay="60">
          Automatic tools guess at meaning. We don&apos;t guess.
        </h2>
        <p className="lede" data-reveal="" data-delay="120">
          Auto-tools infer meaning from column names — so they inherit the exact
          ambiguity you&apos;re trying to fix, at scale. We build every layer by
          hand, capture your team&apos;s real logic, and a human verifies each
          definition.
        </p>

        {/* ★ Interactive B */}
        <div className="iv-b" id="iv-b" data-reveal="" data-delay="140">
          <div className="iv-b-top">
            <span className="label">★ Watch a metric get verified</span>
            <div className="metric-select">
              <button className="active" data-metric="active_users">
                active_users
              </button>
              <button data-metric="net_revenue">net_revenue</button>
              <button data-metric="conversion_rate">conversion_rate</button>
            </div>
          </div>
          <div className="iv-b-stage">
            <div className="iv-b-narrate">
              <div className="beat-counter">BEAT 1 / 4</div>
              <div className="beat-title">The ask</div>
              <div className="beat-caption" />
            </div>
            <div className="iv-b-visual" />
          </div>
          <div className="iv-b-scrub">
            <button className="play" aria-label="Play" />
            <div className="beat-track">
              <div className="beat-seg">
                <i />
              </div>
              <div className="beat-seg">
                <i />
              </div>
              <div className="beat-seg">
                <i />
              </div>
              <div className="beat-seg">
                <i />
              </div>
            </div>
          </div>
        </div>

        {/* comparison table */}
        <div className="compare" data-reveal="" data-delay="100">
          <div className="compare-col left">
            <div className="compare-head">Automatic / DIY tools</div>
            <div className="crow">
              <span className="mark">✕</span> Infers meaning from column names
            </div>
            <div className="crow">
              <span className="mark">✕</span> Ships your data&apos;s ambiguity
              at scale
            </div>
            <div className="crow">
              <span className="mark">✕</span> No accountability for wrong
              definitions
            </div>
            <div className="crow">
              <span className="mark">✕</span> You QA everything yourself
            </div>
            <div className="crow">
              <span className="mark">✕</span> Generic, one-size-fits-all
            </div>
          </div>
          <div className="compare-col right">
            <div className="compare-head">
              Goratio — hand-built + verified
              <span className="vchip">
                ✓ Verified by Goratio
                <span className="detail">
                  {"\u00A0· owner D. Osei · 2024-Q3 · src rev_verified"}
                </span>
              </span>
            </div>
            <div className="crow">
              <span className="mark">✓</span> Captures your team&apos;s real
              logic
            </div>
            <div className="crow">
              <span className="mark">✓</span> Resolves ambiguity before AI sees
              it
            </div>
            <div className="crow">
              <span className="mark">✓</span> A human signs off on every metric
            </div>
            <div className="crow">
              <span className="mark">✓</span> We verify it — you just trust it
            </div>
            <div className="crow">
              <span className="mark">✓</span> Tailored, edge cases included
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
