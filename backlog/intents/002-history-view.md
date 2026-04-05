---
status: ready
---

# Archive Diff History View

## Intent
Knowledge artifacts have archived snapshots but no way to see what changed
between them. A "History" view in each component's icon bar should surface
score deltas, added/removed items, and evaluation run summaries across
archived versions. This makes the decay and re-evaluation model visceral —
consumers watch knowledge evolve over time instead of seeing a static snapshot.

## Ontology
Archive — immutable snapshots in `registry/archives/{component}/`.
Evaluation Run — audit trail entries in `RUNS.ts` (ADR-014).
Presentation Layer — this is a new view within existing components.
Component sizing — must render within ADR-012's 600px fixed-height card.

## Done when
- Each component has a "History" view accessible from its icon bar
- History view shows a timeline of archived evaluations with dates and evaluators
- Score changes between adjacent archives are displayed as deltas (e.g. +5, -10)
- Evaluation run summaries (from RUNS.ts) are shown when available
- Verification status badge displayed per evaluation (human-verified vs agent-evaluated)
- View works within the 600px card envelope with scrollable content
- Works with zero run log entries (graceful fallback to archive dates only)
