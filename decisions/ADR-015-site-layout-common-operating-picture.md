# ADR-015: Site Layout — Common Operating Picture

**Date:** April 2026
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)

---

## Context

The living-governance.com site renders two 600px card components side-by-side (desktop)
or stacked (mobile). Each card has an icon bar switching between ~8 views. This means
~15 views of valuable data are hidden behind two small icon bars — a visitor sees exactly
2 of 15 views on landing.

Three problems:

1. **Information is buried.** Most visitors won't discover the methodology matrix, coverage
   gaps, evaluation history, or cloud guidance unless they click every icon.
2. **Desktop wastes space.** Two cards centered with empty margins leave the majority of
   the viewport unused.
3. **Mobile is hostile.** Scrolling through cards, then within cards, creates
   frame-in-frame dead zones and imprecise touch targets.

The cards were designed as self-contained, embeddable components (ADR-001, ADR-012).
They work well when copied into someone's dashboard. But as the *site*, they are a
narrow keyhole into rich data.

**What changed since ADR-012:** We now have an MCP server (`living-governance.com/api/mcp`)
exposing the same knowledge as machine-consumable tools. The site's role is shifting from
"the only way to see this data" to "the canonical human interface alongside the machine
interface." That raises the bar for the human experience.

## Decision

### The site becomes a Common Operating Picture (COP)

The site layout is redesigned as a full-page, data-dense dashboard — a Common Operating
Picture for AI governance posture. This borrows the COP concept from military/defense
operations (Palantir Gotham, NATO C2 systems) where all relevant data is spatially
organized on a single surface with no hidden states.

The embeddable cards (ADR-012) are not removed. They move to a dedicated Components view
accessible via the activity bar, demonstrating what you get when you copy them into your
project. The COP is the site. The cards are the distribution story.

### Design principles

**1. Data first, marketing second.**
No hero sections with gradient backgrounds. No "Learn more" buttons above the fold.
The first thing a visitor sees is live data — framework coverage percentages, threat
counts, risk posture. Enterprise and defense buyers are trained on Grafana, Datadog,
and Palantir. They expect density.

**2. F-pattern hierarchy.**
Layout follows the F-shaped reading pattern (per Palantir Workshop guidelines):
horizontal scanning from the top-left, vertical scanning down the left edge. Navigation
anchors left or top. Content flows right and down.

**3. Everything discoverable, nothing hidden — but not everything is equal.**
Content falls into three tiers:

- **Primary intelligence** (full sections, visible on scroll): framework coverage,
  threats, coverage gaps, evaluation history. This is what the visitor came for.
- **Credibility metadata** (inline signals that expand in place): sources, methodology,
  confidence scores. These answer "how do you know this?" Each primary section carries
  a compact credibility line that expands an accordion in place when clicked. No
  separate page, no modal, no nested scroll — just a disclosure that pushes content
  down.
- **Action/integration** (dedicated sections, lower on page): MCP setup, cloud
  guidance. These answer "what do I do with this?"

**4. No frame-in-frame.**
No scrollable containers inside scrollable containers. The page scrolls. Content within
sections reflows or truncates but does not independently scroll on the primary layout.
Exception: data tables may have horizontal scroll on narrow viewports. Exception: the
chat panel has its own scroll as a separate panel.

**5. Grouped widget sections.**
Related data groups into visually distinct sections with bordered headers (following
the Datadog "widget groups" pattern). Sections share the same scroll surface.

**6. Three density modes.**
- **COP mode** (the site): Full-width, report-style, generous section spacing.
- **Compact mode** (embeddable cards): ADR-012's 600px fixed-height cards. Optimized
  for dashboard embedding.
- **MCP mode** (machine interface): JSON/tool responses via the MCP server. No layout.

All three consume the same `registry/knowledge/` layer.

**7. The AI interface is first-class.**
A collapsible chat panel allows visitors to query the knowledge layer in natural
language. The chat panel uses the same MCP tools as external AI assistants.

Two access paths:
- **Built-in chat** (on-site): Query the knowledge directly.
- **Bring your own AI** (off-site): Connect Claude Desktop, Cursor, or any MCP client
  to `living-governance.com/api/mcp`.

Design constraints:
- Hidden by default. The COP is the primary experience.
- Reflow, not overlay. When open, COP content reflows narrower.
- Placeholder first. Phase 0 shows MCP tools list and config snippet.

**8. Expert attribution is structural, not decorative.**
Every evaluation, score, and assessment is attributed to a named expert. Each data
point carries its evaluator's identity, methodology, and perspective.

### Information hierarchy — first 5 seconds

```
┌─────────────────────────────────────────────────────────┐
│  (Alert banner — only visible at CRITICAL state)        │
├─────────────────────────────────────────────────────────┤
│  Status Strip                                           │
│  [Coverage: 52%] [Threats: 15] [Eval: 3d] [MCP: 6] [●] │
├─────────────────────────────────────────────────────────┤
│  Living Governance — Executable AI governance infra     │
├─────────────────────────────────────────────────────────┤
│  [Status / Coverage / Threats / Gaps / History / Cloud] │
│  Expert lens: [Consensus] [@tomas] [@sarah] [@marc] [+] │
├─────────────────────────────────────────────────────────┤
│  Framework Coverage Matrix (full-width, color-coded)    │
└─────────────────────────────────────────────────────────┘
```

### Posture indicator and alert banner

Three states following the CIS alert level model:

**NOMINAL:** Green badge, no banner. Absence is the signal.
**ELEVATED:** Amber badge with tinted background. No banner.
**CRITICAL:** Red badge + full-width alert banner above the status strip with pulsing
dot (the only animation on the site), specific threat name/CVE, recommended actions.

State transitions computed from `max(severity)` of unmitigated threats with active
exploitation, triggered by the re-evaluation system (ADR-014).

### Expert lens and community champions

The COP surfaces evaluations through an expert lens selector in the sticky nav.
Visitors can view data through different expert perspectives — different scoring
methodologies, different priorities, different commentary.

**Consensus view (default):** All evaluations merged. Scores represent community
consensus. Credibility lines list all contributing evaluators.

**Expert lens view:** Scores shift to that expert's evaluation. Sections they didn't
evaluate dim. Expert commentary appears as annotated notes. Bio card shows domain,
affiliation, and evaluation count.

**Community champion model:** Experts "own" sections by committing to evaluation
cadence. The [+] button serves dual purpose: "build your own expert team" (visitors)
and "become an expert" (contributors).

### Below the fold — section order

**Primary intelligence sections:**
1. Threat Landscape
2. Coverage Gaps
3. Evaluation History

**Action/integration sections:**
4. Cloud Guidance
5. MCP Integration

### Activity bar

48px vertical icon bar on the left edge. Switches between views:
- Dashboard (COP) — default
- Components — embeddable card library with copy instructions

Also: Chat toggle, MCP connection, Theme, Profile, Settings.

On mobile: collapses to bottom tab bar (Dashboard, Components, Chat, Profile).

### Navigation

Sticky horizontal nav bar within the COP, sharing its row with the expert lens
selector. Section anchors on the left, expert lens on the right.

Activity bar switches views. Sticky nav scrolls within the COP.
On mobile: horizontally scrollable pill bar.

### Desktop layout

```
┌──┬──────────────────────────────────────┬──────────────┐
│  │ [Sticky Nav: sections] [Expert lens] │ Chat         │
│ A├──────────────────────────────────────┤              │
│ c│  Status Strip + KPIs                 │              │
│ t│  Framework Coverage                  │              │
│ i│  @tomas · @sarah · @marc            │              │
│ v│  Threats        │ Mitigations        │              │
│ i│  Gaps           │ Architecture       │              │
│ t│  History (evaluator avatars)         │              │
│ y│  Cloud          │ MCP Integration    │              │
│  │                                      │              │
└──┴──────────────────────────────────────┴──────────────┘
```

### Mobile layout

Single column. Activity bar → bottom tab bar. Each section full-width.
Chat → bottom sheet (swipe-up, ~60% viewport).
Touch targets: minimum 44px (Apple HIG).

### Chat panel — implementation phases

**Phase 0 (now): Design placeholder.**
Toggle button and panel shell. Shows MCP tools list, Claude Desktop config snippet,
"built-in chat coming soon" indicator, "connect your own AI" call-to-action.

**Phase 1: Built-in reactive chat.**
Connects to an AI backend using the same MCP tools the site exposes.

**Phase 2: Context-aware chat.**
Receives context about the visitor's current scroll position and selected expert lens.

Further phases will be documented in separate ADRs as they are designed.

## Relationship to Other Decisions

- **ADR-012 (Component Sizing):** Unchanged. Cards appear in the Components view.
- **ADR-001 (shadcn Distribution):** Reinforced. COP demonstrates data quality;
  Components view demonstrates the distribution model.
- **ADR-014 (Autonomous Re-evaluation):** Evaluation History section makes
  re-evaluation visible. Re-evaluation drives posture state transitions.
- **ADR-016 (Open-Core Licensing):** This ADR covers visible product features.
  Commercial architecture decisions are documented separately per ADR-016.
- **C-06 (Self-contained components):** Components remain self-contained.

## Consequences

### Positive
- All primary intelligence visible without clicking
- Credibility metadata accessible inline with named expert attribution
- Expert lens provides "data through expert eyes"
- Community champion model creates ownership and social sharing incentives
- Enterprise/defense visitors see a familiar COP pattern
- Mobile works naturally — single-column flow, no frame-in-frame
- Activity bar separates view-switching from section-scrolling cleanly
- Desktop viewport used fully

### Negative
- More front-end work than the current 2-card grid
- Expert lens adds complexity to the data layer
- Community champion recruitment requires active outreach

### Risks
- COP layout may evolve faster than card layout, creating drift
- Expert lens could create confusion if experts disagree significantly
- Champion attrition — mitigated by confidence/decay system (ADR-004, ADR-014)

## Alternatives Considered

1. **Full IDE-style three-panel layout** — Rejected as primary layout. Chat panel
   and activity bar extracted from this concept.
2. **Multi-page site** — Rejected. Fragments the COP.
3. **Sidebar navigation** — Rejected. "Pick one" interaction hides content.
4. **More cards in a grid** — Rejected. Worsens the icon-bar discovery problem.
5. **Separate Methodology/Sources sections** — Rejected. Credibility metadata
   co-locates with claims via inline accordions.
6. **Chat as modal/overlay** — Rejected. Must reflow, not cover.
7. **Chat only via external AI** — Rejected. Built-in chat is zero-friction tryout.
8. **Permanent "all clear" alert banner** — Rejected. Absence is the signal.
9. **Anonymous evaluations** — Rejected. Named attribution is the credibility
   architecture.

## References

- Palantir Workshop: F-pattern hierarchy, section-based layouts, density modes
- Palantir Gotham: Common Operating Picture concept
- Palantir Mobile: Flow layout, no collapsible panels
- Datadog: 12-column grid, widget groups, high-density mode
- Grafana: Responsive panel grid, mobile linearization
- VS Code / Cursor: Activity bar, collapsible chat panel
- CIS Alert Level System: Absence as signal
- ADR-012: Component Sizing (governs cards, not site)
- ADR-014: Autonomous Re-evaluation (drives posture transitions)
- ADR-016: Open-Core Licensing (governs public vs. internal split)
