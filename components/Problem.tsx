export default function Problem() {
  return (
    <section id="approach">
      <div className="wrap">
        <p className="eyebrow" data-reveal="">
          The problem
        </p>
        <h2 className="section-title" data-reveal="" data-delay="60">
          You bought AI. So why does it keep getting your business wrong?
        </h2>
        <div className="prob-grid" data-stagger="">
          <div className="prob-card" data-reveal="">
            <svg
              className="prob-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 9v4M12 17h.01" />
              <path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
            </svg>
            <h3>Confident, wrong answers</h3>
            <p>
              It picks the wrong column and tells you the number with total
              confidence. You only find out in the board meeting.
            </p>
          </div>
          <div className="prob-card" data-reveal="">
            <svg
              className="prob-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="12" cy="18" r="3" />
              <path d="M6 9v3a3 3 0 0 0 3 3M18 9v3a3 3 0 0 1-3 3" />
            </svg>
            <h3>Every team has a different truth</h3>
            <p>
              Finance, sales and ops each define a metric differently. Your AI
              inherits all three — and blends them.
            </p>
          </div>
          <div className="prob-card" data-reveal="">
            <svg
              className="prob-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
              <path d="M9.4 5.1A9 9 0 0 1 21 12a9.8 9.8 0 0 1-1.6 2.6M6.6 6.6A9.7 9.7 0 0 0 3 12a9 9 0 0 0 11 6.4" />
            </svg>
            <h3>Tools nobody trusts</h3>
            <p>
              The shiny copilot gets quietly abandoned after the first bad
              number. Trust, once lost, doesn&apos;t come back cheap.
            </p>
          </div>
          <div className="prob-card" data-reveal="">
            <svg
              className="prob-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
            <h3>Knowledge stuck in one head</h3>
            <p>
              The one analyst who knows what the numbers <em>really</em> mean is
              your bottleneck — and your flight risk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
