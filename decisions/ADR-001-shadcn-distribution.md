# ADR-001: shadcn Distribution Model

**Date:** July 2025
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)

---

## Context

Enterprises need to customize governance for their context using their sensitive data.
Traditional package distribution (npm install) creates version lock-in, upgrade friction,
and black-box dependencies that security teams resist.

The shadcn/ui project demonstrated a different model: copy source code into your project,
customize it, own it completely. No package dependencies.

## Decision

Copy-based distribution is the primary delivery mechanism for @governed components.
Users run `npx @governed/cli add [component]` and get full source code in their project.

## Alternatives Considered

- **npm-only packages**: Rejected — enterprises can't customize, black-box concern
- **Hosted SaaS**: Rejected — "I can't send agent data to a SaaS" was consistent objection
- **Framework with plugins**: Rejected — too much vendor lock-in, plugin API becomes constraint

## Consequences

- Users own source code completely. No version lock.
- Higher initial setup cost compared to `npm install`.
- CLI tool required for good developer experience.
- Extended the shadcn model beyond UI to full-stack components (knowledge + presentation + agency).
- Every developer who hears "shadcn for governance" gets it instantly.

## Relationship to Other Decisions

- Extended by ADR-002 (dual distribution adds npm as second channel)
- Enables C-07 (fork-friendly by design)
