# @governed/frameworks

OWASP, NIST, ISO, MITRE security framework analysis — how well they address agentic AI threats.

## What You Get

```typescript
import { frameworkCoverageKnowledge } from '@governed/frameworks';

// Get OWASP's AI threat coverage score (100%)
const owasp = frameworkCoverageKnowledge.frameworks.find(f => f.id === 'owasp-genai');
console.log(owasp.aiCoverageScore); // 1.0

// Get MITRE ATLAS score (90%)
const atlas = frameworkCoverageKnowledge.frameworks.find(f => f.id === 'mitre-atlas');
console.log(atlas.aiCoverageScore); // 0.9

// Check if data is stale (>90 days old)
import { isStale } from '@governed/frameworks';
if (isStale(frameworkCoverageKnowledge)) {
  console.log('Consider re-evaluating');
}
```

## Data Included

- 7 security frameworks scored on agentic AI threat coverage (0-100%)
- 100-point binary evaluation methodology with 19-criteria breakdown
- Timeline of framework evolution (2021-2026)
- Confidence scoring and staleness indicators
- Detailed gaps, strengths, weaknesses, and verdicts per framework
- AWS implementation mappings (WAF, Security Hub, GuardDuty, Config)

## Frameworks Evaluated

| Framework | Score | Status |
|-----------|-------|--------|
| OWASP GenAI (Agentic Top 10) | 100/100 | ✅ Active |
| MITRE ATLAS | 90/100 | ✅ Active |
| ISO 42001:2023 | 35/100 | ⚠️ Applicable |
| NIST AI RMF | 30/100 | ⚠️ Applicable |
| CIS Controls v8.1 | 25/100 | ❌ No guidance |
| MITRE ATT&CK | 0/100 | ❌ No guidance |
| ISO 27090 (Draft) | 0/100 | ❌ Draft |

## Installation

```bash
npm install @governed/frameworks
```

## Usage

```typescript
import { frameworkCoverageKnowledge, isStale, getConfidenceStatus } from '@governed/frameworks';

// All frameworks
const frameworks = frameworkCoverageKnowledge.frameworks;

// Detailed evaluation with breakdown
const atlasEval = frameworkCoverageKnowledge.detailedEvaluations['mitre-atlas-v4'];
console.log(atlasEval.scores.total); // 90
console.log(atlasEval.verdict);

// Knowledge freshness
const status = getConfidenceStatus(frameworkCoverageKnowledge);
console.log(status); // { confidence: 1.0, status: "Fresh - high confidence", daysUntilStale: 87 }

// Timeline
const timeline = frameworkCoverageKnowledge.timeline;
```

## Data Freshness

This data was evaluated on February 20, 2026. Framework coverage evolves rapidly — check [living-governance.com](https://living-governance.com) for the latest analysis.

## License

MIT — See [living-governance.com](https://living-governance.com) for details
