"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Clock, Shield, Users } from "lucide-react";

const badges = [
  { icon: Shield, label: "HIPAA Compliant" },
  { icon: Clock, label: "24/7 On-Duty" },
  { icon: Users, label: "Expert Support" },
];

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full min-h-11 rounded-lg border border-gray-600 bg-slate-800 px-4 py-3 text-white placeholder:text-gray-500 transition-colors hover:border-gray-400 focus:border-cyan-400 focus:outline-none";

export function CTA() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const formId = useId();
  const panelId = `${formId}-panel`;

  useEffect(() => {
    if (window.location.hash === "#contact") {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (open && status !== "sent") {
      nameRef.current?.focus();
    }
  }, [open]);

  function toggleForm() {
    setOpen((prev) => {
      const next = !prev;
      if (!next) {
        queueMicrotask(() => toggleRef.current?.focus());
      }
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          company_website: data.get("company_website"),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(
          json.error ||
            "The form could not be sent. Write to contact@opaixllc.com or call +1 (412) 953-4374.",
        );
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(
        "The form could not be sent. Write to contact@opaixllc.com or call +1 (412) 953-4374.",
      );
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="py-20 bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 id="cta-heading" className="mb-4">
            Ready to Transform Patient Care?
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Join leading healthcare providers who trust OpAIx to improve patient
            outcomes through intelligent predictive analytics.
          </p>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={toggleForm}
            className={`px-8 py-3 min-h-11 bg-transparent border rounded-lg transition-colors cursor-pointer ${
              open
                ? "border-cyan-400 text-white"
                : "border-gray-600 hover:border-gray-400 text-white"
            }`}
          >
            {open ? "Close form" : "Contact Us"}
          </button>
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            open ? "grid-rows-[1fr] mb-12" : "grid-rows-[0fr] mb-0"
          }`}
        >
          <div className="overflow-hidden">
            <div
              id={panelId}
              role="region"
              aria-labelledby="cta-heading"
              hidden={!open}
              className="max-w-xl mx-auto text-left"
            >
              {status === "sent" ? (
                <p
                  className="rounded-lg border border-cyan-400/40 bg-slate-800 px-5 py-4 text-gray-200"
                  role="status"
                >
                  Message sent. We&apos;ll reply to the email you provided.
                </p>
              ) : (
                <form className="relative space-y-5" onSubmit={onSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="cta-name" className="text-sm text-gray-300">
                        Name
                      </label>
                      <input
                        ref={nameRef}
                        id="cta-name"
                        name="name"
                        className={fieldClass}
                        required
                        minLength={2}
                        maxLength={80}
                        autoComplete="name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="cta-email" className="text-sm text-gray-300">
                        Email
                      </label>
                      <input
                        id="cta-email"
                        name="email"
                        type="email"
                        className={fieldClass}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="cta-subject" className="text-sm text-gray-300">
                      Subject
                    </label>
                    <input
                      id="cta-subject"
                      name="subject"
                      className={fieldClass}
                      required
                      minLength={2}
                      maxLength={120}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="cta-message" className="text-sm text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="cta-message"
                      name="message"
                      className={`${fieldClass} min-h-[8.5rem] resize-y py-3`}
                      rows={5}
                      required
                      minLength={10}
                      maxLength={2000}
                    />
                  </div>
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="cta-hp">Company website</label>
                    <input
                      id="cta-hp"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-red-300" role="alert">
                      {error.includes("contact@opaixllc.com") ? (
                        <>
                          The form could not be sent. Write to{" "}
                          <a
                            href="mailto:contact@opaixllc.com"
                            className="underline decoration-red-300/60 underline-offset-2 hover:text-white"
                          >
                            contact@opaixllc.com
                          </a>{" "}
                          or call{" "}
                          <a
                            href="tel:+14129534374"
                            className="underline decoration-red-300/60 underline-offset-2 hover:text-white"
                          >
                            +1 (412) 953-4374
                          </a>
                          .
                        </>
                      ) : (
                        error
                      )}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto min-h-11 px-8 py-3 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 text-slate-900 rounded-lg transition-colors cursor-pointer"
                  >
                    {status === "sending" ? "Sending" : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-8 mt-4 text-center max-w-none">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                </div>
                <div className="text-sm text-gray-400">{badge.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
