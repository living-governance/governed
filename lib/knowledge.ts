// lib/knowledge.ts
// Data access seam for site-layer components.
//
// Today: pass-through re-exports from registry/knowledge/.
// Tomorrow: API fetch, Electron IPC, or tiered access control.
// Only this file imports from registry/knowledge/ in the site layer.
// Distributable components (registry/components/) keep direct imports.

import {
  frameworkCoverageKnowledge,
  getConfidenceStatus as getFrameworkConfidenceStatus,
  isStale as isFrameworkStale,
  getLatestChange,
} from '@/registry/knowledge/framework-coverage'

import {
  threatsKnowledge,
  getConfidenceStatus as getThreatConfidenceStatus,
  isStale as isThreatStale,
  computeCoverageSummary,
  getIncidentsForThreat,
  getMitigationsForThreat,
  getThreatsByCategory,
  getAllGaps,
  getContributionCandidates,
  getThreatsByExploitation,
  getLatestIncident,
  getEvolutionTimeline,
  computeThreatTrends,
  getFrameworkCoverage as getThreatFrameworkCoverage,
} from '@/registry/knowledge/threats'

// Re-export types for layout components
export type { Framework, DetailedEvaluationKey, ScoringRationale, DetailedEvaluation } from '@/registry/knowledge/framework-coverage'
export type {
  Threat,
  SeverityLevel,
  ThreatCategory,
  ThreatsKnowledge,
  MitigationReference,
  Incident,
  IncidentGap,
  ThreatSourceMapping,
  ThreatEvolutionEvent,
} from '@/registry/knowledge/threats'

// =============================================================================
// TYPES
// =============================================================================

export type PostureLevel = 'nominal' | 'elevated' | 'critical'

export interface KPIs {
  coveragePercent: number
  threatCount: number
  lastEvaluation: Date
  mcpToolCount: number
  posture: PostureLevel
}

// =============================================================================
// DATA ACCESS
// =============================================================================

export function getFrameworkCoverage() {
  return frameworkCoverageKnowledge
}

export function getThreats() {
  return threatsKnowledge
}

// =============================================================================
// COMPUTED
// =============================================================================

export function getPosture(): PostureLevel {
  const threats = threatsKnowledge.threats
  if (threats.some(t => t.severity === 'critical')) return 'critical'
  if (threats.some(t => t.severity === 'high')) return 'elevated'
  return 'nominal'
}

export function getKPIs(): KPIs {
  const frameworks = frameworkCoverageKnowledge.frameworks
  const coveragePercent = Math.round(
    frameworks.reduce((sum, f) => sum + f.aiCoverageScore * 100, 0) / frameworks.length
  )

  const fcDate = new Date(frameworkCoverageKnowledge.evaluation.date)
  const tDate = new Date(threatsKnowledge.evaluation.date)
  const lastEvaluation = fcDate > tDate ? fcDate : tDate

  return {
    coveragePercent,
    threatCount: threatsKnowledge.threats.length,
    lastEvaluation,
    mcpToolCount: 6,
    posture: getPosture(),
  }
}

export function getConfidenceStatus(knowledgeId: 'framework-coverage' | 'threats') {
  if (knowledgeId === 'framework-coverage') {
    return getFrameworkConfidenceStatus(frameworkCoverageKnowledge)
  }
  return getThreatConfidenceStatus(threatsKnowledge)
}

// =============================================================================
// RE-EXPORTED UTILITIES (for MCP route and other site-layer consumers)
// =============================================================================

export {
  getFrameworkConfidenceStatus,
  isFrameworkStale,
  getLatestChange,
  getThreatConfidenceStatus,
  isThreatStale,
  computeCoverageSummary,
  getIncidentsForThreat,
  getMitigationsForThreat,
  getThreatsByCategory,
  getAllGaps,
  getContributionCandidates,
  getThreatsByExploitation,
  getLatestIncident,
  getEvolutionTimeline,
  computeThreatTrends,
  getThreatFrameworkCoverage,
}
