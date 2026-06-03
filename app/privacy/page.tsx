import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Ratio",
  description:
    "How Ratio collects, uses, and protects the information you share with us.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 2026">
      <p>
        This policy explains what information Ratio collects when you visit our
        website or contact us, how we use it, and the choices you have. We keep
        it short and in plain language on purpose.
      </p>

      <h2>What we collect</h2>
      <p>
        When you submit our data-audit form, we collect the details you provide:
        your name, work email, company, and anything you write in the message
        field. We use standard, privacy-respecting analytics to understand how
        the site is used; this does not identify you personally.
      </p>

      <h2>How we use it</h2>
      <p>
        We use your contact details solely to respond to your request, schedule
        your audit, and follow up about working together. We do not sell your
        information, and we do not share it with third parties except the
        service providers that help us operate (for example, email and form
        infrastructure), who are bound to protect it.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We retain enquiry details only as long as needed to respond and, where
        relevant, to maintain our business relationship. You can ask us to
        delete your information at any time.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request access to, correction of, or deletion of the personal
        information we hold about you. To exercise any of these rights, email us
        at <a href="mailto:hello@ratio.com">hello@ratio.com</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach us at{" "}
        <a href="mailto:hello@ratio.com">hello@ratio.com</a>.
      </p>
    </LegalPage>
  );
}
