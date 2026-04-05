// registry/archives/framework-coverage/RUNS.ts
// Append-only evaluation run log (ADR-014)

import type { EvaluationRun } from '../../../lib/types';

export const evaluationRuns: EvaluationRun[] = [
  {
    id: 'framework-coverage-2026-04-05',
    artifactId: 'framework-coverage',
    date: new Date('2026-04-05'),
    evaluatedBy: '@claude',
    evaluatorType: 'agent',
    trigger: 'manual',
    previousArchive: 'registry/archives/framework-coverage/2026-02-20.ts',
    scoreDeltas: {
      // No score changes — all frameworks retain prior scores
      // OWASP: 100 → 100, ATLAS: 90 → 90, ISO 42001: 35 → 35,
      // NIST: 30 → 30, CIS: 25 → 25, ATT&CK: 0 → 0, ISO 27090: 0 → 0
    },
    sourcesChecked: [
      'https://genai.owasp.org/',
      'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
      'https://owasp.org/www-project-mcp-top-10/',
      'https://github.com/mitre-atlas/atlas-data/blob/main/CHANGELOG.md',
      'https://atlas.mitre.org/',
      'https://www.nist.gov/artificial-intelligence',
      'https://csrc.nist.gov/projects/cosais',
      'https://csrc.nist.gov/pubs/ir/8596/iprd',
      'https://www.iso.org/standard/56581.html',
      'https://www.cisecurity.org/controls',
      'https://attack.mitre.org/'
    ],
    sourcesChanged: true,
    summary: `MITRE ATLAS had 4 major releases since last evaluation (v5.2.0 Dec 2025 through v5.5.0 Mar 2026). \
New: Machine Compromise techniques (T0112), AI Supply Chain attacks (T0109, T0111), MCP-specific case studies \
(CS0053-CS0054), AI ClickFix (CS0055), model distillation (CS0056), 34+ mitigations. Score unchanged at 90/100 — \
temporal drift remains the only uncovered category. NIST COSAiS progressed to annotated control overlay draft \
(Jan 2026) but still not actionable. All other frameworks unchanged. MITRE ATT&CK v19 expected April 28, 2026 \
with no AI content announced. No score changes across any framework.`,
    verificationStatus: 'agent-evaluated'
  }
];
