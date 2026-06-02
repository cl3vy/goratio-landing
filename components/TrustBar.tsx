export default function TrustBar() {
  return (
    <section className="trustbar">
      <div className="wrap">
        <p className="big" data-reveal="">
          Gartner predicts semantic layers will drive up to{" "}
          <span className="num">
            <span data-count="80" data-suffix="%">
              0
            </span>
          </span>{" "}
          better AI accuracy and{" "}
          <span className="num">
            <span data-count="60" data-suffix="%">
              0
            </span>
          </span>{" "}
          lower analytics cost by 2027.
        </p>
        <cite data-reveal="" data-delay="80">
          Source: Gartner · [verify + cite before launch]
        </cite>
      </div>
    </section>
  );
}
