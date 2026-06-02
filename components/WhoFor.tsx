export default function WhoFor() {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow" data-reveal="">
          Who it&apos;s for
        </p>
        <h2 className="section-title" data-reveal="" data-delay="60">
          If your AI touches internal data, this is for you.
        </h2>
        <div className="who-grid">
          <div>
            <div className="who-list" data-stagger="">
              <div className="who-item" data-reveal="">
                <span className="tick">✓</span>
                <p>
                  Teams rolling out AI copilots / agents on internal data and
                  hitting trust issues.
                </p>
              </div>
              <div className="who-item" data-reveal="">
                <span className="tick">✓</span>
                <p>
                  Data teams with drifted metric definitions across departments.
                </p>
              </div>
              <div className="who-item" data-reveal="">
                <span className="tick">✓</span>
                <p>
                  Leaders who want AI-ready data without a six-month rebuild.
                </p>
              </div>
              <div className="who-item" data-reveal="">
                <span className="tick">✓</span>
                <p>
                  Mid-market → enterprise on Snowflake, BigQuery or Databricks.
                </p>
              </div>
            </div>
            <p className="not-for" data-reveal="">
              Not for you if you have no warehouse yet, or you&apos;re happy
              letting AI guess.
            </p>
          </div>

          {/* ★ Interactive C — The Glass Box */}
          <div
            className="glassbox"
            id="glassbox"
            data-reveal=""
            data-delay="120"
          >
            <div className="gb-answer">
              <div className="q">Active users last week?</div>
              <div className="a">
                Active users: <span>48,210</span>
              </div>
            </div>
            <button className="btn btn-ghost gb-btn">
              <span className="gb-label">show the proof</span>{" "}
              <span className="arrow">↓</span>
            </button>
            <div className="gb-layers">
              <div className="gb-layer">
                <div className="gl-label">Generated SQL</div>
                <div className="gl-val">
                  SELECT <span className="kw">COUNT(DISTINCT user_id)</span>{" "}
                  FROM events
                  <br />
                  WHERE <span className="kw">events.qualifying</span> AND week =
                  CURRENT
                </div>
              </div>
              <div className="gb-layer">
                <div className="gl-label">Verified definition used</div>
                <div className="gl-val">
                  active_users — distinct users with a qualifying event.{" "}
                  <span className="kw">Excludes bot + test traffic.</span>
                </div>
              </div>
              <div className="gb-layer owner">
                <div className="gl-label">Owner &amp; last verified</div>
                <div className="gl-val">
                  Verified by <b>M. Lin</b> · 2024-Q3 · src events.qualifying
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
