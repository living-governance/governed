# ADR-016: Open-Core Licensing

**Date:** April 2026
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)

---

## Context

The project needs a clear licensing model as it evolves beyond its initial scope.

## Decision

Living-governance adopts an open-core model.

The infrastructure is MIT-licensed: component framework, CLI tooling, MCP server,
site layout, and governing documents. This is C-07 (forkable) enforced by licensing.

Knowledge data contributed by the project maintainers is currently MIT. As community
expert contributions grow, individual knowledge artifacts may carry their own terms
set by their authors.

Future commercial extensions (additional product features, deployment configurations,
proprietary integrations) will be maintained separately and are not covered by the
MIT license.

The open-source core is fully functional without any proprietary extensions.

## Consequences

- The copy-and-own distribution model (ADR-001) is preserved — MIT is essential
- Contributors know the open-source scope
- C-07 (forkable) is enforced by license, not just policy
- Future commercial features have a clear boundary

## References

- Grafana, GitLab, Supabase: established open-core precedents
- ADR-001: shadcn distribution (requires MIT)
- C-07: Knowledge and Presentation Are Forkable
