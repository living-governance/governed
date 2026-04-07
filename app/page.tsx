"use client"

import { useEffect, useState, useCallback } from "react"
import { LayoutGrid, Box, MessageSquare, User } from "lucide-react"
import { FrameworkCoverage } from "../registry/components/framework-coverage"
import { Threats } from "../registry/components/threats"
import { ActivityBar, type ViewType } from "@/components/layout/activity-bar"
import { StatusStrip } from "@/components/layout/status-strip"
import { AlertBanner } from "@/components/layout/alert-banner"
import { SectionNav, type NavSection } from "@/components/layout/section-nav"
import { CopSection } from "@/components/layout/cop-section"
import { ChatPanel } from "@/components/layout/chat-panel"
import { Badge } from "@/components/ui/badge"
import { getFrameworkCoverage, getThreats } from "@/lib/knowledge"
import { cn } from "@/lib/utils"

const COP_SECTIONS: NavSection[] = [
  { id: "status", label: "Status" },
  { id: "framework-coverage", label: "Coverage" },
  { id: "threats", label: "Threats" },
  { id: "coverage-gaps", label: "Gaps" },
  { id: "evaluation-history", label: "History" },
  { id: "cloud", label: "Cloud" },
  { id: "mcp", label: "MCP" },
]

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// ─── Components view ────────────────────────────────────────────────────────

function ComponentsView() {
  const components = [
    {
      name: "Framework Coverage",
      description: "AI security framework analysis with scoring methodology",
      command: "npx @governed/cli add framework-coverage",
    },
    {
      name: "Threats",
      description: "Agentic AI threat catalog with cross-taxonomy mapping",
      command: "npx @governed/cli add threats",
    },
  ]

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-1">Components</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Copy into your project. Self-contained, no dependencies on each other.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {components.map((c) => (
          <div key={c.name} className="rounded-lg border p-4">
            <h3 className="font-medium">{c.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
            <code className="mt-3 block rounded bg-muted px-3 py-2 text-xs font-mono">
              {c.command}
            </code>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Dashboard (COP) view ───────────────────────────────────────────────────

function DashboardView() {
  const [activeSection, setActiveSection] = useState("status")
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const handleSectionChange = useCallback((id: string) => {
    setActiveSection(id)
  }, [])

  const fc = getFrameworkCoverage()
  const threats = getThreats()

  const fcDate = formatDate(new Date(fc.evaluation.date))
  const tDate = formatDate(new Date(threats.evaluation.date))

  return (
    <>
      {!bannerDismissed && (
        <AlertBanner onDismiss={() => setBannerDismissed(true)} />
      )}

      <div id="status" className="px-4 pt-4 lg:px-6">
        <StatusStrip />
      </div>

      {/* Identity line */}
      <div className="px-4 py-4 lg:px-6">
        <h1 className="text-xl font-semibold tracking-tight">Living Governance</h1>
        <p className="text-sm text-muted-foreground">
          Executable AI governance infrastructure
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary">Human interface</Badge>
          <Badge variant="secondary">MCP server</Badge>
          <Badge variant="secondary">Copy-and-own</Badge>
        </div>
      </div>

      <SectionNav
        sections={COP_SECTIONS}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* COP sections */}
      <div className="space-y-6 px-4 py-6 lg:px-6">
        <CopSection
          id="framework-coverage"
          title="Framework Coverage"
          credibilityLine={`7 frameworks \u00b7 Evaluated by ${fc.evaluation.by} \u00b7 ${fcDate}`}
          sourcesAndMethodology={fc.evaluation.methodology}
        >
          <FrameworkCoverage />
        </CopSection>

        <CopSection
          id="threats"
          title="Threat Landscape"
          credibilityLine={`${threats.threats.length} threats \u00b7 Evaluated by ${threats.evaluation.by} \u00b7 ${tDate}`}
          sourcesAndMethodology={threats.evaluation.methodology}
        >
          <Threats />
        </CopSection>

        <div className="grid gap-6 lg:grid-cols-2">
          <CopSection
            id="coverage-gaps"
            title="Coverage Gaps"
            credibilityLine="Coming in Layer 1"
            variant="half"
          >
            <p className="text-sm text-muted-foreground py-8 text-center">
              Coverage gap analysis coming soon
            </p>
          </CopSection>

          <CopSection
            id="evaluation-history"
            title="Evaluation History"
            credibilityLine="Coming in Layer 1"
            variant="half"
          >
            <p className="text-sm text-muted-foreground py-8 text-center">
              Re-evaluation timeline coming soon
            </p>
          </CopSection>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <CopSection
            id="cloud"
            title="Cloud Guidance"
            credibilityLine="Coming in Layer 1"
            variant="half"
          >
            <p className="text-sm text-muted-foreground py-8 text-center">
              AWS / GCP / Azure guidance coming soon
            </p>
          </CopSection>

          <CopSection
            id="mcp"
            title="MCP Integration"
            credibilityLine="6 tools available"
            variant="half"
          >
            <p className="text-sm text-muted-foreground py-8 text-center">
              MCP integration details coming soon
            </p>
          </CopSection>
        </div>
      </div>
    </>
  )
}

// ─── Mobile bottom tab bar ──────────────────────────────────────────────────

function MobileTabBar({
  activeView,
  onViewChange,
  onChatToggle,
}: {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
  onChatToggle: () => void
}) {
  const tabs = [
    { id: "dashboard" as const, icon: LayoutGrid, label: "Dashboard" },
    { id: "components" as const, icon: Box, label: "Components" },
    { id: "chat" as const, icon: MessageSquare, label: "Chat" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex border-t bg-background lg:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            if (tab.id === "chat") onChatToggle()
            else if (tab.id === "dashboard" || tab.id === "components") onViewChange(tab.id)
          }}
          className={cn(
            "flex flex-1 flex-col items-center gap-1 py-2",
            "text-xs transition-colors",
            (tab.id === activeView)
              ? "text-foreground"
              : "text-muted-foreground"
          )}
          style={{ minHeight: 44 }}
        >
          <tab.icon className="h-5 w-5" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeView, setActiveView] = useState<ViewType>("dashboard")
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "light") setIsDark(false)
    else setIsDark(true)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Activity bar — desktop only */}
      <div className="hidden lg:block">
        <ActivityBar
          activeView={activeView}
          onViewChange={setActiveView}
          onChatToggle={() => setChatOpen(!chatOpen)}
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
        {activeView === "dashboard" ? <DashboardView /> : <ComponentsView />}
      </main>

      {/* Chat panel — reflow, not overlay (desktop) */}
      <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Mobile bottom tab bar */}
      <MobileTabBar
        activeView={activeView}
        onViewChange={setActiveView}
        onChatToggle={() => setChatOpen(!chatOpen)}
      />
    </div>
  )
}
