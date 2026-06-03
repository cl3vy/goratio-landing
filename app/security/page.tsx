import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Security — Ratio",
  description:
    "How Ratio approaches data handling, access, and the security of your environment.",
};

export default function SecurityPage() {
  return (
    <LegalPage title="Security" updated="June 2026">
      <p>
        Ratio works inside your data environment, not around it. Our approach is
        designed so that your data stays where it already lives and under your
        control.
      </p>

      <h2>Your data stays in your environment</h2>
      <p>
        The semantic layer we build runs in your stack — your warehouse, your
        cloud, your repositories. We don&apos;t copy or move your data out of
        your environment to deliver it.
      </p>

      <h2>Least-privilege access</h2>
      <p>
        We request the minimum access needed to do the work, scoped to the
        systems in question and revoked on completion. Access is granted through
        your own provisioning and can be audited and removed by you at any time.
      </p>

      <h2>Confidentiality</h2>
      <p>
        We&apos;re happy to work under your NDA and security requirements before
        any engagement begins. Everything we learn about your business and data
        is treated as confidential.
      </p>

      <h2>Built in code, fully handed over</h2>
      <p>
        What we build is version-controlled and lives in your repositories. At
        handover, you own all of it — there is no lock-in and no hidden
        dependency on us.
      </p>

      <h2>Reporting a concern</h2>
      <p>
        If you have a security question or want to report a concern, contact us
        at <a href="mailto:hello@ratio.com">hello@ratio.com</a> and we&apos;ll
        respond promptly.
      </p>
    </LegalPage>
  );
}
