# ADR-002: Dual Distribution (CLI + NPM)

**Date:** July 2025
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)
**Supersedes:** Original CLI-only plan

---

## Context

After deciding on shadcn-style distribution (ADR-001), we discovered that different
users need different consumption models for the same knowledge:

- Dashboard builders want full components (knowledge + presentation)
- Analysts want importable data for slides, notebooks, scripts
- Tool builders want composable modules for integration
- AI agents want structured data they can reason about

A single distribution channel couldn't serve all of these.

## Decision

Offer BOTH distribution channels for the same knowledge:
- `npx @governed/cli add [component]` → Full component (knowledge + presentation layers)
- `npm install @governed/[package]` → Knowledge layer only

Same knowledge, two consumption models. The registry is the single source for both (C-05).

## Alternatives Considered

- **CLI-only** (original plan): Rejected — analysts shouldn't need to copy React components to get data
- **NPM-only**: Rejected — loses the fork-friendly, own-your-code advantage
- **API-only**: Rejected — runtime dependency, not fork-friendly

## Consequences

- Two distribution channels to maintain
- Registry-as-truth (C-01) becomes critical — both channels derive from same source
- Version sync is manual by design — registry updates more frequently than npm releases
- Different cadences are intentional, not a bug
- `@governed/frameworks` v0.2.0 published February 2026 validates this model
