import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  /** honeypot — real users never fill this */
  website?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  let data: LeadPayload;
  try {
    data = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot: silently accept (and drop) anything that fills the hidden field.
  if (asString(data.website) !== "") {
    return NextResponse.json({ ok: true, id: "ACCEPTED" });
  }

  const name = asString(data.name);
  const email = asString(data.email);
  const company = asString(data.company);
  const message = asString(data.message);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (company.length < 1) errors.company = "Please enter your company.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const lead = {
    name,
    email,
    company,
    message,
    submittedAt: new Date().toISOString(),
  };

  // If a destination is configured, forward the lead there. Otherwise log it
  // server-side so the endpoint is functional out of the box.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[lead] forwarding failed:", err);
      return NextResponse.json(
        { ok: false, error: "Couldn't submit right now. Please try again." },
        { status: 502 }
      );
    }
  } else {
    console.log("[lead] received:", lead);
  }

  const id = "GOR-" + Date.now().toString(36).toUpperCase();
  return NextResponse.json({ ok: true, id });
}
