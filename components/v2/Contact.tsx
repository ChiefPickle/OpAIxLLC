"use client";

import { useState } from "react";
import { routes, SITE } from "./constants";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const res = await fetch(routes.send, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          organisation: data.get("organisation"),
          role: data.get("role"),
          email: data.get("email"),
          message: data.get("message"),
          company_website: data.get("company_website"),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(
          json.error ||
            `The form could not be sent. Write to ${SITE.email} or call ${SITE.phone}.`,
        );
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(`The form could not be sent. Write to ${SITE.email} or call ${SITE.phone}.`);
    }
  }

  return (
    <section id="contact" className="v2-contact" aria-labelledby="contact-heading">
      <div className="v2-wrap v2-12">
        <div className="v2-contact-copy">
          <h2 id="contact-heading" className="v2-display">
            Start a conversation about your perioperative program
          </h2>
          <p className="v2-lede" style={{ marginTop: "1.25rem" }}>
            CMIOs, anesthesiology and peri-operative chiefs, health-system
            innovation teams, clinical research partners, and seed investors
            should write. We will say plainly where the models are in
            validation and what a collaboration would take.
          </p>
          <p className="v2-meta" style={{ marginTop: "1.5rem" }}>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <br />
            {SITE.city}
          </p>
        </div>
        <div className="v2-contact-form">
          {status === "sent" ? (
            <p className="v2-form-success" role="status">
              Message sent. We&apos;ll reply within two business days.
            </p>
          ) : (
            <form className="v2-form" onSubmit={onSubmit} noValidate>
              <div className="v2-field-group">
                <label htmlFor="v2-name">Name</label>
                <input id="v2-name" name="name" className="v2-field" required autoComplete="name" />
              </div>
              <div className="v2-field-group">
                <label htmlFor="v2-org">Organisation</label>
                <input
                  id="v2-org"
                  name="organisation"
                  className="v2-field"
                  required
                  autoComplete="organization"
                />
              </div>
              <div className="v2-field-group">
                <label htmlFor="v2-role">Role</label>
                <input id="v2-role" name="role" className="v2-field" required />
              </div>
              <div className="v2-field-group">
                <label htmlFor="v2-email">Email</label>
                <input
                  id="v2-email"
                  name="email"
                  type="email"
                  className="v2-field"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="v2-field-group">
                <label htmlFor="v2-message">Message</label>
                <textarea
                  id="v2-message"
                  name="message"
                  className="v2-field"
                  rows={5}
                  required
                  minLength={10}
                />
              </div>
              <div className="v2-hp" aria-hidden="true">
                <label htmlFor="v2-hp">Company website</label>
                <input id="v2-hp" name="company_website" tabIndex={-1} autoComplete="off" />
              </div>
              {status === "error" && (
                <p className="v2-form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="v2-btn v2-btn-paper" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
