import { NextResponse } from "next/server";
import {
  asString,
  deliverContactMail,
  honeypotTriggered,
} from "@/lib/contact-mail";

type Body = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company_website?: unknown;
};

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

  if (honeypotTriggered(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const subject = asString(body.subject);
  const message = asString(body.message);

  if (name.length < 2 || name.length > 80) {
    return invalid("Enter your name.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return invalid("Enter a valid email address.");
  }
  if (subject.length < 2 || subject.length > 120) {
    return invalid("Enter a subject.");
  }
  if (message.length < 10 || message.length > 2000) {
    return invalid("Enter a message of at least 10 characters.");
  }

  const result = await deliverContactMail({
    name,
    email,
    subject: `OpAIx contact: ${subject}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n"),
    formspreeBody: { name, email, subject, message },
  });

  if (!result.ok) {
    return invalid(result.error, result.status);
  }

  return NextResponse.json({ ok: true });
}
