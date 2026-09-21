import { NextResponse } from "next/server";

type Body = {
  name?: unknown;
  organisation?: unknown;
  role?: unknown;
  email?: unknown;
  message?: unknown;
  company_website?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function invalid(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return invalid("The form could not be read.");
  }

  if (asString(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name);
  const organisation = asString(body.organisation);
  const role = asString(body.role);
  const email = asString(body.email);
  const message = asString(body.message);

  if (name.length < 2 || name.length > 80) {
    return invalid("Enter your name.");
  }
  if (organisation.length < 2 || organisation.length > 120) {
    return invalid("Enter your organisation.");
  }
  if (role.length < 2 || role.length > 80) {
    return invalid("Enter your role.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return invalid("Enter a valid email address.");
  }
  if (message.length < 10 || message.length > 2000) {
    return invalid("Enter a message of at least 10 characters.");
  }

  const formspree = process.env.FORMSPREE_FORM_ID;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "contact@opaixllc.com";

  if (formspree) {
    const res = await fetch(`https://formspree.io/f/${formspree}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, organisation, role, email, message }),
    });
    if (!res.ok) {
      return invalid("The form could not be delivered. Email contact@opaixllc.com.", 502);
    }
    return NextResponse.json({ ok: true });
  }

  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "OpAIx site <noreply@opaixllc.com>",
        to: [to],
        reply_to: email,
        subject: `Site inquiry from ${name} (${organisation})`,
        text: [`Name: ${name}`, `Organisation: ${organisation}`, `Role: ${role}`, `Email: ${email}`, "", message].join(
          "\n",
        ),
      }),
    });
    if (!res.ok) {
      return invalid("The form could not be delivered. Email contact@opaixllc.com.", 502);
    }
    return NextResponse.json({ ok: true });
  }

  return invalid(
    "Form delivery is not configured yet. Write to contact@opaixllc.com or call +1 (412) 953-4374.",
    503,
  );
}
