# ADR-006: Knowledge Structure and Categorization

**Date:** August 2025 (supersedes earlier July 2025 hierarchical design)
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)

---

## Context

Early designs used nested folder hierarchies: `landscape/library/systems` or
`vulnerabilities/scanners/monitors/`. This created analysis paralysis about
where to place new knowledge and complex import paths.

## Decision

Flat file structure in `registry/knowledge/`. Industry-recognized categories
(vulnerabilities, frameworks, monitors, etc.) live in component metadata,
not folder hierarchy.

## Rationale

Developer experience drives the structure. A developer says "I need threat data"
and wants `import { threats } from '@governed/threats'` — a flat, predictable path.
They don't care about internal taxonomy. That's metadata's job.

Two layers serve different purposes without conflicting:
- **Repo structure**: Flat, for developer ergonomics and contribution simplicity
- **Metadata categories**: Industry-recognized terms, for discovery and organization

## Alternatives Considered

- **Nested landscape/library/systems**: Earlier July 2025 design — superseded.
  Created folder placement debates and deep import paths.
- **Category-based folders**: Would work but forces premature categorization
  decisions and creates restructuring overhead as categories evolve.

## Consequences

- Simple import paths
- No restructuring needed as components grow
- Metadata does the categorization and discovery work
- Contributors don't need to understand taxonomy to add knowledge
