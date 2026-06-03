import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Ratio",
  description: "The terms that govern your use of the Ratio website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="June 2026">
      <p>
        These terms govern your use of the Ratio website. By browsing the site
        or submitting an enquiry, you agree to them. The specific terms of any
        engagement are set out separately in a signed agreement.
      </p>

      <h2>Use of this site</h2>
      <p>
        You may use this website for lawful purposes only. The content,
        branding, and design are owned by Ratio and provided for informational
        purposes. Please don&apos;t copy, scrape, or republish it without our
        permission.
      </p>

      <h2>Enquiries and proposals</h2>
      <p>
        Submitting the data-audit form starts a conversation; it does not create
        a contract or guarantee of service. Any work we do together is governed
        by a separate statement of work, including scope, deliverables, and
        pricing agreed in writing.
      </p>

      <h2>No warranty</h2>
      <p>
        The information on this site is provided &quot;as is&quot; without
        warranties of any kind. Figures and examples are illustrative and do not
        constitute a guarantee of specific results.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Ratio is not liable for any
        indirect or consequential loss arising from your use of this website.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:hello@ratio.com">hello@ratio.com</a>.
      </p>
    </LegalPage>
  );
}
