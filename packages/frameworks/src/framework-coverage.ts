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
  id: 'framework-coverage-2026-q1',
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
      headline: 'Two Frameworks Now Lead',
      insights: [
        '🚨 Only 2 of 7 security frameworks score above 70% for AI threats',
      ],
      keyMetric: '2 of 7 Ready',
      visualType: 'ranking'
    },
    methodology: {
      title: 'Framework Evaluation Methodology',
      headline: 'Binary Scoring Reveals Truth',
      insights: [
        '📊 OWASP: 100/100, ATLAS: 90/100 (up from 75), NIST: 30/100',
        '🎯 Most frameworks still fail threat identification (40 points)',
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
      title: 'AI Security Timeline 2021-2026',
      headline: '2025 Was the Agentic AI Year',
      insights: [
        '📈 From 1 to 7 frameworks in 5 years',
        '💥 2025: OWASP Agentic Top 10, ATLAS adds 14 agent techniques, NIST drafts AI overlays',
        '🚀 2026: ATLAS expands to 16 tactics / 84+ techniques, OpenClaw investigation'
      ],
      keyMetric: '5-Year Evolution',
      visualType: 'timeline'
    }
  },
  
  // Living Knowledge metadata
  evaluation: {
    date: new Date('2026-02-20'),
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
    },
    {
      date: new Date('2025-08-14'),
      framework: 'NIST AI RMF',
      change: 'COSAiS concept paper released - SP 800-53 control overlays for AI including multi-agent systems',
      confidence: 'high' // NIST press release August 14, 2025
    },
    {
      date: new Date('2025-10-01'), // October 2025
      framework: 'MITRE ATT&CK',
      change: 'ATT&CK v18.1 released - added CI/CD, Kubernetes, cloud DB techniques. Has T1588.007 (Obtain Capabilities: AI) since March 2024 but no agentic AI content',
      confidence: 'high' // MITRE official release; T1588.007 confirmed on attack.mitre.org
    },
    {
      date: new Date('2025-10-22'),
      framework: 'MITRE ATLAS',
      change: '14 new agentic AI techniques added via Zenity Labs collaboration - agent context poisoning, memory manipulation, tool invocation exfiltration',
      confidence: 'high' // Zenity blog post and MITRE announcement October 22, 2025
    },
    {
      date: new Date('2025-12-09'),
      framework: 'OWASP Agentic Security',
      change: 'OWASP Top 10 for Agentic Applications 2026 released (ASI01-ASI10) + Threats & Mitigations v1.1 taxonomy',
      confidence: 'high' // OWASP blog post dated December 9, 2025; London summit was Dec 10
    },
    {
      date: new Date('2025-12-16'),
      framework: 'NIST AI RMF',
      change: 'Cyber AI Profile (NIST IR 8596) preliminary draft released - aligns CSF 2.0 with AI risks',
      confidence: 'high' // NIST CSRC publication December 16, 2025
    },
    {
      date: new Date('2025-12-01'), // December 2025
      framework: 'OWASP MCP Top 10',
      change: 'Phase 3: Beta release (v0.1) - 10 MCP vulnerabilities defined (MCP01-MCP10)',
      confidence: 'medium' // Project page shows Phase 3, exact date approximate
    },
    {
      date: new Date('2026-01-15'),
      framework: 'MITRE ATLAS',
      change: 'ATLAS January 2026 release - new agent techniques confirmed: T0098 (Tool Credential Harvesting), T0099 (Tool Data Poisoning), T0100 (Agent Clickbait), T0102 (Generate Malicious Commands). Now 16 tactics, 84+ techniques, 56+ sub-techniques',
      confidence: 'medium' // Zenity blog confirms Jan 2026 update; version number unconfirmed (latest tagged release v5.1.1 Nov 2025). T0103-T0105, CS0045, M0032/M0033 IDs unverified from primary sources
    },
    {
      date: new Date('2026-02-09'),
      framework: 'MITRE ATLAS',
      change: 'OpenClaw investigation published - discovered 7 new agent-specific techniques from AI-first ecosystems',
      confidence: 'high' // CTID blog post February 9, 2026
    }
  ],
  
  // Self-documenting metadata
  metadata: {
    description: 'Shows how well security frameworks address AI and MCP-specific threats',
    details: [
      'Evaluated February 2026 with latest framework versions',
      'OWASP Top 10 for Agentic Applications (Dec 2025) and MITRE ATLAS (16 tactics, 84+ techniques) lead coverage',
      'ATLAS now includes MCP-specific case studies, 14+ agentic techniques (Oct 2025), and OpenClaw investigation (Feb 2026)',
      'OWASP MCP Top 10 in beta (v0.1) with 10 defined vulnerabilities',
      'Color-coded by coverage: red (<40%), yellow (40-70%), green (>70%)'
    ],
    category: 'compliance',
    tags: ['frameworks', 'compliance', 'ai-security', 'mcp-security', 'agentic-ai', 'gap-analysis']
  },
  
  frameworks: [
    {
      id: 'owasp-genai',
      name: 'OWASP GenAI Security Project',
      organization: 'OWASP Foundation',
      url: 'https://genai.owasp.org/',
      dataSource: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',  // Top 10 for Agentic Apps
      aiCoverageScore: 1.0,  // 100/100 from detailed evaluation
      status: 'active' as const,
      gaps: ['Quantitative metrics on attack success rates'],
      lastFrameworkUpdate: '2025-12'  // Top 10 for Agentic Applications released Dec 2025
    },
    {
      id: 'nist-ai-rmf',
      name: 'NIST AI Risk Management Framework',
      organization: 'NIST (US)',
      url: 'https://www.nist.gov/itl/ai-risk-management-framework',
      dataSource: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',  // PDF
      aiCoverageScore: 0.30,  // 30/100 from detailed evaluation
      status: 'applicable' as const,
      gaps: ['Core AI RMF still lacks agentic AI content', 'COSAiS and Cyber AI Profile still in draft', 'No MCP or tool calling guidance yet', 'AI RMF revision in progress per AI Action Plan'],
      lastFrameworkUpdate: '2025-12'  // Cyber AI Profile (IR 8596) preliminary draft
    },
    {
      id: 'iso-27090',
      name: 'ISO/IEC DIS 27090 (Draft)',
      organization: 'ISO/IEC',
      url: 'https://www.iso.org/standard/56581.html',
      // No dataSource - draft not publicly available
      aiCoverageScore: 0.0,  // Unknown - draft status
      status: 'no-guidance' as const,  // Draft = not yet actionable
      gaps: ['DIS stage - publication expected May 2026', 'Content not publicly available', 'Guidance only (no testable requirements)', 'Unknown coverage of agentic AI threats'],
      lastFrameworkUpdate: '2026-05'  // Expected publication date
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
      gaps: ['Only T1588.007 (Obtain Capabilities: AI) — no agentic AI coverage', 'Defers to MITRE ATLAS for AI/ML threats by design', 'No MCP, tool calling, or agent security'],
      lastFrameworkUpdate: '2025-10'  // v18.1 release
    },
    {
      id: 'mitre-atlas',
      name: 'MITRE ATLAS',
      organization: 'MITRE Corporation',
      url: 'https://atlas.mitre.org/',
      dataSource: 'https://github.com/mitre-atlas/atlas-data',  // GitHub data
      aiCoverageScore: 0.90,  // 90/100 from detailed evaluation
      status: 'active' as const,
      gaps: ['Limited response/remediation procedures', 'No temporal behavioral drift coverage'],
      lastFrameworkUpdate: '2026-02'  // Jan 2026 update + OpenClaw investigation (Feb 2026). Version tag unconfirmed; latest tagged v5.1.1 Nov 2025
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
    // Note: OWASP MCP Top 10 is in Phase 3: Beta Release (v0.1)
    // URL: https://owasp.org/www-project-mcp-top-10/
    // MCP01: Token Mismanagement, MCP02: Privilege Escalation, MCP03: Tool Poisoning,
    // MCP04: Supply Chain, MCP05: Command Injection, MCP06: Intent Flow Subversion,
    // MCP07: Auth Issues, MCP08: Audit Gaps, MCP09: Shadow MCP Servers, MCP10: Context Injection
    // Microsoft published MCP Azure Security Guide referencing this project
  ] as Framework[],
  
  insights: [
    'Two frameworks now lead: OWASP (100/100) and MITRE ATLAS (90/100) — up from one in mid-2025',
    'ATLAS expanded massively: 14 agentic techniques (Oct 2025), MCP coverage + OpenClaw investigation (Feb 2026) — now 16 tactics, 84+ techniques',
    'OWASP Top 10 for Agentic Applications (Dec 2025) created by 100+ experts is the definitive agentic security list',
    'NIST is building AI security infrastructure (Cyber AI Profile, COSAiS) but published docs still lack agentic content',
    'ISO/IEC 42001:2023 unchanged since 2023 — predates agentic AI era',
    'CIS Controls has zero AI content; ATT&CK has minimal AI (T1588.007) but no agentic coverage — defers to ATLAS by design',
    'OWASP MCP Top 10 reached beta (v0.1) with 10 defined MCP vulnerabilities',
    'EU AI Act enforcement begins Aug 2 2026 (fines up to €35M / 7% global turnover) — ENISA Multilayer Framework for AI Cybersecurity (2023) provides practices guidance'
  ],

  recommendations: [
    'Use OWASP Top 10 for Agentic Applications (ASI01-ASI10) as primary agentic security checklist',
    'Use MITRE ATLAS for threat modeling — now 16 tactics, 84+ techniques with MCP and agent coverage',
    'Apply MAESTRO framework from OWASP Multi-Agentic System Threat Modeling Guide for MAS',
    'Track NIST COSAiS and Cyber AI Profile for upcoming SP 800-53 AI overlays',
    'Use OWASP MCP Top 10 (beta) for Model Context Protocol-specific security',
    'Prepare for EU AI Act compliance by Aug 2 2026 using ENISA Multilayer Framework for Good Cybersecurity Practices for AI'
  ],
  
  sources: [
    { name: 'OWASP GenAI Project Site', url: 'https://genai.owasp.org/', date: new Date('2026-02-20') },
    { name: 'OWASP Top 10 for Agentic Applications 2026', url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/', date: new Date('2025-12-09') },
    { name: 'OWASP Agentic AI Threats and Mitigations v1.1', url: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/', date: new Date('2025-12-09') },
    { name: 'OWASP Multi-Agentic System Threat Modeling Guide v1.0', url: 'https://genai.owasp.org/resource/multi-agentic-system-threat-modeling-guide-v1-0/', date: new Date('2025-04-01') },
    { name: 'OWASP MCP Top 10 (Beta v0.1)', url: 'https://owasp.org/www-project-mcp-top-10/', date: new Date('2025-12-01') },
    { name: 'MITRE ATLAS CHANGELOG (Jan 2026 update)', url: 'https://github.com/mitre-atlas/atlas-data/blob/main/CHANGELOG.md', date: new Date('2026-01-15') },
    { name: 'MITRE ATLAS OpenClaw Investigation', url: 'https://ctid.mitre.org/blog/2026/02/09/mitre-atlas-openclaw-investigation/', date: new Date('2026-02-09') },
    { name: 'NIST AI Risk Management Framework 1.0', url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf', date: new Date('2023-01-26') },
    { name: 'NIST Cyber AI Profile (IR 8596 Draft)', url: 'https://csrc.nist.gov/pubs/ir/8596/iprd', date: new Date('2025-12-16') },
    { name: 'NIST COSAiS - Control Overlays for AI', url: 'https://csrc.nist.gov/projects/cosais', date: new Date('2025-08-14') }
  ],
  
  // Detailed framework evaluations using our binary scoring methodology
  detailedEvaluations: {
    'owasp-agentic-threats-v1': {
      frameworkName: 'OWASP Top 10 for Agentic Applications 2026 + Threats & Mitigations v1.1',
      evaluationDate: new Date('2026-02-20'),
      evaluatedBy: '@tsynode',

      scores: {
        threatIdentification: 40,  // All 8 threats covered via ASI01-ASI10
        practicalGuidance: 30,     // Full marks - playbooks, threat modeling guide, dev guidelines
        evidenceQuality: 20,       // Full marks - 100+ expert contributors, real incidents
        completeness: 10,          // Full marks - detect/respond covered
        total: 100                 // Perfect score
      },

      // Detailed scoring breakdown
      breakdown: {
        // THREAT IDENTIFICATION (40/40)
        'memory-attacks': true,           // ASI06: Memory & Context Poisoning
        'tool-api-abuse': true,           // ASI02: Tool Misuse and Exploitation
        'privilege-escalation': true,     // ASI03: Identity and Privilege Abuse
        'multi-agent-threats': true,      // ASI07: Insecure Inter-Agent Communication + MAS Threat Modeling Guide
        'temporal-behaviors': true,       // ASI10: Rogue Agents + ASI08: Cascading Failures
        'human-manipulation': true,       // ASI09: Human-Agent Trust Exploitation
        'communication-poisoning': true,  // ASI07: Insecure Inter-Agent Communication
        'identity-auth-threats': true,   // ASI03: Identity and Privilege Abuse

        // PRACTICAL GUIDANCE (30/30)
        'clear-patterns': true,           // Top 10 list + 6 playbooks + MAESTRO framework
        'specific-tools': true,           // MCP-scan, frameworks mentioned
        'checklists': true,               // Step-by-step playbooks + secure dev guidelines
        'architecture-diagrams': true,    // MAESTRO multi-layer threat model diagrams
        'step-by-step-instructions': true, // Proactive/reactive/detective steps

        // EVIDENCE QUALITY (20/20)
        'credible-research': true,       // 100+ expert contributors, NIST, CSA sources
        'real-incidents': true,          // Real-world scenarios and case studies
        'attack-patterns': true,         // ASI01-ASI10 detailed attack patterns
        'detection-guidance': true,      // Each threat has detection guidance

        // COMPLETENESS (10/10)
        'detection-methods': true,       // All threats include detection
        'response-procedures': true      // Playbooks include response
      },

      strengths: [
        'OWASP Top 10 for Agentic Applications (ASI01-ASI10) released Dec 2025 with 100+ expert contributors',
        'Threats & Mitigations v1.1 taxonomy synchronized with Top 10',
        'Multi-Agentic System Threat Modeling Guide v1.0 with MAESTRO framework',
        'Comprehensive suite: threat taxonomy, threat modeling, secure dev guidelines, governance guide',
        'Real-world scenarios for enterprise copilots, IoT, code review, and RPA',
        'Industry-wide adoption as benchmark for agentic AI security'
      ],

      weaknesses: [
        'No production-ready code samples (appropriate for security framework)',
        'Limited quantitative metrics on attack success rates',
        'Rapidly evolving space may outpace document updates'
      ],

      verdict: 'OWASP\'s Agentic AI security suite is the definitive reference for AI agent security. The Dec 2025 Top 10 for Agentic Applications (ASI01-ASI10), backed by 100+ experts, combined with the Threats & Mitigations v1.1 taxonomy and MAESTRO-based threat modeling guide, provides the most comprehensive and actionable coverage available.'
    },
    
    'nist-ai-rmf-v1': {
      frameworkName: 'NIST AI RMF 1.0 + GenAI Profile + Cyber AI Profile (Draft) + COSAiS (Draft)',
      evaluationDate: new Date('2026-02-20'),
      evaluatedBy: '@tsynode',

      scores: {
        threatIdentification: 0,   // No agentic-specific threats in published docs
        practicalGuidance: 20,     // General AI guidance + COSAiS concept for multi-agent
        evidenceQuality: 10,       // Good references, Cyber AI Profile adds AI-specific context
        completeness: 0,           // No agentic lifecycle coverage yet
        total: 30
      },

      // Detailed scoring breakdown
      breakdown: {
        // THREAT IDENTIFICATION (0/40)
        'memory-attacks': false,          // No agent memory poisoning
        'tool-api-abuse': false,          // No tool calling/MCP coverage
        'privilege-escalation': false,     // No agent privilege escalation
        'multi-agent-threats': false,      // COSAiS mentions multi-agent but still draft
        'temporal-behaviors': false,       // No agent behavioral evolution
        'human-manipulation': false,       // General human-AI only
        'communication-poisoning': false,  // No inter-agent communication
        'identity-auth-threats': false,   // No agent identity threats

        // PRACTICAL GUIDANCE (20/30)
        'clear-patterns': true,           // Good general AI patterns
        'specific-tools': false,          // No agentic tools
        'checklists': true,              // General AI checklists + CSF 2.0 alignment
        'architecture-diagrams': false,   // No threat diagrams
        'step-by-step-instructions': true, // General AI process

        // EVIDENCE QUALITY (10/20)
        'credible-research': true,        // Good general AI research
        'real-incidents': false,          // No agentic incidents
        'attack-patterns': false,         // No agentic attacks
        'detection-guidance': true,       // Cyber AI Profile adds AI-specific monitoring

        // COMPLETENESS (0/10)
        'detection-methods': false,       // Not agentic-specific
        'response-procedures': false      // Not for agent threats
      },

      strengths: [
        'Excellent general AI governance framework',
        'NIST IR 8596 Cyber AI Profile (Dec 2025 draft) aligns CSF 2.0 with AI risks',
        'COSAiS project (Aug 2025) plans SP 800-53 overlays for multi-agent AI systems',
        'AI RMF currently in revision per AI Action Plan',
        'Strong lifecycle management approach',
        'Comprehensive for traditional AI systems'
      ],

      weaknesses: [
        'Core AI RMF 1.0 still lacks agentic AI or autonomous agent content',
        'COSAiS and Cyber AI Profile are drafts, not yet actionable',
        'No Model Context Protocol (MCP) guidance',
        'No tool calling or function calling security',
        'Multi-agent coverage only in concept papers, not published guidance'
      ],

      verdict: 'NIST is expanding its AI security ecosystem with the Cyber AI Profile (IR 8596, Dec 2025 draft) and COSAiS control overlays (which plan to cover multi-agent systems). However, published guidance still lacks agentic AI content. The AI RMF revision is underway but not yet released. Watch this space - NIST is moving in the right direction but not yet actionable for agent security.'
    },
    
    'iso-27090-draft': {
      frameworkName: 'ISO/IEC DIS 27090 - AI Cybersecurity (Draft)',
      evaluationDate: new Date('2026-02-20'),
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
        'Still in Draft International Standard (DIS) stage - publication expected May 2026',
        'Content not publicly available for evaluation',
        'Unknown coverage of agentic AI and multi-agent systems',
        'Guidance only - no testable "shall" requirements',
        'May not address latest threats like MCP attacks or tool poisoning'
      ],

      verdict: 'ISO/IEC 27090 publication is now expected May 2026 with comment resolution starting June 2026. As guidance (not certifiable requirements), it will provide best practices for AI cybersecurity throughout the lifecycle. Its relevance to agentic AI and MCP threats remains unknown. Track development but rely on OWASP and ATLAS for current actionable guidance.'
    },
    
    'iso-42001-2023': {
      frameworkName: 'ISO/IEC 42001:2023 - AI Management Systems',
      evaluationDate: new Date('2026-02-20'),
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
      frameworkName: 'MITRE ATLAS - Adversarial Threat Landscape for AI Systems (latest confirmed tag: v5.1.1, Nov 2025; Jan/Feb 2026 updates applied)',
      evaluationDate: new Date('2026-02-20'),
      evaluatedBy: '@tsynode',

      scores: {
        threatIdentification: 35,  // Now covers memory, agents, MCP; missing temporal drift
        practicalGuidance: 25,     // New mitigations (M0032, M0033) + attack flows
        evidenceQuality: 20,       // Excellent case studies including MCP/Cursor exfil
        completeness: 10,          // Detection + new agent-specific mitigations
        total: 90
      },

      // Detailed scoring breakdown
      breakdown: {
        // THREAT IDENTIFICATION (35/40)
        'memory-attacks': true,           // AI Agent Memory manipulation technique (Oct 2025)
        'tool-api-abuse': true,           // T0053 + T0098 Tool Credential Harvesting + T0099 Tool Data Poisoning
        'privilege-escalation': true,      // T0054 LLM Jailbreak + T0105 Escape to Host
        'multi-agent-threats': true,       // T0103 Deploy AI Agent + T0108 AI Agent techniques
        'temporal-behaviors': false,       // No behavioral drift coverage
        'human-manipulation': true,        // T0052 Phishing via LLM + T0100 Agent Clickbait
        'communication-poisoning': true,   // T0070 RAG Poisoning + AI Agent Context Poisoning
        'identity-auth-threats': true,    // T0056 System prompt extraction + agent identity

        // PRACTICAL GUIDANCE (25/30)
        'clear-patterns': true,           // Matrix of 16 tactics / 84+ techniques (incl. Lateral Movement AML.TA0015)
        'specific-tools': true,           // 32+ mitigations incl. M0031 Memory Hardening; agent-specific mitigations expanding
        'checklists': false,             // Tactics not prescriptive checklists
        'architecture-diagrams': true,    // Attack flow diagrams + OpenClaw investigation
        'step-by-step-instructions': true, // Agent-specific mitigations with implementation detail

        // EVIDENCE QUALITY (20/20)
        'credible-research': true,        // Academic partnerships + CTID + Zenity collab
        'real-incidents': true,           // 45+ case studies incl. CS0048-CS0051 (OpenClaw); MCP/Cursor exfil reported but CS0045 ID unverified
        'attack-patterns': true,          // Detailed TTPs with procedures
        'detection-guidance': true,       // Mitigations documented per technique

        // COMPLETENESS (10/10)
        'detection-methods': true,        // Detection guidance per technique
        'response-procedures': true       // 32+ mitigations incl. M0031 (Memory Hardening); M0032/M0033 IDs unverified but agent mitigations expanding
      },

      strengths: [
        'Most comprehensive AI/ML threat framework with 16 tactics, 84+ techniques, 56+ sub-techniques (as of v5.1.0 Nov 2025, plus Jan/Feb 2026 additions)',
        'Oct 2025: 14 new agentic AI techniques added via Zenity Labs collaboration (v4.6.0/data v5.0.0)',
        'Jan 2026: New agent techniques confirmed: T0098 (Tool Credential Harvesting), T0099 (Tool Data Poisoning), T0100 (Agent Clickbait), T0102 (Generate Malicious Commands)',
        'Feb 2026: OpenClaw investigation discovered 7 new agent-specific techniques (CS0048-CS0051)',
        'v5.1.0 added Lateral Movement tactic (AML.TA0015) and 32+ mitigations including M0031 (Memory Hardening)',
        '45+ real-world case studies with growing MCP and agent coverage',
        'Active development with monthly updates and strong industry partnerships (Zenity, CTID)'
      ],

      weaknesses: [
        'No temporal drift or behavioral evolution coverage',
        'Agent techniques still expanding - coverage not yet complete',
        'Focuses on attack patterns more than defensive implementation',
        'No prescriptive checklists (by design - it\'s a threat framework)',
        'Some Jan 2026 technique IDs (T0103-T0105) and mitigation IDs (M0032, M0033) unverified from primary sources'
      ],

      verdict: 'MITRE ATLAS has transformed into a comprehensive AI agent security framework. The Oct 2025 Zenity collaboration added 14 agentic techniques, and Jan/Feb 2026 releases brought further agent and MCP coverage including the OpenClaw investigation. With 16 tactics, 84+ techniques, 45+ case studies and growing agent-specific mitigations, ATLAS now rivals OWASP for agentic threat coverage while providing the strongest evidence base of any framework.'
    },
    
    'cis-controls-v8': {
      frameworkName: 'CIS Critical Security Controls v8.1',
      evaluationDate: new Date('2026-02-20'),
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
      frameworkName: 'MITRE ATT&CK v18.1',
      evaluationDate: new Date('2026-02-20'),
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
        'Used globally by SOCs and threat intel teams',
        'T1588.007 (Obtain Capabilities: AI) added March 2024 — recognizes AI as adversary resource'
      ],
      
      weaknesses: [
        'Only one AI sub-technique (T1588.007) — covers adversaries obtaining AI, not securing AI systems',
        'No agentic AI, multi-agent, or MCP coverage',
        'Explicitly directs users to ATLAS for AI-specific threats',
        'Traditional IT/enterprise focus by design',
        'No plans to expand AI coverage beyond resource development'
      ],
      
      verdict: 'MITRE ATT&CK contains minimal AI content — T1588.007 (Obtain Capabilities: AI, added March 2024) covers adversaries acquiring AI capabilities but provides no coverage of securing AI systems, agents, or MCP. ATT&CK explicitly directs users to MITRE ATLAS for AI/ML security. Score reflects zero agentic AI coverage, not absence of all AI recognition.'
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