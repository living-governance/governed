# ADR-008: Tech Stack

**Date:** July 2025
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)

---

## Context

Living-governance.com is part of a broader portfolio of projects (ai-components.dev,
goguided.ai, threedots.ai, CognitiveRails). Stack consistency across the portfolio
reduces cognitive overhead for both human contributors and AI coding agents.

Key constraints:
- Must support shadcn distribution model (copy-paste components)
- Must deploy cheaply and simply (side project, not enterprise budget)
- TypeScript everywhere for agent-friendliness (single language = less context switching)
- Must support static site generation for Tier 1 components
- Must support server components for future Tier 2 (agency layer)

## Decisions

### Language: TypeScript (strict mode)
**Rationale:** Aligns with C-01 (knowledge is executable TypeScript). Single language
across knowledge, components, CLI, and website. Agents work better without language
context-switching. Type safety catches errors in knowledge structures.

### Framework: Next.js 15 + React 19
**Rationale:** Portfolio consistency. App Router for server components (future agency
endpoints). Static generation for Tier 1 performance. React ecosystem aligns with
shadcn/ui — components are React, distribution model is shadcn.

### Styling: Tailwind CSS v4 + shadcn/ui
**Rationale:** shadcn/ui IS the distribution model reference. Using their UI primitives
for our own site means we dogfood the same approach we recommend. Tailwind v4 for
the portfolio-wide consistency.

### Deployment: Vercel
**Rationale:** Zero-config for Next.js. Free tier sufficient for current traffic.
Preview deployments for PRs. No infrastructure to manage.

### Package Management: npm (not pnpm)
**Rationale:** Simpler than pnpm workspaces for current scale (one app, two packages).
Revisit when monorepo complexity justifies pnpm + Turborepo migration.
Note: CognitiveRails repo-scaffold uses pnpm — different scale, different decision.

### No Monorepo Tooling (Yet)
**Rationale:** Single package.json at root for Next.js, separate package.json in
`packages/frameworks/`. Turborepo adds overhead without enough packages to benefit.
This is deliberate simplicity for current scope, not an oversight.
**Revisit when:** Third package is added or build times exceed 30 seconds.

## Consequences

- Contributors familiar with any portfolio project can work on any other
- Agent coding sessions start productive immediately (familiar stack)
- shadcn/ui alignment means distribution model is validated by our own usage
- Vercel deployment is push-to-deploy with zero configuration
- No pnpm/Turborepo overhead for current two-package setup
