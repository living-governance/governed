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

## Deep links — expert as publication channel

A single overlay URL is a business card. A stream of threat-specific
URLs is a publication channel.

URL hierarchy:
- `/by/xrae` — full COP overlay (the lens)
- `/by/xrae/threat/rag-poisoning` — deep dive on one threat
- `/by/xrae/incident/mcp-tool-server-data-exfiltration` — their analysis of a specific incident

Each deep link is self-contained, shareable, citable. An expert publishes
`/by/xrae/threat/rag-poisoning` the day the threat drops — their severity
assessment, which frameworks cover it, which incidents demonstrate it,
what to do on AWS. That URL gets shared in Slack channels, linked in
incident response threads, cited in board reports.

This is an expert blog with structured intelligence underneath instead
of prose. The expert doesn't write markdown — they evaluate structured
data, and the platform renders it as a shareable page with full context.

A CISO bookmarks the expert, not the platform — but the platform is
where the data lives. RSS-able. Quotable. Continuous.

URL naming uses human-readable slugs derived from the threat/incident
name, never internal IDs. The slug is the SEO surface and the thing
people read in Slack previews.

## Expert input — two paths, same structured output

Both paths produce the same thing: an ExpertEvaluation attached to a
knowledge artifact. Severity, rationale, framework coverage opinion,
recommended mitigations — typed data, not prose.

**Site path (low-friction onramp):**
Expert sees a threat or incident on the COP. Clicks an annotation icon
next to it. Chat panel opens with context ("You're looking at TM-001:
Memory & Context Poisoning"). Expert types their take in natural language.
The system structures it into an evaluation. Published immediately to
their `/by/{handle}` surface.

Friction level: same as posting on LinkedIn. Output: structured
intelligence instead of prose.

**MCP path (power path):**
Expert has Claude Desktop / Cursor connected to the living-governance
MCP server. A new ATLAS technique drops. Their AI surfaces it, they
discuss it, and say "publish my assessment." The MCP server receives
a structured evaluation via `submit_evaluation` tool. Their deep link
page updates immediately. No browser needed. Fits into existing workflow.

Both paths keep the flow going. No PRs, no review queues, no forms.
The expert reacts and publishes. The platform structures and distributes.

## Distribution — why this beats a blog post

**Speed.** A Medium post about RAG poisoning takes hours. Here the expert
reacts to structured data that already exists. They add judgment, not
context. Five minutes, not five hours.

**Credibility.** A blog post is prose. This is a structured assessment
backed by linked incidents, framework coverage mappings, and specific
AWS mitigations — all verifiable. A CISO can click through to the
incident, check which frameworks agree, verify the sources. Opinion
layered on evidence, not floating next to it.

**Compounding.** A blog post is a snapshot that decays. The overlay is
a living surface — when new incidents validate the assessment, the data
updates underneath the commentary. Every evaluation makes the `/by/xrae`
surface richer. Blog posts don't connect to each other. Expert
evaluations compose into a body of work.

And every evaluation they add makes their `/by/xrae` surface richer.
Medium posts don't connect to each other. Expert evaluations compose
into a body of work.

The expert still writes the blog post for long-form narrative. But they
link to their deep link as the evidence. The blog is the story. The
overlay is the proof.

## Sharing flow

Deep link URLs carry OpenGraph metadata: expert name, threat title,
severity badge, their take as the description, COP visual as the image.
Paste the URL on LinkedIn and the preview card renders itself.

The annotation flow ends with: "Published → Share on LinkedIn?" and
pre-composes the post with the deep link. One click to evaluate, one
click to distribute.

## Open questions

- How does an expert submit evaluations? (PR workflow? Dedicated tool?)
- Do experts see each other's overlays? (builds healthy competition)
- Minimum evaluation cadence to keep the URL active?
- How to handle expert disagreement on the same section?
- Slug generation: auto from title or expert-chosen?
- Do deep links show the full OODA context or just the relevant section?
