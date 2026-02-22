// registry/components/_TEMPLATE.tsx
// =============================================================================
// COMPONENT TEMPLATE
// Copy this file and rename to your component name (e.g., threats.tsx).
// Follows ADR-012 (sizing/tiling) and the self-contained component contract.
//
// Architecture:
//   - Fixed height: 600px (ADR-012)
//   - View switching via icon bar (no external routing)
//   - All views render within the same card envelope
//   - Self-contained: works standalone or in a dashboard grid
// =============================================================================
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// == Import your knowledge file ==
// import { templateKnowledge, getConfidenceStatus } from "../knowledge/your-component"
import {
  Clock, ExternalLink, Download, Share2, Link, Info,
  TrendingUp, Home, Check, Copy, Linkedin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

// == Define your views ==
// Domain views: your component's primary content views
// Meta views: sources, methodology (required minimum)
// Action views: download (required), share handled inline
type ViewType = 'main' | 'sources' | 'methodology' | 'download'

interface TemplateComponentProps {
  initialView?: ViewType
}

export function TemplateComponent({ initialView = 'main' }: TemplateComponentProps = {}) {
  // == Knowledge & State ==
  // const k = templateKnowledge
  // const conf = getConfidenceStatus(k)
  const [view, setView] = useState<ViewType>(initialView)
  const [showToast, setShowToast] = useState(false)

  // == Placeholder values — replace with knowledge-derived data ==
  const conf = { confidence: 0.8, daysUntilStale: 72, status: 'Fresh — recently verified' }
  const evalDate = new Date('2026-01-01')
  const evalBy = '@tsynode'

  // =========================================================================
  // ICON BAR — Navigation + Actions (pinned to bottom of every view)
  // =========================================================================
  const IB = ({ icon: Icon, v, label }: { icon: any; v: ViewType; label: string }) => (
    <TooltipProvider><Tooltip><TooltipTrigger asChild>
      <Button variant={view === v ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0"
        onClick={() => setView(v)}>
        <Icon className="h-4 w-4" />
      </Button>
    </TooltipTrigger><TooltipContent><p>{label}</p></TooltipContent></Tooltip></TooltipProvider>
  )

  const IconBar = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {/* Domain views */}
        <IB icon={Home} v="main" label="Home" />
        <div className="w-px h-6 bg-border mx-1" />
        {/* Meta views */}
        <IB icon={Link} v="sources" label="Sources" />
        <IB icon={Info} v="methodology" label="Methodology" />
        <IB icon={Download} v="download" label="Download" />
      </div>
      {/* Share actions — inline, not a view */}
      <div className="flex items-center gap-1 border-l pl-2 ml-2">
        <TooltipProvider><Tooltip><TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
            const text = `Your shareable insight here\n\n${typeof window !== 'undefined' ? window.location.origin : ''}`
            navigator.clipboard.writeText(text).then(() => {
              setShowToast(true)
              setTimeout(() => setShowToast(false), 3000)
              const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=600')
            })
          }}>
            <Linkedin className="h-4 w-4" />
          </Button>
        </TooltipTrigger><TooltipContent><p>Share on LinkedIn (copies text)</p></TooltipContent></Tooltip></TooltipProvider>

        <TooltipProvider><Tooltip><TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
            const text = encodeURIComponent(`Your shareable insight here\n\n${typeof window !== 'undefined' ? window.location.origin : ''}`)
            window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'width=600,height=400')
          }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </Button>
        </TooltipTrigger><TooltipContent><p>Share on X</p></TooltipContent></Tooltip></TooltipProvider>
      </div>
    </div>
  )

  // =========================================================================
  // VIEWS — Replace these with your actual content
  // =========================================================================

  const MainView = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Replace this with your component&apos;s primary content view.
      </p>
      <div className="p-4 rounded-lg bg-muted/50 text-center text-sm text-muted-foreground">
        Your data visualization, table, or content goes here.
      </div>
    </div>
  )

  const SourcesView = () => (
    <div className="space-y-3">
      <p className="font-medium text-sm">Sources</p>
      <p className="text-sm text-muted-foreground">
        List your primary and secondary sources here, grouped by organization.
        Include accessed dates and direct links.
      </p>
    </div>
  )

  const MethodologyView = () => (
    <div className="space-y-3">
      <p className="font-medium text-sm">Evaluation Methodology</p>
      <p className="text-sm text-muted-foreground">
        Describe how this component&apos;s data was evaluated. Include scoring criteria,
        review process, and update instructions.
      </p>
    </div>
  )

  const DownloadView = () => (
    <div className="space-y-4">
      <p className="font-medium text-sm">Get This Component</p>

      {/* CLI install */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Via CLI (recommended)</p>
        <div className="flex items-center gap-2 bg-muted/50 rounded px-3 py-2 font-mono text-sm">
          <code className="flex-1 text-xs">npx @governed/cli add your-component</code>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => {
            navigator.clipboard.writeText('npx @governed/cli add your-component')
          }}>
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* NPM install */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Via NPM (knowledge only)</p>
        <div className="flex items-center gap-2 bg-muted/50 rounded px-3 py-2 font-mono text-sm">
          <code className="flex-1 text-xs">npm install @governed/frameworks</code>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => {
            navigator.clipboard.writeText('npm install @governed/frameworks')
          }}>
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* What you get */}
      <div className="space-y-2 pt-2 border-t">
        <p className="text-xs font-medium">What&apos;s included</p>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• TypeScript knowledge file with full evaluation data</p>
          <p>• React component with all views and icon bar</p>
          <p>• Utility functions for confidence scoring</p>
          <p>• Self-contained — no external API dependencies</p>
        </div>
      </div>
    </div>
  )

  // =========================================================================
  // VIEW ROUTER
  // =========================================================================
  const renderView = () => {
    switch (view) {
      case 'main': return <MainView />
      case 'sources': return <SourcesView />
      case 'methodology': return <MethodologyView />
      case 'download': return <DownloadView />
    }
  }

  const viewTitle: Record<ViewType, string> = {
    main: 'Overview',
    sources: 'Sources',
    methodology: 'Methodology',
    download: 'Download',
  }

  // =========================================================================
  // RENDER — ADR-012 compliant: h-[600px], flex col, icon bar pinned
  // =========================================================================
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Your Component Name</CardTitle>
          <TooltipProvider><Tooltip><TooltipTrigger>
            <Badge variant="outline" className={cn("text-[10px]",
              conf.confidence >= 0.7 ? 'border-green-300 dark:border-green-700' :
              conf.confidence >= 0.5 ? 'border-yellow-300 dark:border-yellow-700' :
              'border-red-300 dark:border-red-700'
            )}>
              <Clock className="h-3 w-3 mr-1" />{conf.daysUntilStale}d
            </Badge>
          </TooltipTrigger><TooltipContent>
            <p>{conf.status}</p>
            <p className="text-xs">Evaluated {evalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} by {evalBy}</p>
          </TooltipContent></Tooltip></TooltipProvider>
        </div>
        <CardDescription className="text-xs">{viewTitle[view]}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col overflow-hidden pt-0">
        <div className="flex-1 overflow-y-auto pr-1">
          {renderView()}
        </div>
        <div className="flex-shrink-0 pt-3 border-t mt-2">
          <IconBar />
        </div>
      </CardContent>

      {/* Toast notification for share actions */}
      {showToast && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-3 py-2 rounded-md shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
          <Check className="h-4 w-4" />
          <span className="text-sm">Text copied! Paste in LinkedIn</span>
        </div>
      )}
    </Card>
  )
}
