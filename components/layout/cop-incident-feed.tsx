"use client"

import { useState } from "react"
import {
  getThreats,
  getMitigationsForThreat,
  type Incident,
  type SeverityLevel,
  type MitigationReference,
} from "@/lib/knowledge"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  ChevronUp,
  Shield,
  ShieldCheck,
  ShieldX,
  ExternalLink,
  Wrench,
  Cloud,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sevStyle: Record<SeverityLevel, string> = {
  critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
}

const typeLabels: Record<string, string> = {
  "disclosed-attack": "Attack",
  "security-research": "Research",
  "proof-of-concept": "PoC",
  "case-study": "Case Study",
}

function CoverageIcon({ coverage }: { coverage: "direct" | "indirect" | "none" }) {
  if (coverage === "direct")
    return <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
  if (coverage === "indirect")
    return <Shield className="h-3.5 w-3.5 text-amber-500" />
  return <ShieldX className="h-3.5 w-3.5 text-red-500" />
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function IncidentCard({ incident }: { incident: Incident }) {
  const [expanded, setExpanded] = useState(false)
  const threatsData = getThreats()

  // Resolve linked threats
  const linkedThreats = incident.threatIds
    .map((id) => threatsData.threats.find((t) => t.id === id))
    .filter(Boolean)

  // Resolve mitigations through threats (deduplicated)
  const mitigationMap = new Map<string, MitigationReference>()
  for (const threatId of incident.threatIds) {
    for (const mit of getMitigationsForThreat(threatsData, threatId)) {
      mitigationMap.set(mit.id, mit)
    }
  }
  const mitigations = Array.from(mitigationMap.values())

  return (
    <div className={cn("rounded-lg border transition-colors", expanded && "ring-1 ring-primary/20")}>
      {/* Collapsed — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-3 px-4 py-3 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">{formatDate(incident.date)}</span>
            <Badge variant="secondary" className="text-[10px]">
              {typeLabels[incident.type] ?? incident.type}
            </Badge>
            <span className="text-sm font-medium">{incident.title}</span>
          </div>

          {/* Threat badges */}
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {linkedThreats.map((t) => (
              <Badge
                key={t!.id}
                variant="secondary"
                className={cn("text-[10px]", sevStyle[t!.severity])}
              >
                {t!.id} {t!.severity}
              </Badge>
            ))}

            {/* Quick framework coverage indicators */}
            <span className="ml-1 flex items-center gap-1">
              {incident.coverageMappings.map((cm) => (
                <span key={cm.frameworkId} title={`${cm.frameworkName}: ${cm.coverage}`}>
                  <CoverageIcon coverage={cm.coverage} />
                </span>
              ))}
            </span>
          </div>
        </div>

        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
        )}
      </button>

      {/* Expanded — full chain */}
      {expanded && (
        <div className="border-t px-4 py-3 space-y-4">
          {/* Summary */}
          <p className="text-sm text-muted-foreground">{incident.summary}</p>

          {/* Attack vector + Impact */}
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div>
              <h4 className="font-medium mb-1">Attack vector</h4>
              <p className="text-muted-foreground">{incident.attackVector}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Impact</h4>
              <p className="text-muted-foreground">{incident.impact}</p>
            </div>
          </div>

          {/* Framework coverage table */}
          <div>
            <h4 className="text-xs font-medium mb-2 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              Framework coverage
            </h4>
            <div className="rounded border overflow-hidden">
              <table className="w-full text-xs">
                <tbody>
                  {incident.coverageMappings.map((cm) => (
                    <tr key={cm.frameworkId} className="border-b last:border-0">
                      <td className="px-3 py-1.5 w-8">
                        <CoverageIcon coverage={cm.coverage} />
                      </td>
                      <td className="px-3 py-1.5">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-[10px] mr-2",
                            cm.coverage === "direct" && "bg-green-500/10 text-green-700 dark:text-green-400",
                            cm.coverage === "indirect" && "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                            cm.coverage === "none" && "bg-red-500/10 text-red-700 dark:text-red-400",
                          )}
                        >
                          {cm.coverage}
                        </Badge>
                        {cm.frameworkName}
                      </td>
                      <td className="px-3 py-1.5 text-muted-foreground">
                        {cm.specificGuidance ?? cm.scoringRationale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gaps */}
          {incident.gaps.length > 0 && (
            <div>
              <h4 className="text-xs font-medium mb-2 flex items-center gap-1.5">
                <ShieldX className="h-3.5 w-3.5 text-red-500" />
                Gaps exposed
              </h4>
              <div className="space-y-1.5">
                {incident.gaps.map((gap, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded border px-3 py-2 text-xs",
                      gap.contributionCandidate && "bg-amber-500/5 border-amber-500/20"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{gap.frameworkName}</span>
                      {gap.contributionCandidate && (
                        <Badge variant="secondary" className="text-[9px] bg-amber-500/10 text-amber-700 dark:text-amber-400">
                          contribution candidate
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-0.5">{gap.gapDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mitigations with AWS context */}
          {mitigations.length > 0 && (
            <div>
              <h4 className="text-xs font-medium mb-2 flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5" />
                Mitigations
              </h4>
              <div className="space-y-2">
                {mitigations.map((mit) => {
                  const awsContext = mit.platformContext?.find((p) => p.platform === "aws")
                  const genericContext = mit.platformContext?.find((p) => p.platform === "generic")

                  return (
                    <div key={mit.id} className="rounded border px-3 py-2.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-muted-foreground">{mit.id}</span>
                        <span className="font-medium">{mit.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{mit.description}</p>

                      {awsContext && (
                        <div className="mt-2 rounded bg-muted/50 px-2.5 py-2 text-xs">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Cloud className="h-3 w-3" />
                            AWS
                          </div>
                          {awsContext.services && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {awsContext.services.map((s) => (
                                <code key={s} className="rounded bg-background px-1.5 py-0.5 text-[10px] font-mono">
                                  {s}
                                </code>
                              ))}
                            </div>
                          )}
                          {awsContext.implementationNote && (
                            <p className="text-muted-foreground mt-1">{awsContext.implementationNote}</p>
                          )}
                        </div>
                      )}

                      {!awsContext && genericContext && (
                        <div className="mt-2 rounded bg-muted/50 px-2.5 py-2 text-xs">
                          <span className="font-medium">Generic</span>
                          {genericContext.implementationNote && (
                            <p className="text-muted-foreground mt-1">{genericContext.implementationNote}</p>
                          )}
                        </div>
                      )}

                      <a
                        href={mit.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground"
                      >
                        {mit.source.organization}: {mit.source.document}
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Sources */}
          <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground pt-1 border-t">
            {incident.sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground inline-flex items-center gap-0.5"
              >
                {s.organization}
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            ))}
            <span>Confidence: {incident.confidence.level}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function CopIncidentFeed() {
  const threatsData = getThreats()
  const incidents = [...threatsData.incidents].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  )

  const totalGaps = incidents.reduce((sum, inc) => sum + inc.gaps.length, 0)

  return (
    <div>
      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="secondary">{incidents.length} incidents</Badge>
        <Badge variant="secondary">{threatsData.threats.length} threats</Badge>
        <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">
          {totalGaps} gaps
        </Badge>
      </div>

      {/* Incident cards */}
      <div className="space-y-2">
        {incidents.map((inc) => (
          <IncidentCard key={inc.id} incident={inc} />
        ))}
      </div>
    </div>
  )
}
