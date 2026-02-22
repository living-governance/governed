---
status: pending
---

# Sync Mechanism for Registry → Packages

## Question
How should registry/knowledge/ files sync to packages/*/src/? This includes archiving before updates, the copy itself, and version bumping.

## Context
- CLAUDE.md documents manual steps for: registry→package copy, version bumping, and archiving before updates
- Multiple packages may need sync as component library grows
- CI/CD pipeline planned but not yet in place

## Options
1. npm script (`npm run sync`) — simplest, works now, handles all three steps
2. Makefile — conventional for multi-step builds
3. CI/CD — automates on push, but heavier setup

## After Resolution
- Simplify docs/publishing-workflow.md: replace manual steps with script/pipeline invocation
- Merge bump-version idea (backlog/ideas/) into the chosen mechanism
