import { NextResponse } from "next/server";
import {
  asString,
  deliverContactMail,
  honeypotTriggered,
} from "@/lib/contact-mail";

type Body = {
  name?: unknown;
  organisation?: unknown;
  role?: unknown;
  email?: unknown;
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

  const result = await deliverContactMail({
    name,
    email,
    subject: `Site inquiry from ${name} (${organisation})`,
    text: [
      `Name: ${name}`,
      `Organisation: ${organisation}`,
      `Role: ${role}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n"),
    formspreeBody: { name, organisation, role, email, message },
  });

  if (!result.ok) {
    return invalid(result.error, result.status);
  }

  return NextResponse.json({ ok: true });
}
