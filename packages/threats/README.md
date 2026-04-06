# @governed/threats

Agentic AI threats with severity ratings, taxonomy mappings (OWASP, MITRE ATLAS, NIST), real-world incidents, mitigations, and framework coverage gaps.

## Install

```bash
npm install @governed/threats
```

## Usage

```typescript
import {
  threatsKnowledge,
  getConfidenceStatus,
  computeCoverageSummary,
  getIncidentsForThreat,
  getMitigationsForThreat,
  getThreatsByCategory,
  getAllGaps
} from '@governed/threats';

// Check data freshness
const status = getConfidenceStatus(threatsKnowledge);
console.log(status.status);          // e.g. "Fresh - high confidence"
console.log(status.daysUntilStale);  // days until re-evaluation needed

// Access all data directly
const { threats, incidents, mitigations, evolution } = threatsKnowledge;

// Filter threats by category
const memoryThreats = getThreatsByCategory(threatsKnowledge, 'memory-and-context');

// Get incidents linked to a specific threat
// IDs: TM-001 (memory poisoning), TM-002 (tool misuse), TM-003 (privilege escalation), TM-004 (multi-agent)
const relatedIncidents = getIncidentsForThreat(threatsKnowledge, 'TM-001');

// Get all mitigations (MIT-001, MIT-002, etc.), or those linked to a specific threat
const allMitigations = threatsKnowledge.mitigations;
const toolMisuseMitigations = getMitigationsForThreat(threatsKnowledge, 'TM-002');

// Coverage summary across frameworks
const coverage = computeCoverageSummary(threatsKnowledge);

// Find gaps in framework coverage
const gaps = getAllGaps(threatsKnowledge);
```

## What's included

- Threat catalog with severity ratings and rationale
- Cross-referenced taxonomy mappings (OWASP Agentic Top 10, MITRE ATLAS, NIST AI RMF)
- Real-world incidents with coverage analysis
- Mitigation references per threat
- Framework coverage gap analysis
- Confidence decay — data knows when it needs re-evaluation

## Data freshness

Every export includes evaluation metadata: who evaluated, when, methodology, and validity window. Use `getConfidenceStatus()` to check programmatically.

## Source

Registry source: [registry/knowledge/threats.ts](https://github.com/living-governance/governed/blob/master/registry/knowledge/threats.ts)

Full component with visualization: [living-governance.com](https://living-governance.com)

License: MIT
