# @governed/living-governance

> Executable knowledge infrastructure for AI governance. Copy. Customize. Govern.

Living Governance transforms AI governance from static PDFs into executable code that evolves with your organization. Built with the shadcn philosophy: copy the source, customize for your needs, own it completely.

## What Makes Knowledge "Living"?

Traditional governance: 📄 PDF updated quarterly, probably outdated  
Living governance: 🧠 Self-aware code that knows when it needs updating

```typescript
// This knowledge knows its own freshness
export const frameworkCoverageKnowledge = {
  frameworks: [...],  // The actual data
  
  evaluation: {
    date: new Date('2025-07-24'),
    by: '@security-researcher',
    validDays: 90  // Framework data stays fresh ~3 months
  },
  
  updateInstructions: `
    Monthly review process:
    1. Visit each framework's official site
    2. Check for new AI-specific sections
    3. Update coverage percentages
  `
}
```

## Three Ways to Use Living Governance

### 1. 🌐 Browse living-governance.com
Visit our website for quick orientation on AI governance:
- Current threat landscape
- Framework coverage analysis  
- Latest vulnerabilities
- One place to understand what matters TODAY

### 2. 🔧 Copy Components (shadcn model)
Add governance components to YOUR applications:
```bash
# Copy full components (UI + Knowledge)
npx @governed/cli add framework-coverage
npx @governed/cli add agent-identity-validator

# Or copy knowledge-only for custom UI
npx @governed/cli add mcp-poisoning --knowledge-only
```
Components are copied into your project. Customize them. Own them completely.

### 3. 📦 NPM Packages (Knowledge only)
Install knowledge packages for programmatic use:
```bash
# For analysis tools, reports, or non-React apps
npm install @governed/threats
npm install @governed/frameworks
npm install @governed/vulnerabilities
```

```typescript
// Use in your code
import { mcpPoisoning } from '@governed/threats';
import { frameworkCoverage } from '@governed/frameworks';

// Generate reports, build dashboards, create slides
console.log(`MCP Success Rate: ${mcpPoisoning.threat.successRate}`);
```

## Quick Start

### Option A: Explore the Website
Visit [living-governance.com](https://living-governance.com) - no installation needed

### Option B: Run Locally
```bash
git clone https://github.com/living-governance/governed
cd living-governance
npm install
npm run dev

# Visit http://localhost:3000
```

### Option C: Add to Your Project
```bash
# Install CLI globally
npm install -g @governed/cli

# In your project
npx @governed/cli init
npx @governed/cli add framework-coverage
```

## The Vision

We're building the industry's first **living documentation system** where:

- 🔄 **Knowledge self-reports staleness** - Components show when they need updating
- 👥 **Community maintains freshness** - Contributors update what they know
- 🏢 **Enterprises fork and customize** - Run in your environment with your data
- 🤖 **AI agents can consume and update** - Structured for programmatic access

## How It Works

### 1. Knowledge Lives in Code

Instead of PDFs about AI governance, we ship TypeScript:

```typescript
// Not a PDF saying "MCP attacks are bad"
// But executable knowledge:
export const mcpPoisoningKnowledge = {
  threat: {
    severity: 'CRITICAL',
    successRate: 0.86,
    mitigation: 'Deploy MCP-Scanner immediately'
  },
  
  // Knowledge includes its own update instructions
  updateInstructions: 'Run test suite against top 100 MCP servers monthly'
}
```

### 2. Components Show Their Confidence

Components visually indicate their freshness:
- 🟢 **Fresh** - Recently evaluated, high confidence
- 🟡 **Aging** - Consider reviewing
- 🔴 **Stale** - Update required

### 3. Community Evolution

When OWASP adds new AI guidance:
1. Contributor notices via dashboard staleness indicator
2. Updates the knowledge following embedded instructions
3. Submits PR with timeline entry
4. Everyone benefits from fresh knowledge

## Project Structure

```
living-governance/
├── registry/
│   ├── components/         # Full components (UI + Knowledge)
│   ├── knowledge/          # Executable governance knowledge
│   └── archives/           # Historical snapshots
├── packages/               # NPM packages
│   ├── threats/           # @governed/threats
│   ├── frameworks/        # @governed/frameworks
│   └── vulnerabilities/   # @governed/vulnerabilities
├── app/                   # Next.js app (living-governance.com)
└── lib/                   # Shared utilities
```

## Use Cases

### For Security Teams
- Visit living-governance.com for daily threat briefings
- Copy components for internal dashboards
- Install knowledge packages for custom analysis

### For Developers
- Add governance UI components to your apps
- Import knowledge for generating reports
- Build custom visualizations on top of our data

### For Enterprises
- Fork entire repository for full customization
- Deploy internally with your data
- Maintain private knowledge extensions

### For AI Tool Builders
- Import knowledge packages for context
- Use structured data for AI training
- Build on top of living knowledge

## Contributing

We welcome contributions! Each knowledge module should include:

```typescript
export const yourKnowledge = {
  // Your actual knowledge/data
  data: { ... },
  
  // When and how it was evaluated
  evaluation: {
    date: new Date(),
    by: '@your-github',
    validDays: 90,  // How long until review needed
    methodology: 'How you evaluated this'
  },
  
  // How to update it
  updateInstructions: 'Clear steps for future updates',
  
  // Track changes
  timeline: [
    { date: new Date(), by: '@your-github', change: 'Initial version' }
  ]
}
```

## The Bigger Picture

Living Governance is part of a larger vision where:
1. **Today**: Governance knowledge that self-reports staleness
2. **Next**: AI agents help maintain freshness
3. **Future**: Autonomous knowledge that updates itself
4. **Ultimate**: Cognitive protocols for all expertise

## Why This Matters

> "I'm developing my own SIEM and would appreciate if I could just npm install your alerts" - Real user

> "We need governance data for our quarterly board deck" - CISO

> "Can I add this to our existing React app?" - Developer

We built Living Governance to serve all these needs through executable, living knowledge.

## Community

- 🌐 Website: [living-governance.com](https://living-governance.com)
- 📦 NPM: [@governed](https://www.npmjs.com/org/governed)
- 💬 Discussions: [GitHub Discussions](https://github.com/living-governance/governed/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/living-governance/governed/issues)

## License

MIT - see [LICENSE](LICENSE)

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - Component philosophy
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- The governance community - Domain expertise

---

*"In the AI age, expertise that isn't executable is archaeology. Let's make governance knowledge live."*