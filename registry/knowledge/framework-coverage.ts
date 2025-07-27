// registry/knowledge/framework-coverage.ts

export interface Framework {
  id: string;
  name: string;
  organization: string;
  aiCoverage: {
    overall: number;
    categories: {
      'mcp-attacks': boolean;
      'tool-poisoning': boolean;
      'prompt-injection': boolean;
      'agent-autonomy': boolean;
      'temporal-drift': boolean;
      'coordination-attacks': boolean;
      'zero-trust': boolean;
      'defense-in-depth': boolean;
    };
  };
  status: 'active' | 'applicable' | 'no-guidance';
  gaps: string[];
  lastFrameworkUpdate: string;
}

export const frameworkCoverageKnowledge = {
  id: 'framework-coverage-2025-q3',
  name: 'Security Framework AI Coverage Analysis',
  
  // Living Knowledge metadata
  evaluation: {
    date: new Date('2025-07-24'),
    by: '@tommy',
    validDays: 90,
    methodology: `Reviewed official framework documentation and research sources for:
    1. Specific MCP or agentic AI security guidance
    2. Applicable principles that address MCP threats
    3. Active development or announced plans
    4. Tool poisoning and agent-specific threat coverage
    
    Coverage scoring:
    - 0%: No guidance or applicable principles
    - 25-50%: General principles apply but no specific guidance  
    - 50-75%: Active development or strong applicable principles
    - 75-100%: Specific MCP guidance available`
  },
  
  // Update instructions for monthly review
  updateInstructions: `
    Monthly review process:
    1. Visit each framework's official site:
       - OWASP GenAI: https://genai.owasp.org/
       - NIST: https://www.nist.gov/itl/ai-risk-management-framework
       - ISO: Check for updates to ISO/IEC 27090 (AI cybersecurity)
       - MITRE ATT&CK: https://attack.mitre.org/
       - CIS Controls: https://www.cisecurity.org/controls
    2. Search for new sections covering:
       - MCP (Model Context Protocol) specific guidance
       - Tool poisoning attacks (86% success rate threat)
       - Agent autonomy security
       - Multi-agent coordination threats
    3. Check commercial vendors (Palo Alto, AWS, Microsoft) for new guidance
    4. Update coverage percentages and add timeline entry
  `,
  
  // Recent changes timeline
  timeline: [
    {
      date: new Date('2025-01-15'),
      by: '@security-researcher',
      change: 'Initial framework analysis - No MCP coverage in any framework'
    },
    {
      date: new Date('2025-04-15'),
      by: '@security-researcher',
      change: 'OWASP announces MCP Top 10 project, begins active development'
    },
    {
      date: new Date('2025-07-24'),
      by: '@tommy',
      change: 'Updated with verified research: OWASP MCP Top 10 in development, removed EU AI Act (regulation not framework), added MITRE ATT&CK and CIS Controls'
    }
  ],
  
  // Self-documenting metadata
  metadata: {
    description: 'Shows how well security frameworks address AI and MCP-specific threats',
    details: [
      'Based on MCP Security Research from June 2025',
      'Tool poisoning attacks show 86% success rate',
      'Only 50% of frameworks have any AI guidance',
      'OWASP leading with MCP Top 10 development',
      'Color-coded by coverage: red (<40%), yellow (40-70%), green (>70%)'
    ],
    category: 'compliance',
    tags: ['frameworks', 'compliance', 'ai-security', 'mcp-security', 'gap-analysis']
  },
  
  frameworks: [
    {
      id: 'owasp-genai',
      name: 'OWASP GenAI Security Project',
      organization: 'OWASP Foundation',
      aiCoverage: {
        overall: 0.50,
        categories: {
          'mcp-attacks': true,  // MCP Top 10 in development
          'tool-poisoning': true,  // Primary focus area
          'prompt-injection': true,
          'agent-autonomy': false,
          'temporal-drift': false,
          'coordination-attacks': false,
          'zero-trust': true,
          'defense-in-depth': true
        }
      },
      status: 'active' as const,
      gaps: ['Multi-agent coordination', 'Long-term behavioral drift'],
      lastFrameworkUpdate: '2025-04'
    },
    {
      id: 'nist-csf',
      name: 'NIST Cybersecurity Framework',
      organization: 'NIST (US)',
      aiCoverage: {
        overall: 0.62,
        categories: {
          'mcp-attacks': false,  // No specific MCP guidance
          'tool-poisoning': false,
          'prompt-injection': true,
          'agent-autonomy': false,
          'temporal-drift': true,
          'coordination-attacks': false,
          'zero-trust': true,  // SP 800-207
          'defense-in-depth': true  // SP 800-53 Rev 5
        }
      },
      status: 'applicable' as const,
      gaps: ['No MCP-specific guidance', 'Tool poisoning not addressed'],
      lastFrameworkUpdate: '2024-09'
    },
    {
      id: 'iso-27001',
      name: 'ISO 27001',
      organization: 'ISO',
      aiCoverage: {
        overall: 0.55,
        categories: {
          'mcp-attacks': false,
          'tool-poisoning': false,
          'prompt-injection': false,
          'agent-autonomy': false,
          'temporal-drift': false,
          'coordination-attacks': false,
          'zero-trust': true,
          'defense-in-depth': true
        }
      },
      status: 'applicable' as const,
      gaps: ['No MCP guidance', 'AI-specific threats not addressed', 'ISO/IEC 27090 in development'],
      lastFrameworkUpdate: '2022-10'
    },
    {
      id: 'mitre-attack',
      name: 'MITRE ATT&CK',
      organization: 'MITRE Corporation',
      aiCoverage: {
        overall: 0.0,
        categories: {
          'mcp-attacks': false,
          'tool-poisoning': false,
          'prompt-injection': false,
          'agent-autonomy': false,
          'temporal-drift': false,
          'coordination-attacks': false,
          'zero-trust': false,
          'defense-in-depth': false
        }
      },
      status: 'no-guidance' as const,
      gaps: ['No official MCP attack techniques', 'Researchers mapping attacks independently', 'Expected future additions'],
      lastFrameworkUpdate: '2025-01'
    },
    {
      id: 'cis-controls',
      name: 'CIS Controls',
      organization: 'Center for Internet Security',
      aiCoverage: {
        overall: 0.0,
        categories: {
          'mcp-attacks': false,
          'tool-poisoning': false,
          'prompt-injection': false,
          'agent-autonomy': false,
          'temporal-drift': false,
          'coordination-attacks': false,
          'zero-trust': false,
          'defense-in-depth': false
        }
      },
      status: 'no-guidance' as const,
      gaps: ['No AI or MCP considerations', '18 controls don\'t address agent threats'],
      lastFrameworkUpdate: '2024-05'
    }
  ] as Framework[],
  
  insights: [
    'Tool poisoning attacks succeed 86% of the time - critical gap in most frameworks',
    '50% of major frameworks have zero MCP guidance',
    'OWASP leading industry response with MCP Top 10 project',
    'Commercial vendors (AWS, Palo Alto) ahead of standards bodies'
  ],
  
  recommendations: [
    'Follow OWASP MCP Top 10 development closely',
    'Apply NIST Zero Trust principles to all MCP deployments',
    'Implement tool validation beyond what frameworks require',
    'Monitor MITRE ATT&CK for future MCP techniques'
  ],
  
  sources: [
    { name: 'MCP Security Research Archive', date: new Date('2025-06-01') },
    { name: 'Security Frameworks MCP Analysis', date: new Date('2025-06-15') },
    { name: 'OWASP GenAI Project Site', date: new Date('2025-07-01') }
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
  const daysUntilStale = Math.max(0, Math.floor(validDays - daysSince));
  
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