# ADR-003: Three-Layer Component Architecture

**Date:** July 2025
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)

---

## Context

We needed to organize executable knowledge in a way that was immediately intuitive
to developers yet scaled to support autonomous agents and live monitoring.

The question: "How do we structure a component that might be just data today,
a dashboard tomorrow, and an autonomous monitor next quarter?"

## Journey to the Decision

Iterated through several models before arriving at three layers:

1. **Flat vs Hierarchical**: Considered flat structure for simplicity but realized
   different aspects of knowledge serve different purposes.
2. **Components vs Artifacts**: Briefly considered "artifacts" but settled on
   "components" — familiar to developers, implies composability, not archaeological.
3. **MVC / MVP**: Considered standard UI patterns but they don't capture autonomy.
4. **The realization**: ALL governance knowledge naturally decomposes into three
   concerns: what it knows, how it shows, and how it acts.

## Decision

Every component has up to three optional layers:

- **Knowledge** (required): Core data, logic, evaluation methodology, confidence
  scoring, update instructions. The thing that makes the component valuable.
- **Presentation** (optional): How to display or interact with the knowledge.
  React components, visualizations, CLI output, APIs that expose data.
- **Agency** (optional): How the component acts autonomously. Monitoring,
  validation, automated preparation-for-review, APIs that fetch or update.

Not every component needs all three layers. That is a feature, not a problem.

## Key Design Insights

**API placement**: An API that exposes data is presentation. An API that
fetches or updates external data is agency. "It depends on what the API does."

**Maps to delivery tiers**: Tier 1 (static, ships today) = knowledge + presentation.
Tier 2 (AI-powered, future) = adds agency layer.

**Maps to distribution**: `npm install` delivers knowledge only. `npx @governed/cli add`
delivers knowledge + presentation. Agency is deployed in customer environment.

**The ontology is the gold**: Knowledge / Presentation / Agency is how you think
about ANY executable knowledge, not just governance. This ontology transfers
directly to CognitiveRails/CPN protocol structure.

## Alternatives Considered

- **Single structure**: Rejected — conflates data with display with automation
- **Many specialized types**: Rejected — cognitive overhead for contributors
- **MVC**: Rejected — Controller doesn't capture autonomous agency

## Consequences

- Progressive enhancement is natural: start knowledge-only, add layers as needed
- Clean separation enables dual distribution (ADR-002)
- Contributors can add a presentation layer to someone else's knowledge
- Agency layer deferred to Tier 2 without blocking Tier 1 delivery
- Self-contained principle (C-03) applies within each layer
