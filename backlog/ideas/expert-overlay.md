# Expert Overlay — URL-addressable expert lens

Network effect mechanism: security experts get a personal URL on
living-governance.com that shows the COP through their evaluation lens.

## The URL

`living-governance.com/by/{handle}` (e.g., `/by/xrae` for Christopher Rae).

Path over subdomain — works with Next.js routing today, no wildcard DNS,
relationship is clear: their view *of* the same data.

## What the overlay shows

Same COP, same OODA flow, but through the expert's lens:
- Their scores where they differ from consensus
- Their commentary on each section (why they diverge)
- Sections they didn't evaluate dimmed (~35% opacity)
- Their bio card below the identity line (domain, affiliation, evaluation count)
- The OODA sections remain — expert opinion applies at every phase

The base data is identical. The interpretation changes. The URL is a
permalink to their professional judgment.

## Why experts share it

"I evaluated and guarantee this data" is a publishable claim. The URL
becomes part of their professional identity — LinkedIn, conference talks,
advisory engagements, GitHub profiles. Every share brings a new audience
to the platform.

Experts don't just contribute data — they get a distribution surface.
That's what creates the network effect.

## Connection to existing architecture

- ADR-015 expert lens selector already specifies per-expert view switching
- `evaluatedBy` field exists on all knowledge artifacts
- CPN/wrens.ai bridge: `@handle` starts here, becomes cross-site when
  wrens.ai launches
- Community champion model (ADR-015): experts "own" sections by committing
  to evaluation cadence
- Monetization tier mapping (internal ADR-015): free=consensus, pro=expert
  lens with full methodology, verified=escalation to human expert

## Implementation shape

- `app/by/[handle]/page.tsx` — dynamic route, same COP layout
- Expert profile data in registry or separate store
- Overlay logic: merge expert scores over consensus, render commentary
  as annotated notes below each section
- The [+] button in the expert lens selector links to "become an expert"
  contribution guide

## Open questions

- How does an expert submit evaluations? (PR workflow? Dedicated tool?)
- Do experts see each other's overlays? (builds healthy competition)
- Minimum evaluation cadence to keep the URL active?
- How to handle expert disagreement on the same section?
