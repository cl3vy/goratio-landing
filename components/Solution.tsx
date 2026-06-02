export default function Solution() {
  return (
    <section id="solution">
      <div className="wrap">
        <p className="eyebrow" data-reveal="">
          The solution
        </p>
        <h2 className="section-title" data-reveal="" data-delay="60">
          A semantic layer is the translator between your data and your AI.
        </h2>
        <p className="lede" data-reveal="" data-delay="120">
          A verified dictionary and map of your data — what every metric means,
          which tables to trust, how to calculate it — so your AI answers like a
          senior analyst instead of guessing.
        </p>

        <div className="sol-diagram" data-reveal="" data-delay="160">
          <svg
            id="sol-flow"
            viewBox="0 0 900 280"
            width="100%"
            height="280"
            aria-label="Raw tables flow through the Goratio layer into clean AI outputs"
          >
            <defs>
              <linearGradient id="layerGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F5B544" />
                <stop offset="100%" stopColor="#1FAA6E" />
              </linearGradient>
            </defs>
            {/* left: messy tables */}
            <g fontFamily="Geist Mono, monospace" fontSize="12" fill="#9A9AA2">
              <g
                className="sol-node"
                style={{ animation: "nodePulse 3s 0s infinite" }}
              >
                <rect
                  x="20"
                  y="34"
                  width="120"
                  height="30"
                  rx="6"
                  fill="#1B1B1E"
                  stroke="rgba(216,58,58,0.4)"
                />
                <text x="34" y="53">
                  rev_v1 · rev_v2
                </text>
              </g>
              <g
                className="sol-node"
                style={{ animation: "nodePulse 3s .5s infinite" }}
              >
                <rect
                  x="36"
                  y="86"
                  width="120"
                  height="30"
                  rx="6"
                  fill="#1B1B1E"
                  stroke="rgba(216,58,58,0.4)"
                />
                <text x="50" y="105">
                  events_raw
                </text>
              </g>
              <g
                className="sol-node"
                style={{ animation: "nodePulse 3s 1s infinite" }}
              >
                <rect
                  x="14"
                  y="138"
                  width="120"
                  height="30"
                  rx="6"
                  fill="#1B1B1E"
                  stroke="rgba(216,58,58,0.4)"
                />
                <text x="28" y="157">
                  users · users_v2
                </text>
              </g>
              <g
                className="sol-node"
                style={{ animation: "nodePulse 3s 1.5s infinite" }}
              >
                <rect
                  x="40"
                  y="190"
                  width="120"
                  height="30"
                  rx="6"
                  fill="#1B1B1E"
                  stroke="rgba(216,58,58,0.4)"
                />
                <text x="54" y="209">
                  sessions_old
                </text>
              </g>
            </g>
            {/* flow lines into the layer */}
            <g
              fill="none"
              stroke="url(#layerGrad)"
              strokeWidth="1.6"
              opacity="0.85"
            >
              <path className="flow-path" d="M140,49 C260,49 300,120 400,128" />
              <path
                className="flow-path"
                d="M156,101 C260,101 320,124 400,134"
              />
              <path
                className="flow-path"
                d="M134,153 C260,153 320,142 400,140"
              />
              <path
                className="flow-path"
                d="M160,205 C280,205 320,150 400,148"
              />
            </g>
            {/* center layer node */}
            <g className="sol-layer-glow">
              <rect
                x="400"
                y="96"
                width="100"
                height="88"
                rx="14"
                fill="#141416"
                stroke="url(#layerGrad)"
                strokeWidth="2"
              />
              <rect
                x="400"
                y="96"
                width="100"
                height="88"
                rx="14"
                fill="url(#layerGrad)"
                opacity="0.10"
              />
              <text
                x="450"
                y="134"
                textAnchor="middle"
                fontFamily="Geist, sans-serif"
                fontSize="13"
                fontWeight="600"
                fill="#F4F4F5"
              >
                Goratio
              </text>
              <text
                x="450"
                y="152"
                textAnchor="middle"
                fontFamily="Geist Mono, monospace"
                fontSize="10"
                fill="#1FAA6E"
              >
                semantic layer
              </text>
            </g>
            {/* flow out */}
            <g fill="none" stroke="#1FAA6E" strokeWidth="1.6" opacity="0.85">
              <path className="flow-path" d="M500,118 C620,118 660,70 760,66" />
              <path
                className="flow-path"
                d="M500,140 C620,140 660,140 760,140"
              />
              <path
                className="flow-path"
                d="M500,162 C620,162 660,212 760,214"
              />
            </g>
            {/* right: clean outputs */}
            <g fontFamily="Geist Mono, monospace" fontSize="12" fill="#F4F4F5">
              <g className="sol-node">
                <rect
                  x="760"
                  y="50"
                  width="116"
                  height="32"
                  rx="6"
                  fill="#1B1B1E"
                  stroke="rgba(31,170,110,0.45)"
                />
                <text x="788" y="70">
                  LLM
                </text>
                <circle cx="775" cy="66" r="3" fill="#1FAA6E" />
              </g>
              <g className="sol-node">
                <rect
                  x="760"
                  y="124"
                  width="116"
                  height="32"
                  rx="6"
                  fill="#1B1B1E"
                  stroke="rgba(31,170,110,0.45)"
                />
                <text x="788" y="144">
                  BI
                </text>
                <circle cx="775" cy="140" r="3" fill="#1FAA6E" />
              </g>
              <g className="sol-node">
                <rect
                  x="760"
                  y="198"
                  width="116"
                  height="32"
                  rx="6"
                  fill="#1B1B1E"
                  stroke="rgba(31,170,110,0.45)"
                />
                <text x="788" y="218">
                  Agents
                </text>
                <circle cx="775" cy="214" r="3" fill="#1FAA6E" />
              </g>
            </g>
          </svg>
          <div className="pillars">
            <div className="pillar" data-reveal="">
              <svg
                className="pi"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <b>One source of truth</b>
            </div>
            <div className="pillar" data-reveal="" data-delay="80">
              <svg
                className="pi"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <b>AI-ready by design</b>
            </div>
            <div className="pillar" data-reveal="" data-delay="160">
              <svg
                className="pi"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <b>Human-verified</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
