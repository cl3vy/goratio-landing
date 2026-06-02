import LeadForm from "@/components/LeadForm";

export default function FinalCta() {
  return (
    <section className="final-cta" id="book">
      <div className="wrap">
        <div className="cta-band" data-reveal="">
          <canvas className="cta-grain" id="cta-grain" />
          <h2>
            Stop letting your AI guess. Give it a source of truth it can&apos;t
            get wrong.
          </h2>
          <p>
            Book a free data audit, we&apos;ll map where your definitions break
            down and show what a verified semantic layer would change. No
            obligation.
          </p>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
