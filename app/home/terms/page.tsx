import type { Metadata } from "next";
import { SITE } from "@/components/v2/constants";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for the ${SITE.legalName} website.`,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/home/terms` },
};

export default function TermsPage() {
  return (
    <main id="content" className="v2-legal">
      <div className="v2-wrap v2-prose">
        <h1 className="v2-display">Terms</h1>
        <p>
          These terms cover use of the public website at opaixllc.com, including
          the review copy at /home. They are a draft, not counsel-approved.
          Pennsylvania law is assumed; confirm before promotion.
        </p>

        <h2>What this site is</h2>
        <p>
          The site describes {SITE.legalName} and its work on individualized
          opioid prescribing at hospital discharge. It is information for
          clinicians, researchers, and investors. It is not medical advice, not
          a device manual, and not an offer of care.
        </p>

        <h2>No clinical use from these pages</h2>
        <p>
          Figures and examples on this site are illustrative. They are not a
          patient record and must not be used to make treatment decisions.
          Any deployed model, if and when one is used in care, would sit
          inside a health system’s own clinical and regulatory process.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Text, the OpAIx wordmark, and the forecast-line mark on this site
          belong to {SITE.legalName} unless another owner is named. One patent
          has been filed; this page does not describe its claims.
        </p>

        <h2>Contact form</h2>
        <p>
          Do not submit protected health information through the form. If you
          do, we will ask you to stop and will handle the message as a
          possible incident.
        </p>

        <h2>Limitation</h2>
        <p>
          The site is provided as-is. We are not liable for decisions made
          solely from reading it. If a provision is unenforceable, the rest
          still applies.
        </p>

        <h2>Contact</h2>
        <p>
          {SITE.legalName}, {SITE.city}. {SITE.email}. {SITE.phone}.
        </p>
      </div>
    </main>
  );
}
