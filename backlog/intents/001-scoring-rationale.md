---
status: ready
---

# Machine-Readable Scoring Rationale

## Intent
Evaluation reasoning in framework-coverage is currently in inline comments.
Make it structured and machine-readable so agents and consumers can query
why a score was assigned, not just what the score is.

## Ontology
Knowledge Artifact — every scored evaluation must include structured
rationale (AGENTS.md Rule 5). Self-Awareness Metadata — methodology
transparency requires knowing how scores were derived. Archive entity —
archive before modifying knowledge (AGENTS.md Rule 7).

## Done when
- Every scored evaluation has a `scoringRationale` field with structured
  data (dimension, score, reasoning)
- TypeScript type exported for the field
- Previous inline comments migrated into structured fields
- Archive created before modification
- No information lost
