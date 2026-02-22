// registry/components/threats.tsx
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
import {
  threatsKnowledge,
  getConfidenceStatus,
  computeCoverageSummary,
  getIncidentsForThreat,
  getMitigationsForThreat,
  getAllGaps,
  getEvolutionTimeline,
} from "../knowledge/threats"
import type {
  Threat,
  Incident,
  MitigationReference,
  ThreatEvolutionEvent,
  SeverityLevel,
} from "../knowledge/threats"
import {
  AlertCircle, Clock, ExternalLink, Shield, ShieldAlert, ShieldX, ShieldCheck,
  Info, TrendingUp, Home, Link, Target, Wrench, Download, Check, Copy,
  Calendar, ArrowRight, ChevronDown, ChevronUp, Linkedin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

type ViewType = 'incidents' | 'threats' | 'coverage' | 'mitigations' | 'evolution' | 'sources' | 'methodology' | 'download'

interface ThreatsProps {
  initialView?: ViewType
}

// Helpers
const sevColor = (s: SeverityLevel) => ({
  critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
}[s])

const covColor = (c: 'direct' | 'indirect' | 'none') => ({
  direct: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  indirect: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  none: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}[c])

const CovIcon = ({ coverage }: { coverage: 'direct' | 'indirect' | 'none' }) => {
  const Icon = coverage === 'direct' ? ShieldCheck : coverage === 'indirect' ? Shield : ShieldX
  return <Icon className="h-3 w-3" />
}

const fmt = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const typeLabel = (t: Incident['type']) => ({
  'disclosed-attack': 'Attack',
  'security-research': 'Research',
  'proof-of-concept': 'PoC',
  'case-study': 'Case Study',
}[t])

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function Threats({ initialView = 'incidents' }: ThreatsProps = {}) {
  const k = threatsKnowledge
  const conf = getConfidenceStatus(k)
  const covSummary = computeCoverageSummary(k)
  const gaps = getAllGaps(k)

  const [view, setView] = useState<ViewType>(initialView)
  const [expInc, setExpInc] = useState<string | null>(null)
  const [expThreat, setExpThreat] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)

  const sorted = [...k.incidents].sort((a, b) => b.date.getTime() - a.date.getTime())

  const navThreat = (id: string) => { setExpThreat(id); setView('threats') }
  const navIncident = (id: string) => { setExpInc(id); setView('incidents') }

  // Icon bar
  const IB = ({ icon: Icon, v, label, active }: { icon: any; v: ViewType; label: string; active: boolean }) => (
    <TooltipProvider><Tooltip><TooltipTrigger asChild>
      <Button variant={active ? "secondary" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setView(v)}>
        <Icon className="h-4 w-4" />
      </Button>
    </TooltipTrigger><TooltipContent><p>{label}</p></TooltipContent></Tooltip></TooltipProvider>
  )

  // Share text for social sharing
  const shareText = `🔒 ${gaps.length} critical gaps in AI security framework coverage\n\n${k.threats.length} agentic AI threats tracked, ${k.incidents.length} real-world incidents documented.\nOnly ${covSummary.direct} threats have direct framework coverage.\n\n`

  const IconBar = () => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <IB icon={Calendar} v="incidents" label="Incidents" active={view === 'incidents'} />
        <IB icon={Target} v="threats" label="Threats" active={view === 'threats'} />
        <IB icon={ShieldAlert} v="coverage" label="Gaps" active={view === 'coverage'} />
        <IB icon={Wrench} v="mitigations" label="Mitigations" active={view === 'mitigations'} />
        <div className="w-px h-6 bg-border mx-1" />
        <IB icon={TrendingUp} v="evolution" label="Evolution" active={view === 'evolution'} />
        <IB icon={Link} v="sources" label="Sources" active={view === 'sources'} />
        <IB icon={Info} v="methodology" label="Methodology" active={view === 'methodology'} />
        <IB icon={Download} v="download" label="Download" active={view === 'download'} />
      </div>
      {/* Inline share actions */}
      <div className="flex items-center gap-1 border-l pl-2 ml-2">
        <TooltipProvider><Tooltip><TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
            const text = shareText + (typeof window !== 'undefined' ? window.location.origin : '')
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
            const text = encodeURIComponent(shareText + (typeof window !== 'undefined' ? window.location.origin : ''))
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

  const viewTitle = {
    incidents: 'Incident Timeline', threats: 'Threat Catalog', coverage: 'Coverage & Gaps',
    mitigations: 'Mitigations', evolution: 'Threat Evolution', sources: 'Sources',
    methodology: 'Methodology', download: 'Download',
  }[view]

  // ===========================================================================
  // INCIDENTS VIEW
  // ===========================================================================
  const IncidentsView = () => (
    <div className="space-y-3">
      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs">
        <span><strong>{k.incidents.length}</strong> incidents</span>
        <span><strong>{k.threats.length}</strong> threats</span>
        <span className="text-red-600 dark:text-red-400"><strong>{gaps.length}</strong> coverage gaps</span>
      </div>

      {sorted.map(inc => {
        const expanded = expInc === inc.id
        const d = inc.coverageMappings.reduce((n, m) => n + (m.coverage === 'direct' ? 1 : 0), 0)
        const i = inc.coverageMappings.reduce((n, m) => n + (m.coverage === 'indirect' ? 1 : 0), 0)
        const no = inc.coverageMappings.reduce((n, m) => n + (m.coverage === 'none' ? 1 : 0), 0)

        return (
          <div
            key={inc.id}
            className={cn("rounded-lg border p-3 transition-all cursor-pointer hover:bg-muted/30", expanded && "ring-1 ring-primary/20")}
            onClick={() => setExpInc(expanded ? null : inc.id)}
          >
            {/* Collapsed row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-xs font-mono text-muted-foreground shrink-0">{inc.id}</span>
                <Badge variant="outline" className="text-[10px] shrink-0">{typeLabel(inc.type)}</Badge>
                <span className="text-sm font-medium truncate">{inc.title}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">{fmt(inc.date)}</span>
                {d > 0 && <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-0.5"><ShieldCheck className="h-3 w-3"/>{d}</span>}
                {i > 0 && <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-0.5"><Shield className="h-3 w-3"/>{i}</span>}
                {no > 0 && <span className="text-xs text-red-600 dark:text-red-400 flex items-center gap-0.5"><ShieldX className="h-3 w-3"/>{no}</span>}
                {expanded ? <ChevronUp className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />}
              </div>
            </div>

            {/* Threat badges (always visible) */}
            <div className="flex items-center gap-1 mt-1.5">
              {inc.threatIds.map(tid => {
                const t = k.threats.find(x => x.id === tid)
                return t ? (
                  <Badge key={tid} className={cn("text-[10px] cursor-pointer hover:opacity-80", sevColor(t.severity))}
                    onClick={(e) => { e.stopPropagation(); navThreat(tid) }}>
                    {tid}
                  </Badge>
                ) : null
              })}
            </div>

            {/* Expanded detail */}
            {expanded && (
              <div className="mt-3 pt-3 border-t space-y-3 text-sm">
                <p className="text-muted-foreground text-xs">{inc.summary}</p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-medium">Attack Vector</span>
                    <p className="text-muted-foreground mt-0.5">{inc.attackVector}</p>
                  </div>
                  <div>
                    <span className="font-medium">Impact</span>
                    <p className="text-muted-foreground mt-0.5">{inc.impact}</p>
                  </div>
                </div>

                {/* Coverage — compact table */}
                <div className="text-xs">
                  <span className="font-medium">Framework Coverage</span>
                  <div className="mt-1 space-y-1">
                    {inc.coverageMappings.map(m => (
                      <div key={m.frameworkId} className="flex items-center gap-2">
                        <Badge className={cn("text-[10px] w-16 justify-center", covColor(m.coverage))}>
                          {m.coverage}
                        </Badge>
                        <span className="font-medium">{m.frameworkName}</span>
                        {m.specificGuidance && <span className="text-muted-foreground">({m.specificGuidance})</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gaps */}
                {inc.gaps.length > 0 && (
                  <div className="text-xs">
                    <span className="font-medium text-red-600 dark:text-red-400">Gaps</span>
                    <div className="mt-1 space-y-1">
                      {inc.gaps.map((g, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className="font-medium shrink-0">{g.frameworkName}:</span>
                          <span className="text-muted-foreground">{g.gapDescription}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sources + confidence — single line */}
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t">
                  <div className="flex items-center gap-2">
                    {inc.sources.map((s, j) => (
                      <a key={j} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="hover:text-primary hover:underline flex items-center gap-0.5"
                        onClick={e => e.stopPropagation()}>
                        <ExternalLink className="h-2.5 w-2.5" />{s.organization}
                      </a>
                    ))}
                  </div>
                  <span>Confidence: {inc.confidence.level}</span>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Insights — compact */}
      <div className="pt-3 border-t text-xs text-muted-foreground space-y-1">
        {k.insights.map((ins, i) => <p key={i}>• {ins}</p>)}
      </div>
    </div>
  )

  // ===========================================================================
  // THREATS VIEW
  // ===========================================================================
  const ThreatsView = () => (
    <div className="space-y-2">
      {k.threats.map(t => {
        const expanded = expThreat === t.id
        const incs = getIncidentsForThreat(k, t.id)
        const mits = getMitigationsForThreat(k, t.id)

        return (
          <div key={t.id}
            className={cn("rounded-lg border p-3 transition-all cursor-pointer hover:bg-muted/30", expanded && "ring-1 ring-primary/20")}
            onClick={() => setExpThreat(expanded ? null : t.id)}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-xs font-mono text-muted-foreground">{t.id}</span>
                <Badge className={cn("text-[10px]", sevColor(t.severity))}>{t.severity}</Badge>
                <span className="text-sm font-medium truncate">{t.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">{incs.length} inc</span>
                {expanded ? <ChevronUp className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />}
              </div>
            </div>

            {expanded && (
              <div className="mt-3 pt-3 border-t space-y-3 text-xs">
                <p className="text-muted-foreground">{t.description}</p>

                {/* Rosetta Stone */}
                <div>
                  <span className="font-medium">Cross-Reference</span>
                  <div className="mt-1 space-y-1">
                    {t.sourceMappings.map((m, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] w-20 justify-center">{m.relationship}</Badge>
                        <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer"
                          className="text-primary hover:underline" onClick={e => e.stopPropagation()}>
                          {m.taxonomy}: {m.sourceId}
                        </a>
                        <span className="text-muted-foreground">— {m.sourceName}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disagreements */}
                {t.taxonomyDisagreements && t.taxonomyDisagreements.length > 0 && (
                  <div>
                    <span className="font-medium text-orange-600 dark:text-orange-400">Source Disagreements</span>
                    {t.taxonomyDisagreements.map((d, i) => <p key={i} className="text-muted-foreground mt-0.5">• {d}</p>)}
                  </div>
                )}

                {/* Linked incidents */}
                {incs.length > 0 && (
                  <div>
                    <span className="font-medium">Incidents</span>
                    <div className="mt-1 space-y-0.5">
                      {incs.map(inc => (
                        <div key={inc.id} className="flex items-center gap-2 cursor-pointer hover:text-primary"
                          onClick={e => { e.stopPropagation(); navIncident(inc.id) }}>
                          <ArrowRight className="h-3 w-3" />
                          <span className="font-mono">{inc.id}</span>
                          <span className="truncate">{inc.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mitigations */}
                {mits.length > 0 && (
                  <div>
                    <span className="font-medium">Mitigations</span>
                    <div className="mt-1 space-y-0.5">
                      {mits.map(m => (
                        <div key={m.id} className="flex items-center gap-2 cursor-pointer hover:text-primary"
                          onClick={e => { e.stopPropagation(); setView('mitigations') }}>
                          <Wrench className="h-3 w-3" /><span className="font-mono">{m.id}</span><span>{m.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  // ===========================================================================
  // COVERAGE VIEW
  // ===========================================================================
  const CoverageView = () => (
    <div className="space-y-3">
      {covSummary.gapsByFramework.sort((a, b) => b.noneCount - a.noneCount).map(fw => {
        const total = fw.directCount + fw.indirectCount + fw.noneCount
        return (
          <div key={fw.frameworkId} className="rounded-lg border p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium">{fw.frameworkName}</span>
              <span className="text-[10px] text-muted-foreground">{total} incidents</span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-muted">
              {fw.directCount > 0 && <div className="bg-green-500" style={{ width: `${(fw.directCount / total) * 100}%` }} />}
              {fw.indirectCount > 0 && <div className="bg-yellow-500" style={{ width: `${(fw.indirectCount / total) * 100}%` }} />}
              {fw.noneCount > 0 && <div className="bg-red-500" style={{ width: `${(fw.noneCount / total) * 100}%` }} />}
            </div>
            <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-0.5"><ShieldCheck className="h-2.5 w-2.5 text-green-500"/>{fw.directCount}</span>
              <span className="flex items-center gap-0.5"><Shield className="h-2.5 w-2.5 text-yellow-500"/>{fw.indirectCount}</span>
              <span className="flex items-center gap-0.5"><ShieldX className="h-2.5 w-2.5 text-red-500"/>{fw.noneCount}</span>
            </div>
          </div>
        )
      })}

      {gaps.length > 0 && (
        <div className="pt-2">
          <span className="text-xs font-medium text-red-600 dark:text-red-400">Gaps ({gaps.length})</span>
          <div className="mt-1 space-y-1">
            {gaps.map((g, i) => (
              <div key={i} className="rounded-lg bg-red-50 dark:bg-red-900/10 p-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{g.frameworkName}</span>
                  <span className="text-primary cursor-pointer hover:underline text-[10px]"
                    onClick={() => navIncident(g.incidentId)}>{g.incidentId}</span>
                </div>
                <p className="text-muted-foreground mt-0.5">{g.gapDescription}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  // ===========================================================================
  // MITIGATIONS VIEW
  // ===========================================================================
  const MitigationsView = () => (
    <div className="space-y-2">
      {k.mitigations.map(m => {
        const threats = m.threatIds.map(id => k.threats.find(t => t.id === id)).filter(Boolean) as Threat[]
        return (
          <div key={m.id} className="rounded-lg border p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-muted-foreground">{m.id}</span>
              {threats.map(t => (
                <Badge key={t.id} className={cn("text-[10px] cursor-pointer hover:opacity-80", sevColor(t.severity))}
                  onClick={() => navThreat(t.id)}>{t.id}</Badge>
              ))}
            </div>
            <span className="text-sm font-medium">{m.name}</span>
            <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>
            <a href={m.source.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-primary hover:underline mt-1.5">
              <ExternalLink className="h-2.5 w-2.5" />
              {m.source.organization} — {m.source.document}
            </a>
            {m.platformContext && m.platformContext.map((ctx, i) => (
              <div key={i} className="mt-1.5 p-1.5 rounded bg-muted/50 text-[10px]">
                <Badge variant="outline" className="text-[10px] uppercase mr-1">{ctx.platform}</Badge>
                {ctx.services?.join(', ')}
                {ctx.implementationNote && <p className="text-muted-foreground mt-0.5">{ctx.implementationNote}</p>}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )

  // ===========================================================================
  // EVOLUTION VIEW
  // ===========================================================================
  const EvolutionView = () => {
    const timeline = getEvolutionTimeline(k)
    return (
      <div className="space-y-2">
        {timeline.map((ev, i) => (
          <div key={i} className="flex gap-3 rounded-lg border p-3">
            <div className="flex flex-col items-center shrink-0">
              <div className={cn("w-2 h-2 rounded-full mt-1",
                ev.significance === 'high' ? 'bg-red-500' : ev.significance === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
              )} />
              {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>{fmt(ev.date)}</span>
                <Badge variant="outline" className="text-[10px]">{ev.type.replace(/-/g, ' ')}</Badge>
              </div>
              <span className="text-sm font-medium">{ev.title}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{ev.description}</p>
              {ev.relatedThreatIds && ev.relatedThreatIds.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {ev.relatedThreatIds.map(tid => {
                    const t = k.threats.find(x => x.id === tid)
                    return t ? <Badge key={tid} className={cn("text-[10px] cursor-pointer", sevColor(t.severity))}
                      onClick={() => navThreat(tid)}>{tid}</Badge> : null
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ===========================================================================
  // SOURCES VIEW
  // ===========================================================================
  const SourcesView = () => (
    <div className="space-y-1">
      {k.sources.sort((a, b) => b.date.getTime() - a.date.getTime()).map((s, i) => (
        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-xs">
          <a href={s.url} target="_blank" rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1 truncate">
            <ExternalLink className="h-3 w-3 shrink-0" />{s.name}
          </a>
          <span className="text-muted-foreground shrink-0 ml-2">{fmt(s.date)}</span>
        </div>
      ))}
    </div>
  )

  // ===========================================================================
  // METHODOLOGY VIEW
  // ===========================================================================
  const MethodologyView = () => (
    <div className="space-y-4 text-xs">
      <div>
        <span className="font-medium text-sm">Methodology</span>
        <pre className="text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed mt-1">{k.evaluation.methodology}</pre>
      </div>
      <div>
        <span className="font-medium text-sm">Update Instructions</span>
        <pre className="text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed mt-1">{k.evaluation.updateInstructions}</pre>
      </div>
      <div>
        <span className="font-medium text-sm text-orange-600 dark:text-orange-400">Known Limitations</span>
        {k.dissent.knownLimitations.map((l, i) => <p key={i} className="text-muted-foreground mt-0.5">• {l}</p>)}
      </div>
      <div>
        <span className="font-medium text-sm">Deliberate Exclusions</span>
        {k.dissent.deliberateExclusions.map((e, i) => (
          <div key={i} className="mt-1"><span className="font-medium">{e.what}</span><p className="text-muted-foreground">{e.why}</p></div>
        ))}
      </div>
      <div>
        <span className="font-medium text-sm">Open Questions</span>
        {k.dissent.openQuestions.map((q, i) => <p key={i} className="text-muted-foreground mt-0.5">• {q}</p>)}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="font-medium">Applies To</span>
          {k.scope.appliesTo.map((s, i) => <p key={i} className="text-muted-foreground">• {s}</p>)}
        </div>
        <div>
          <span className="font-medium">Does Not Apply To</span>
          {k.scope.doesNotApplyTo.map((s, i) => <p key={i} className="text-muted-foreground">• {s}</p>)}
        </div>
      </div>
    </div>
  )

  // ===========================================================================
  // DOWNLOAD VIEW
  // ===========================================================================
  const DownloadView = () => (
    <div className="space-y-4 text-sm">
      <p className="font-medium">Get This Component</p>

      {/* CLI install */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Via CLI (recommended)</p>
        <div className="flex items-center gap-2 bg-muted/50 rounded px-3 py-2 font-mono">
          <code className="flex-1 text-xs">npx @governed/cli add threats</code>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => {
            navigator.clipboard.writeText('npx @governed/cli add threats')
          }}>
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* NPM install */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Via NPM (knowledge only)</p>
        <div className="flex items-center gap-2 bg-muted/50 rounded px-3 py-2 font-mono">
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
          <p>\u2022 {k.threats.length} agentic AI threats with cross-taxonomy mapping</p>
          <p>\u2022 {k.incidents.length} real-world incidents with timeline data</p>
          <p>\u2022 {k.mitigations.length} mitigation references with framework links</p>
          <p>\u2022 Coverage gap analysis across {Object.keys(k.frameworkCoverage).length}+ frameworks</p>
          <p>\u2022 React component with 8 views and icon bar navigation</p>
          <p>\u2022 Self-contained \u2014 no external API dependencies</p>
        </div>
      </div>

      {/* Use cases */}
      <div className="space-y-2 pt-2 border-t">
        <p className="text-xs font-medium">What you can do</p>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>\u2022 Drop into your security dashboard as a standalone widget</p>
          <p>\u2022 Import knowledge for threat modeling sessions</p>
          <p>\u2022 Cross-reference with your internal incident data</p>
          <p>\u2022 Fork and customize for your organization&apos;s threat landscape</p>
        </div>
      </div>
    </div>
  )

  // ===========================================================================
  // VIEW ROUTER
  // ===========================================================================
  const renderView = () => {
    switch (view) {
      case 'incidents': return <IncidentsView />
      case 'threats': return <ThreatsView />
      case 'coverage': return <CoverageView />
      case 'mitigations': return <MitigationsView />
      case 'evolution': return <EvolutionView />
      case 'sources': return <SourcesView />
      case 'methodology': return <MethodologyView />
      case 'download': return <DownloadView />
    }
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            {k.name}
          </CardTitle>
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
            <p className="text-xs">Evaluated {fmt(k.evaluation.date)} by {k.evaluation.by}</p>
          </TooltipContent></Tooltip></TooltipProvider>
        </div>
        <CardDescription className="text-xs">{viewTitle}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col overflow-hidden pt-0">
        <div className="flex-1 overflow-y-auto pr-1">
          {renderView()}
        </div>
        <div className="flex-shrink-0 pt-3 border-t mt-2">
          <IconBar />
        </div>
      </CardContent>
    </Card>
  )
}
