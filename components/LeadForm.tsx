"use client";

import { useState } from "react";

type FieldErrors = Partial<Record<"name" | "email" | "company", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>("");
  const [refId, setRefId] = useState<string>("");

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    const clientErrors = validate(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors as FieldErrors);
        setFormError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setRefId(json.id as string);
      setStatus("success");
      form.reset();
    } catch {
      setFormError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="lead-success" role="status">
        <div className="lead-success-mark">✓</div>
        <h3>Request received.</h3>
        <p>
          Thanks — we&apos;ll be in touch within one business day to schedule
          your free data audit.
        </p>
        <p className="lead-ref">Reference · {refId}</p>
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

      {formError && (
        <p className="lead-form-error" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary lead-submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Book my free audit"}
        <span className="arrow">→</span>
      </button>
      <p className="lead-note">No obligation · We never share your data.</p>
    </form>
  );
}
