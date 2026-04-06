// registry/knowledge/threats.ts
// Component: threats
// Category: security (in metadata, not folder structure per ADR-006)

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface ThreatSourceMapping {
  taxonomy:
    | 'owasp-agentic-threats'
    | 'owasp-agentic-top10'
    | 'owasp-mcp-top10'
    | 'mitre-atlas'
    | 'mitre-attack'
    | 'nist-ai-rmf'
    | 'other';
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  mappingRationale: string;
  relationship: 'exact' | 'overlapping' | 'partial';
}

export interface ThreatCategory {
  primary:
    | 'memory-and-context'
    | 'tool-and-api-abuse'
    | 'identity-and-privilege'
    | 'multi-agent'
    | 'human-interaction'
    | 'code-execution'
    | 'data-exfiltration'
    | 'behavioral'
    | 'communication';
  secondary?: string[];
}

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

export interface Threat {
  id: string;
  name: string;
  description: string;
  category: ThreatCategory;
  severity: SeverityLevel;
  severityRationale: string;
  sourceMappings: ThreatSourceMapping[];
  taxonomyDisagreements?: string[];
  scope: {
    appliesTo: string[];
    doesNotApplyTo: string[];
  };
  incidentIds: string[];
  mitigationIds: string[];
}

export type IncidentType =
  | 'disclosed-attack'
  | 'security-research'
  | 'proof-of-concept'
  | 'case-study';

export type IncidentStatus =
  | 'confirmed'
  | 'reported'
  | 'disputed';

export interface IncidentSource {
  name: string;
  url: string;
  publishedDate: Date;
  organization: string;
}

export interface IncidentCoverageMapping {
  frameworkId: string;
  frameworkName: string;
  coverage: 'direct' | 'indirect' | 'none';
  scoringRationale: string;
  specificGuidance?: string;
}

export interface Incident {
  id: string;
  title: string;
  date: Date;
  type: IncidentType;
  status: IncidentStatus;
  summary: string;
  impact: string;
  threatIds: string[];
  attackVector: string;
  affectedSystems: string[];
  coverageMappings: IncidentCoverageMapping[];
  gaps: IncidentGap[];
  sources: IncidentSource[];
  confidence: {
    level: 'high' | 'medium' | 'low';
    rationale: string;
  };
}

export interface IncidentGap {
  frameworkId: string;
  frameworkName: string;
  gapDescription: string;
  contributionCandidate: boolean;
  contributionStatus?:
    | 'identified'
    | 'reported'
    | 'acknowledged'
    | 'addressed';
}

export type EvolutionEventType =
  | 'taxonomy-update'
  | 'new-attack-category'
  | 'framework-response'
  | 'regulatory'
  | 'trend-observation';

export interface ThreatEvolutionEvent {
  date: Date;
  type: EvolutionEventType;
  title: string;
  description: string;
  source: {
    name: string;
    url: string;
    organization: string;
  };
  relatedThreatIds?: string[];
  significance: 'high' | 'medium' | 'low';
  confidence: 'high' | 'medium';
}

export interface MitigationReference {
  id: string;
  name: string;
  description: string;
  threatIds: string[];
  source: {
    organization: string;
    document: string;
    section?: string;
    url: string;
  };
  platformContext?: {
    platform: 'aws' | 'gcp' | 'azure' | 'generic';
    services?: string[];
    implementationNote?: string;
  }[];
}

export interface ThreatsKnowledge {
  id: string;
  name: string;
  threats: Threat[];
  incidents: Incident[];
  mitigations: MitigationReference[];
  evolution: ThreatEvolutionEvent[];
  evaluation: {
    date: Date;
    by: string;
    validDays: number;
    methodology: string;
    updateInstructions: string;
  };
  scope: {
    appliesTo: string[];
    doesNotApplyTo: string[];
  };
  dissent: {
    knownLimitations: string[];
    deliberateExclusions: {
      what: string;
      why: string;
    }[];
    openQuestions: string[];
  };
  insights: string[];
  recommendations: string[];
  sources: {
    name: string;
    url: string;
    date: Date;
  }[];
  metadata: {
    description: string;
    details: string[];
    category: string;
    tags: string[];
    version: string;
  };
}

// =============================================================================
// KNOWLEDGE DATA
// =============================================================================

export const threatsKnowledge: ThreatsKnowledge = {
  id: 'threats-2026-q1',
  name: 'Agentic AI Threat Catalog',

  // ---------------------------------------------------------------------------
  // THREAT CATALOG — Normalized across taxonomies
  // ---------------------------------------------------------------------------
  threats: [
    {
      id: 'TM-001',
      name: 'Memory & Context Poisoning',
      description: 'Exploitation of an AI agent\'s memory systems — both short-term (context window) and long-term (persistent memory, RAG stores) — to introduce malicious data that alters decision-making. Attackers manipulate what the agent remembers or retrieves, causing it to act on false premises.',
      category: { primary: 'memory-and-context', secondary: ['data-exfiltration'] },
      severity: 'critical',
      severityRationale: 'Memory poisoning can persist across sessions and affect all subsequent agent actions. The attack surface grows with agent autonomy — a poisoned memory in a multi-agent system can propagate to downstream agents.',
      sourceMappings: [
        {
          taxonomy: 'owasp-agentic-threats',
          sourceId: 'T1',
          sourceName: 'Memory Poisoning',
          sourceUrl: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/',
          mappingRationale: 'Exact match — OWASP T1 defines memory poisoning as exploiting short and long-term memory to introduce malicious data',
          relationship: 'exact'
        },
        {
          taxonomy: 'owasp-agentic-top10',
          sourceId: 'ASI06',
          sourceName: 'Memory & Context Poisoning',
          sourceUrl: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
          mappingRationale: 'ASI06 broadens scope to include context window manipulation alongside persistent memory attacks',
          relationship: 'overlapping'
        },
        {
          taxonomy: 'mitre-atlas',
          sourceId: 'AML.T0070',
          sourceName: 'RAG Poisoning',
          sourceUrl: 'https://atlas.mitre.org/techniques/AML.T0070',
          mappingRationale: 'ATLAS RAG Poisoning covers the retrieval-augmented generation vector specifically, which is one mechanism for memory/context poisoning',
          relationship: 'partial'
        }
      ],
      taxonomyDisagreements: [
        'OWASP treats memory poisoning as a single threat category; ATLAS splits it across multiple techniques (RAG poisoning, context manipulation, agent memory manipulation) under different tactics',
        'ASI06 includes context window manipulation which OWASP T1 scopes more narrowly to persistent memory'
      ],
      scope: {
        appliesTo: ['LLM-based agents with persistent memory', 'RAG-augmented systems', 'Multi-turn conversational agents', 'Agents with shared memory stores'],
        doesNotApplyTo: ['Stateless single-turn API endpoints', 'Traditional ML models without memory', 'Rule-based systems without LLM components']
      },
      incidentIds: ['INC-001', 'INC-003'],
      mitigationIds: ['MIT-001']
    },
    {
      id: 'TM-002',
      name: 'Tool Misuse & Exploitation',
      description: 'Attackers manipulate AI agents to abuse their integrated tools through deceptive prompts, poisoned tool definitions, or exploitation of excessive permissions. Includes MCP tool poisoning, credential harvesting through tool interfaces, and data exfiltration via tool invocations.',
      category: { primary: 'tool-and-api-abuse', secondary: ['data-exfiltration', 'identity-and-privilege'] },
      severity: 'critical',
      severityRationale: 'Tool access is the primary mechanism through which agents affect the real world. Compromised tool usage can lead to data exfiltration, unauthorized actions, and lateral movement across connected systems.',
      sourceMappings: [
        {
          taxonomy: 'owasp-agentic-threats',
          sourceId: 'T2',
          sourceName: 'Tool Misuse',
          sourceUrl: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/',
          mappingRationale: 'OWASP T2 covers tool misuse including agent hijacking through adversarial data leading to unintended tool interactions',
          relationship: 'exact'
        },
        {
          taxonomy: 'owasp-agentic-top10',
          sourceId: 'ASI02',
          sourceName: 'Tool Misuse and Exploitation',
          sourceUrl: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
          mappingRationale: 'ASI02 directly addresses tool misuse and exploitation as a top-10 agentic risk',
          relationship: 'exact'
        },
        {
          taxonomy: 'owasp-mcp-top10',
          sourceId: 'MCP03',
          sourceName: 'Tool Poisoning',
          sourceUrl: 'https://owasp.org/www-project-mcp-top-10/',
          mappingRationale: 'MCP03 specifically addresses tool poisoning through the Model Context Protocol — a subset of the broader tool misuse category',
          relationship: 'partial'
        },
        {
          taxonomy: 'mitre-atlas',
          sourceId: 'AML.T0053',
          sourceName: 'Exploit Public-Facing Application',
          sourceUrl: 'https://atlas.mitre.org/techniques/AML.T0053',
          mappingRationale: 'ATLAS T0053 covers exploitation of AI-facing applications including tool interfaces',
          relationship: 'partial'
        }
      ],
      taxonomyDisagreements: [
        'OWASP MCP Top 10 treats tool poisoning as MCP-specific; OWASP Agentic Threats treats tool misuse more broadly across any tool interface',
        'ATLAS distributes tool-related attacks across multiple techniques (T0053, T0098, T0099) while OWASP bundles them under T2/ASI02'
      ],
      scope: {
        appliesTo: ['Agents with tool/function calling capabilities', 'MCP-connected systems', 'Agents with API access', 'Code generation agents with execution capabilities'],
        doesNotApplyTo: ['Agents without tool access', 'Pure text generation without function calling', 'Closed-loop systems without external integrations']
      },
      incidentIds: ['INC-002', 'INC-004'],
      mitigationIds: ['MIT-002']
    },
    {
      id: 'TM-003',
      name: 'Identity & Privilege Abuse',
      description: 'Exploitation of authentication and authorization weaknesses in agent systems. Includes confused deputy attacks where agents perform unauthorized actions using their elevated privileges, identity spoofing between agents, and privilege escalation through tool chains.',
      category: { primary: 'identity-and-privilege', secondary: ['multi-agent'] },
      severity: 'high',
      severityRationale: 'Identity and privilege boundaries in agentic systems are fundamentally different from traditional applications. Agents often inherit broad permissions and the confused deputy problem is structural, not incidental.',
      sourceMappings: [
        {
          taxonomy: 'owasp-agentic-threats',
          sourceId: 'T9',
          sourceName: 'Identity Spoofing & Impersonation',
          sourceUrl: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/',
          mappingRationale: 'OWASP T9 covers agent impersonation and identity spoofing — one dimension of the broader identity/privilege category',
          relationship: 'partial'
        },
        {
          taxonomy: 'owasp-agentic-top10',
          sourceId: 'ASI03',
          sourceName: 'Identity and Privilege Abuse',
          sourceUrl: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
          mappingRationale: 'ASI03 directly covers the full scope including confused deputy, privilege escalation, and identity abuse',
          relationship: 'exact'
        },
        {
          taxonomy: 'mitre-atlas',
          sourceId: 'AML.T0054',
          sourceName: 'LLM Jailbreak',
          sourceUrl: 'https://atlas.mitre.org/techniques/AML.T0054',
          mappingRationale: 'ATLAS jailbreak techniques can be used to bypass privilege boundaries, but jailbreak itself is broader than identity/privilege abuse',
          relationship: 'partial'
        }
      ],
      scope: {
        appliesTo: ['Agents acting on behalf of users', 'Multi-agent systems with delegation', 'Agents with access to privileged APIs or databases', 'MCP servers with credential access'],
        doesNotApplyTo: ['Agents with no external access', 'Systems where agent and user have identical permissions', 'Read-only agent deployments']
      },
      incidentIds: ['INC-002'],
      mitigationIds: ['MIT-002']
    },
    {
      id: 'TM-004',
      name: 'Agent Communication Poisoning',
      description: 'Manipulation of communication channels between AI agents in multi-agent systems to spread false information, disrupt workflows, or influence decision-making. Includes message tampering, injection of false inter-agent messages, and exploitation of trust relationships between agents.',
      category: { primary: 'communication', secondary: ['multi-agent'] },
      severity: 'high',
      severityRationale: 'Multi-agent systems increasingly rely on inter-agent communication for coordination. Poisoned communications can cascade through agent networks, amplifying the impact beyond the initial compromise.',
      sourceMappings: [
        {
          taxonomy: 'owasp-agentic-threats',
          sourceId: 'T12',
          sourceName: 'Agent Communication Poisoning',
          sourceUrl: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/',
          mappingRationale: 'OWASP T12 is an exact match — covers manipulation of inter-agent communication channels',
          relationship: 'exact'
        },
        {
          taxonomy: 'owasp-agentic-top10',
          sourceId: 'ASI07',
          sourceName: 'Insecure Inter-Agent Communication',
          sourceUrl: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
          mappingRationale: 'ASI07 addresses the broader category of insecure inter-agent communication, of which poisoning is the primary attack vector',
          relationship: 'overlapping'
        }
      ],
      scope: {
        appliesTo: ['Multi-agent systems', 'Agent orchestration platforms', 'Systems with inter-agent delegation or messaging'],
        doesNotApplyTo: ['Single-agent deployments', 'Agents communicating only with humans', 'Isolated agents without peer connections']
      },
      incidentIds: [],
      mitigationIds: []
    }
  ],

  // ---------------------------------------------------------------------------
  // INCIDENT REGISTRY — The "live view" timeline
  // ---------------------------------------------------------------------------
  incidents: [
    {
      id: 'INC-001',
      title: 'AI Agent Memory Manipulation via Persistent Context Injection',
      date: new Date('2025-10-22'),
      type: 'security-research',
      status: 'confirmed',
      summary: 'Zenity Labs researchers demonstrated techniques for manipulating AI agent memory systems, showing how persistent context injection could alter agent behavior across sessions. The research led to collaboration with MITRE, resulting in 14 new agentic AI techniques being added to the ATLAS framework.',
      impact: 'Demonstrated that agents with persistent memory can be compromised in ways that persist across sessions, affecting all subsequent interactions. Led directly to expansion of ATLAS threat coverage.',
      threatIds: ['TM-001'],
      attackVector: 'Injection of malicious content into agent persistent memory stores, which is then retrieved and acted upon in subsequent sessions.',
      affectedSystems: ['LLM-based agents with persistent memory', 'Enterprise copilots with conversation history'],
      coverageMappings: [
        {
          frameworkId: 'owasp-genai',
          frameworkName: 'OWASP GenAI Security Project',
          coverage: 'direct',
          scoringRationale: 'ASI06 (Memory & Context Poisoning) directly addresses this attack vector with specific detection and mitigation guidance',
          specificGuidance: 'ASI06'
        },
        {
          frameworkId: 'mitre-atlas',
          frameworkName: 'MITRE ATLAS',
          coverage: 'direct',
          scoringRationale: 'The research directly led to new ATLAS techniques for agent memory manipulation; ATLAS now has dedicated coverage',
          specificGuidance: 'AI Agent Memory Manipulation technique (Oct 2025 addition)'
        },
        {
          frameworkId: 'nist-ai-rmf',
          frameworkName: 'NIST AI Risk Management Framework',
          coverage: 'indirect',
          scoringRationale: 'NIST AI RMF addresses data integrity risks generally but has no specific guidance on agent memory poisoning',
          specificGuidance: 'MAP and MEASURE functions (general data integrity)'
        },
        {
          frameworkId: 'iso-42001',
          frameworkName: 'ISO/IEC 42001:2023',
          coverage: 'none',
          scoringRationale: 'Published before agentic AI era; no coverage of agent memory systems or persistent context attacks'
        },
        {
          frameworkId: 'cis-controls',
          frameworkName: 'CIS Controls',
          coverage: 'none',
          scoringRationale: 'Zero AI-specific content; traditional IT controls do not address agent memory threats'
        }
      ],
      gaps: [
        {
          frameworkId: 'iso-42001',
          frameworkName: 'ISO/IEC 42001:2023',
          gapDescription: 'No recognition of agent memory as an attack surface. Annex A controls address data quality but not adversarial manipulation of agent context.',
          contributionCandidate: true,
          contributionStatus: 'identified'
        },
        {
          frameworkId: 'cis-controls',
          frameworkName: 'CIS Controls',
          gapDescription: 'Asset inventory (Control 1) does not include AI agent memory stores. No guidance on protecting agent persistent state.',
          contributionCandidate: false // CIS has no AI coverage at all — broader issue
        }
      ],
      sources: [
        {
          name: 'Zenity Labs - Agentic AI Threat Research',
          url: 'https://www.zenity.io/blog/agentic-ai-threats/',
          publishedDate: new Date('2025-10-22'),
          organization: 'Zenity Labs'
        },
        {
          name: 'MITRE ATLAS October 2025 Update',
          url: 'https://atlas.mitre.org/',
          publishedDate: new Date('2025-10-22'),
          organization: 'MITRE Corporation'
        }
      ],
      confidence: {
        level: 'high',
        rationale: 'Research published by credible organization (Zenity Labs), confirmed by MITRE incorporation into ATLAS framework'
      }
    },
    {
      id: 'INC-002',
      title: 'OpenClaw Investigation — Agent Techniques from AI-First Ecosystems',
      date: new Date('2026-02-09'),
      type: 'case-study',
      status: 'confirmed',
      summary: 'MITRE ATLAS Center for Threat-Informed Defense (CTID) published the OpenClaw investigation, discovering 7 new agent-specific techniques by studying real-world AI-first ecosystems. The investigation analyzed how agents interact with tools, credentials, and external systems in production environments, revealing attack patterns not previously cataloged.',
      impact: 'Expanded ATLAS with case studies CS0048-CS0051 covering real-world agent attack patterns. Demonstrated that AI-first ecosystems create novel attack surfaces not captured by existing threat models.',
      threatIds: ['TM-002', 'TM-003'],
      attackVector: 'Multiple vectors discovered: tool credential harvesting, tool data poisoning, agent clickbait, and malicious command generation through agent tool interfaces.',
      affectedSystems: ['AI coding assistants', 'MCP tool server ecosystems', 'Agent-to-tool integration layers'],
      coverageMappings: [
        {
          frameworkId: 'owasp-genai',
          frameworkName: 'OWASP GenAI Security Project',
          coverage: 'direct',
          scoringRationale: 'ASI02 (Tool Misuse) and ASI03 (Identity and Privilege Abuse) cover the attack vectors discovered in OpenClaw',
          specificGuidance: 'ASI02, ASI03'
        },
        {
          frameworkId: 'mitre-atlas',
          frameworkName: 'MITRE ATLAS',
          coverage: 'direct',
          scoringRationale: 'OpenClaw findings were incorporated directly into ATLAS as new techniques and case studies (CS0048-CS0051)',
          specificGuidance: 'T0098, T0099, T0100, T0102, CS0048-CS0051'
        },
        {
          frameworkId: 'nist-ai-rmf',
          frameworkName: 'NIST AI Risk Management Framework',
          coverage: 'none',
          scoringRationale: 'Published NIST guidance does not address agent-tool interaction threats or credential handling in agentic systems'
        },
        {
          frameworkId: 'iso-42001',
          frameworkName: 'ISO/IEC 42001:2023',
          coverage: 'none',
          scoringRationale: 'Pre-dates agentic AI; no coverage of tool ecosystems, MCP, or agent credential management'
        },
        {
          frameworkId: 'cis-controls',
          frameworkName: 'CIS Controls',
          coverage: 'none',
          scoringRationale: 'No AI-specific content; traditional access controls do not address agent-to-tool privilege boundaries'
        }
      ],
      gaps: [
        {
          frameworkId: 'nist-ai-rmf',
          frameworkName: 'NIST AI Risk Management Framework',
          gapDescription: 'No guidance on securing agent-tool interactions, credential delegation to agents, or tool ecosystem trust. COSAiS draft may eventually address this but nothing published.',
          contributionCandidate: true,
          contributionStatus: 'identified'
        }
      ],
      sources: [
        {
          name: 'MITRE ATLAS OpenClaw Investigation',
          url: 'https://ctid.mitre.org/blog/2026/02/09/mitre-atlas-openclaw-investigation/',
          publishedDate: new Date('2026-02-09'),
          organization: 'MITRE Corporation CTID'
        }
      ],
      confidence: {
        level: 'high',
        rationale: 'Published by MITRE CTID with structured case studies; primary source with full methodology disclosed'
      }
    },
    {
      id: 'INC-003',
      title: 'Persistent Backdoor via RAG Knowledge Base Poisoning',
      date: new Date('2025-09-15'),
      type: 'security-research',
      status: 'confirmed',
      summary: 'Security researchers demonstrated that RAG (Retrieval-Augmented Generation) knowledge bases used by AI agents can be poisoned by injecting adversarial documents that persist across sessions. The poisoned documents contain instructions that, when retrieved, cause the agent to exfiltrate data or perform unauthorized actions.',
      impact: 'Showed that RAG-augmented agents have a persistent attack surface through their knowledge stores. Unlike prompt injection which requires per-session exploitation, RAG poisoning creates a durable backdoor.',
      threatIds: ['TM-001'],
      attackVector: 'Injection of adversarial documents into a shared RAG knowledge base. When the agent retrieves these documents for context, embedded instructions override intended behavior.',
      affectedSystems: ['RAG-augmented AI agents', 'Enterprise knowledge management systems with AI interfaces', 'Shared document stores accessed by AI agents'],
      coverageMappings: [
        {
          frameworkId: 'owasp-genai',
          frameworkName: 'OWASP GenAI Security Project',
          coverage: 'direct',
          scoringRationale: 'ASI06 explicitly covers context poisoning including RAG-based attacks; OWASP LLM Top 10 also covers data poisoning',
          specificGuidance: 'ASI06, LLM03 (Supply Chain)'
        },
        {
          frameworkId: 'mitre-atlas',
          frameworkName: 'MITRE ATLAS',
          coverage: 'direct',
          scoringRationale: 'ATLAS AML.T0070 (RAG Poisoning) directly covers this technique',
          specificGuidance: 'AML.T0070'
        },
        {
          frameworkId: 'nist-ai-rmf',
          frameworkName: 'NIST AI Risk Management Framework',
          coverage: 'indirect',
          scoringRationale: 'NIST GenAI Profile (600-1) addresses data integrity for GenAI systems generally but lacks RAG-specific guidance',
          specificGuidance: 'NIST AI 600-1 data integrity provisions'
        },
        {
          frameworkId: 'iso-42001',
          frameworkName: 'ISO/IEC 42001:2023',
          coverage: 'indirect',
          scoringRationale: 'Annex A data quality controls are conceptually relevant but do not address adversarial RAG poisoning scenarios',
          specificGuidance: 'Annex A data management controls'
        },
        {
          frameworkId: 'cis-controls',
          frameworkName: 'CIS Controls',
          coverage: 'none',
          scoringRationale: 'No AI or RAG-specific content'
        }
      ],
      gaps: [],
      sources: [
        {
          name: 'MITRE ATLAS - RAG Poisoning Technique',
          url: 'https://atlas.mitre.org/techniques/AML.T0070',
          publishedDate: new Date('2025-09-15'),
          organization: 'MITRE Corporation'
        }
      ],
      confidence: {
        level: 'medium',
        rationale: 'Based on published ATLAS technique with multiple referenced studies; specific incident details aggregated from multiple research papers rather than a single disclosed event'
      }
    },
    {
      id: 'INC-004',
      title: 'MCP Tool Server Data Exfiltration via Cursor IDE',
      date: new Date('2025-12-01'),
      type: 'proof-of-concept',
      status: 'confirmed',
      summary: 'Security researchers demonstrated that malicious MCP tool servers connected to AI coding assistants (specifically Cursor IDE) could exfiltrate sensitive data from the development environment. By poisoning tool definitions, the attacker caused the agent to include sensitive file contents in tool invocations sent to attacker-controlled servers.',
      impact: 'Demonstrated a practical data exfiltration path through the MCP protocol in a widely-used AI coding tool. Highlighted that MCP tool trust is implicitly granted without adequate verification in current implementations.',
      threatIds: ['TM-002'],
      attackVector: 'Malicious MCP tool server provides poisoned tool definitions that instruct the agent to include sensitive context (source code, environment variables, credentials) in tool call parameters, exfiltrating data to the attacker.',
      affectedSystems: ['AI coding assistants with MCP support', 'Development environments with MCP tool servers', 'Any MCP client that auto-trusts tool definitions'],
      coverageMappings: [
        {
          frameworkId: 'owasp-genai',
          frameworkName: 'OWASP GenAI Security Project',
          coverage: 'direct',
          scoringRationale: 'ASI02 covers tool exploitation; OWASP MCP Top 10 (MCP03 Tool Poisoning) directly addresses this specific attack pattern',
          specificGuidance: 'ASI02, MCP03'
        },
        {
          frameworkId: 'mitre-atlas',
          frameworkName: 'MITRE ATLAS',
          coverage: 'direct',
          scoringRationale: 'ATLAS case studies from OpenClaw investigation cover MCP-based exfiltration; Tool Invocation Exfiltration technique applies directly',
          specificGuidance: 'T0098, T0099 and related case studies'
        },
        {
          frameworkId: 'nist-ai-rmf',
          frameworkName: 'NIST AI Risk Management Framework',
          coverage: 'none',
          scoringRationale: 'No MCP, tool calling, or agent-tool integration guidance in any published NIST document'
        },
        {
          frameworkId: 'iso-42001',
          frameworkName: 'ISO/IEC 42001:2023',
          coverage: 'none',
          scoringRationale: 'Pre-dates MCP protocol and modern agent tool ecosystems entirely'
        },
        {
          frameworkId: 'cis-controls',
          frameworkName: 'CIS Controls',
          coverage: 'none',
          scoringRationale: 'No AI, MCP, or agent-tool coverage'
        }
      ],
      gaps: [
        {
          frameworkId: 'nist-ai-rmf',
          frameworkName: 'NIST AI Risk Management Framework',
          gapDescription: 'No guidance on MCP protocol security, tool server trust, or data exfiltration through agent tool interfaces. This is a growing attack surface as MCP adoption increases.',
          contributionCandidate: true,
          contributionStatus: 'identified'
        },
        {
          frameworkId: 'iso-42001',
          frameworkName: 'ISO/IEC 42001:2023',
          gapDescription: 'No recognition of agent tool ecosystems as requiring security controls. Supply chain management (Annex A) does not extend to MCP tool server vetting.',
          contributionCandidate: true,
          contributionStatus: 'identified'
        }
      ],
      sources: [
        {
          name: 'Invariant Labs - MCP Security Research',
          url: 'https://invariantlabs.ai/blog/mcp-security',
          publishedDate: new Date('2025-12-01'),
          organization: 'Invariant Labs'
        }
      ],
      confidence: {
        level: 'high',
        rationale: 'Proof-of-concept demonstrated and published by credible security research organization with reproducible methodology'
      }
    }
  ],

  // ---------------------------------------------------------------------------
  // MITIGATIONS — Curated references (not original content in v1)
  // ---------------------------------------------------------------------------
  mitigations: [
    {
      id: 'MIT-001',
      name: 'Memory Content Validation & Session Isolation',
      description: 'Implement validation of content stored in and retrieved from agent memory systems. Isolate memory between sessions and users. Detect anomalous memory modifications.',
      threatIds: ['TM-001'],
      source: {
        organization: 'OWASP',
        document: 'Agentic AI Threats and Mitigations v1.1',
        section: 'T1 Mitigations: Memory content validation, session isolation, anomaly detection',
        url: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/'
      },
      platformContext: [
        {
          platform: 'aws',
          services: ['Amazon Bedrock Guardrails', 'Amazon Bedrock Knowledge Bases'],
          implementationNote: 'Bedrock Guardrails can filter content entering agent context; Knowledge Bases provide managed RAG with access controls'
        },
        {
          platform: 'generic',
          implementationNote: 'Implement memory content hashing, anomaly detection on memory writes, and periodic memory sanitization'
        }
      ]
    },
    {
      id: 'MIT-002',
      name: 'Tool Access Verification & Least Privilege',
      description: 'Enforce strict verification of tool access, monitor tool usage patterns, validate agent instructions before tool execution, and apply least-privilege principles to agent tool permissions.',
      threatIds: ['TM-002', 'TM-003'],
      source: {
        organization: 'OWASP',
        document: 'Agentic AI Threats and Mitigations v1.1',
        section: 'T2 Mitigations: Tool access verification, usage monitoring, instruction validation',
        url: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/'
      },
      platformContext: [
        {
          platform: 'aws',
          services: ['Amazon Bedrock Agents', 'AWS IAM', 'Amazon CloudWatch'],
          implementationNote: 'Use Bedrock Agent action groups with scoped IAM roles; monitor tool invocations via CloudWatch'
        },
        {
          platform: 'generic',
          implementationNote: 'Implement tool allowlists, parameter validation, output filtering, and audit logging for all tool invocations'
        }
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // THREAT EVOLUTION TIMELINE — The analytical "trajectory" view
  // ---------------------------------------------------------------------------
  evolution: [
    {
      date: new Date('2025-10-22'),
      type: 'taxonomy-update',
      title: 'MITRE ATLAS adds 14 agentic AI techniques',
      description: 'Zenity Labs collaboration resulted in 14 new agentic AI techniques added to ATLAS, including agent context poisoning, memory manipulation, and tool invocation exfiltration. Largest single expansion of AI agent threat coverage in any framework.',
      source: {
        name: 'MITRE ATLAS October 2025 Update',
        url: 'https://atlas.mitre.org/',
        organization: 'MITRE Corporation'
      },
      relatedThreatIds: ['TM-001', 'TM-002'],
      significance: 'high',
      confidence: 'high'
    },
    {
      date: new Date('2025-12-09'),
      type: 'framework-response',
      title: 'OWASP Top 10 for Agentic Applications 2026 released',
      description: 'Created by 100+ expert contributors, ASI01-ASI10 established the definitive agentic security checklist. Synchronized with Threats & Mitigations v1.1 taxonomy. Covers the full spectrum from prompt injection through multi-agent system risks.',
      source: {
        name: 'OWASP Agentic Security Initiative',
        url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
        organization: 'OWASP Foundation'
      },
      relatedThreatIds: ['TM-001', 'TM-002', 'TM-003', 'TM-004'],
      significance: 'high',
      confidence: 'high'
    },
    {
      date: new Date('2026-02-09'),
      type: 'new-attack-category',
      title: 'OpenClaw investigation reveals AI-first ecosystem attack patterns',
      description: 'MITRE CTID discovered 7 new agent-specific techniques by studying real-world AI-first ecosystems. Findings published as case studies CS0048-CS0051, demonstrating that agent tool ecosystems create novel attack surfaces.',
      source: {
        name: 'MITRE ATLAS OpenClaw Investigation',
        url: 'https://ctid.mitre.org/blog/2026/02/09/mitre-atlas-openclaw-investigation/',
        organization: 'MITRE Corporation CTID'
      },
      relatedThreatIds: ['TM-002', 'TM-003'],
      significance: 'high',
      confidence: 'high'
    }
  ],

  // ---------------------------------------------------------------------------
  // SELF-AWARENESS METADATA (C-02)
  // ---------------------------------------------------------------------------
  evaluation: {
    date: new Date('2026-02-22'),
    by: '@tsynode',
    validDays: 90,
    methodology: `Threat catalog methodology:

1. THREAT NORMALIZATION
   - Identify distinct threat types across OWASP (T1-T15, ASI01-ASI10, MCP01-MCP10) and MITRE ATLAS (84+ techniques)
   - Create canonical entries (TM-NNN) that unify overlapping descriptions
   - Map each canonical entry to source IDs with relationship classification (exact/overlapping/partial)
   - Document where sources disagree on scope or categorization

2. INCIDENT SELECTION CRITERIA
   - Must have a published source from a credible organization (security research firm, MITRE, OWASP, academic institution, or vendor advisory)
   - Must involve agentic AI specifically (not traditional ML or general LLM prompt injection without tool/agent context)
   - Must have enough detail to map to at least one canonical threat and assess framework coverage
   - Prioritize diversity across threat categories over depth in any single category

3. COVERAGE ASSESSMENT (three-level)
   - Direct: Framework has specific guidance addressing the attack vector used in this incident
   - Indirect: Framework has general principles relevant to this attack but not specific enough to be actionable
   - None: No relevant coverage
   - Each assessment requires a one-sentence scoringRationale (Rule 5)

4. GAP IDENTIFICATION
   - Coverage: 'none' on an incident → potential gap
   - Gaps flagged as contribution candidates when: the framework's scope should logically include the threat, AND the gap represents an actionable addition (not a fundamental scope mismatch)`,
    updateInstructions: `Monthly review process:

1. CHECK FOR NEW INCIDENTS
   - Monitor MITRE ATLAS GitHub releases for new case studies
   - Check OWASP agentic security initiative for new publications
   - Review security research blogs (Zenity, Invariant Labs, Trail of Bits, etc.)
   - Add new incidents following the selection criteria in methodology

2. UPDATE THREAT CATALOG
   - Check if new incidents map to existing TM-NNN entries
   - If a new threat category emerges, create new TM-NNN entry with source mappings
   - Update incidentIds on affected threats

3. RE-ASSESS COVERAGE MAPPINGS
   - For new incidents, assess coverage across all tracked frameworks
   - Check if previously-flagged gaps have been addressed by framework updates
   - Update contributionStatus on gaps where frameworks have responded

4. UPDATE EVOLUTION TIMELINE
   - Add entries for new taxonomy releases, framework updates, or regulatory changes
   - Focus on events that change the threat landscape, not routine updates

5. VERIFY EXISTING DATA
   - Check that all source URLs are still accessible
   - Verify incident details haven't been corrected or updated
   - Update confidence levels if new information has emerged`
  },

  // ---------------------------------------------------------------------------
  // SCOPE (C-03)
  // ---------------------------------------------------------------------------
  scope: {
    appliesTo: [
      'Threats specific to LLM-based agentic AI systems',
      'Incidents involving AI agents with tool calling, memory, or multi-agent capabilities',
      'Framework coverage assessment for agentic AI threats specifically',
      'MCP protocol security concerns'
    ],
    doesNotApplyTo: [
      'Traditional ML adversarial attacks (evasion, model extraction) — covered by ATLAS core',
      'General LLM prompt injection without agent context — covered by OWASP LLM Top 10',
      'Non-AI cybersecurity threats — covered by ATT&CK, CIS Controls',
      'AI ethics, bias, and fairness concerns — different domain',
      'Comprehensive incident database — this is a curated selection demonstrating cross-reference value'
    ]
  },

  // ---------------------------------------------------------------------------
  // DISSENT (C-04)
  // ---------------------------------------------------------------------------
  dissent: {
    knownLimitations: [
      'Seed dataset of 4 incidents creates selection bias — weighted toward well-documented research over disclosed production attacks',
      'Coverage mappings assessed by a single evaluator; cross-evaluation by framework experts would improve accuracy',
      'Three-level coverage scale (direct/indirect/none) loses nuance within each level — "direct" coverage varies significantly in quality',
      'Threat normalization across taxonomies involves judgment calls where sources genuinely disagree on categorization'
    ],
    deliberateExclusions: [
      {
        what: 'Traditional ML adversarial attacks (evasion, poisoning of training data, model extraction)',
        why: 'Well-covered by ATLAS core and academic literature; including them would dilute focus on novel agentic threats'
      },
      {
        what: 'General LLM prompt injection without agent/tool context',
        why: 'Covered by OWASP LLM Top 10; only included when prompt injection is used as a vector for agentic-specific attacks'
      },
      {
        what: 'Effectiveness assessment of mitigations',
        why: 'v1 provides curated references only; original effectiveness evaluation planned for later versions to ensure quality'
      }
    ],
    openQuestions: [
      'Should threat severity be static or computed from incident frequency and impact?',
      'How should we handle incidents that span multiple threat categories — weight toward primary vector or count in all?',
      'At what point does the incident count warrant splitting this into separate knowledge artifacts per threat category?'
    ]
  },

  // ---------------------------------------------------------------------------
  // INSIGHTS & RECOMMENDATIONS
  // ---------------------------------------------------------------------------
  insights: [
    'Only OWASP and MITRE ATLAS provide direct coverage for the majority of agentic AI incidents — other frameworks have significant gaps',
    'Tool misuse and memory poisoning are the most frequently exploited threat categories in documented incidents',
    'MCP protocol security is an emerging attack surface with active exploitation but limited framework coverage beyond OWASP',
    'The gap between incident reality and framework coverage is largest for NIST, ISO 42001, and CIS Controls — all lack agentic-specific content'
  ],

  recommendations: [
    'Use OWASP Top 10 for Agentic Applications (ASI01-ASI10) as primary security checklist — it provides direct coverage for all incidents in this catalog',
    'Use MITRE ATLAS for threat modeling — its technique-level granularity maps most precisely to real-world attack patterns',
    'Prioritize tool access controls and memory validation — these address the two most exploited threat categories',
    'Do not rely on ISO 42001 or CIS Controls alone for agentic AI security — supplement with OWASP and ATLAS'
  ],

  // ---------------------------------------------------------------------------
  // SOURCES
  // ---------------------------------------------------------------------------
  sources: [
    { name: 'OWASP Top 10 for Agentic Applications 2026', url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/', date: new Date('2025-12-09') },
    { name: 'OWASP Agentic AI Threats and Mitigations v1.1', url: 'https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/', date: new Date('2025-12-09') },
    { name: 'OWASP MCP Top 10 (Beta v0.1)', url: 'https://owasp.org/www-project-mcp-top-10/', date: new Date('2025-12-01') },
    { name: 'MITRE ATLAS', url: 'https://atlas.mitre.org/', date: new Date('2026-02-09') },
    { name: 'MITRE ATLAS OpenClaw Investigation', url: 'https://ctid.mitre.org/blog/2026/02/09/mitre-atlas-openclaw-investigation/', date: new Date('2026-02-09') },
    { name: 'Zenity Labs - Agentic AI Threat Research', url: 'https://www.zenity.io/blog/agentic-ai-threats/', date: new Date('2025-10-22') },
    { name: 'Invariant Labs - MCP Security Research', url: 'https://invariantlabs.ai/blog/mcp-security', date: new Date('2025-12-01') }
  ],

  // ---------------------------------------------------------------------------
  // METADATA
  // ---------------------------------------------------------------------------
  metadata: {
    description: 'Agentic AI threats normalized across OWASP, MITRE ATLAS, and MCP taxonomies, correlated with real-world incidents and framework coverage gaps',
    details: [
      'Seed dataset: 4 threats, 4 incidents, 2 mitigations, 3 evolution events',
      'Three-level coverage assessment: direct, indirect, none',
      'Cross-references OWASP (T1-T15, ASI01-ASI10, MCP01-MCP10) and MITRE ATLAS (84+ techniques)',
      'Gaps flagged as contribution candidates to framework maintainers'
    ],
    category: 'security',
    tags: ['threats', 'incidents', 'coverage-gaps', 'agentic-ai', 'mcp-security', 'cross-reference'],
    version: '0.1.0'
  }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export function isStale(knowledge: ThreatsKnowledge): boolean {
  const daysSince = (Date.now() - knowledge.evaluation.date.getTime()) / (1000 * 60 * 60 * 24);
  return daysSince > knowledge.evaluation.validDays;
}

export function getConfidenceStatus(knowledge: ThreatsKnowledge): {
  confidence: number;
  status: string;
  daysUntilStale: number;
} {
  const daysSince = (Date.now() - knowledge.evaluation.date.getTime()) / (1000 * 60 * 60 * 24);
  const validDays = knowledge.evaluation.validDays;
  const daysUntilStale = Math.max(0, Math.floor(validDays - daysSince));

  if (daysSince <= validDays * 0.3) {
    return { confidence: 1.0, status: "Fresh - high confidence", daysUntilStale };
  } else if (daysSince <= validDays * 0.7) {
    return { confidence: 0.7, status: "Aging - consider review", daysUntilStale };
  } else if (daysSince <= validDays) {
    return { confidence: 0.5, status: "Stale - needs review", daysUntilStale };
  } else {
    return { confidence: 0.3, status: "Expired - review required", daysUntilStale: 0 };
  }
}

export function getAllGaps(knowledge: ThreatsKnowledge): (IncidentGap & {
  incidentId: string;
  incidentTitle: string;
  incidentDate: Date;
})[] {
  return knowledge.incidents.flatMap(incident =>
    incident.gaps.map(gap => ({
      ...gap,
      incidentId: incident.id,
      incidentTitle: incident.title,
      incidentDate: incident.date,
    }))
  );
}

export function getContributionCandidates(knowledge: ThreatsKnowledge) {
  return getAllGaps(knowledge).filter(g => g.contributionCandidate && g.contributionStatus === 'identified');
}

export function computeCoverageSummary(knowledge: ThreatsKnowledge): {
  totalIncidents: number;
  totalGaps: number;
  gapsByFramework: {
    frameworkId: string;
    frameworkName: string;
    directCount: number;
    indirectCount: number;
    noneCount: number;
  }[];
  mostExploitedThreats: {
    threatId: string;
    threatName: string;
    incidentCount: number;
  }[];
} {
  const frameworkMap = new Map<string, { name: string; direct: number; indirect: number; none: number }>();

  for (const incident of knowledge.incidents) {
    for (const mapping of incident.coverageMappings) {
      const existing = frameworkMap.get(mapping.frameworkId) || {
        name: mapping.frameworkName,
        direct: 0,
        indirect: 0,
        none: 0,
      };
      existing[mapping.coverage === 'direct' ? 'direct' : mapping.coverage === 'indirect' ? 'indirect' : 'none']++;
      frameworkMap.set(mapping.frameworkId, existing);
    }
  }

  return {
    totalIncidents: knowledge.incidents.length,
    totalGaps: getAllGaps(knowledge).length,
    gapsByFramework: Array.from(frameworkMap.entries()).map(([id, data]) => ({
      frameworkId: id,
      frameworkName: data.name,
      directCount: data.direct,
      indirectCount: data.indirect,
      noneCount: data.none,
    })),
    mostExploitedThreats: getThreatsByExploitation(knowledge)
      .filter(t => t.incidentIds.length > 0)
      .slice(0, 5)
      .map(t => ({
        threatId: t.id,
        threatName: t.name,
        incidentCount: t.incidentIds.length,
      })),
  };
}

export function getFrameworkCoverage(knowledge: ThreatsKnowledge, frameworkId: string): {
  direct: Incident[];
  indirect: Incident[];
  none: Incident[];
} {
  const direct: Incident[] = [];
  const indirect: Incident[] = [];
  const none: Incident[] = [];

  for (const incident of knowledge.incidents) {
    const mapping = incident.coverageMappings.find(m => m.frameworkId === frameworkId);
    if (!mapping || mapping.coverage === 'none') {
      none.push(incident);
    } else if (mapping.coverage === 'direct') {
      direct.push(incident);
    } else {
      indirect.push(incident);
    }
  }

  return { direct, indirect, none };
}

export function getThreatsByExploitation(knowledge: ThreatsKnowledge): Threat[] {
  return [...knowledge.threats].sort((a, b) => b.incidentIds.length - a.incidentIds.length);
}

export function getIncidentsForThreat(knowledge: ThreatsKnowledge, threatId: string): Incident[] {
  return knowledge.incidents.filter(inc => inc.threatIds.includes(threatId));
}

export function getMitigationsForThreat(knowledge: ThreatsKnowledge, threatId: string): MitigationReference[] {
  return knowledge.mitigations.filter(mit => mit.threatIds.includes(threatId));
}

export function getThreatsByCategory(knowledge: ThreatsKnowledge, category: ThreatCategory['primary']): Threat[] {
  return knowledge.threats.filter(t => t.category.primary === category);
}

export function computeThreatTrends(knowledge: ThreatsKnowledge): {
  category: ThreatCategory['primary'];
  incidentsByPeriod: { period: string; count: number }[];
  trend: 'accelerating' | 'stable' | 'declining';
}[] {
  const categoryIncidents = new Map<ThreatCategory['primary'], Date[]>();

  for (const incident of knowledge.incidents) {
    for (const threatId of incident.threatIds) {
      const threat = knowledge.threats.find(t => t.id === threatId);
      if (threat) {
        const dates = categoryIncidents.get(threat.category.primary) || [];
        dates.push(incident.date);
        categoryIncidents.set(threat.category.primary, dates);
      }
    }
  }

  return Array.from(categoryIncidents.entries()).map(([category, dates]) => {
    const buckets = new Map<string, number>();
    for (const date of dates) {
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      buckets.set(key, (buckets.get(key) || 0) + 1);
    }

    const periods = Array.from(buckets.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([period, count]) => ({ period, count }));

    const mid = Math.floor(periods.length / 2);
    const firstHalf = periods.slice(0, mid).reduce((sum, p) => sum + p.count, 0);
    const secondHalf = periods.slice(mid).reduce((sum, p) => sum + p.count, 0);

    let trend: 'accelerating' | 'stable' | 'declining' = 'stable';
    if (periods.length >= 2) {
      if (secondHalf > firstHalf * 1.3) trend = 'accelerating';
      else if (secondHalf < firstHalf * 0.7) trend = 'declining';
    }

    return { category, incidentsByPeriod: periods, trend };
  });
}

export function getLatestIncident(knowledge: ThreatsKnowledge): Incident | undefined {
  return [...knowledge.incidents].sort((a, b) => b.date.getTime() - a.date.getTime())[0];
}

export function getEvolutionTimeline(knowledge: ThreatsKnowledge): ThreatEvolutionEvent[] {
  return [...knowledge.evolution].sort((a, b) => b.date.getTime() - a.date.getTime());
}
