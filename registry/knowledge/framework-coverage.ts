// registry/knowledge/framework-coverage-analysis.ts

export interface Framework {
  id: string;
  name: string;
  version: string;
  aiCoverage: {
    overall: number;
    categories: {
      'mcp-attacks': boolean;
      'prompt-injection': boolean;
      'data-poisoning': boolean;
      'model-theft': boolean;
      'temporal-drift': boolean;
      'coordination-attacks': boolean;
      'tool-manipulation': boolean;
      'behavior-evolution': boolean;
    };
  };
  strengths: string[];
  gaps: string[];
}

export const frameworkCoverageKnowledge = {
  id: 'framework-coverage-2025-q2',
  name: 'Security Framework AI Coverage Analysis',
  lastUpdated: '2025-04-15',
  
  // Living Knowledge metadata
  evaluation: {
    date: new Date('2025-07-24'),
    by: '@tommy',
    validDays: 90,
    methodology: 'Reviewed official framework documentation, mapped controls to AI attack categories'
  },
  
  // Update instructions for monthly review
  updateInstructions: `
    Monthly review process:
    1. Visit each framework's official site:
       - OWASP: https://owasp.org/www-project-top-10-for-large-language-model-applications/
       - NIST: https://www.nist.gov/itl/ai-risk-management-framework
       - ISO: Check for AI supplements to 27001:2022
       - EU AI Act: Check latest draft status
    2. Search for new sections covering:
       - MCP protocols / Model Context Protocol
       - Tool manipulation / Tool usage security
       - Multi-agent coordination
       - Behavioral drift over time
    3. Update coverage percentages if new guidance found
    4. Add timeline entry summarizing changes
    5. Adjust validDays if frameworks are updating frequently
  `,
  
  // Recent changes only (full history can be in Git)
  timeline: [
    {
      date: new Date('2025-01-15'),
      by: '@early-researcher',
      change: 'Initial framework analysis - OWASP at 31%, no MCP coverage anywhere'
    },
    {
      date: new Date('2025-04-15'),
      by: '@security-researcher',
      change: 'Q2 update - OWASP improved to 37.5%, still no MCP guidance in any framework'
    },
    {
      date: new Date('2025-07-24'),
      by: '@tommy',
      change: 'OWASP added LLM08: Tool Manipulation - coverage now 50%, includes MCP-style attacks'
    }
  ],
  
  // Self-documenting metadata
  metadata: {
    description: 'Shows how well security frameworks address AI-specific threats',
    details: [
      'Real data: OWASP at 37.5% coverage',
      'Visual progress bars for quick scanning',
      'Highlights critical gaps with alerts',
      'Links to detailed gap analysis',
      'Color-coded by severity: red (<40%), yellow (40-70%), green (>70%)'
    ],
    category: 'compliance',
    tags: ['frameworks', 'compliance', 'ai-security', 'gap-analysis']
  },
  
  frameworks: [
    {
      id: 'owasp-top10-llm',
      name: 'OWASP Top 10 for LLM',
      version: '2025.1',
      aiCoverage: {
        overall: 0.50,  // 50% - improved!
        categories: {
          'mcp-attacks': true,  // NEW: Now covered in LLM08
          'prompt-injection': true,
          'data-poisoning': true,
          'model-theft': true,
          'temporal-drift': false,
          'coordination-attacks': false,
          'tool-manipulation': true,  // NEW: Explicitly covered
          'behavior-evolution': false
        }
      },
      strengths: [
        'Well-documented prompt injection patterns',
        'NEW: LLM08 addresses tool manipulation and MCP-style attacks'
      ],
      gaps: ['Missing autonomous agent risks', 'No multi-agent coordination']
    },
    {
      id: 'nist-ai-rmf',
      name: 'NIST AI Risk Management Framework',
      version: '1.0',
      aiCoverage: {
        overall: 0.62,
        categories: {
          'mcp-attacks': false,
          'prompt-injection': true,
          'data-poisoning': true,
          'model-theft': true,
          'temporal-drift': true,
          'coordination-attacks': false,
          'tool-manipulation': true,
          'behavior-evolution': false
        }
      },
      strengths: ['Comprehensive governance structure', 'Risk taxonomy'],
      gaps: ['No MCP protocol guidance', 'Limited on multi-agent systems']
    },
    {
      id: 'iso-27001',
      name: 'ISO 27001:2022',
      version: '2022',
      aiCoverage: {
        overall: 0.55,
        categories: {
          'mcp-attacks': false,
          'prompt-injection': false,
          'data-poisoning': true,
          'model-theft': true,
          'temporal-drift': false,
          'coordination-attacks': false,
          'tool-manipulation': true,
          'behavior-evolution': false
        }
      },
      strengths: ['Strong access control framework'],
      gaps: ['Not AI-specific', 'No autonomous agent guidance']
    },
    {
      id: 'eu-ai-act',
      name: 'EU AI Act',
      version: 'Draft 2025',
      aiCoverage: {
        overall: 0.20,
        categories: {
          'mcp-attacks': false,
          'prompt-injection': false,
          'data-poisoning': false,
          'model-theft': false,
          'temporal-drift': false,
          'coordination-attacks': false,
          'tool-manipulation': false,
          'behavior-evolution': true
        }
      },
      strengths: ['Addresses long-term AI evolution'],
      gaps: ['Focus on compliance over security', 'No technical controls']
    }
  ] as Framework[],
  
  insights: [
    'BREAKING: OWASP now addresses MCP attacks via LLM08 (as of July 2025)',
    'Temporal and coordination risks still severely underrepresented',
    'Traditional security frameworks retrofitted for AI miss key risks',
    'Progress: Tool manipulation now covered by 2/4 major frameworks'
  ],
  
  recommendations: [
    'Supplement frameworks with MCP-specific controls',
    'Implement continuous behavior monitoring',
    'Develop multi-agent coordination controls'
  ]
}

// Living Knowledge utility functions
export function isStale(knowledge: typeof frameworkCoverageKnowledge): boolean {
  if (!knowledge.evaluation) return false;
  const daysSince = (Date.now() - new Date(knowledge.evaluation.date).getTime()) / (1000 * 60 * 60 * 24);
  return daysSince > (knowledge.evaluation.validDays || 90);
}

export function getConfidenceStatus(knowledge: typeof frameworkCoverageKnowledge): {
  confidence: number;
  status: string;
  daysUntilStale: number;
} {
  const daysSince = (Date.now() - new Date(knowledge.evaluation.date).getTime()) / (1000 * 60 * 60 * 24);
  const validDays = knowledge.evaluation.validDays || 90;
  const daysUntilStale = Math.max(0, validDays - daysSince);
  
  if (daysSince <= validDays * 0.3) {
    return { 
      confidence: 1.0, 
      status: "Fresh - high confidence",
      daysUntilStale 
    };
  } else if (daysSince <= validDays * 0.7) {
    return { 
      confidence: 0.7, 
      status: "Aging - consider review",
      daysUntilStale 
    };
  } else if (daysSince <= validDays) {
    return { 
      confidence: 0.5, 
      status: "Stale - needs review",
      daysUntilStale 
    };
  } else {
    return { 
      confidence: 0.3, 
      status: "Expired - review required",
      daysUntilStale: 0 
    };
  }
}

export function getLatestChange(knowledge: typeof frameworkCoverageKnowledge): string {
  if (!knowledge.timeline || knowledge.timeline.length === 0) {
    return 'No change history available';
  }
  const latest = knowledge.timeline[knowledge.timeline.length - 1];
  return latest.change;
}