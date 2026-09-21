import type { Metadata } from "next";
import { SITE } from "@/components/v2/constants";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${SITE.legalName} handles information submitted through this site.`,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/home/privacy` },
};

export default function PrivacyPage() {
  return (
    <main id="content" className="v2-legal">
      <div className="v2-wrap v2-prose">
        <h1 className="v2-display">Privacy policy</h1>
        <p>
          This draft describes how {SITE.legalName} (“OpAIx”, “we”) handles
          information collected through this website. It is not counsel-approved.
          Contact {SITE.email} with questions. Effective date to be confirmed.
        </p>

        <h2>Who we are</h2>
        <p>
          OpAIx is a Pennsylvania company based in {SITE.city}. This site is
          a public description of our peri-operative pain-forecast work, not a
          patient portal and not a place to submit clinical records.
        </p>

        <h2>What we collect from this site</h2>
        <p>
          If you use the contact form, we receive the name, organisation, role,
          email address, and message you type, plus standard server logs (IP
          address, time, user agent) needed to operate the site and limit abuse.
          A hidden honeypot field is used only to ignore automated posts.
        </p>
        <p>
          We use that information to reply to you. We do not sell it, and we
          do not use it to train clinical models.
        </p>

        <h2>Clinical and research data</h2>
        <p>
          This website does not collect patient records. Research data from
          academic collaborators is handled under the partner’s IRB protocol
          and a separate agreement, not under this form.
        </p>

        <h2>Processors</h2>
        <p>
          Form submissions may be delivered through an email or form provider
          (for example Formspree or Resend) acting on our instructions. Hosting
          is on the infrastructure that serves opaixllc.com.
        </p>

        <h2>Retention and your requests</h2>
        <p>
          Correspondence is kept only as long as needed to handle the inquiry
          and ordinary business records. To access, correct, or delete contact
          information we hold about you, write to {SITE.email}.
        </p>

        <h2>Children</h2>
        <p>This site is not directed at children under 13.</p>
      </div>
    </main>
  );
}
