# Contributing to Living Governance

## Scope

This file describes how the founding team and AI agents work on this project.
External contributions are not yet accepted — the governance structure is still
forming. When external contributions open, this file will include PR conventions,
CLA requirements, and review process.

## How We Work

This project follows **The Hunt** methodology (see METHODOLOGY.md).

Three modes: **HUNT** (explore, decide, build), **UNLEASH** (agents and
co-founders execute autonomously from intents), **VERIFY** (check alignment
with intent). The ontology (ONTOLOGY.md) is the shared contract that
accumulates across cycles.

The governance files form a single dependency chain:

```
CONSTITUTION  → constrains →  ONTOLOGY  → consumed by →  AGENTS
     WHY                        WHAT                      HOW
```

## What's Required

- Changes to governance files (CONSTITUTION, ONTOLOGY, METHODOLOGY,
  AGENTS, CLAUDE, CONTRIBUTING) require human review
- Decisions go in `decisions/` — as ADRs (resolved) or PENDING files (open)
- Use project terminology from ONTOLOGY.md — including naming conventions
- Changes to CONSTITUTION.md require principal architect approval

## For Humans

### Solo Hunts

Work in the cognitive environment (AI partner with memory and project
knowledge). Follow energy. Small prey gets killed on the spot. Big prey
gets parked as ideas or sharpened into intents.

### Pack Hunts

Co-founders onboard via ONTOLOGY.md and CONSTITUTION.md. The ontology
is the shared canvas — challenge it, refine it, negotiate it. After
consensus, everyone receives intents and executes autonomously.

### Verify

Check what agents and co-founders brought back. Does it match intent?
If misaligned, either iterate or sharpen the ontology for the next cycle.

## For AI Agents

- Follow AGENTS.md rules — they exist to prevent specific past mistakes
  (Claude Code agents: also read CLAUDE.md for Claude-specific extensions)
- Pick intents from `backlog/intents/` per Rule 8 (UNLEASH Protocol)
- Read the intent AND referenced ONTOLOGY.md sections before executing
- Plan your own approach — intents describe the target, not the steps
- Never execute PENDING decisions — those await human input
- When criteria can't be fully met, leave status as `claimed` and add
  a `## Blockers` section explaining what blocked and why

## Getting Started

1. Read `CONSTITUTION.md` — 8 non-negotiable principles
2. Read `ONTOLOGY.md` — what exists, how it relates, what to call it
3. Read `AGENTS.md` — agent rules, repo structure, commands
   (Claude Code agents: also read `CLAUDE.md`)
4. Read `METHODOLOGY.md` — how we work (The Hunt)
5. Check `decisions/PENDING-*.md` — open decisions needing input
6. Check `backlog/intents/` — work ready for execution
7. Check `backlog/ideas/` — parked hunts that might be ripe

## Root Files

| File | Purpose |
|------|---------|
| CONSTITUTION.md | Why — 8 principles governing knowledge and distribution |
| ONTOLOGY.md | What — entities, relationships, rules, naming |
| METHODOLOGY.md | How we work — The Hunt (hunt, unleash, verify) |
| AGENTS.md | How agents operate — rules, structure, commands |
| CLAUDE.md | Claude Code extensions (imports AGENTS.md) |
| CONTRIBUTING.md | How to participate (this file) |
| README.md | What this project is, for external audiences |
