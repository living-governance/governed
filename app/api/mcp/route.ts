import { z } from 'zod';
import { createMcpHandler } from 'mcp-handler';
import {
  getFrameworkCoverage,
  getThreats,
  getFrameworkConfidenceStatus,
  isFrameworkStale,
  getThreatConfidenceStatus,
  isThreatStale,
  computeCoverageSummary,
  getIncidentsForThreat,
  getMitigationsForThreat,
  getThreatsByCategory,
  getAllGaps,
} from '@/lib/knowledge';
import type { ThreatCategory } from '@/lib/knowledge';

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
        const frameworkCoverage = getFrameworkCoverage();
        const threats = getThreats();
        const fc = getFrameworkConfidenceStatus(frameworkCoverage);
        const tc = getThreatConfidenceStatus(threats);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              artifacts: [
                {
                  id: 'framework-coverage',
                  ...fc,
                  isStale: isFrameworkStale(frameworkCoverage),
                  evaluatedAt: frameworkCoverage.evaluation.date,
                  evaluatedBy: frameworkCoverage.evaluation.by,
                  verificationStatus: (frameworkCoverage.evaluation as any).verificationStatus,
                  validDays: frameworkCoverage.evaluation.validDays,
                },
                {
                  id: 'threats',
                  ...tc,
                  isStale: isThreatStale(threats),
                  evaluatedAt: threats.evaluation.date,
                  evaluatedBy: threats.evaluation.by,
                  validDays: threats.evaluation.validDays,
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
        const frameworkCoverage = getFrameworkCoverage();
        const frameworks = frameworkCoverage.frameworks.map(f => ({
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
              evaluatedAt: frameworkCoverage.evaluation.date,
              methodology: 'Binary scoring across 19 criteria (threat identification, practical guidance, evidence quality, completeness). 100 points total.',
              frameworks,
              insights: frameworkCoverage.insights,
              recommendations: frameworkCoverage.recommendations,
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
        const threatsData = getThreats();
        const threats = category
          ? getThreatsByCategory(threatsData, category as ThreatCategory['primary'])
          : threatsData.threats;

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
        const threatsData = getThreats();
        const mitigations = threatId
          ? getMitigationsForThreat(threatsData, threatId)
          : threatsData.mitigations;

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
        const threatsData = getThreats();
        const gaps = getAllGaps(threatsData);
        const summary = computeCoverageSummary(threatsData);

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
        const frameworkCoverage = getFrameworkCoverage();
        const threatsData = getThreats();
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              'framework-coverage': {
                scope: frameworkCoverage.scope,
                dissent: frameworkCoverage.dissent,
              },
              threats: {
                scope: threatsData.scope,
                dissent: threatsData.dissent,
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
