"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const MCP_TOOLS = [
  { name: "get_confidence_status", description: "Check freshness and confidence of all knowledge" },
  { name: "get_framework_scores", description: "Get AI security framework coverage scores (0-100)" },
  { name: "get_threat_catalog", description: "Get agentic AI threats, optionally filtered by category" },
  { name: "get_mitigations", description: "Get threat-to-mitigation mappings with maturity levels" },
  { name: "get_coverage_gaps", description: "Get gaps in framework coverage of agentic AI threats" },
  { name: "get_scope", description: "Get what this knowledge covers and does not cover" },
]

const CONFIG_SNIPPET = `{
  "mcpServers": {
    "living-governance": {
      "url": "https://living-governance.com/api/mcp"
    }
  }
}`

const EXAMPLE_RESPONSE = `{
  "evaluatedAt": "2026-04-05",
  "frameworks": [
    { "name": "OWASP GenAI Security Project", "score": 100, "status": "active" },
    { "name": "MITRE ATLAS", "score": 90, "status": "active" },
    { "name": "ISO/IEC 42001:2023", "score": 35, "status": "applicable" }
  ]
}`

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="shrink-0 rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}

interface CopMcpIntegrationProps {
  onChatToggle?: () => void
}

export function CopMcpIntegration({ onChatToggle }: CopMcpIntegrationProps) {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Available tools */}
        <div>
          <h3 className="text-sm font-medium mb-3">Available tools</h3>
          <div className="space-y-2">
            {MCP_TOOLS.map((tool) => (
              <div key={tool.name} className="flex items-start gap-2">
                <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[11px] font-mono mt-0.5">
                  {tool.name}
                </code>
                <span className="text-xs text-muted-foreground">{tool.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Connect */}
        <div>
          <h3 className="text-sm font-medium mb-3">Connect</h3>
          <div className="relative rounded-lg border bg-muted/50 p-3">
            <div className="absolute top-2 right-2">
              <CopyButton text={CONFIG_SNIPPET} />
            </div>
            <pre className="text-xs font-mono overflow-x-auto pr-8">{CONFIG_SNIPPET}</pre>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Works with Claude Desktop, Cursor, Windsurf, and any MCP client.
          </p>
        </div>
      </div>

      {/* Usage example */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-3">Example: get_framework_scores</h3>
        <div className="grid gap-3 lg:grid-cols-2">
          <div>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Request</span>
            <div className="mt-1 rounded-lg border bg-muted/50 px-3 py-2">
              <code className="text-xs font-mono">get_framework_scores</code>
              <span className="text-xs text-muted-foreground ml-2">(no parameters)</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Response (truncated)</span>
            <div className="mt-1 rounded-lg border bg-muted/50 p-3">
              <pre className="text-[11px] font-mono overflow-x-auto">{EXAMPLE_RESPONSE}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Try it now */}
      {onChatToggle && (
        <div className="mt-5 text-center">
          <button
            onClick={onChatToggle}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Try it now &rarr;
          </button>
        </div>
      )}
    </div>
  )
}
