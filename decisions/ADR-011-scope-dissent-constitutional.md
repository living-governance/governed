# ADR-011: Scope and Dissent as Constitutional Requirements

**Date:** February 2026
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)

---

## Context

Deep research into epistemology and knowledge engineering identified
two missing architectural components for making expert reasoning
recoverable by strangers: scope declaration and internal dissent.

Scope addresses situated cognition's valid objection — decontextualized
knowledge is dangerous when the decontextualization is unmarked.
Dissent reduces blind epistemic dependence — showing what was almost
concluded differently lets consumers calibrate trust at the edges
of reasoning.

## Decision

Both are required fields on all knowledge artifacts, enforced
constitutionally:

- **C-03: Knowledge Declares Its Scope** — every artifact must state
  what it covers AND what it does not cover
- **C-04: Knowledge Preserves Dissent** — artifacts must preserve
  what was considered and rejected, and where uncertainty remains

## Alternatives Considered

1. **Required, enforced by ADR** — rejected, these are fundamental
   enough to be constitutional principles, not implementation decisions
2. **Optional but recommended** — rejected, optional metadata gets
   skipped under time pressure, defeating the purpose

## Consequences

- Existing `framework-coverage.ts` needs `scope` and `dissent` fields added
- All future knowledge artifacts must include both
- ONTOLOGY.md defines Scope and Dissent as entities
- Enforcement table in CONSTITUTION.md includes testable conditions for both
