---
status: ready
---

# Autonomous Re-evaluation Loop for framework-coverage

## Intent
Close the loop on knowledge decay. When `framework-coverage` expires,
an agent autonomously re-evaluates it: checks sources, re-scores using
the declared methodology, archives the prior version, writes the update
with `verificationStatus: 'agent-evaluated'`, and logs the run.

This is the first implementation of ADR-014. Start with one artifact
to validate the pattern before expanding to others.

## Ontology
Verification Status — `agent-evaluated` on output, `human-verified` after
review (ADR-014). Evaluation Run — logged in `registry/archives/framework-coverage/RUNS.ts`.
Self-Awareness Metadata — `updateInstructions` field drives what the agent checks.
Archive — created before any modification (AGENTS.md Rule 7).
Scope — agent re-applies existing methodology, does not invent new criteria.

## Done when
- Agent can read `framework-coverage` knowledge and detect expired status
- Agent follows `updateInstructions` to check each framework's official source
- Agent re-scores using the existing binary methodology (no methodology changes)
- Prior version archived to `registry/archives/framework-coverage/{YYYY-MM-DD}.ts`
- Updated knowledge written with `verificationStatus: 'agent-evaluated'`
- Evaluation run entry appended to `registry/archives/framework-coverage/RUNS.ts`
- Run log includes: score deltas, sources checked, whether sources changed, summary
- If no source material changed, agent writes a run log entry noting "no changes" but
  still resets the evaluation date (re-confirmation is valid re-evaluation)
- `getConfidenceStatus()` reflects the new evaluation date
- Component's confidence badge shows `agent-evaluated` verification status
