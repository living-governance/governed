// registry/knowledge/framework-coverage.ts

export interface Framework {
  id: string;
  name: string;
  organization: string;
  url: string;  // Official framework website
  dataSource?: string;  // Direct link to data/PDF/GitHub for evaluation
  aiCoverageScore: number;  // Score from detailed evaluation / 100
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
  
  // Cloud implementation guidance
  cloudImplementation: {
    aws: {
      title: 'AWS Implementation Guide',
      description: 'Deploy framework controls using AWS security services',
      keyMessage: 'Security frameworks provide the "what" - AWS services provide the "how". Choose between centralized management (Security Hub, Firewall Manager) or direct implementation (WAF, Config) based on your organization\'s needs.',
      
      // Service overview - explain the landscape first
      serviceOverview: {
        waf: {
          name: 'AWS WAF',
          icon: '/aws-icons/aws-waf.svg',
          description: 'Web application firewall for Layer 7 protection',
          url: 'https://aws.amazon.com/waf/',
          when: 'Direct protection for specific applications'
        },
        firewallManager: {
          name: 'AWS Firewall Manager',
          icon: '/aws-icons/aws-firewall-manager.svg',
          description: 'Centrally manage WAF rules across multiple accounts',
          url: 'https://aws.amazon.com/firewall-manager/',
          when: 'Organization-wide WAF policy enforcement'
        },
        config: {
          name: 'AWS Config',
          icon: '/aws-icons/aws-config.svg',
          description: 'Assess, audit, and evaluate resource configurations',
          url: 'https://aws.amazon.com/config/',
          when: 'Detailed resource compliance tracking'
        },
        securityHub: {
          name: 'AWS Security Hub',
          icon: '/aws-icons/aws-security-hub.svg',
          description: 'Unified security and compliance center',
          url: 'https://aws.amazon.com/security-hub/',
          when: 'Consolidated compliance dashboard and automated checks'
        },
        guardDuty: {
          name: 'Amazon GuardDuty',
          icon: '/aws-icons/amazon-guardduty.svg',
          description: 'Intelligent threat detection service',
          url: 'https://aws.amazon.com/guardduty/',
          when: 'Automated threat detection mapped to MITRE ATT&CK'
        }
      },
      
      // Framework-specific implementations
      frameworkMappings: [
        {
          framework: 'OWASP',
          implementations: [
            {
              approach: 'Direct Protection',
              service: 'AWS WAF Managed Rules',
              serviceUrl: 'https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups.html',
              details: [
                {
                  name: 'Core Rule Set (CRS)',
                  description: 'OWASP Top 10 protection',
                  resourceId: 'AWSManagedRulesCommonRuleSet',
                  specs: '700 WCU • Free'
                },
                {
                  name: 'Known Bad Inputs',
                  description: 'Block malicious patterns',
                  resourceId: 'AWSManagedRulesKnownBadInputsRuleSet',
                  specs: '200 WCU • Free'
                }
              ],
              quickDeploy: 'WAF Console → Add rules → Deploy to ALB/CloudFront'
            },
            {
              approach: 'Centralized Management',
              service: 'AWS Firewall Manager',
              serviceUrl: 'https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html',
              details: [
                {
                  name: 'Organization-wide WAF Policy',
                  description: 'Deploy OWASP rules across all accounts automatically',
                  specs: '$100/policy/month + WAF costs'
                }
              ],
              quickDeploy: 'Enable in Organizations → Create security policy → Apply to OUs'
            }
          ]
        },
        {
          framework: 'NIST 800-53',
          implementations: [
            {
              approach: 'Conformance Pack',
              service: 'AWS Config',
              serviceUrl: 'https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-nist-800-53_rev_5.html',
              details: [
                {
                  name: 'NIST 800-53 Rev 5',
                  description: '200+ Config rules mapped to NIST controls',
                  resourceId: 'Operational-Best-Practices-for-NIST-800-53-rev-5',
                  specs: '$0.003/rule evaluation',
                  githubTemplate: 'https://github.com/awslabs/aws-config-rules/blob/master/aws-config-conformance-packs/Operational-Best-Practices-for-NIST-800-53-rev-5.yaml'
                }
              ],
              quickDeploy: 'Config → Conformance packs → Deploy template'
            },
            {
              approach: 'Security Standard',
              service: 'AWS Security Hub',
              serviceUrl: 'https://docs.aws.amazon.com/securityhub/latest/userguide/nist-standard.html',
              details: [
                {
                  name: 'NIST 800-53 Rev 5 Standard',
                  description: 'Pre-configured checks with automated evidence collection',
                  specs: '$0.001/check + Config costs'
                }
              ],
              quickDeploy: 'Security Hub → Standards → Enable NIST',
              advantages: 'Includes Config rules + additional checks, automated scoring, investigation tools'
            }
          ]
        },
        {
          framework: 'CIS',
          implementations: [
            {
              approach: 'Security Standard',
              service: 'AWS Security Hub',
              serviceUrl: 'https://docs.aws.amazon.com/securityhub/latest/userguide/cis-aws-foundations-benchmark.html',
              details: [
                {
                  name: 'CIS AWS Foundations Benchmark',
                  description: 'Automated CIS benchmark checks',
                  specs: 'Included with Security Hub'
                }
              ],
              quickDeploy: 'Security Hub → Standards → Enable CIS'
            }
          ]
        },
        {
          framework: 'MITRE ATT&CK',
          implementations: [
            {
              approach: 'Threat Detection',
              service: 'Amazon GuardDuty',
              serviceUrl: 'https://aws.amazon.com/guardduty/',
              details: [
                {
                  name: 'Automated threat detection',
                  description: 'Maps to MITRE ATT&CK tactics',
                  specs: '$0.02/GB analyzed'
                }
              ],
              quickDeploy: 'Enable with one click → Auto-maps findings to ATT&CK'
            }
          ]
        }
      ],
      
      // Decision guide
      decisionGuide: {
        title: 'Which Service to Use?',
        scenarios: [
          {
            scenario: 'Single AWS account, specific web apps',
            recommendation: 'AWS WAF with managed rules'
          },
          {
            scenario: 'Multi-account organization',
            recommendation: 'Security Hub for compliance, Firewall Manager for WAF'
          },
          {
            scenario: 'Need compliance evidence/reporting',
            recommendation: 'Security Hub (includes Config + more)'
          },
          {
            scenario: 'Custom compliance requirements',
            recommendation: 'AWS Config with custom rules'
          },
          {
            scenario: 'AI/ML workloads without specific framework',
            recommendation: 'Still use Config AI/ML pack for baseline security'
          }
        ]
      },
      
      bestPractices: [
        'Use Security Hub over standalone Config for standard frameworks (NIST, CIS)',
        'Deploy Firewall Manager for organization-wide WAF policies',
        'Start with detection mode before enforcement',
        'Layer services: GuardDuty (threats) + Security Hub (compliance) + Config (resources)',
        'AI/ML Config pack provides defense-in-depth even without framework mapping'
      ]
    },
    gcp: {
      title: 'GCP Implementation Guide',
      description: 'Coming soon - Cloud Armor, Security Command Center, and Policy Intelligence',
      frameworkMappings: []
    },
    azure: {
      title: 'Azure Implementation Guide', 
      description: 'Coming soon - Azure WAF, Policy, and Microsoft Defender for Cloud',
      frameworkMappings: []
    }
  },
  
  // Shareable content for each view
  shareableContent: {
    main: {
      title: 'AI Framework Coverage Analysis',
      headline: 'Critical Security Gap Identified',
      insights: [
        '🚨 Only 2 of 7 security frameworks are ready for AI threats',
      ],
      keyMetric: '2 of 7 Ready',
      visualType: 'ranking'
    },
    methodology: {
      title: 'Framework Evaluation Methodology',
      headline: 'Binary Scoring Reveals Truth',
      insights: [
        '📊 OWASP: 100/100, NIST: 25/100 despite being AI-specific',
        '🎯 Most frameworks fail threat identification (40 points)',
        '🔍 Binary scoring across 19 criteria exposes gaps'
      ],
      keyMetric: '100-Point Scale',
      visualType: 'matrix'
    },
    cloud: {
      title: 'AWS Implementation Guide',
      headline: 'Deploy Frameworks with 5 Services',
      insights: [
        '☁️ Security Hub → NIST, WAF → OWASP, GuardDuty → MITRE',
      ],
      keyMetric: '5 Services',
      visualType: 'aws'
    },
    timeline: {
      title: 'AI Security Timeline 2021-2025',
      headline: '2023 Was the Explosion Year',
      insights: [
        '📈 From 1 to 7 frameworks in 4 years',
        '💥 2023: NIST AI RMF, ISO 42001, OWASP LLM all launched',
        '🚀 2025: Focus shifts to agentic AI security'
      ],
      keyMetric: '4-Year Evolution',
      visualType: 'timeline'
    }
  },
  
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
    1. Check each framework for updates:
       - Use the dataSource link if available (GitHub repos, PDFs, data files)
       - Fall back to the url (official website) if no dataSource
       - Look for version changes, new releases, or content updates
    
    2. Re-evaluate each framework using the Binary Scoring Framework defined in
       evaluation.methodology above. Use the criteria listed in
       methodologyComparison.criteria for scoring.
    
    3. Update the detailedEvaluations section with:
       - New scores for each category (see evaluation.methodology for points)
       - Updated breakdown with true/false for each criterion
       - Criterion keys must match methodologyComparison.criteria names
         (converted to lowercase with spaces→hyphens)
       - New strengths and weaknesses
       - Updated verdict
       - Set evaluationDate to review date
    
    4. Update the frameworks array:
       - Set aiCoverageScore = total score / 100
       - Update dataSource if a better evaluation source is found
       - Update gaps array based on evaluation findings
       - Update status ('active', 'applicable', or 'no-guidance')
       - Update lastFrameworkUpdate if framework was revised
    
    5. If a framework has a new version or major update, add timeline entry:
       - date: Framework release/update date
       - framework: Framework name
       - change: What the framework added/changed (not our evaluation)
    
    6. Update insights and recommendations based on new findings
  `,
  
  // Framework evolution timeline - HIGH CONFIDENCE dates only
  // Sources verified from official announcements, press releases, and documentation
  timeline: [
    // 2021 - Early AI Security Frameworks
    {
      date: new Date('2021-05-01'), // Q2 2021
      framework: 'CIS Controls',
      change: 'CIS Controls v8.0 released - first version with cloud/mobile focus',
      confidence: 'high' // CIS official announcement
    },
    
    // 2022 - MITRE ATLAS Evolution  
    {
      date: new Date('2022-03-01'), // March 2022
      framework: 'MITRE ATLAS',
      change: 'MITRE ATLAS v3.0.0 - adapted ATT&CK tactics for ML threats',
      confidence: 'high' // GitHub releases show March 2022
    },
    
    // 2023 - AI Governance Explosion
    {
      date: new Date('2023-01-26'),
      framework: 'NIST AI RMF',
      change: 'NIST AI Risk Management Framework 1.0 officially released',
      confidence: 'high' // NIST press release, launch event documented
    },
    {
      date: new Date('2023-05-01'), // May 2023
      framework: 'OWASP Top 10 for LLM',
      change: 'Project initiated - community effort begins',
      confidence: 'medium' // Multiple sources reference May 2023 inception
    },
    {
      date: new Date('2023-08-01'), // August 2023
      framework: 'OWASP Top 10 for LLM',
      change: 'Version 1.0 released - first official list',
      confidence: 'high' // PDF documents dated August 2023
    },
    {
      date: new Date('2023-10-16'),
      framework: 'OWASP Top 10 for LLM',
      change: 'Version 1.1 released - refined based on feedback',
      confidence: 'high' // Version history in official PDF
    },
    {
      date: new Date('2023-11-06'),
      framework: 'MITRE ATLAS',
      change: 'Major update adding GenAI and LLM-specific techniques',
      confidence: 'high' // MITRE press release with Microsoft collaboration
    },
    {
      date: new Date('2023-12-01'), // December 2023
      framework: 'ISO 42001',
      change: 'ISO/IEC 42001:2023 AI Management System published',
      confidence: 'high' // ISO official publication date December 2023
    },
    
    // 2024 - Maturation and Updates
    {
      date: new Date('2024-06-25'),
      framework: 'CIS Controls',
      change: 'Version 8.1 released - added governance security function',
      confidence: 'high' // CIS press release June 25, 2024
    },
    {
      date: new Date('2024-07-26'),
      framework: 'NIST AI RMF',
      change: 'Generative AI Profile (NIST-AI-600-1) released',
      confidence: 'high' // NIST official publication
    },

    {
      date: new Date('2024-11-18'),
      framework: 'OWASP Top 10 for LLM',
      change: 'Version 2025 released - adds vectors, system prompts, misinformation',
      confidence: 'high' // Official PDF shows November 18, 2024 release
    },
    {
      date: new Date('2024-12-01'), // December 2024
      framework: 'OWASP Agentic Security',
      change: 'Agentic Security Initiative formally announced',
      confidence: 'medium' // Blog posts reference December announcement
    },
    
    // 2025 - Agentic AI Focus
    {
      date: new Date('2025-02-01'), // February 2025
      framework: 'OWASP Agentic Security',
      change: 'Agentic AI Threats and Mitigations v1.0a published',
      confidence: 'high' // Multiple sources confirm February 2025
    },

    {
      date: new Date('2025-04-16'),
      framework: 'ISO 27090',
      change: 'Draft International Standard ballot initiated - voting through July',
      confidence: 'high' // ISO tracking site confirms April 16, 2025
    },
    {
      date: new Date('2025-06-01'), // Still in Phase 1 Draft
      framework: 'OWASP MCP Top 10',
      change: 'Phase 1: Drafting initiated (v0.0.0) - defining MCP-specific vulnerabilities',
      confidence: 'high' // GitHub repo confirms draft status, not yet released
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
      dataSource: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/',  // Direct PDF link
      aiCoverageScore: 1.0,  // 100/100 from detailed evaluation
      status: 'active' as const,
      gaps: ['Quantitative metrics on attack success rates'],
      lastFrameworkUpdate: '2025-04'
    },
    {
      id: 'nist-ai-rmf',
      name: 'NIST AI Risk Management Framework',
      organization: 'NIST (US)',
      url: 'https://www.nist.gov/itl/ai-risk-management-framework',
      dataSource: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',  // PDF
      aiCoverageScore: 0.25,  // 25/100 from detailed evaluation
      status: 'applicable' as const,
      gaps: ['No agentic AI content', 'No multi-agent systems coverage', 'No MCP or tool calling guidance', 'Framework addresses general AI only'],
      lastFrameworkUpdate: '2024-07'  // GenAI Profile release
    },
    {
      id: 'iso-27090',
      name: 'ISO/IEC DIS 27090 (Draft)',
      organization: 'ISO/IEC',
      url: 'https://www.iso.org/standard/56581.html',
      // No dataSource - draft not publicly available
      aiCoverageScore: 0.0,  // Unknown - draft status
      status: 'no-guidance' as const,  // Draft = not yet actionable
      gaps: ['Draft International Standard - voting closes July 2025', 'Content not publicly available', 'Unknown coverage of agentic AI threats', 'First AI-specific cybersecurity ISO standard'],
      lastFrameworkUpdate: '2025-07'
    },
    {
      id: 'iso-42001',
      name: 'ISO/IEC 42001:2023 AI Management Systems',
      organization: 'ISO/IEC',
      url: 'https://www.iso.org/standard/42001',
      // No dataSource - ISO standards are paywalled
      aiCoverageScore: 0.35,  // 35/100 from detailed evaluation
      status: 'applicable' as const,
      gaps: ['Published before agentic AI emergence', 'No MCP or tool calling security', 'Focuses on traditional AI risks', 'Limited technical security controls'],
      lastFrameworkUpdate: '2023-12'
    },
    {
      id: 'mitre-attack',
      name: 'MITRE ATT&CK',
      organization: 'MITRE Corporation',
      url: 'https://attack.mitre.org/',
      dataSource: 'https://github.com/mitre-attack/attack-data-model',  // GitHub data
      aiCoverageScore: 0.0,  // 0/100 from detailed evaluation
      status: 'no-guidance' as const,
      gaps: ['Traditional IT focus only', 'No AI/ML coverage', 'Use MITRE ATLAS for AI threats'],
      lastFrameworkUpdate: '2025-01'
    },
    {
      id: 'mitre-atlas',
      name: 'MITRE ATLAS',
      organization: 'MITRE Corporation',
      url: 'https://atlas.mitre.org/',
      dataSource: 'https://github.com/mitre-atlas/atlas-data',  // GitHub data
      aiCoverageScore: 0.75,  // 75/100 from detailed evaluation
      status: 'active' as const,
      gaps: ['No MCP/Model Context Protocol', 'Limited multi-agent scenarios', 'No agent behavioral drift'],
      lastFrameworkUpdate: '2025-04'  // Latest techniques from April 2025
    },
    {
      id: 'cis-controls',
      name: 'CIS Controls',
      organization: 'Center for Internet Security',
      url: 'https://www.cisecurity.org/controls',
      dataSource: 'https://www.cisecurity.org/controls/cis-controls-list',  // Controls list
      aiCoverageScore: 0.25,  // 25/100 from detailed evaluation
      status: 'no-guidance' as const,
      gaps: ['No AI or ML security coverage', '18 controls don\'t address agent threats'],
      lastFrameworkUpdate: '2024-05'
    },
    // Note: OWASP MCP Top 10 is in development (Phase 1: Drafting, v0.0.0)
    // URL: https://owasp.org/www-project-mcp-top-10/
    // Will address: Tool poisoning, context spoofing, rug pull attacks, MCP-specific vulnerabilities
    // Expected to be first framework specifically targeting Model Context Protocol security
  ] as Framework[],
  
  insights: [
    'Tool poisoning attacks succeed 86% of the time - critical gap in most frameworks',
    'OWASP leads with comprehensive Agentic AI Threats document covering all threat categories',
    'MITRE ATLAS provides excellent LLM coverage but lacks MCP or multi-agent scenarios',
    'ISO/IEC 42001:2023 offers good governance but predates agentic AI emergence',
    'NIST AI RMF lacks agentic AI content despite being AI-specific',
    'CIS Controls provides good general security but zero AI content',
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
        threatIdentification: 40,  // All 8 threats covered
        practicalGuidance: 30,     // Full marks - playbooks and patterns
        evidenceQuality: 20,       // Full marks - credible sources
        completeness: 10,          // Full marks - detect/respond covered
        total: 100                 // Perfect score
      },
      
      // Detailed scoring breakdown
      breakdown: {
        // THREAT IDENTIFICATION (40/40)
        'memory-attacks': true,           // T1: Memory Poisoning
        'tool-api-abuse': true,           // T2: Tool Misuse  
        'privilege-escalation': true,     // T3: Privilege Compromise
        'multi-agent-threats': true,      // T12, T13, T14
        'temporal-behaviors': true,       // T7: Misaligned & Deceptive
        'human-manipulation': true,       // T15: Human Manipulation
        'communication-poisoning': true,  // T12: Agent Communication Poisoning
        'identity-auth-threats': true,   // T9: Identity Spoofing (fixed key name)
        
        // PRACTICAL GUIDANCE (30/30)
        'clear-patterns': true,           // 6 detailed playbooks
        'specific-tools': true,           // MCP-scan, frameworks mentioned
        'checklists': true,               // Step-by-step playbooks
        'architecture-diagrams': true,    // Threat model diagram page 16
        'step-by-step-instructions': true, // Proactive/reactive/detective steps
        
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
        'identity-auth-threats': false,   // No agent identity threats
        
        // PRACTICAL GUIDANCE (20/30)
        'clear-patterns': true,           // Good general AI patterns
        'specific-tools': false,          // No agentic tools
        'checklists': true,              // General AI checklists
        'architecture-diagrams': false,   // No threat diagrams
        'step-by-step-instructions': true, // General AI process
        
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
        'identity-auth-threats': 'unknown' as any,
        
        // PRACTICAL GUIDANCE (0/30) - Unknown
        'clear-patterns': 'unknown' as any,
        'specific-tools': 'unknown' as any,
        'checklists': 'unknown' as any,
        'architecture-diagrams': 'unknown' as any,
        'step-by-step-instructions': 'unknown' as any,
        
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
        'identity-auth-threats': false,   // No AI identity management
        
        // PRACTICAL GUIDANCE (25/30)
        'clear-patterns': true,           // PDCA methodology, Annex A controls
        'specific-tools': false,          // No specific security tools
        'checklists': true,              // Annex A provides control checklist
        'architecture-diagrams': false,   // No security architecture diagrams
        'step-by-step-instructions': true, // Clear implementation steps via PDCA
        
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
        'identity-auth-threats': true,    // System prompt extraction (T0056)
        
        // PRACTICAL GUIDANCE (20/30)
        'clear-patterns': true,           // Matrix of tactics/techniques
        'specific-tools': false,          // No tool recommendations
        'checklists': false,             // Tactics not prescriptive
        'architecture-diagrams': true,    // Attack flow diagrams
        'step-by-step-instructions': false, // High-level techniques only
        
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
      
      verdict: 'MITRE ATLAS provides the most comprehensive ML/AI threat framework available. Excellent coverage of LLM threats including prompt injection, RAG poisoning, and plugin compromise. Strong evidence base with 32 case studies. However, still lacks MCP-specific attacks and multi-agent scenarios. Essential reference but supplement with OWASP for full agentic coverage.'
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
        'identity-auth-threats': false,   // Traditional IAM only
        
        // PRACTICAL GUIDANCE (15/30)
        'clear-patterns': true,           // 18 controls with safeguards
        'specific-tools': false,          // No AI-specific tools
        'checklists': true,              // Implementation groups (IG1/2/3)
        'architecture-diagrams': false,   // No AI threat architecture
        'step-by-step-instructions': true, // Clear control implementation
        
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
        'identity-auth-threats': false,   // Traditional IT only
        
        // PRACTICAL GUIDANCE (0/30)
        'clear-patterns': false,          // Not for AI
        'specific-tools': false,          // Not for AI
        'checklists': false,              // Not for AI
        'architecture-diagrams': false,   // Not for AI
        'step-by-step-instructions': false, // Not for AI
        
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
      
      verdict: 'MITRE ATT&CK is not designed for AI security - this is intentional. ATT&CK focuses exclusively on traditional IT threats and explicitly directs users to MITRE ATLAS for AI/ML security. Organizations should not look to ATT&CK for AI guidance but instead use its sister framework ATLAS.'
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
  // Get the most recent evaluation date from all evaluations
  const evaluationDates = Object.values(knowledge.detailedEvaluations).map(e => e.evaluationDate)
  const mostRecentDate = evaluationDates.reduce((latest, current) => 
    current > latest ? current : latest
  )
  
  const daysSince = (Date.now() - new Date(mostRecentDate).getTime()) / (1000 * 60 * 60 * 24);
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