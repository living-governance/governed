# @governed/frameworks

OWASP, NIST, ISO, MITRE security framework analysis - how well they address AI threats

## What You Get

```typescript
import { frameworkCoverageKnowledge } from '@governed/frameworks';

// Get OWASP's AI threat coverage score (37.5%)
const owasp = frameworkCoverageKnowledge.frameworks.find(f => f.id === 'owasp-genai');
console.log(owasp.aiCoverageScore); // 0.375

// Check if data is stale (>90 days old)
import { isStale } from '@governed/frameworks';
if (isStale(frameworkCoverageKnowledge)) {
  console.log('Consider re-evaluating');
}
```

## Data Included

- 7 security frameworks scored on AI threat coverage (0-100%)
- 100-point evaluation methodology with breakdown
- Timeline of framework evolution (2021-2025)
- Confidence scoring and staleness indicators
- Detailed gaps and recommendations

## Installation

```bash
npm install @governed/frameworks
```

## Usage

```typescript
import { frameworkCoverageKnowledge } from '@governed/frameworks';

// Get framework data
const frameworks = frameworkCoverageKnowledge.frameworks;

// Check if data is stale
import { isStale, getConfidenceStatus } from '@governed/frameworks';

const needsUpdate = isStale(frameworkCoverageKnowledge);
const status = getConfidenceStatus(frameworkCoverageKnowledge);
```

## What's Included

- **Framework Coverage Data**: How well OWASP, NIST, ISO, MITRE frameworks address AI threats
- **Detailed Evaluations**: 100-point scoring methodology breakdown
- **Timeline**: Evolution of security frameworks from 2021-2025
- **Insights & Recommendations**: Key findings and actionable guidance

## Data Freshness

This data was last evaluated on August 10, 2025. Framework coverage evolves rapidly - check [living-governance.com](https://living-governance.com) for the latest analysis.

## License

MIT - See [living-governance.com](https://living-governance.com) for details
