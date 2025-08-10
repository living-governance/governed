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

// Add type for detailed evaluations
export type DetailedEvaluationKey = 'owasp-agentic-threats-v1' | 'nist-ai-rmf-v1' | 'iso-27090-draft' | 'iso-42001-2023' | 'mitre-atlas-v4' | 'cis-controls-v8' | 'mitre-attack-v15';

export interface DetailedEvaluation {
  frameworkName: string;
  evaluationDate: Date;
  evaluatedBy: string;
  scores: {
    threatIdentification: number;
    practicalGuidance: number;
    evidenceQuality: number;
    completeness: number;
    total: number;
  };
  breakdown: {
    [key: string]: boolean | 'unknown';
  };
  strengths: string[];
  weaknesses: string[];
  verdict: string;
}

export const frameworkCoverageKnowledge = {
  id: 'framework-coverage-2025-q3',
  name: 'Security Framework AI Coverage Analysis',
  
  // Living Knowledge metadata
  evaluation: {
    date: new Date('2025-07-24'),
    by: '@tsynode',
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
  
  // Methodology comparison data for component
  methodologyComparison: {
    criteria: [
      // Threat Identification (40 points)
      { category: 'threatIdentification', name: 'Memory attacks', points: 5, section: 'Threat Identification' },
      { category: 'threatIdentification', name: 'Tool/API abuse', points: 5, section: 'Threat Identification' },
      { category: 'threatIdentification', name: 'Privilege escalation', points: 5, section: 'Threat Identification' },
      { category: 'threatIdentification', name: 'Multi-agent threats', points: 5, section: 'Threat Identification' },
      { category: 'threatIdentification', name: 'Temporal behaviors', points: 5, section: 'Threat Identification' },
      { category: 'threatIdentification', name: 'Human manipulation', points: 5, section: 'Threat Identification' },
      { category: 'threatIdentification', name: 'Communication poisoning', points: 5, section: 'Threat Identification' },
      { category: 'threatIdentification', name: 'Identity/auth threats', points: 5, section: 'Threat Identification' },
      // Practical Guidance (30 points)
      { category: 'practicalGuidance', name: 'Clear patterns', points: 10, section: 'Practical Guidance' },
      { category: 'practicalGuidance', name: 'Specific tools', points: 5, section: 'Practical Guidance' },
      { category: 'practicalGuidance', name: 'Checklists', points: 5, section: 'Practical Guidance' },
      { category: 'practicalGuidance', name: 'Architecture diagrams', points: 5, section: 'Practical Guidance' },
      { category: 'practicalGuidance', name: 'Step-by-step instructions', points: 5, section: 'Practical Guidance' },
      // Evidence Quality (20 points)
      { category: 'evidenceQuality', name: 'Credible research', points: 5, section: 'Evidence Quality' },
      { category: 'evidenceQuality', name: 'Real incidents', points: 5, section: 'Evidence Quality' },
      { category: 'evidenceQuality', name: 'Attack patterns', points: 5, section: 'Evidence Quality' },
      { category: 'evidenceQuality', name: 'Detection guidance', points: 5, section: 'Evidence Quality' },
      // Completeness (10 points)
      { category: 'completeness', name: 'Detection methods', points: 5, section: 'Completeness' },
      { category: 'completeness', name: 'Response procedures', points: 5, section: 'Completeness' }
    ],
    frameworks: {
      owasp: 'owasp-agentic-threats-v1' as DetailedEvaluationKey,
      nist: 'nist-ai-rmf-v1' as DetailedEvaluationKey,
      iso27090: 'iso-27090-draft' as DetailedEvaluationKey,
      iso42001: 'iso-42001-2023' as DetailedEvaluationKey,
      atlas: 'mitre-atlas-v4' as DetailedEvaluationKey,
      attack: 'mitre-attack-v15' as DetailedEvaluationKey,
      cis: 'cis-controls-v8' as DetailedEvaluationKey
    }
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
      by: '@tsynode',
      change: 'Initial framework analysis - No MCP coverage in any framework'
    },
    {
      date: new Date('2025-04-15'),
      by: '@tsynode',
      change: 'OWASP announces MCP Top 10 project, begins active development'
    },
    {
      date: new Date('2025-07-24'),
      by: '@tsynode',
      change: 'Updated with verified research: OWASP MCP Top 10 in development, removed EU AI Act (regulation not framework), added MITRE ATT&CK and CIS Controls'
    },
    {
      date: new Date('2025-07-27'),
      by: '@tsynode',
      change: 'Updated methodology to binary scoring framework (100 points), added detailed OWASP evaluation showing perfect 100/100 score'
    },
    {
      date: new Date('2025-07-27'),
      by: '@tsynode',
      change: 'Evaluated NIST AI RMF: 25/100 score - excellent general AI governance but zero agentic AI content. Updated coverage from 62% to 25%'
    },
    {
      date: new Date('2025-07-28'),
      by: '@tsynode',
      change: 'Replaced ISO/IEC 27001 (generic infosec) with ISO/IEC DIS 27090 (AI cybersecurity draft). ISO 42001:2023 excluded as pre-agentic era standard. Tracking 27090 draft status.'
    },
    {
      date: new Date('2025-08-10'),
      by: '@tsynode',
      change: 'Added ISO/IEC 42001:2023 evaluation: 35/100 score. Good AI governance framework but zero agentic AI security content. Published pre-MCP era, focuses on bias/transparency over agent threats.'
    },
    {
      date: new Date('2025-08-10'),
      by: '@tsynode',
      change: 'Evaluated MITRE ATLAS: 65/100 score. Best ML/AI threat framework but limited agentic coverage. Strong on prompt injection and LLM threats, missing MCP and multi-agent scenarios. Updated ATT&CK entry to clarify it has no AI coverage.'
    },
    {
      date: new Date('2025-08-10'),
      by: '@tsynode',
      change: 'Updated ATLAS evaluation to 75/100 after analyzing data files. Found extensive LLM coverage including RAG poisoning, 32 case studies, and April 2025 updates. Still missing MCP and multi-agent coordination.'
    },
    {
      date: new Date('2025-08-10'),
      by: '@tsynode',
      change: 'Evaluated CIS Controls v8.1: 25/100 score. Excellent general cybersecurity but zero AI content. 18 controls don\'t recognize AI as distinct asset class. Traditional IT focus only.'
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
      id: 'iso-27090',
      name: 'ISO/IEC DIS 27090 (Draft)',
      organization: 'ISO/IEC',
      url: 'https://www.iso.org/standard/56581.html',
      aiCoverage: {
        overall: 0.0,  // Unknown - draft status, but AI-security focused
        categories: {
          'mcp-attacks': false,  // Draft status - content not publicly available
          'tool-poisoning': false,
          'prompt-injection': false,
          'agent-autonomy': false,
          'temporal-drift': false,
          'coordination-attacks': false,
          'zero-trust': false,
          'defense-in-depth': false
        }
      },
      status: 'no-guidance' as const,  // Draft = not yet actionable
      gaps: ['Draft International Standard - voting closes July 2025', 'Content not publicly available', 'Unknown coverage of agentic AI threats', 'First AI-specific cybersecurity ISO standard'],
      lastFrameworkUpdate: '2025-07'
    },
    {
      id: 'iso-42001',
      name: 'ISO/IEC 42001:2023 AI Management Systems',
      organization: 'ISO/IEC',
      url: 'https://www.iso.org/standard/42001',
      aiCoverage: {
        overall: 0.35,  // General AI management, limited agentic coverage
        categories: {
          'mcp-attacks': false,      // Pre-MCP era (2023)
          'tool-poisoning': false,   // No specific tool security
          'prompt-injection': false, // General risk management only
          'agent-autonomy': false,   // Pre-agentic AI focus
          'temporal-drift': false,   // No behavioral evolution coverage
          'coordination-attacks': false,  // Single AI system focus
          'zero-trust': true,        // General security principles via Annex A
          'defense-in-depth': true   // Risk-based approach throughout
        }
      },
      status: 'applicable' as const,
      gaps: ['Published before agentic AI emergence', 'No MCP or tool calling security', 'Focuses on traditional AI risks', 'Limited technical security controls'],
      lastFrameworkUpdate: '2023-12'
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
      gaps: ['Traditional IT focus only', 'No AI/ML coverage', 'Use MITRE ATLAS for AI threats'],
      lastFrameworkUpdate: '2025-01'
    },
    {
      id: 'mitre-atlas',
      name: 'MITRE ATLAS',
      organization: 'MITRE Corporation',
      url: 'https://atlas.mitre.org/',
      aiCoverage: {
        overall: 0.75,  // Excellent ML/AI coverage, strong LLM coverage
        categories: {
          'mcp-attacks': false,      // No MCP-specific coverage found
          'tool-poisoning': true,    // LLM Plugin Compromise (T0053)
          'prompt-injection': true,  // AML.T0051 - Direct and Indirect
          'agent-autonomy': true,    // LLM Jailbreak, system prompt extraction
          'temporal-drift': false,   // No behavioral drift coverage
          'coordination-attacks': false,  // Single AI focus
          'zero-trust': true,        // Security principles throughout
          'defense-in-depth': true   // Comprehensive threat matrix
        }
      },
      status: 'active' as const,
      gaps: ['No MCP/Model Context Protocol', 'Limited multi-agent scenarios', 'No agent behavioral drift'],
      lastFrameworkUpdate: '2025-04'  // Latest techniques from April 2025
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
    'OWASP leads with 90% coverage through comprehensive Agentic AI Threats document',
    'MITRE ATLAS scores 75% - excellent LLM coverage but no MCP or multi-agent',
    'ISO/IEC 42001:2023 scores 35% - good governance but predates agentic AI',
    'NIST AI RMF has 0% agentic AI content despite being AI-specific',
    'Only OWASP addresses multi-agent systems and MCP security',
    'ATLAS has 32 real-world case studies including ChatGPT attacks'
  ],
  
  recommendations: [
    'Use OWASP Agentic AI Threats as primary reference for agent security',
    'Supplement with MITRE ATLAS for ML/LLM attack patterns',
    'NIST AI RMF useful for general AI governance but not agentic systems',
    'Implement tool validation beyond what any framework requires',
    'Monitor OWASP MCP Top 10 development for protocol-specific guidance',
    'Use ATLAS Navigator for threat modeling LLM applications'
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
      evaluatedBy: '@tsynode',
      
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
      evaluatedBy: '@tsynode',
      
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
    },
    
    'iso-27090-draft': {
      frameworkName: 'ISO/IEC DIS 27090 - AI Cybersecurity (Draft)',
      evaluationDate: new Date('2025-07-28'),
      evaluatedBy: '@tsynode',
      
      scores: {
        threatIdentification: 0,   // Unknown - draft content not available
        practicalGuidance: 0,      // Unknown - draft content not available
        evidenceQuality: 0,        // Unknown - draft content not available
        completeness: 0,           // Unknown - draft content not available
        total: 0                   // Cannot score until published
      },
      
      // Detailed scoring breakdown - all unknown due to draft status
      breakdown: {
        // THREAT IDENTIFICATION (0/40) - Unknown
        'memory-attacks': 'unknown' as any,
        'tool-api-abuse': 'unknown' as any,
        'privilege-escalation': 'unknown' as any,
        'multi-agent-threats': 'unknown' as any,
        'temporal-behaviors': 'unknown' as any,
        'human-manipulation': 'unknown' as any,
        'communication-poisoning': 'unknown' as any,
        'identity-auth': 'unknown' as any,
        
        // PRACTICAL GUIDANCE (0/30) - Unknown
        'clear-patterns': 'unknown' as any,
        'specific-tools': 'unknown' as any,
        'checklists': 'unknown' as any,
        'architecture-diagrams': 'unknown' as any,
        'step-by-step': 'unknown' as any,
        
        // EVIDENCE QUALITY (0/20) - Unknown
        'credible-research': 'unknown' as any,
        'real-incidents': 'unknown' as any,
        'attack-patterns': 'unknown' as any,
        'detection-guidance': 'unknown' as any,
        
        // COMPLETENESS (0/10) - Unknown
        'detection-methods': 'unknown' as any,
        'response-procedures': 'unknown' as any
      },
      
      strengths: [
        'First ISO standard specifically targeting AI cybersecurity',
        'Addresses security threats to AI systems throughout lifecycle',
        'Applicable to all organization types and sizes',
        'ISO standardization brings global recognition and adoption'
      ],
      
      weaknesses: [
        'Still in Draft International Standard (DIS) stage',
        'Content not publicly available for evaluation',
        'Unknown coverage of agentic AI and multi-agent systems',
        'Voting closes July 2025 - not yet actionable',
        'May not address latest threats like MCP attacks or tool poisoning'
      ],
      
      verdict: 'ISO/IEC 27090 represents the ISO community\'s response to AI security threats. However, as a draft standard with no public content, organizations cannot use it yet. Its relevance to agentic AI, multi-agent systems, and modern threats like MCP attacks remains unknown. Track its development but rely on OWASP for current guidance.'
    },
    
    'iso-42001-2023': {
      frameworkName: 'ISO/IEC 42001:2023 - AI Management Systems',
      evaluationDate: new Date('2025-08-10'),
      evaluatedBy: '@tsynode',
      
      scores: {
        threatIdentification: 0,   // No agentic-specific threats identified
        practicalGuidance: 25,     // Good general AI guidance, some implementation help
        evidenceQuality: 10,       // References standards but not real incidents
        completeness: 0,           // No agentic-specific lifecycle coverage
        total: 35
      },
      
      // Detailed scoring breakdown
      breakdown: {
        // THREAT IDENTIFICATION (0/40)
        'memory-attacks': false,          // No coverage of AI memory attacks
        'tool-api-abuse': false,          // No tool/API security mentioned
        'privilege-escalation': false,     // General access control only
        'multi-agent-threats': false,      // Single AI system focus
        'temporal-behaviors': false,       // No coverage of behavioral drift
        'human-manipulation': false,       // Ethics covered, not manipulation
        'communication-poisoning': false,  // No inter-agent communication
        'identity-auth': false,           // No AI identity management
        
        // PRACTICAL GUIDANCE (25/30)
        'clear-patterns': true,           // PDCA methodology, Annex A controls
        'specific-tools': false,          // No specific security tools
        'checklists': true,              // Annex A provides control checklist
        'architecture-diagrams': false,   // No security architecture diagrams
        'step-by-step': true,            // Clear implementation steps via PDCA
        
        // EVIDENCE QUALITY (10/20)
        'credible-research': true,        // References ISO standards
        'real-incidents': false,          // No real attack examples
        'attack-patterns': false,         // No threat scenarios
        'detection-guidance': true,       // Monitoring requirements in Clause 9
        
        // COMPLETENESS (0/10)
        'detection-methods': false,       // General monitoring, not threat detection
        'response-procedures': false      // Incident management not specific to AI threats
      },
      
      strengths: [
        'First published AI management system standard',
        'Comprehensive management system approach (PDCA)',
        'Annex A provides AI-specific controls',
        'Integration with ISO/IEC 27001 for security',
        'Microsoft Copilot achieved certification',
        'Addresses bias, transparency, and accountability'
      ],
      
      weaknesses: [
        'Published in 2023 - predates agentic AI emergence',
        'No coverage of MCP, tool calling, or function calling',
        'Lacks specific security threat identification',
        'No multi-agent system considerations',
        'Limited technical security controls',
        'Focuses on ethics/governance over security'
      ],
      
      verdict: 'ISO/IEC 42001:2023 provides solid AI governance foundations but lacks agentic AI security coverage. As a pre-MCP era standard, it addresses traditional AI risks (bias, transparency) rather than modern agent threats. Useful for general AI management but insufficient for securing autonomous agents or multi-agent systems.'
    },
    
    'mitre-atlas-v4': {
      frameworkName: 'MITRE ATLAS v4.5.2 - Adversarial Threat Landscape for AI Systems',
      evaluationDate: new Date('2025-08-10'),
      evaluatedBy: '@tsynode',
      
      scores: {
        threatIdentification: 30,  // Strong AI/LLM threats, missing some agent aspects
        practicalGuidance: 20,     // Tactics/techniques but limited implementation
        evidenceQuality: 20,       // Excellent case studies and active research
        completeness: 5,           // Detection only, limited response
        total: 75
      },
      
      // Detailed scoring breakdown
      breakdown: {
        // THREAT IDENTIFICATION (30/40)
        'memory-attacks': false,          // No AI memory attack coverage
        'tool-api-abuse': true,           // LLM Plugin Compromise (T0053)
        'privilege-escalation': true,      // LLM Jailbreak (T0054)
        'multi-agent-threats': false,      // Single AI system focus
        'temporal-behaviors': false,       // No behavioral drift coverage
        'human-manipulation': true,        // Phishing via LLM (T0052)
        'communication-poisoning': true,   // RAG Poisoning (T0070)
        'identity-auth': true,            // System prompt extraction (T0056)
        
        // PRACTICAL GUIDANCE (20/30)
        'clear-patterns': true,           // Matrix of tactics/techniques
        'specific-tools': false,          // No tool recommendations
        'checklists': false,             // Tactics not prescriptive
        'architecture-diagrams': true,    // Attack flow diagrams
        'step-by-step': false,           // High-level techniques only
        
        // EVIDENCE QUALITY (20/20)
        'credible-research': true,        // Academic partnerships
        'real-incidents': true,           // 32 case studies documented
        'attack-patterns': true,          // Detailed TTPs with procedures
        'detection-guidance': true,       // Mitigations documented
        
        // COMPLETENESS (5/10)
        'detection-methods': true,        // Some detection guidance
        'response-procedures': false      // Minimal incident response
      },
      
      strengths: [
        'Most comprehensive AI/ML threat framework',
        'Excellent LLM coverage (prompt injection, jailbreak, plugins)',
        'RAG poisoning and retrieval attacks covered',
        '32 real-world case studies including ChatGPT attacks',
        'Active development with April 2025 updates',
        'Strong industry adoption and community'
      ],
      
      weaknesses: [
        'No MCP or Model Context Protocol coverage',
        'Limited multi-agent coordination attacks',
        'No temporal drift or behavioral evolution',
        'Focuses on attacks not defenses',
        'Limited implementation guidance',
        'No agent-to-agent attack patterns'
      ],
      
      verdict: 'MITRE ATLAS scores 75% - the most comprehensive ML/AI threat framework available. Excellent coverage of LLM threats including prompt injection, RAG poisoning, and plugin compromise. Strong evidence base with 32 case studies. However, still lacks MCP-specific attacks and multi-agent scenarios. Essential reference but supplement with OWASP for full agentic coverage.'
    },
    
    'cis-controls-v8': {
      frameworkName: 'CIS Critical Security Controls v8.1',
      evaluationDate: new Date('2025-08-10'),
      evaluatedBy: '@tsynode',
      
      scores: {
        threatIdentification: 0,   // No AI-specific threats
        practicalGuidance: 15,     // General security controls
        evidenceQuality: 10,       // Good general security research
        completeness: 0,           // No AI-specific coverage
        total: 25
      },
      
      // Detailed scoring breakdown
      breakdown: {
        // THREAT IDENTIFICATION (0/40)
        'memory-attacks': false,          // No AI memory considerations
        'tool-api-abuse': false,          // No AI tool security
        'privilege-escalation': false,     // General privilege only
        'multi-agent-threats': false,      // No agent considerations
        'temporal-behaviors': false,       // No behavioral evolution
        'human-manipulation': false,       // General phishing only
        'communication-poisoning': false,  // Traditional network focus
        'identity-auth': false,           // Traditional IAM only
        
        // PRACTICAL GUIDANCE (15/30)
        'clear-patterns': true,           // 18 controls with safeguards
        'specific-tools': false,          // No AI-specific tools
        'checklists': true,              // Implementation groups (IG1/2/3)
        'architecture-diagrams': false,   // No AI threat architecture
        'step-by-step': true,            // Clear control implementation
        
        // EVIDENCE QUALITY (10/20)
        'credible-research': true,        // Community consensus process
        'real-incidents': true,           // Traditional IT incidents
        'attack-patterns': false,         // No AI attack patterns
        'detection-guidance': false,      // Not AI-specific
        
        // COMPLETENESS (0/10)
        'detection-methods': false,       // No AI threat detection
        'response-procedures': false      // No AI incident response
      },
      
      strengths: [
        '18 prioritized controls for cyber hygiene',
        'Implementation Groups for different org sizes',
        'Aligns with NIST CSF 2.0 and other frameworks',
        'Strong community adoption and tooling',
        'Version 8.1 adds governance function',
        'Cloud Companion Guide available'
      ],
      
      weaknesses: [
        'Zero AI or ML security content',
        'No recognition of AI as distinct asset class',
        'No coverage of prompt injection or model attacks',
        'Traditional IT security focus only',
        'No guidance for AI development lifecycle',
        'Asset inventory doesn\'t include AI models'
      ],
      
      verdict: 'CIS Controls v8.1 provides excellent general cybersecurity guidance but contains zero AI-specific content. The 18 controls focus entirely on traditional IT security without recognizing AI systems as requiring distinct security measures. Organizations using AI must supplement CIS Controls with AI-specific frameworks like OWASP or ATLAS.'
    },
    
    'mitre-attack-v15': {
      frameworkName: 'MITRE ATT&CK v15.1',
      evaluationDate: new Date('2025-08-10'),
      evaluatedBy: '@tsynode',
      
      scores: {
        threatIdentification: 0,   // No AI threats
        practicalGuidance: 0,      // No AI guidance
        evidenceQuality: 0,        // No AI evidence
        completeness: 0,           // No AI coverage
        total: 0
      },
      
      // Detailed scoring breakdown
      breakdown: {
        // THREAT IDENTIFICATION (0/40)
        'memory-attacks': false,          // No AI coverage
        'tool-api-abuse': false,          // No AI coverage
        'privilege-escalation': false,     // Traditional IT only
        'multi-agent-threats': false,      // No AI coverage
        'temporal-behaviors': false,       // No AI coverage
        'human-manipulation': false,       // Traditional phishing only
        'communication-poisoning': false,  // No AI coverage
        'identity-auth': false,           // Traditional IT only
        
        // PRACTICAL GUIDANCE (0/30)
        'clear-patterns': false,          // Not for AI
        'specific-tools': false,          // Not for AI
        'checklists': false,              // Not for AI
        'architecture-diagrams': false,   // Not for AI
        'step-by-step': false,            // Not for AI
        
        // EVIDENCE QUALITY (0/20)
        'credible-research': false,       // Not for AI
        'real-incidents': false,          // Not for AI
        'attack-patterns': false,         // Not for AI
        'detection-guidance': false,      // Not for AI
        
        // COMPLETENESS (0/10)
        'detection-methods': false,       // Not for AI
        'response-procedures': false      // Not for AI
      },
      
      strengths: [
        'Industry standard for traditional IT threats',
        'Comprehensive adversary tactics and techniques',
        'Strong community and tooling ecosystem',
        'Regular updates and living framework',
        'Used globally by SOCs and threat intel teams'
      ],
      
      weaknesses: [
        'Zero AI or ML coverage by design',
        'Explicitly directs users to ATLAS for AI threats',
        'No plans to add AI content',
        'Traditional IT/enterprise focus only',
        'Not applicable to AI security'
      ],
      
      verdict: 'MITRE ATT&CK scores 0% for AI security - this is by design. ATT&CK focuses exclusively on traditional IT threats and explicitly directs users to MITRE ATLAS for AI/ML security. Organizations should not look to ATT&CK for AI guidance but instead use its sister framework ATLAS.'
    }
  } as Record<DetailedEvaluationKey, DetailedEvaluation>
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