"use client";

import { useState } from "react";

type FieldErrors = Partial<Record<"name" | "email" | "company", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "hello@ratio.com";

export default function LeadForm() {
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [mailto, setMailto] = useState<string>("");

  function validate(data: {
    name: string;
    email: string;
    company: string;
  }): FieldErrors {
    const next: FieldErrors = {};
    if (data.name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(data.email.trim()))
      next.email = "Please enter a valid email.";
    if (data.company.trim().length < 1)
      next.company = "Please enter your company.";
    return next;
  }

  function buildMailto(data: {
    name: string;
    email: string;
    company: string;
    message: string;
  }): string {
    const subject = `Data audit request — ${data.company}`;
    const body = [
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Work email: ${data.email}`,
      "",
      "What's breaking:",
      data.message.trim() || "(not provided)",
    ].join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      website: String(fd.get("website") ?? "").trim(),
    };

    // Honeypot — real users never fill this hidden field.
    if (payload.website !== "") {
      setDone(true);
      return;
    }

    const clientErrors = validate(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    const link = buildMailto(payload);
    setMailto(link);
    // Open the visitor's email client with the request pre-filled.
    window.location.href = link;
    setDone(true);
    form.reset();
  }

  if (done) {
    return (
      <div className="lead-success" role="status">
        <div className="lead-success-mark">✓</div>
        <h3>Your email is ready to send.</h3>
        <p>
          We&apos;ve opened your email app with the request pre-filled — just
          hit send and we&apos;ll be in touch within one business day.
        </p>
        <p className="lead-ref">
          Didn&apos;t see it open?{" "}
          <a href={mailto || `mailto:${CONTACT_EMAIL}`}>
            Email us at {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      {/* honeypot — visually hidden, ignored by humans */}
      <div className="lead-hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="lead-row">
        <div className={"lead-field" + (errors.name ? " invalid" : "")}>
          <label htmlFor="lead-name">Name</label>
          <input
            id="lead-name"
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className="lead-error">{errors.name}</span>}
        </div>
        <div className={"lead-field" + (errors.company ? " invalid" : "")}>
          <label htmlFor="lead-company">Company</label>
          <input
            id="lead-company"
            name="company"
            type="text"
            placeholder="Where you work"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
          />
          {errors.company && (
            <span className="lead-error">{errors.company}</span>
          )}
        </div>
      </div>

      <div className={"lead-field" + (errors.email ? " invalid" : "")}>
        <label htmlFor="lead-email">Work email</label>
        <input
          id="lead-email"
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <span className="lead-error">{errors.email}</span>}
      </div>

      <div className="lead-field">
        <label htmlFor="lead-message">
          What&apos;s breaking? <span className="lead-optional">optional</span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          placeholder="Where your AI or dashboards disagree, what stack you're on…"
        />
      </div>

      <button type="submit" className="btn btn-primary lead-submit">
        Book my free audit
        <span className="arrow">→</span>
      </button>
      <p className="lead-note">No obligation · We never share your data.</p>
    </form>
  );
}
