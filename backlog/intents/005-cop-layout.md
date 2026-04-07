---
status: done
---

# Common Operating Picture layout for living-governance.com

## Intent
Replace the two-card centered layout with a full-width COP dashboard.
ADR-015 describes the target: activity bar, status strip, alert banner,
sticky section nav, COP section wrappers with credibility lines, and a
chat panel placeholder (Phase 0). All primary intelligence visible on
scroll, no hidden states.

The site becomes the canonical human interface alongside the MCP machine
interface. Enterprise/defense visitors see a familiar COP pattern.

## Ontology
- **Component layers** (ONTOLOGY.md § Layers): COP is presentation layer
  for existing knowledge artifacts. Knowledge layer unchanged.
- **Three density modes** (ONTOLOGY.md § Tiers): COP mode (site),
  Compact mode (cards in Components view), MCP mode (API).
- **Self-contained components** (C-06): Distributable cards move to
  Components view, keep direct registry/knowledge/ imports.
- **Single authoritative source** (C-05): New site-layer components
  import through lib/knowledge.ts seam, not directly from registry/.
- **Stranger test** (C-08): COP layout makes all primary intelligence
  discoverable without clicking through icon bars.

## Done when
1. lib/knowledge.ts seam exists; MCP route and all new layout components import through it
2. Activity bar switches between Dashboard and Components views
3. Status strip shows 5 live KPIs derived from knowledge layer
4. Alert banner renders only at CRITICAL posture
5. Sticky section nav with scroll-aware active state
6. COP section wrappers with credibility lines and inline methodology accordions
7. page.tsx implements the full COP layout (activity bar + main + chat slot)
8. Chat panel placeholder (Phase 0) with MCP tools list and config snippet
9. All components are "use client" with no server-only dependencies
10. `npx next build` passes
