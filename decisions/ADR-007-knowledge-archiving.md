# ADR-007: Knowledge Archiving and Evolution History

**Date:** August 2025 (formalized February 2026)
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)

---

## Context

Knowledge updates overwrite previous evaluations. Without deliberate archiving,
the evolution of understanding is lost. Why did MITRE's score go from 85 to 90?
When did NIST move from draft to final? What did the threat landscape look like
six months ago?

Most knowledge systems capture only current state. The trajectory of understanding
— how evaluations evolved, what changed, what stayed stable — is typically lost
in git history where it's implicit and hard to query.

## Decision

Before updating any knowledge file in `registry/knowledge/`, archive the current
version to `registry/archives/{component-name}/{YYYY-MM-DD}.ts`.

Archives are byte-identical copies of the file at that point in time. They are
never modified after creation.

### Current Archives
```
registry/archives/
└── framework-coverage/
    ├── 2025-04-15.ts    # Initial evaluation (archived before Q3 update)
    └── 2025-08-10.ts    # Q3 2025 version (archived before Feb 2026 update)
```

## Why Not Just Git History?

Git history captures every change but:
- Requires git tooling to access — not composable as TypeScript
- Diffs show what changed line-by-line, not what the evaluation *meant* at that point
- Can't be imported, queried, or compared programmatically
- External consumers (npm users) never see git history

Archives as `.ts` files are themselves executable knowledge — importable,
diffable at the semantic level, and available to any consumer.

## Future: Historian Services

A whole category of services can be built on evolution history:
- **Trend analysis**: How has framework readiness changed over time?
- **Velocity tracking**: Which frameworks are improving fastest?
- **Stability indicators**: Which evaluations haven't changed in a year?
- **Narrative generation**: "MITRE ATLAS expanded from 15 to 16 tactics in Q4 2025"

These evolutions are typically not captured by anyone explicitly. The archive
pattern makes them first-class queryable data.

## Archive Policy

| Question | Answer |
|----------|--------|
| When to archive? | Before every knowledge update, no matter how small |
| Naming convention | `{YYYY-MM-DD}.ts` using the date of the content being archived |
| Can archives be modified? | Never. They are historical snapshots. |
| Can archives be deleted? | Only if the knowledge itself was retracted (rare) |
| Where do they live? | `registry/archives/{component-name}/` |

## Consequences

- Audit trail for every knowledge change
- Historical comparison is trivial (`diff archives/2025-08-10.ts archives/2026-02-20.ts`)
- Evolution narrative becomes a feature, not archaeology
- Storage grows linearly — acceptable for knowledge files (small, infrequent updates)
- Enforced by AGENTS.md Rule 7 (archive before update)
