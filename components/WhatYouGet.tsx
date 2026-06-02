export default function WhatYouGet() {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow" data-reveal="">
          What you get
        </p>
        <h2 className="section-title" data-reveal="" data-delay="60">
          Everything you need to trust a number again.
        </h2>
        <div className="get-grid" data-stagger="">
          <div className="get-item" data-reveal="">
            <span className="tick">✓</span>
            <p>
              A version-controlled semantic layer, living in your environment.
            </p>
          </div>
          <div className="get-item" data-reveal="">
            <span className="tick">✓</span>
            <p>
              Every metric documented: definition · formula · source · owner ·
              verified sign-off.
            </p>
          </div>
          <div className="get-item" data-reveal="">
            <span className="tick">✓</span>
            <p>Live connections to your LLMs / agents, BI and warehouse.</p>
          </div>
          <div className="get-item" data-reveal="">
            <span className="tick">✓</span>
            <p>
              A data-truth audit report — the conflicts you didn&apos;t know
              existed.
            </p>
          </div>
          <div className="get-item" data-reveal="">
            <span className="tick">✓</span>
            <p>Team enablement: documentation plus hands-on training.</p>
          </div>
          <div className="get-item" data-reveal="">
            <span className="tick">✓</span>
            <p>An optional ongoing verification retainer.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
