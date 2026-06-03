# Ratio — Landing Page

A dark-first, editorial landing page for **Ratio**, a hand-built, human-verified
semantic layer for AI. Built with **Next.js (App Router) + TypeScript**.

The design language runs on a single tension: **red = guessing/wrong**,
**green = verified/right**, with **gold** as the brand/CTA layer on top.

## Signature moments

- **Cursor-reactive background** — a live "data network" of nodes drawn on
  `<canvas>`. They drift in muted red-grey (guessing); the cursor casts a gold
  "verification field" that lights nearby nodes and sends sparks along the edges.
- **A custom gold cursor** that swells into a ring over interactive elements.
- **Interactive A** (hero) — pick a question, watch the raw LLM guess a table and
  stamp `⚠ unverified`, while Ratio returns one clean `✓ verified` number plus the why.
- **Interactive B** — a 4-beat reel of a metric going from machine guess →
  human strikes the wrong ones → clean verified card, with a scrubber + metric switcher.
- **Interactive C — the Glass Box** — peels open answer → SQL → definition → owner.
- Plus the draw-in trust-gap chart, flowing node diagram, scroll-filling stepper,
  before/after proof toggle, count-ups, FAQ accordion, and a grain-shifting CTA band.

All motion respects `prefers-reduced-motion`, and the layout stacks cleanly on mobile.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
```

## Architecture

- `app/layout.tsx` — fonts (Geist, Geist Mono, Inter), metadata, global styles.
- `app/page.tsx` — composes the 14 sections (server components) + the client runtime.
- `app/globals.css` — design tokens (color, type, spacing) + shared primitives.
- `app/sections.css` — per-section and per-interactive styles.
- `components/*` — one server component per section (static, accessible markup).
- `components/RatioRuntime.tsx` — `"use client"` component that runs the imperative
  scripts exactly once after hydration (guarded against Strict Mode double-invocation).
- `lib/ratioRuntime.js` — the ported background canvas, interactives A/B/C, UI wiring,
  and final-CTA grain, kept as framework-agnostic DOM code.

## Lead form

The data-audit form (`components/LeadForm.tsx`) validates input client-side,
ignores honeypot spam, then opens the visitor's email client with a pre-filled
message to `hello@ratio.com` via a `mailto:` link — no backend required. To
change the destination address, edit `CONTACT_EMAIL` in `components/LeadForm.tsx`
(and the footer / legal-page links). If you later want server-side capture
(CRM, Slack, a database), swap the `mailto:` handler for a POST to a form
service or an API route.

## Configuration

- `NEXT_PUBLIC_SITE_URL` — canonical site origin used for metadata / Open Graph
  (defaults to `https://ratio.com`).

## Notes

All copy is production-ready: no `[FILL]` placeholders, no dead links, and every
button is wired (nav/CTA anchors, FAQ accordion, before/after toggle, the three
interactives, and the lead form). The figures in the "hidden cost" section are
framed as general industry observations — swap in your own verified numbers and
a real customer quote in `components/Proof.tsx` whenever you have them.
