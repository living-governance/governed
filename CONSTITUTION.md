# CONSTITUTION
## @governed / living-governance.com — Non-Negotiable Principles

> This file governs all agents and contributors working on this project.
> These principles override all other instructions. They are not suggestions.
> If a task conflicts with this constitution, the constitution wins.
> Changes to this file require explicit approval from the principal architect.

---

## Identity

**Living Governance** is executable knowledge for AI security and governance.
"Living" in two senses: living through contribution (multiple expert perspectives)
and living through execution (code that runs, not documents that sit).

**@governed** is the distribution namespace. Components are copied into your
project or imported as packages. You own the code.

This project is an early public demonstration of **cognitive infrastructure
engineering** — the practice of externalizing expert reasoning in forms that
strangers (human or AI) can recover, operate, and compose without the original
expert present. The underlying operation: converting blind epistemic dependence
into informed epistemic dependence.

---

## Principles

### What Knowledge Must Be

#### C-01: Knowledge Is Executable
Knowledge artifacts must be importable, compilable, validatable, and composable
by machines. Static documents, PDFs, and unstructured prose are inputs to the
process of creating knowledge — they are not knowledge artifacts themselves.

#### C-02: Knowledge Carries Self-Awareness
Every knowledge artifact must declare:
- **Who**: attributed evaluator with identity
- **When**: creation date, last update date
- **Validity**: how long the author trusts this conclusion
- **Confidence**: computable status derived from validity
- **Methodology**: how the knowledge was originally derived
- **How to update**: what to check and how to re-derive

Knowledge without self-awareness is data, not knowledge.

#### C-03: Knowledge Declares Its Scope
Every knowledge artifact must state what it covers AND what it does not cover.
Decontextualized knowledge is dangerous when the decontextualization is unmarked.
Scope declaration is the engineering response to this — explicitly encoding
what the reasoning applies to and where it has no authority.

#### C-04: Knowledge Preserves Dissent
Knowledge artifacts must preserve what was considered and rejected, and why.
Where uncertainty remains, it is declared, not hidden. A stranger calibrates
trust at the edges of reasoning, not at the center. Showing what was almost
concluded differently is more valuable than showing only what was concluded.

### How Knowledge Is Distributed

#### C-05: Single Authoritative Source
Every piece of knowledge has exactly one canonical location. All other
representations — packages, UI, exports — are derived copies. When a copy
and its source disagree, the source is correct and the copy is stale.

#### C-06: Components Create No Lock-In
Every component works in complete isolation. Adopting one component never
creates dependency on another. Removing a component leaves no broken
references. Optional enrichment between components uses graceful fallback.

#### C-07: Knowledge and Presentation Are Forkable
Knowledge and presentation layers are designed to be copied, customized, and
owned without restriction. No runtime service dependencies. No telemetry.
If someone forks these layers and never returns, their fork works indefinitely.
Agency layers may take any form, but removing them never breaks the
knowledge or presentation layers.

#### C-08: The Stranger Test
Every artifact, process, and structure must be usable correctly by a stranger —
human or agent — without the original author present.
If something requires implicit knowledge that isn't captured, it either needs
more context or shouldn't be required.

---

## Enforcement

Constitutional principles must be enforceable through automated checks.
Untestable principles are aspirations, not constraints.

| Principle | Condition |
|-----------|-----------|
| C-01 | Every knowledge artifact compiles and exports valid typed structures |
| C-02 | Every knowledge export includes attribution, dates, validity window, methodology, and update instructions |
| C-03 | Every knowledge export includes `scope` with both `appliesTo` and `doesNotApplyTo` |
| C-04 | Every knowledge artifact includes `dissent` or `uncertainty` fields |
| C-05 | No derived file differs from its canonical source |
| C-06 | Each component imports and runs without any sibling component present |
| C-07 | Knowledge and presentation layers have zero runtime service dependencies |
| C-08 | Every intent and pending decision carries enough context for a stranger to execute without the author present |
