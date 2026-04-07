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
import { CopFrameworkCoverage } from "@/components/layout/cop-framework-coverage"
import { CopThreats } from "@/components/layout/cop-threats"
import { CopIncidentFeed } from "@/components/layout/cop-incident-feed"
import { CopCoverageGaps } from "@/components/layout/cop-coverage-gaps"
import { CopEvaluationHistory } from "@/components/layout/cop-evaluation-history"
import { CopCloudGuidance } from "@/components/layout/cop-cloud-guidance"
import { CopMcpIntegration } from "@/components/layout/cop-mcp-integration"
import { ChatPanel } from "@/components/layout/chat-panel"
import { Badge } from "@/components/ui/badge"
import { getFrameworkCoverage, getThreats } from "@/lib/knowledge"
import { cn } from "@/lib/utils"

const COP_SECTIONS: NavSection[] = [
  { id: "status", label: "Status" },
  { id: "incidents", label: "Incidents" },
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
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-1">Components</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Copy into your project. Self-contained, no dependencies on each other.
        This is what you get with <code className="text-xs bg-muted px-1 rounded">npx @governed/cli add</code>.
      </p>
      <div className="space-y-8">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium">Framework Coverage</h3>
            <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
              npx @governed/cli add framework-coverage
            </code>
          </div>
          <FrameworkCoverage />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium">Threats</h3>
            <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
              npx @governed/cli add threats
            </code>
          </div>
          <Threats />
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard (COP) view ───────────────────────────────────────────────────

function DashboardView({ onChatToggle }: { onChatToggle: () => void }) {
  const [activeSection, setActiveSection] = useState("status")
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const handleSectionChange = useCallback((id: string) => {
    setActiveSection(id)
  }, [])

  const fc = getFrameworkCoverage()
  const threats = getThreats()

  const fcDate = formatDate(new Date(fc.evaluation.date))
  const tDate = formatDate(new Date(threats.evaluation.date))

  const totalGaps = threats.incidents.reduce((sum, inc) => sum + inc.gaps.length, 0)
  const frameworksWithGaps = new Set(threats.incidents.flatMap(inc => inc.gaps.map(g => g.frameworkId))).size

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
          id="incidents"
          title="Incident Feed"
          credibilityLine={`${threats.incidents.length} incidents \u00b7 ${threats.threats.length} linked threats \u00b7 Evaluated by ${threats.evaluation.by} \u00b7 ${tDate}`}
          sourcesAndMethodology={threats.evaluation.methodology}
        >
          <CopIncidentFeed />
        </CopSection>

        <CopSection
          id="framework-coverage"
          title="Framework Coverage"
          credibilityLine={`7 frameworks \u00b7 Evaluated by ${fc.evaluation.by} \u00b7 ${fcDate}`}
          sourcesAndMethodology={fc.evaluation.methodology}
        >
          <CopFrameworkCoverage />
        </CopSection>

        <CopSection
          id="threats"
          title="Threat Landscape"
          credibilityLine={`${threats.threats.length} threats \u00b7 Evaluated by ${threats.evaluation.by} \u00b7 ${tDate}`}
          sourcesAndMethodology={threats.evaluation.methodology}
        >
          <CopThreats />
        </CopSection>

        <CopSection
          id="coverage-gaps"
          title="Coverage Gaps"
          credibilityLine={`${totalGaps} gaps across ${frameworksWithGaps} frameworks \u00b7 Derived from ${threats.incidents.length} incidents`}
          sourcesAndMethodology="Gaps are identified by mapping each incident's attack vector against each framework's coverage. A 'none' rating means the framework has no applicable guidance for that incident's attack pattern."
        >
          <CopCoverageGaps />
        </CopSection>

        <CopSection
          id="evaluation-history"
          title="Evaluation History"
          credibilityLine="ADR-014 autonomous re-evaluation"
          sourcesAndMethodology="Evaluations are triggered by knowledge decay (90-day cycle), source changes detected during monitoring, or manual trigger. Agent evaluations check all sources and compute score deltas. Human verification confirms or disputes agent findings."
        >
          <CopEvaluationHistory />
        </CopSection>

        <CopSection
          id="cloud"
          title="Cloud Guidance"
          credibilityLine={`AWS implementation \u00b7 ${fc.cloudImplementation.aws.frameworkMappings.length} framework mappings`}
          sourcesAndMethodology="Mappings are based on official AWS documentation and service capabilities. Quick-deploy commands use AWS CLI and are verified against current API versions. GCP and Azure mappings are planned."
        >
          <CopCloudGuidance />
        </CopSection>

        <CopSection
          id="mcp"
          title="MCP Integration"
          credibilityLine={`6 tools \u00b7 MCP protocol \u00b7 Compatible with Claude Desktop, Cursor, Windsurf`}
        >
          <CopMcpIntegration onChatToggle={onChatToggle} />
        </CopSection>
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
        {activeView === "dashboard" ? (
          <DashboardView onChatToggle={() => setChatOpen(!chatOpen)} />
        ) : (
          <ComponentsView />
        )}
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
