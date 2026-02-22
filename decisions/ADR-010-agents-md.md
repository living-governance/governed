# ADR-010: AGENTS.md as Canonical Agent Instructions

**Date:** February 2026
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)

---

## Context

CLAUDE.md contained all agent instructions but used Claude Code-specific
`@import` syntax. With co-founders (Dirk, Stephan) potentially using
different agents (Cursor, Copilot, Codex), agent instructions needed
to be agent-agnostic.

AGENTS.md has been adopted by 60,000+ repos and is supported by Codex,
Cursor, Copilot, Devin, and Gemini CLI. Contributed to the Agentic AI
Foundation under Linux Foundation.

## Decision

AGENTS.md is the canonical file for all agent-agnostic rules, repo
structure, commands, and the UNLEASH protocol. CLAUDE.md becomes a
thin wrapper that uses `@import` to pull in CONSTITUTION.md, ONTOLOGY.md,
AGENTS.md, and workflow docs — leveraging Claude Code's progressive
disclosure while adding only Claude-specific configuration.

## Alternatives Considered

1. **AGENTS.md mirrors CLAUDE.md** — rejected, creates duplication
   and drift between two files containing the same rules.
2. **AGENTS.md points to CLAUDE.md** — rejected, wrong direction.
   The agnostic file should be canonical, not the vendor-specific one.
3. **Wait until needed** — rejected, trivial to do now and the
   architecture is cleaner with the split in place.

## Consequences

- Any agent reads AGENTS.md and gets full operating instructions
- Claude Code reads CLAUDE.md which imports AGENTS.md plus extensions
- Single source of truth for shared rules, no duplication
- Adding a new agent-specific file (e.g., CURSOR.md) follows the
  same pattern: import AGENTS.md, add vendor-specific config
