// registry/knowledge/framework-coverage.ts

export interface Framework {
  id: string;
  name: string;
  organization: string;
  url: string;  // Official framework website
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
    methodology: `Binary Scoring Framework for Security Frameworks (100 points total):
    
    1. THREAT IDENTIFICATION (40 points) - Does the framework acknowledge these threats?
       - Memory attacks mentioned (5 pts): Memory poisoning, context manipulation, persistent data attacks
       - Tool/API abuse covered (5 pts): Tool manipulation, excessive permissions, API misuse
       - Privilege escalation discussed (5 pts): Permission boundaries, role compromise, lateral movement
       - Multi-agent threats included (5 pts): Inter-agent attacks, trust exploitation, coordination failures
       - Temporal behaviors acknowledged (5 pts): Behavioral drift, sleeper agents, delayed activation
       - Human manipulation risks (5 pts): Trust exploitation, cognitive overload, social engineering via AI
       - Communication poisoning (5 pts): Message tampering, channel compromise, misinformation spread
       - Identity/auth threats (5 pts): Agent impersonation, identity spoofing, authentication bypass
    
    2. PRACTICAL GUIDANCE (30 points) - Can developers implement defenses?
       - Provides clear patterns (10 pts): Conceptual examples, anti-patterns, implementation guidance
       - Names specific tools (5 pts): Recommends concrete tools, scanners, or services
       - Provides checklists (5 pts): Step-by-step processes, validation criteria
       - Has architecture diagrams (5 pts): Visual representations, data flows, component relationships
       - Offers step-by-step instructions (5 pts): Clear implementation paths
    
    3. EVIDENCE QUALITY (20 points) - Is it based on real data?
       - References credible research (5 pts): Academic papers, industry studies, official reports
       - References real incidents/research (5 pts): Actual attacks, case studies, post-mortems
       - Describes attack patterns clearly (5 pts): Detailed scenarios, attack chains, TTPs
       - Includes detection/monitoring guidance (5 pts): Observables, indicators, monitoring strategies
    
    4. COMPLETENESS (10 points) - Does it cover the full lifecycle?
       - Covers detection methods (5 pts): How to identify threats and attacks
       - Includes response procedures (5 pts): Incident response, remediation, recovery
    
    Scoring interpretation:
    - 90-100: Comprehensive coverage, production-ready
    - 70-89: Strong foundation, some gaps
    - 50-69: Partial coverage, significant gaps
    - 30-49: Limited value for agentic AI
    - 0-29: No meaningful coverage`
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
    },
    {
      date: new Date('2025-07-27'),
      by: '@assistant',
      change: 'Updated methodology to binary scoring framework (100 points), added detailed OWASP evaluation showing perfect 100/100 score'
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
      url: 'https://genai.owasp.org/',
      aiCoverage: {
        overall: 0.90,  // Updated based on comprehensive Agentic AI Threats document
        categories: {
          'mcp-attacks': true,  // MCP Top 10 in development + Agentic Threats covers
          'tool-poisoning': true,  // T2: Tool Misuse extensively covered
          'prompt-injection': true,  // T6: Intent Breaking & Goal Manipulation
          'agent-autonomy': true,  // T6, T7: Autonomy manipulation covered
          'temporal-drift': true,  // T7: Misaligned & Deceptive Behaviors
          'coordination-attacks': true,  // T12, T13, T14: Multi-agent threats
          'zero-trust': true,
          'defense-in-depth': true
        }
      },
      status: 'active' as const,
      gaps: ['Quantitative metrics on attack success rates'],
      lastFrameworkUpdate: '2025-04'
    },
    {
      id: 'nist-csf',
      name: 'NIST Cybersecurity Framework',
      organization: 'NIST (US)',
      url: 'https://www.nist.gov/cyberframework',
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
      url: 'https://www.iso.org/isoiec-27001-information-security.html',
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
      url: 'https://attack.mitre.org/',
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
      url: 'https://www.cisecurity.org/controls',
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
    'OWASP now provides 90% coverage with comprehensive Agentic AI Threats document',
    'Only 20% of major frameworks have any MCP-specific guidance',
    'OWASP leading industry response with both Agentic Threats guide and MCP Top 10 project'
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
    { name: 'OWASP GenAI Project Site', url: 'https://genai.owasp.org/', date: new Date('2025-07-01') },
    { name: 'OWASP Agentic AI Threats and Mitigations v1.0a', url: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/', date: new Date('2025-02-01') },
    { name: 'OWASP MCP Top 10 (In Development)', url: 'https://owasp.org/www-project-mcp-top-10/', date: new Date('2025-07-01') }
  ],
  
  // Detailed framework evaluations using our binary scoring methodology
  detailedEvaluations: {
    'owasp-agentic-threats-v1': {
      frameworkName: 'OWASP Agentic AI Threats and Mitigations v1.0a',
      evaluationDate: new Date('2025-07-27'),
      evaluatedBy: '@assistant',
      
      scores: {
        threatIdentification: 40,  // Perfect score - all 15 threats covered
        practicalGuidance: 30,     // Full marks - playbooks and patterns
        evidenceQuality: 20,       // Full marks - credible sources
        completeness: 10,          // Full marks - detect/respond covered
        total: 100
      },
      
      // Detailed scoring breakdown
      breakdown: {
        // THREAT IDENTIFICATION (40/40)
        'memory-attacks': true,           // T1: Memory Poisoning
        'tool-api-abuse': true,          // T2: Tool Misuse
        'privilege-escalation': true,     // T3: Privilege Compromise
        'multi-agent-threats': true,      // T12, T13, T14
        'temporal-behaviors': true,       // T7: Misaligned & Deceptive
        'human-manipulation': true,       // T15: Human Manipulation
        'communication-poisoning': true,  // T12: Agent Communication Poisoning
        'identity-auth': true,           // T9: Identity Spoofing
        
        // PRACTICAL GUIDANCE (30/30)
        'clear-patterns': true,          // 6 detailed playbooks
        'specific-tools': true,          // MCP-scan, frameworks mentioned
        'checklists': true,             // Step-by-step playbooks
        'architecture-diagrams': true,   // Threat model diagram page 16
        'step-by-step': true,           // Proactive/reactive/detective steps
        
        // EVIDENCE QUALITY (20/20)
        'credible-research': true,       // NIST, CSA, academic sources
        'real-incidents': true,          // Links to real studies
        'attack-patterns': true,         // Detailed threat scenarios
        'detection-guidance': true,      // Each threat has detection
        
        // COMPLETENESS (10/10)
        'detection-methods': true,       // All threats include detection
        'response-procedures': true      // Playbooks include response
      },
      
      strengths: [
        'Comprehensive coverage of all 15 agentic AI threats',
        'Detailed threat taxonomy navigator for systematic evaluation',
        'Six practical playbooks with proactive/reactive/detective controls',
        'Real-world scenarios for enterprise copilots, IoT, code review, and RPA',
        'Strong contributor list including NIST and industry experts'
      ],
      
      weaknesses: [
        'No production-ready code samples (appropriate for security framework)',
        'Proof-of-concepts still in development',
        'Limited quantitative metrics on attack success rates',
        'Version 1.0a indicates early release status'
      ],
      
      verdict: 'OWASP\'s Agentic AI Threats document sets the gold standard for identifying and addressing agentic AI security risks. With perfect scores across all categories, it provides the most comprehensive threat taxonomy and practical guidance available today.'
    }
  }
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