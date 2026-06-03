export default function HiddenCost() {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow" data-reveal="">
          The hidden cost
        </p>
        <h2 className="section-title" data-reveal="" data-delay="60">
          The problem isn&apos;t your AI. It&apos;s that your data can&apos;t
          explain itself.
        </h2>

        <div className="cost-chart" data-reveal="" data-delay="120">
          <div className="chart-legend">
            <span>
              <span className="sw" style={{ background: "var(--red)" }} /> AI
              accuracy on raw schema
            </span>
            <span>
              <span className="sw" style={{ background: "var(--green)" }} />{" "}
              with verified semantic layer
            </span>
          </div>
          <svg
            id="cost-chart-svg"
            viewBox="0 0 800 260"
            width="100%"
            height="260"
            preserveAspectRatio="none"
            aria-label="The trust gap: AI accuracy over time"
          >
            <defs>
              <linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1FAA6E" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#1FAA6E" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* gridlines */}
            <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
              <line x1="0" y1="65" x2="800" y2="65" />
              <line x1="0" y1="130" x2="800" y2="130" />
              <line x1="0" y1="195" x2="800" y2="195" />
            </g>
            {/* green smooth high line + area */}
            <path
              className="area-green"
              d="M0,150 C120,120 200,70 320,55 C460,38 560,40 800,30 L800,260 L0,260 Z"
              fill="url(#greenArea)"
              opacity="0"
            />
            <path
              className="line"
              d="M0,150 C120,120 200,70 320,55 C460,38 560,40 800,30"
              fill="none"
              stroke="#1FAA6E"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* red jagged low line */}
            <path
              className="line"
              d="M0,175 L70,205 L130,160 L190,212 L250,178 L320,222 L390,170 L460,214 L530,185 L600,225 L670,190 L740,220 L800,196"
              fill="none"
              stroke="#D83A3A"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="cost-tiles" data-stagger="">
          <div className="cost-tile" data-reveal="">
            <div className="stat">
              <span data-count="70-85" data-suffix="%">
                0
              </span>
            </div>
            <p>of enterprise AI &amp; data initiatives fail to deliver lasting value.</p>
          </div>
          <div className="cost-tile" data-reveal="">
            <div className="stat">
              <span data-count="39">0</span>
            </div>
            <p>
              conflicting definitions of core metrics can hide inside a single
              enterprise.
            </p>
          </div>
          <div className="cost-tile" data-reveal="">
            <div className="stat">
              <span data-count="11" data-suffix=" hrs">
                0
              </span>
            </div>
            <p>of analyst time lost each week re-deriving the same numbers by hand.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
