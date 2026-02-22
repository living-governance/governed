# ONTOLOGY
## @governed / living-governance.com — Domain Model

> This file defines what exists in this project, how things relate,
> and what rules govern them. It is the shared contract between humans,
> agents, and co-founders. The constitution says WHY. This file says WHAT.

Last reviewed: 2026-02-22

---

## Entities

### Component

A self-contained, distributable building block. Contains up to three
layers (knowledge, presentation, agency). Always includes full source
code. Works in complete isolation — no sibling dependencies.

Components are the units this project produces and distributes.
Not all knowledge is a component, but all components contain knowledge.

### Knowledge Artifact

A file in `registry/knowledge/` that exports structured, typed data.
The atomic unit of executable knowledge. Every knowledge artifact
carries self-awareness metadata, scope, and dissent.

Distinguished from governance files (CONSTITUTION, ONTOLOGY, METHODOLOGY,
AGENTS, CLAUDE, CONTRIBUTING) which guide the project but are not
distributed as products.

### Layers

Every component has up to three layers:

- **Knowledge** (required): data, logic, methodology, confidence,
  update instructions. The thing that makes the component valuable.
- **Presentation** (optional): how to display or interact with
  knowledge. React components, visualizations, APIs that expose data.
- **Agency** (optional): how the component acts autonomously.
  Monitoring, validation, APIs that fetch or update external data.

An API that exposes data is presentation. An API that fetches data
is agency. The distinction is direction: outward (presentation) vs
inward (agency).

Not every component needs all three layers. Knowledge-only components
are complete and valuable on their own.

### Tiers

Layers map to delivery tiers:

- **Tier 1** (static): knowledge + presentation. Ships today.
  Baked in at build time. No backend. Unconditionally forkable.
- **Tier 2** (live): adds agency layer. May take any form —
  autonomous agents, hosted services, partner integrations.
  Removing Tier 2 never breaks Tier 1.

### Self-Awareness Metadata

Every knowledge artifact declares:

- **Who**: attributed evaluator with identity
- **When**: creation date, last update date
- **Validity**: how long the author trusts this conclusion (`validDays`)
- **Confidence**: computable status derived from validity
- **Methodology**: how the knowledge was originally derived
- **How to update**: what to check and how to re-derive

Knowledge without self-awareness is data, not knowledge.

### Confidence Status

Computed from elapsed time against the author's validity window:

- **Fresh** (≤30% elapsed): high trust
- **Aging** (≤70% elapsed): still valid, review approaching
- **Expired** (>70% elapsed): re-evaluation needed

Authors understand their domain's rhythm better than any automated
system. The validity window is theirs to set.

### Scope

What a knowledge artifact covers AND what it does not cover. Every
artifact declares both `appliesTo` and `doesNotApplyTo`.

Decontextualized knowledge is dangerous when the decontextualization
is unmarked. Scope is the engineering response — explicitly encoding
where reasoning has authority and where it does not.

### Dissent

What was considered and rejected, and why. Where uncertainty remains.

A stranger calibrates trust at the edges of reasoning, not at the
center. Showing what was almost concluded differently is more valuable
than showing only what was concluded.

### Registry

`registry/knowledge/` — source of truth for all knowledge. Flat file
structure. Categories live in component metadata, not folder hierarchy.

Everything else (NPM packages, website components, archives) is
derived from registry. When a derived copy and its registry source
disagree, the source is correct and the copy is stale.

### Archive

Historical snapshot of knowledge at a point in time. Stored in
`registry/archives/{component}/{date}.ts`. Never modified after
creation. Enables evolution tracking.

### Stranger

Any entity — human or AI agent — operating a knowledge artifact
without the original author present. The core design constraint:
if a stranger can't use it correctly, it needs more context or
shouldn't be required.

---

## Relationships

```
Component
  ├── Knowledge Layer (required)
  │     └── Knowledge Artifact(s)
  │           ├── Self-Awareness Metadata
  │           ├── Scope
  │           └── Dissent
  ├── Presentation Layer (optional)
  └── Agency Layer (optional)

Registry (source of truth)
  ├── derives → NPM Packages
  ├── derives → Website Components
  └── snapshots → Archives
```

- A component contains one or more knowledge artifacts plus optional
  presentation and agency layers.
- Every knowledge artifact lives in the registry as its canonical source.
- Packages and website components are derived from registry, never the reverse.
- Archives are immutable snapshots of registry state at a point in time.
- Removing the agency layer never breaks knowledge or presentation.
- Removing the presentation layer never breaks knowledge.
- Each component works without any sibling component present.

---

## Distribution

### shadcn Model

Copy source code into your project, customize it, own it completely.
No package dependencies for the copied code. Extended beyond UI to
full-stack components with knowledge layers.

### Dual Distribution

Two ways to consume the same knowledge:

- `npx @governed/cli add [component]` → full component (knowledge + presentation)
- `npm install @governed/[package]` → knowledge layer only

Both derive from registry. The CLI copies files. The package wraps them.

---

## Identity

### Living Governance

Continuously evolving knowledge system. "Living" in two senses:
1. Living through contribution — multiple expert perspectives
2. Living through execution — code that runs, not documents that sit

### @governed

The distribution namespace. Components are copied into your project
or imported as packages. You own the code.

### Cognitive Infrastructure Engineering

The practice of externalizing expert reasoning in forms that strangers
(human or AI) can recover, operate, and compose without the original
expert present. The underlying operation: converting blind epistemic
dependence into informed epistemic dependence.

This project is an early public demonstration.

### Executable Knowledge

Expertise captured as code that can be imported, compiled, validated,
and composed by machines. Not documents that sit — code that runs.
The foundation of the entire project.

---

## Naming

Naming is ontology, not style. Using the wrong term creates confusion
about what entity is being referenced.

### Preferred Terms

| Term | Means | Use when |
|------|-------|----------|
| component | distributable building block with layers | describing what this project produces |
| knowledge artifact | typed file in registry with metadata | describing the atomic unit |
| knowledge | information + context + application | describing what's in a knowledge artifact |
| self-contained | works in isolation, no sibling dependencies | describing component independence |
| executable knowledge | expertise captured as runnable code | describing the project's foundation |

### Terms to Avoid

| Don't say | Say instead | Why |
|-----------|-------------|-----|
| artifact (standalone) | component or knowledge artifact | doesn't distinguish governance from product |
| data layer | knowledge layer | knowledge = data + context + application |
| standalone | self-contained | consistent with C-06 |
| intelligence | agency, analysis, or evaluation | too vague to be actionable |
| pattern (for deliverables) | component | pattern is an observation, component is a buildable unit |
| revolutionary / groundbreaking | (describe what it does) | superlatives signal lack of substance |
| core wisdom | executable knowledge | marketing language |

---

## Constitutional References

This ontology is constrained by CONSTITUTION.md. Key mappings:

| Principle | Ontology impact |
|-----------|-----------------|
| C-01: Knowledge Is Executable | Knowledge artifacts must compile and export typed structures |
| C-02: Knowledge Carries Self-Awareness | Self-awareness metadata is required on every knowledge artifact |
| C-03: Knowledge Declares Its Scope | Scope entity with appliesTo and doesNotApplyTo is required |
| C-04: Knowledge Preserves Dissent | Dissent entity is required on every knowledge artifact |
| C-05: Single Authoritative Source | Registry is the only canonical location, everything else derives |
| C-06: Components Create No Lock-In | Self-contained entity definition, graceful fallback pattern |
| C-07: Knowledge and Presentation Are Forkable | Tier 1 has zero runtime dependencies, agency removal is safe |
| C-08: The Stranger Test | Stranger entity definition drives all design constraints |
