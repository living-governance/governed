# ADR-005: Multiple Perspectives with Attribution

**Date:** July 2025
**Status:** ACCEPTED (designed, not yet implemented)
**Deciders:** Tomas (principal architect)

---

## Context

Different security experts legitimately disagree about framework readiness,
threat severity, and mitigation effectiveness. A CISO at a bank evaluates
differently than a startup CTO. Both perspectives have value.

## Decision

Knowledge can carry competing evaluations from different experts. Disagreement
is preserved and attributed, never blended into false consensus.

Each perspective carries full attribution: who evaluated, when, using what
methodology, and what their context was (role, industry, risk appetite).

## Rationale

It is better to have two expert insights that don't agree than one blended
assessment that hides the disagreement.

False consensus is more dangerous than visible disagreement. When a CISO sees
two experts scoring NIST differently, that disagreement IS the signal — it
tells them the framework is contested and they should look deeper.

## Consequences

- Attribution chain enriched: not just "who created" but the full context
  of each evaluator's perspective
- Directly prefigures CPN model where protocols carry expert identity
- Users choose which perspective matches their context
- NOT YET IMPLEMENTED — no multi-perspective data exists yet
- First implementation will likely be framework-coverage with a second evaluator

## Relationship to CPN

In CognitiveRails, this becomes the norm: multiple experts publish competing
protocols for the same domain. The marketplace surfaces attribution and lets
consumers choose. Living-governance is the proving ground for this model.
