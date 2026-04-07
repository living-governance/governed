"use client"

import { X, GripHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const MCP_TOOLS = [
  "get_threat_catalog",
  "get_framework_scores",
  "get_mitigations",
  "get_coverage_gaps",
  "get_confidence_status",
  "get_scope",
]

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

function DesktopPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-medium">Chat</span>
        <button
          onClick={onClose}
          className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <PanelContent />
      </div>

      {/* Disabled input */}
      <div className="border-t p-3">
        <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
          <span className="flex-1 text-sm text-muted-foreground">Ask a question...</span>
          <Badge variant="secondary" className="text-[10px]">soon</Badge>
        </div>
      </div>
    </div>
  )
}

function MobileSheet({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      {/* Bottom sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-[60dvh] flex-col rounded-t-xl border-t bg-background">
        {/* Drag handle */}
        <div className="flex justify-center py-2">
          <GripHorizontal className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 pb-3">
          <span className="text-sm font-medium">Chat</span>
          <button
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <PanelContent />
        </div>

        {/* Disabled input */}
        <div className="border-t p-3 pb-6">
          <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
            <span className="flex-1 text-sm text-muted-foreground">Ask a question...</span>
            <Badge variant="secondary" className="text-[10px]">soon</Badge>
          </div>
        </div>
      </div>
    </>
  )
}

function PanelContent() {
  return (
    <>
      {/* MCP tools card */}
      <div className="rounded-lg border p-3">
        <h3 className="text-sm font-medium">Ask this knowledge</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Same MCP tools as Claude Desktop
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {MCP_TOOLS.map((tool) => (
            <code
              key={tool}
              className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-mono"
            >
              {tool}
            </code>
          ))}
        </div>
      </div>

      {/* Coming soon */}
      <p className="text-center text-xs text-muted-foreground">
        Built-in chat coming soon
      </p>

      {/* Connect your AI card */}
      <div className="rounded-lg border p-3">
        <h3 className="text-sm font-medium">Connect your AI</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Add to Claude Desktop, Cursor, or any MCP client
        </p>
        <pre className="mt-3 rounded bg-muted px-3 py-2 text-xs font-mono overflow-x-auto">
{`{ "url": "living-governance.com/api/mcp" }`}
        </pre>
      </div>
    </>
  )
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Desktop: side panel with transition */}
      <div
        className={cn(
          "hidden lg:flex h-full flex-col border-l bg-background",
          "w-[300px] shrink-0"
        )}
      >
        <DesktopPanel onClose={onClose} />
      </div>

      {/* Mobile: bottom sheet */}
      <div className="lg:hidden">
        <MobileSheet onClose={onClose} />
      </div>
    </>
  )
}
