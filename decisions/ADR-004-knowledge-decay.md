# ADR-004: Knowledge Decay and Update Instructions

**Date:** July 2025 (enriched February 2026)
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)
**Transfers to:** CognitiveRails/CPN protocol design

---

## Context

Governance knowledge goes stale. A framework evaluation from six months ago may be
wrong today. Security threat intelligence decays faster than compliance guidance.
Tax knowledge decays annually around fiscal events. Clinical protocols decay when
new trial data publishes.

No automated system can know when specific domain knowledge becomes unreliable.
Only the expert who created it understands the domain's rhythm.

## Decision

Every knowledge artifact carries:

1. **`validDays`**: Author-defined validity period. The expert sets how long they
   trust their own assessment.

2. **Confidence decay**: Computed from validDays and creation date.
   - Fresh (≤30% of validity elapsed)
   - Aging (≤70% of validity elapsed)
   - Expired (>70% of validity elapsed)

3. **`isStale()` and `getConfidenceStatus()`**: First-class functions on every
   knowledge object. Knowledge actively knows its own freshness.

4. **`updateInstructions`**: Human-readable steps that both humans and AI agents
   can follow to refresh the data.

## The Update Instructions Innovation

`updateInstructions` is more than "how to refresh." It captures:

- **What to check**: Which sources, endpoints, publications to review
- **How the knowledge was originally derived**: The methodology, not just the conclusion
- **When to trigger review**: Domain-specific events ("when Finance Act amendments pass,"
  "when NIST publishes final version," "when new OWASP release announced")

This enables:
- **Methodology review**: Not just "is the data still correct?" but "is the approach
  still sound?" An expert reviewing stale knowledge can verify both.
- **Automated preparation**: An AI agent can follow the instructions as preparation,
  gathering updated sources — but the human verifies the final assessment.
- **Natural escalation trigger**: When a protocol's update conditions fire and nobody
  has refreshed it, surface the human expert. This directly becomes P4 (Escalation
  is a Feature) in CognitiveRails.

## Alternatives Considered

- **Fixed TTL for all knowledge**: Rejected — one-size-fits-all is useless across domains
- **No expiry**: Rejected — stale knowledge presented as current is dangerous
- **Automated polling of source websites**: Rejected — fragile, expensive, can't validate
  meaning changes. The update mechanism IS the value, not the automation.
- **Separate human/AI instruction sets**: Rejected — unnecessary duplication. AI can
  follow human-readable instructions. Single set keeps mental model simple.

## Consequences

- Human verification is always the final gate. Automation prepares, humans verify.
- Authors who set shorter validDays signal higher-velocity domains.
- Competitive moat: no model-only competitor can know that a specific tax protocol
  becomes unreliable after a specific regulatory deadline.
- Directly transferable to CPN protocols where experts embed their own decay curves.
- Expert-authored update instructions make deterministic economics (CognitiveRails P3)
  more defensible — selling maintained knowledge with a defined freshness contract.

## Transfer to CognitiveRails/CPN

This mechanism, field-tested in living-governance since July 2025, becomes core
infrastructure in CognitiveRails:
- Protocol authors set their own decay curves
- `updateInstructions` become the expert's self-documentation of their reasoning process
- Stale protocols create natural demand for escalation (P4)
- Attribution enriched: not just "who created" but "who last verified still valid"

See: inbox note "ADR-008 Living Knowledge Primitives for CognitiveRails"
