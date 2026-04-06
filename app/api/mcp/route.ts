import { z } from 'zod';
import { createMcpHandler } from 'mcp-handler';
import {
  frameworkCoverageKnowledge,
  getConfidenceStatus as getFrameworkConfidence,
  isStale as isFrameworkStale,
} from '../../../registry/knowledge/framework-coverage';
import {
  threatsKnowledge,
  getConfidenceStatus as getThreatConfidence,
  isStale as isThreatStale,
  computeCoverageSummary,
  getIncidentsForThreat,
  getMitigationsForThreat,
  getThreatsByCategory,
  getAllGaps,
} from '../../../registry/knowledge/threats';
import type { ThreatCategory } from '../../../registry/knowledge/threats';

const handler = createMcpHandler(
  (server) => {
    // =========================================================================
    // CONFIDENCE & FRESHNESS
    // =========================================================================
    server.tool(
      'get_confidence_status',
      'Check freshness and confidence status of all knowledge artifacts. Returns evaluation date, days until stale, verification status, and whether re-evaluation is needed.',
      {},
      async () => {
        const fc = getFrameworkConfidence(frameworkCoverageKnowledge);
        const tc = getThreatConfidence(threatsKnowledge);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              artifacts: [
                {
                  id: 'framework-coverage',
                  ...fc,
                  isStale: isFrameworkStale(frameworkCoverageKnowledge),
                  evaluatedAt: frameworkCoverageKnowledge.evaluation.date,
                  evaluatedBy: frameworkCoverageKnowledge.evaluation.by,
                  verificationStatus: (frameworkCoverageKnowledge.evaluation as any).verificationStatus,
                  validDays: frameworkCoverageKnowledge.evaluation.validDays,
                },
                {
                  id: 'threats',
                  ...tc,
                  isStale: isThreatStale(threatsKnowledge),
                  evaluatedAt: threatsKnowledge.evaluation.date,
                  evaluatedBy: threatsKnowledge.evaluation.by,
                  validDays: threatsKnowledge.evaluation.validDays,
                },
              ],
            }, null, 2),
          }],
        };
      },
    );

    // =========================================================================
    // FRAMEWORK COVERAGE
    // =========================================================================
    server.tool(
      'get_framework_scores',
      'Get AI security framework coverage scores. Returns all 7 frameworks scored on agentic AI threat coverage (0-100), with gaps, status, and evaluation methodology.',
      {},
      async () => {
        const frameworks = frameworkCoverageKnowledge.frameworks.map(f => ({
          id: f.id,
          name: f.name,
          organization: f.organization,
          score: Math.round(f.aiCoverageScore * 100),
          status: f.status,
          gaps: f.gaps,
          lastUpdate: f.lastFrameworkUpdate,
        }));

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              evaluatedAt: frameworkCoverageKnowledge.evaluation.date,
              methodology: 'Binary scoring across 19 criteria (threat identification, practical guidance, evidence quality, completeness). 100 points total.',
              frameworks,
              insights: frameworkCoverageKnowledge.insights,
              recommendations: frameworkCoverageKnowledge.recommendations,
            }, null, 2),
          }],
        };
      },
    );

    // =========================================================================
    // THREATS
    // =========================================================================
    server.tool(
      'get_threat_catalog',
      'Get agentic AI threats. Optionally filter by category (memory-and-context, tool-and-api-abuse, identity-and-privilege, multi-agent, human-interaction, code-execution, data-exfiltration, behavioral, communication).',
      {
        category: z.enum([
          'memory-and-context', 'tool-and-api-abuse', 'identity-and-privilege',
          'multi-agent', 'human-interaction', 'code-execution',
          'data-exfiltration', 'behavioral', 'communication',
        ]).optional(),
      },
      async ({ category }) => {
        const threats = category
          ? getThreatsByCategory(threatsKnowledge, category as ThreatCategory['primary'])
          : threatsKnowledge.threats;

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              count: threats.length,
              threats: threats.map(t => ({
                id: t.id,
                name: t.name,
                description: t.description,
                category: t.category,
                severity: t.severity,
                severityRationale: t.severityRationale,
                sourceMappings: t.sourceMappings.map(s => ({
                  taxonomy: s.taxonomy,
                  sourceId: s.sourceId,
                  sourceName: s.sourceName,
                  relationship: s.relationship,
                })),
              })),
            }, null, 2),
          }],
        };
      },
    );

    // =========================================================================
    // MITIGATIONS
    // =========================================================================
    server.tool(
      'get_mitigations',
      'Get mitigations for agentic AI threats. Optionally filter by threat ID (e.g. TM-001, TM-002).',
      {
        threatId: z.string().optional(),
      },
      async ({ threatId }) => {
        const mitigations = threatId
          ? getMitigationsForThreat(threatsKnowledge, threatId)
          : threatsKnowledge.mitigations;

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              count: mitigations.length,
              mitigations: mitigations.map(m => ({
                id: m.id,
                name: m.name,
                description: m.description,
                threatIds: m.threatIds,
                source: m.source,
                platformContext: m.platformContext,
              })),
            }, null, 2),
          }],
        };
      },
    );

    // =========================================================================
    // COVERAGE GAPS
    // =========================================================================
    server.tool(
      'get_coverage_gaps',
      'Get gaps in security framework coverage of agentic AI threats. Shows which incidents lack framework coverage and where frameworks fall short.',
      {},
      async () => {
        const gaps = getAllGaps(threatsKnowledge);
        const summary = computeCoverageSummary(threatsKnowledge);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              gapCount: gaps.length,
              gaps: gaps.map(g => ({
                incidentId: g.incidentId,
                incidentTitle: g.incidentTitle,
                frameworkId: g.frameworkId,
                frameworkName: g.frameworkName,
                gapDescription: g.gapDescription,
              })),
              coverageSummary: summary,
            }, null, 2),
          }],
        };
      },
    );

    // =========================================================================
    // SCOPE
    // =========================================================================
    server.tool(
      'get_scope',
      'Get what this knowledge covers and does not cover. Use this to understand the boundaries and limitations of the governance data before relying on it.',
      {},
      async () => {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              'framework-coverage': {
                scope: frameworkCoverageKnowledge.scope,
                dissent: frameworkCoverageKnowledge.dissent,
              },
              threats: {
                scope: threatsKnowledge.scope,
                dissent: threatsKnowledge.dissent,
              },
            }, null, 2),
          }],
        };
      },
    );
  },
  {},
  { basePath: '/api' },
);

export { handler as GET, handler as POST, handler as DELETE };
