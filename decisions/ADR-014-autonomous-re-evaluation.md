# ADR-014: Autonomous Re-evaluation with Verification Status

**Date:** April 2026
**Status:** ACCEPTED
**Deciders:** Tomas (principal architect)
**Inspired by:** [karpathy/autoresearch](https://github.com/karpathy/autoresearch) — fixed-budget autonomous experiment loops

---

## Context

Knowledge artifacts declare `validDays` and `updateInstructions`, and
`getConfidenceStatus()` computes decay. But nothing acts on expiry.
When knowledge expires, it sits stale until a human manually re-evaluates.

The autoresearch pattern shows that agents can run scoped, time-boxed
evaluation cycles autonomously — as long as the intent, constraints, and
success criteria are defined by humans.

We already have all the infrastructure:
- Decay timers tell us **when** to re-evaluate
- `updateInstructions` tell us **how**
- Archives preserve the prior state
- The Constitution constrains what's acceptable
- METHODOLOGY.md defines the Hunt → Unleash → Verify cycle

What's missing: a closed loop, and a way to distinguish agent-produced
knowledge from human-verified knowledge.

## Decision

### 1. Fully Autonomous Re-evaluation

When a knowledge artifact's confidence status reaches **Expired** (>70%
of `validDays` elapsed), an agent may autonomously:

1. Read the artifact's `updateInstructions`
2. Check the declared sources for changes
3. Re-score using the artifact's stated methodology
4. Archive the current version (AGENTS.md Rule 7)
5. Write the updated artifact to registry
6. Log the evaluation run

The agent operates within constitutional constraints. No human approval
is required to begin or complete a re-evaluation cycle. The human
verifies after the fact.

### 2. Verification Status

A new required field on knowledge evaluation metadata:

```typescript
verificationStatus: 'human-verified' | 'agent-evaluated' | 'human-disputed'
```

- **`human-verified`**: A human reviewed and approved this evaluation.
  This is the gold standard. All existing knowledge starts here.
- **`agent-evaluated`**: An agent re-evaluated autonomously. Published
  and usable, but flagged for human review. Consumers can filter on this.
- **`human-disputed`**: A human reviewed the agent's re-evaluation and
  disagreed. The agent's version is preserved in the archive as dissent.
  The human's corrected version becomes canonical.

Verification status is orthogonal to confidence status. Knowledge can be:

| Freshness | Verification | Meaning |
|-----------|-------------|---------|
| Fresh + human-verified | Highest trust — recently evaluated by a human |
| Fresh + agent-evaluated | Usable, not yet reviewed — agent re-evaluated on schedule |
| Aging + human-verified | Human-approved but approaching review window |
| Expired + any | Needs re-evaluation regardless of who last verified |

### 3. Evaluation Run Log

Each re-evaluation (human or agent) produces an entry in a run log:

```typescript
interface EvaluationRun {
  id: string;                                    // e.g. 'framework-coverage-2026-04-05'
  artifactId: string;                            // knowledge artifact re-evaluated
  date: Date;
  evaluatedBy: string;                           // '@tsynode' or '@claude' or agent identifier
  evaluatorType: 'human' | 'agent';
  trigger: 'decay' | 'source-change' | 'manual'; // why this re-evaluation happened
  previousArchive: string;                        // path to archived prior version
  scoreDeltas: Record<string, number>;            // what scores changed and by how much
  sourcesChecked: string[];                       // URLs/sources actually consulted
  sourcesChanged: boolean;                        // did any source material change?
  summary: string;                                // one-paragraph description of changes
  verificationStatus: 'human-verified' | 'agent-evaluated';
}
```

Run logs are stored in `registry/archives/{component}/RUNS.ts` as an
exported array. They are append-only and never modified after creation.

### 4. Scoped Evaluation Cycles

Following the autoresearch pattern, each re-evaluation is scoped:

- **One artifact per cycle** — touch exactly one `registry/knowledge/*.ts` file
- **One archive produced** — the prior version, byte-identical
- **One run log entry** — what changed and why
- **Methodology is fixed** — the agent uses the artifact's declared methodology,
  not its own judgment about how to score
- **Sources are declared** — the agent checks only the sources listed in the
  artifact, plus any new sources it discovers (which it must declare)

The agent does not invent new scoring criteria, change methodology, or
redefine scope. It re-applies the existing methodology to current source
material. Methodology changes require a human-led Hunt cycle.

### 5. Publication

Agent-evaluated knowledge is published immediately with
`verificationStatus: 'agent-evaluated'`. Consumers who want only
human-verified knowledge can filter on this field. The website displays
a visual indicator distinguishing the two states.

This means:
- Knowledge never sits expired waiting for human availability
- Consumers always see the freshest evaluation available
- The verification status gives consumers agency over their trust threshold
- Humans review at their own pace without blocking freshness

## Consequences

### Positive
- Knowledge freshness is no longer bottlenecked on human availability
- The decay model becomes actionable, not just informational
- Every re-evaluation is auditable (run log + archive)
- Consumers get a trust dial (accept agent-evaluated or require human-verified)
- Methodology discipline is enforced — agents can't drift from declared methodology
- `human-disputed` state preserves dissent constitutionally (C-04)

### Negative
- Agent re-evaluations may contain errors that get published before human review
- Consumers must understand the verification status to calibrate trust
- Run log adds a new file per component that must be maintained
- Source checking quality depends on agent capability (web fetching, PDF reading)

### Risks
- If agent re-evaluations are consistently wrong, trust in the system erodes
- Mitigation: start with one artifact (`framework-coverage`), validate the loop,
  then expand. The first few cycles should be closely monitored.

## Alternatives Considered

1. **Human-triggered only** — Agent does legwork, human approves before publish.
   Rejected: re-introduces the availability bottleneck that causes staleness.
   The whole point of decay-aware knowledge is that it shouldn't sit expired.

2. **No verification status** — Publish agent work as equivalent to human work.
   Rejected: consumers deserve to know who evaluated. Attribution is already
   a constitutional value (C-02: who evaluated).

3. **Separate artifact versions** — Agent version and human version coexist.
   Rejected: violates C-05 (single authoritative source). One canonical version,
   with verification status as metadata, not forked files.

4. **Approval queue** — Agent drafts, human approves from queue before publish.
   Rejected: this is option 1 with extra ceremony. The queue becomes a bottleneck.
   Publishing with a flag is more honest than a queue that pretends to be timely.
