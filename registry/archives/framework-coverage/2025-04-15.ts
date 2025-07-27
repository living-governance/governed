// Archived snapshot from 2025-04-15
// Before OWASP added LLM08: Tool Manipulation

export const snapshot_2025_04_15 = {
  evaluation: {
    date: new Date('2025-04-15'),
    by: '@security-researcher',
    validDays: 90,
    methodology: 'Reviewed official framework documentation, mapped controls to AI attack categories'
  },
  
  frameworks: [
    {
      id: 'owasp-top10-llm',
      name: 'OWASP Top 10 for LLM',
      version: '2025',
      aiCoverage: {
        overall: 0.375,
        categories: {
          'mcp-attacks': false,
          'prompt-injection': true,
          'data-poisoning': true,
          'model-theft': true,
          'temporal-drift': false,
          'coordination-attacks': false,
          'tool-manipulation': false,
          'behavior-evolution': false
        }
      },
      strengths: ['Well-documented prompt injection patterns'],
      gaps: ['No MCP-specific guidance', 'Missing autonomous agent risks']
    }
    // ... other frameworks omitted for brevity
  ],
  
  insights: [
    'No major framework addresses MCP-specific attacks',
    'Temporal and coordination risks severely underrepresented',
    'Traditional security frameworks retrofitted for AI miss key risks',
    'Gap between compliance requirements and actual AI threats'
  ]
};
