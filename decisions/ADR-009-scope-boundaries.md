# ADR-009: Scope Boundaries — Knowledge About Tools, Not Tool Hosting

**Date:** July 2025
**Status:** ACCEPTED (provisional — open for revision with agency layer)
**Deciders:** Tomas (principal architect)

---

## Context

The AI security ecosystem includes many external tools: MCP-Scanner, various
vulnerability scanners, compliance checkers, monitoring platforms. The question:
should living-governance host, wrap, or orchestrate these tools, or provide
knowledge ABOUT them?

## Decision

For Tier 1 (current): We provide knowledge ABOUT external tools — documentation,
contextualization, evaluation, comparison. We do not host, wrap, or proxy
external tools.

## Rationale

- **Maintenance burden**: Wrapping external tools creates dependency on their
  APIs, update cycles, and availability. We'd become responsible for their uptime.
- **Unique value**: Our value is evaluation and context, not tool hosting.
  "How does MCP-Scanner compare to alternatives?" is a question only we answer.
  Running MCP-Scanner is something anyone can do.
- **Focus**: Keeps scope manageable for current team (one architect + AI agents).

## Open for Revision

This is explicitly a **Tier 1 scope constraint**, not an architectural principle.

The three-layer architecture (ADR-003) includes an **agency layer** that could
orchestrate external tools as part of Tier 2 delivery. When the agency layer
is implemented, this decision should be revisited:

- Agency components could wrap external scanner APIs
- Monitoring agents could poll external threat feeds
- Validation agents could cross-reference multiple tools

The decision then becomes: which tools provide enough value to justify the
maintenance cost of wrapping them?

## Alternatives Considered

- **Host external tools**: Rejected for Tier 1 — maintenance burden too high
- **Become a tool marketplace**: Rejected — different product entirely
- **Full integration layer**: Rejected for now — agency layer not yet built

## Consequences

- Clean scope for MVP
- Clear value differentiation (we evaluate, we don't replicate)
- External tool authors aren't threatened (we complement, not compete)
- Future agency layer has a clear expansion path when ready
