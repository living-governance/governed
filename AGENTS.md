# AGENTS.md
## Agent Instructions for @governed / living-governance.com

> Before starting work, read CONSTITUTION.md (principles) and
> ONTOLOGY.md (domain model). These govern all agent behavior.

---

## Project Context

This is the repository for living-governance.com — a component library for AI
security governance. Consumers copy components into their own codebases via
`@governed/cli` or install as NPM packages. The website serves as both
documentation and live demonstration of the components. It uses Next.js 15,
React 19, Tailwind CSS v4, and shadcn/ui. Deployed on Vercel.
Components follow a three-layer architecture (knowledge/presentation/agency) — see ADR-003.

This project is NOT:
- A hosted SaaS service or managed platform
- A compliance certification or audit tool
- A general-purpose AI framework or broad governance platform (scoped to AI security governance)

Repository structure:
```
governed/
├── CONSTITUTION.md          # Non-negotiable principles (read first)
├── AGENTS.md                # Agent instructions (this file)
├── CLAUDE.md                # Claude-specific additions
├── CONTRIBUTING.md          # How humans participate
├── ONTOLOGY.md              # Domain model (entities, relationships, rules, naming)
├── METHODOLOGY.md           # How we work (The Hunt)
├── app/                     # Next.js app (living-governance.com)
├── components/ui/           # shadcn UI primitives
├── registry/
│   ├── knowledge/           # Source of truth for all knowledge (C-05)
│   ├── components/          # Distributable components (knowledge + presentation)
│   └── archives/            # Historical snapshots of knowledge
├── packages/
│   ├── cli/                 # @governed/cli (distribution tool)
│   └── frameworks/          # @governed/frameworks (knowledge-only npm package)
├── decisions/               # ADRs (resolved) and PENDING-NNN.md (awaiting human input)
├── backlog/
│   ├── intents/             # Prey descriptions for autonomous execution
│   └── ideas/               # Parked hunt output
├── docs/                    # Workflow documentation
└── lib/                     # Shared utilities
```

---

## Rules

### Rule 1: Constitution Wins
If any instruction here conflicts with CONSTITUTION.md, the constitution takes precedence.

### Rule 2: Registry Is Truth — Never Manual-Write Package Files
**NEVER** manually write or edit files in `packages/*/src/` that have a
corresponding file in `registry/knowledge/`.

Always:
1. Edit in `registry/knowledge/` first
2. Copy: `cp registry/knowledge/{file}.ts packages/{name}/src/{file}.ts`

WRONG: Editing `packages/frameworks/src/framework-coverage.ts` directly
RIGHT: Edit `registry/knowledge/framework-coverage.ts`, then copy to package

### Rule 3: Use Project Ontology
Use precise project terminology as defined in ONTOLOGY.md.
Naming is ontology, not style — using the wrong term creates confusion
about what entity is being referenced.

Do not use superlatives ("revolutionary," "groundbreaking," "cutting-edge")
or marketing fluff in package descriptions, READMEs, or code comments.
Package descriptions should state what the consumer gets, factually.

### Rule 4: Version Bump Requires Two Files
When bumping a package version, update BOTH locations:
1. `packages/{name}/package.json` → `"version"` field
2. `packages/{name}/src/index.ts` → `metadata.version` in the exported object

### Rule 5: Evaluation Rationale Must Be Structured
Every scored evaluation must include a `scoringRationale` field in the knowledge
object. This is the source of truth for why scores were assigned.

### Rule 6: Self-Contained Component Check (C-06)
Before committing any component:
- Verify it imports and runs without any sibling component present
- Any cross-component reference uses try/catch with graceful fallback
- The fallback path provides full functionality, just less context

### Rule 7: Archive Before Updating Knowledge
Before modifying any knowledge file in `registry/knowledge/`:
1. Create archive: `cp registry/knowledge/{file}.ts registry/archives/{component}/{YYYY-MM-DD}.ts`
2. Verify the archive matches the current file
3. THEN make changes to `registry/knowledge/{file}.ts`

### Rule 8: UNLEASH Protocol
When executing work from `backlog/intents/`:
1. Read the intent and referenced ONTOLOGY.md sections
2. Only pick intents with `status: ready`
3. Set status to `claimed` before starting
4. Plan your own approach — intents describe the target, not the steps
5. Set status to `done` when "Done when" criteria are met
6. Never execute `blocked` intents
7. If criteria can't be fully met, leave status as `claimed` and add a `## Blockers` section explaining what blocked and why

---

## Commands

- Build: `npx next build`
- Typecheck: `npx tsc --noEmit`
- Typecheck package: `cd packages/{name} && npx tsc --noEmit`
- Lint: _not configured yet_
- Test: _not configured yet_
- Format: _not configured yet_

---

## Workflows

See `docs/publishing-workflow.md` for the NPM publishing process.
