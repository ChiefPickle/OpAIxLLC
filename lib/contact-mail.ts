export function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function honeypotTriggered(value: unknown) {
  return asString(value).length > 0;
}

type MailFields = {
  name: string;
  email: string;
  subject: string;
  text: string;
  formspreeBody?: Record<string, string>;
};

type MailResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

const UNCONFIGURED: MailResult = {
  ok: false,
  status: 503,
  error:
    "The form could not be sent. Write to contact@opaixllc.com or call +1 (412) 953-4374.",
};

const DELIVERY_FAILED: MailResult = {
  ok: false,
  status: 502,
  error: "The form could not be delivered. Email contact@opaixllc.com.",
};

export async function deliverContactMail(fields: MailFields): Promise<MailResult> {
  const formspree = process.env.FORMSPREE_FORM_ID;
  const resendKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_EMAIL_FROM ||
    "OpAIx Website <website@notifications.opaixllc.com>";
  const to =
    process.env.CONTACT_EMAIL_TO ||
    process.env.CONTACT_TO_EMAIL ||
    "contact@opaixllc.com";

  if (formspree) {
    const res = await fetch(`https://formspree.io/f/${formspree}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        fields.formspreeBody ?? {
          name: fields.name,
          email: fields.email,
          subject: fields.subject,
          message: fields.text,
        },
      ),
    });
    if (!res.ok) return DELIVERY_FAILED;
    return { ok: true };
  }

  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: fields.subject,
        text: fields.text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend delivery failed", res.status, detail);
      return DELIVERY_FAILED;
    }
    return { ok: true };
  }

  return UNCONFIGURED;
}
