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
    },
    {
      date: new Date('2025-07-27'),
      by: '@assistant',
      change: 'Evaluated NIST AI RMF: 25/100 score - excellent general AI governance but zero agentic AI content. Updated coverage from 62% to 25%'
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
      id: 'nist-ai-rmf',
      name: 'NIST AI Risk Management Framework',
      organization: 'NIST (US)',
      url: 'https://www.nist.gov/itl/ai-risk-management-framework',
      aiCoverage: {
        overall: 0.25,  // General AI governance only, no agentic-specific content
        categories: {
          'mcp-attacks': false,      // No MCP coverage
          'tool-poisoning': false,   // No tool manipulation coverage
          'prompt-injection': false, // General AI risks only
          'agent-autonomy': false,   // No agent-specific content
          'temporal-drift': false,   // No agent behavioral drift
          'coordination-attacks': false,  // No multi-agent coverage
          'zero-trust': true,        // General security principles apply
          'defense-in-depth': true   // General security principles apply
        }
      },
      status: 'applicable' as const,
      gaps: ['No agentic AI content', 'No multi-agent systems coverage', 'No MCP or tool calling guidance', 'Framework addresses general AI only'],
      lastFrameworkUpdate: '2024-07'  // GenAI Profile release
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
    'NIST AI RMF has 0% agentic AI content despite being an AI-specific framework',
    'Only OWASP addresses multi-agent systems and MCP security',
    '80% of frameworks have zero guidance for autonomous agents'
  ],
  
  recommendations: [
    'Use OWASP Agentic AI Threats as primary reference for agent security',
    'NIST AI RMF useful for general AI governance but not agentic systems',
    'Implement tool validation beyond what any framework requires',
    'Monitor OWASP MCP Top 10 development for protocol-specific guidance',
    'Combine OWASP agentic guidance with NIST governance structure where applicable'
  ],
  
  sources: [
    { name: 'MCP Security Research Archive', date: new Date('2025-06-01') },
    { name: 'Security Frameworks MCP Analysis', date: new Date('2025-06-15') },
    { name: 'OWASP GenAI Project Site', url: 'https://genai.owasp.org/', date: new Date('2025-07-01') },
    { name: 'OWASP Agentic AI Threats and Mitigations v1.0a', url: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/', date: new Date('2025-02-01') },
    { name: 'OWASP MCP Top 10 (In Development)', url: 'https://owasp.org/www-project-mcp-top-10/', date: new Date('2025-07-01') },
    { name: 'NIST AI Risk Management Framework 1.0', url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf', date: new Date('2023-01-26') },
    { name: 'NIST Generative AI Profile', url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf', date: new Date('2024-07-26') }
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
    },
    
    'nist-ai-rmf-v1': {
      frameworkName: 'NIST AI Risk Management Framework 1.0 + GenAI Profile',
      evaluationDate: new Date('2025-07-27'),
      evaluatedBy: '@assistant',
      
      scores: {
        threatIdentification: 0,   // No agentic-specific threats
        practicalGuidance: 20,     // General AI guidance only
        evidenceQuality: 5,        // Good references but not agentic
        completeness: 0,           // No agentic lifecycle coverage
        total: 25
      },
      
      // Detailed scoring breakdown
      breakdown: {
        // THREAT IDENTIFICATION (0/40)
        'memory-attacks': false,          // No agent memory poisoning
        'tool-api-abuse': false,          // No tool calling/MCP coverage
        'privilege-escalation': false,     // No agent privilege escalation
        'multi-agent-threats': false,      // Zero multi-agent content
        'temporal-behaviors': false,       // No agent behavioral evolution
        'human-manipulation': false,       // General human-AI only
        'communication-poisoning': false,  // No inter-agent communication
        'identity-auth': false,           // No agent identity threats
        
        // PRACTICAL GUIDANCE (20/30)
        'clear-patterns': true,           // Good general AI patterns
        'specific-tools': false,          // No agentic tools
        'checklists': true,              // General AI checklists
        'architecture-diagrams': false,   // No threat diagrams
        'step-by-step': true,            // General AI process
        
        // EVIDENCE QUALITY (5/20)
        'credible-research': true,        // Good general AI research
        'real-incidents': false,          // No agentic incidents
        'attack-patterns': false,         // No agentic attacks
        'detection-guidance': false,      // Not for agents
        
        // COMPLETENESS (0/10)
        'detection-methods': false,       // Not agentic-specific
        'response-procedures': false      // Not for agent threats
      },
      
      strengths: [
        'Excellent general AI governance framework',
        'Strong lifecycle management approach',
        'Good organizational risk management structure',
        'Living document with regular updates',
        'Comprehensive for traditional AI systems'
      ],
      
      weaknesses: [
        'Zero coverage of agentic AI or autonomous agents',
        'No mention of multi-agent systems',
        'No Model Context Protocol (MCP) guidance',
        'No tool calling or function calling security',
        'Does not address agent-specific threats',
        'No coverage of temporal malicious evolution in agents'
      ],
      
      verdict: 'NIST AI RMF provides solid governance for general AI systems but completely lacks agentic AI security content. Organizations building autonomous agents or multi-agent systems will find no specific guidance here and must look elsewhere for agentic threat coverage.'
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