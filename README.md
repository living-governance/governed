# @governed / living-governance.com

Executable knowledge for AI security governance. Copy the source, customize
for your needs, own it completely.

## What This Is

A component library where AI security governance is distributed as code, not
documents. Each component carries self-awareness — it knows who evaluated it,
when, how long the author trusts the conclusion, and how to update it when
that trust expires.

Built on the [shadcn](https://ui.shadcn.com/) philosophy: you copy components
into your project and own them. MIT licensed. No runtime dependencies. No telemetry.

## What This Is Not

- A hosted SaaS service or managed platform
- A compliance certification or audit tool
- A general-purpose AI framework or broad governance platform

## What Exists Today

**One component:** `framework-coverage` — evaluates 12 major security
frameworks for agentic AI threat coverage using a 100-point binary
scoring methodology.

**One package:** `@governed/frameworks` on NPM — the knowledge layer only,
for programmatic use without UI.

**Website:** `living-governance.com` — in development. Will serve as both
documentation and live demonstration of components.

## Why This Matters

Security governance for AI is broken in a specific way: the knowledge exists,
but it's trapped in formats that can't keep up.

OWASP publishes new agentic AI guidance. Every organization relying on last
quarter's PDF assessment is now out of date — and doesn't know it. A security
architect evaluating framework coverage has no way to see the evaluator's
methodology, what alternatives were considered, or when the assessment expires.
An AI agent orchestrating a security review can't read a PDF at all.

Living governance makes the knowledge itself aware of its own state — who
evaluated it, how, what it doesn't cover, when it expires, and how to
re-derive it. Because it's code, it runs in dashboards, pipelines, and
agent workflows. Because it carries self-awareness, it tells you when to
stop trusting it.

## Use Cases

### framework-coverage

No public resource evaluates major security frameworks specifically for
agentic AI threat coverage. OWASP, MITRE ATLAS, NIST, ISO 27001, and others
each address different pieces — but nobody has scored them side by side with
a reproducible methodology. That's what `framework-coverage` provides. The
evaluation is importable, so your dev teams can consume it programmatically
rather than reading a report. And because it's executable knowledge, it tells
you when it's going stale and exactly how to re-derive the scores yourself.

### More components coming

Next: threat and vulnerability aggregator — definitions correlated with
real-world incidents. See [Roadmap](#roadmap).

## Install

### Browse the knowledge

```bash
npm install @governed/frameworks
```

```typescript
import { frameworkCoverage } from '@governed/frameworks';
```

### Copy the full component (coming soon)

```bash
npx @governed/cli add framework-coverage
```

Will copy knowledge + presentation into your project. CLI is published but
component copying is under development.

### Run locally

```bash
git clone https://github.com/living-governance/governed
cd governed
npm install
npm run dev
```

## What Makes Knowledge "Living"

Every knowledge artifact knows its own freshness:

```typescript
export const frameworkCoverage = {
  metadata: {
    version: '0.2.0',
    evaluatedBy: 'Tomas Sykora',
    evaluatedAt: '2025-07-24',
    validDays: 90,
    methodology: '100-point binary scoring across 10 agentic AI threat categories',
    updateInstructions: `
      1. Visit each framework's official site
      2. Check for new AI-specific sections
      3. Re-score using binary methodology
      4. Archive previous version before updating
    `
  },
  // ... 12 framework evaluations with scores, rationale, scope, dissent
}
```

*(Simplified example — see `registry/knowledge/framework-coverage.ts` for the real thing.)*

Confidence status is computed from elapsed time against the author's validity
window: **Fresh** (≤30%) → **Aging** (≤70%) → **Expired** (>70%). Authors
understand their domain's rhythm better than any automated system.

## Architecture

Components follow a three-layer model:

- **Knowledge** (required): data, methodology, confidence, update instructions
- **Presentation** (optional): UI components, visualizations
- **Agency** (optional): autonomous monitoring, validation

Knowledge and presentation layers are unconditionally forkable. Agency layers
may take any form but removing them never breaks the other layers.

See `decisions/ADR-003-three-layer-architecture.md` for the full rationale.

## Project Structure

```
governed/
├── registry/
│   ├── knowledge/       # Source of truth for all knowledge
│   ├── components/      # Full components (knowledge + presentation)
│   └── archives/        # Historical snapshots
├── packages/
│   ├── cli/             # @governed/cli (distribution tool)
│   └── frameworks/      # @governed/frameworks (NPM package)
├── app/                 # Next.js app (living-governance.com)
├── decisions/           # Architecture Decision Records
├── backlog/
│   ├── intents/         # Prey descriptions for autonomous execution
│   └── ideas/           # Parked hunt output
├── CONSTITUTION.md      # Why — non-negotiable principles
├── ONTOLOGY.md          # What — entities, relationships, rules, naming
├── METHODOLOGY.md       # How we work — The Hunt
├── CONTRIBUTING.md      # How to participate
├── AGENTS.md            # Agent operating rules (all agents)
└── CLAUDE.md            # Claude Code extensions
```

## Governance

This project practices what it preaches — its own development is governed
by the same principles it distributes.

```
CONSTITUTION  → constrains →  ONTOLOGY  → consumed by →  AGENTS
     WHY                        WHAT                      HOW
```

- **CONSTITUTION.md** — why: 8 principles governing knowledge and distribution
- **ONTOLOGY.md** — what: entities, relationships, rules, naming
- **METHODOLOGY.md** — how we work: The Hunt (hunt, unleash, verify)
- **CONTRIBUTING.md** — how humans and AI agents participate
- **AGENTS.md** — how agents operate within the ontology
- **CLAUDE.md** — Claude Code-specific extensions

## Roadmap

1. **Now**: Governance knowledge that self-reports staleness
2. **Next**: AI agents that help maintain freshness across knowledge artifacts
3. **Future**: Autonomous knowledge that monitors its own sources and flags when re-evaluation is needed

## Community

- Website: [living-governance.com](https://living-governance.com)
- NPM: [@governed](https://www.npmjs.com/org/governed)
- Discussions: [GitHub Discussions](https://github.com/living-governance/governed/discussions)
- Issues: [GitHub Issues](https://github.com/living-governance/governed/issues)

## License

MIT — see [LICENSE](LICENSE)
