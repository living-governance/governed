// registry/knowledge/_TEMPLATE.ts
// =============================================================================
// COMPONENT KNOWLEDGE TEMPLATE
// Copy this file and rename to your component's knowledge file.
// See ONTOLOGY.md for naming conventions and METHODOLOGY.md for the Hunt process.
// =============================================================================

// -----------------------------------------------------------------------------
// Types — Define your domain-specific types here
// -----------------------------------------------------------------------------

export interface TemplateEntry {
  id: string
  name: string
  // Add your domain-specific fields
}

// -----------------------------------------------------------------------------
// Knowledge — The single source of truth
// -----------------------------------------------------------------------------

export const templateKnowledge = {
  // == Identity ==
  id: 'template-component-YYYY-QN',           // Unique ID with time context
  name: 'Your Component Name',                 // Human-readable name
  version: '0.1.0',

  // == Scope (from ONTOLOGY.md) ==
  scope: {
    appliesTo: [
      'What domains this component covers',
    ],
    doesNotApplyTo: [
      'What is explicitly out of scope',
    ],
  },

  // == Evaluation Metadata ==
  evaluation: {
    date: new Date('2026-01-01'),              // When this data was last verified
    by: '@tsynode',                            // Who evaluated it
    methodology: 'Describe your evaluation approach here',
    updateInstructions: `Steps to verify and update this knowledge:
1. Check primary sources listed in sources[]
2. Re-evaluate using the methodology above
3. Update the evaluation date
4. Archive the previous version`,
    reviewCycleDays: 90,                       // Confidence decay period (ADR-004)
  },

  // == Sources ==
  sources: [
    {
      name: 'Primary Source Name',
      url: 'https://example.com',
      accessed: new Date('2026-01-01'),
      type: 'primary' as const,               // 'primary' | 'secondary' | 'commentary'
    },
  ],

  // == Domain Data — Replace with your actual data structures ==
  entries: [] as TemplateEntry[],

  // == Insights — Key takeaways derived from the data ==
  insights: [
    {
      text: 'Your key finding here',
      priority: 1,                             // 1 = highest priority
    },
  ],

  // == Shareable Content — For social sharing and reports ==
  shareableContent: {
    headline: 'One-line summary for sharing',
    keyFinding: 'The most important data point',
    context: 'Brief context that makes the finding meaningful',
  },

  // == Timeline — Track how this knowledge evolved ==
  timeline: [] as Array<{
    date: Date
    event: string
    significance: 'major' | 'minor'
  }>,
}

// -----------------------------------------------------------------------------
// Derived Utilities — Functions that compute from the knowledge
// -----------------------------------------------------------------------------

/**
 * Confidence status based on evaluation age (ADR-004: 90-day decay)
 */
export function getConfidenceStatus(k: typeof templateKnowledge) {
  const daysSince = Math.floor(
    (Date.now() - k.evaluation.date.getTime()) / (1000 * 60 * 60 * 24)
  )
  const cycleDays = k.evaluation.reviewCycleDays
  const daysUntilStale = Math.max(0, cycleDays - daysSince)
  const confidence = Math.max(0, Math.min(1, 1 - daysSince / cycleDays))

  return {
    daysSince,
    daysUntilStale,
    confidence,
    status:
      confidence >= 0.7 ? 'Fresh — recently verified' :
      confidence >= 0.4 ? 'Aging — review recommended' :
      'Stale — update required',
  }
}

// Add more utility functions as needed for your component's data access patterns
