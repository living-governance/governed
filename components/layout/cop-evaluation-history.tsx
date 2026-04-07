"use client"

import { useState } from "react"
import {
  getEvaluationRuns,
  getThreats,
  getFrameworkCoverage,
  getEvolutionTimeline,
  type EvaluationRun,
  type ThreatEvolutionEvent,
  type VerificationStatus,
} from "@/lib/knowledge"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, ExternalLink, Bot, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

// Unified timeline entry from multiple sources
interface TimelineItem {
  date: Date
  type: "evaluation-run" | "evolution-event"
  evaluator?: string
  evaluatorType?: "human" | "agent"
  verificationStatus?: VerificationStatus
  title: string
  summary: string
  scoreDeltas?: Record<string, number>
  sourcesChanged?: boolean
  sourcesChecked?: string[]
  significance?: "high" | "medium" | "low"
  relatedThreatIds?: string[]
  source?: { name: string; url: string; organization: string }
}

function buildTimeline(): TimelineItem[] {
  const items: TimelineItem[] = []

  // Evaluation runs
  const runs = getEvaluationRuns()
  for (const run of runs) {
    items.push({
      date: new Date(run.date),
      type: "evaluation-run",
      evaluator: run.evaluatedBy,
      evaluatorType: run.evaluatorType,
      verificationStatus: run.verificationStatus,
      title: `${run.artifactId} re-evaluation`,
      summary: run.summary,
      scoreDeltas: run.scoreDeltas,
      sourcesChanged: run.sourcesChanged,
      sourcesChecked: run.sourcesChecked,
    })
  }

  // Threat evolution events
  const evolution = getEvolutionTimeline(getThreats())
  for (const ev of evolution) {
    items.push({
      date: new Date(ev.date),
      type: "evolution-event",
      title: ev.title,
      summary: ev.description,
      significance: ev.significance,
      relatedThreatIds: ev.relatedThreatIds,
      source: ev.source,
    })
  }

  // Add knowledge evaluation dates as entries
  const fc = getFrameworkCoverage()
  const threats = getThreats()
  items.push({
    date: new Date(fc.evaluation.date),
    type: "evaluation-run",
    evaluator: fc.evaluation.by,
    evaluatorType: (fc.evaluation as any).verificationStatus === "agent-evaluated" ? "agent" : "human",
    verificationStatus: (fc.evaluation as any).verificationStatus,
    title: "Framework coverage evaluation",
    summary: `Evaluated ${fc.frameworks.length} frameworks. Verified by ${(fc.evaluation as any).verifiedBy ?? "pending"}.`,
  })
  items.push({
    date: new Date(threats.evaluation.date),
    type: "evaluation-run",
    evaluator: threats.evaluation.by,
    evaluatorType: "human",
    verificationStatus: "human-verified" as VerificationStatus,
    title: "Threat catalog evaluation",
    summary: `Evaluated ${threats.threats.length} threats, ${threats.incidents.length} incidents, ${threats.mitigations.length} mitigations.`,
  })

  // Deduplicate by date+title (runs may overlap with evaluation entries)
  const seen = new Set<string>()
  const deduped = items.filter((item) => {
    const key = `${item.date.toISOString().slice(0, 10)}-${item.title}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return deduped.sort((a, b) => b.date.getTime() - a.date.getTime())
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const verificationColors: Record<string, string> = {
  "human-verified": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  "agent-evaluated": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "human-disputed": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

const markerColors: Record<string, string> = {
  "human-verified": "bg-green-500",
  "agent-evaluated": "bg-blue-500",
  "human-disputed": "bg-red-500",
}

function TimelineEntry({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false)

  const markerColor = item.verificationStatus
    ? markerColors[item.verificationStatus]
    : item.significance === "high"
      ? "bg-red-500"
      : item.significance === "medium"
        ? "bg-amber-500"
        : "bg-muted-foreground"

  return (
    <div className="flex gap-3">
      {/* Timeline line + marker */}
      <div className="flex flex-col items-center">
        <div className={cn("h-3 w-3 rounded-full shrink-0 mt-1.5", markerColor)} />
        {!isLast && <div className="w-px flex-1 bg-border" />}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span>

          {item.evaluator && (
            <Badge variant="secondary" className="text-[10px] gap-1">
              {item.evaluatorType === "agent" ? (
                <Bot className="h-3 w-3" />
              ) : (
                <UserCheck className="h-3 w-3" />
              )}
              {item.evaluator}
            </Badge>
          )}

          {item.verificationStatus && (
            <Badge
              variant="secondary"
              className={cn("text-[10px]", verificationColors[item.verificationStatus])}
            >
              {item.verificationStatus}
            </Badge>
          )}

          {item.significance && (
            <Badge variant="secondary" className="text-[10px]">
              {item.significance} significance
            </Badge>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 flex items-center gap-1 text-left"
        >
          <span className="text-sm font-medium">{item.title}</span>
          {(item.sourcesChecked?.length || item.source) && (
            expanded ? (
              <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            )
          )}
        </button>

        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
          {item.summary}
        </p>

        {item.scoreDeltas && Object.keys(item.scoreDeltas).length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {Object.entries(item.scoreDeltas).map(([key, delta]) => (
              <span
                key={key}
                className={cn(
                  "text-[10px] font-mono rounded px-1 py-0.5",
                  delta > 0 && "bg-green-500/10 text-green-600 dark:text-green-400",
                  delta < 0 && "bg-red-500/10 text-red-600 dark:text-red-400",
                  delta === 0 && "bg-muted text-muted-foreground"
                )}
              >
                {key}: {delta > 0 ? "+" : ""}{delta}
              </span>
            ))}
          </div>
        )}

        {item.sourcesChanged !== undefined && (
          <span className="mt-1 inline-block text-[10px] text-muted-foreground">
            Sources: {item.sourcesChanged ? "changed" : "no changes"}
          </span>
        )}

        {expanded && (
          <div className="mt-2 rounded border bg-muted/50 px-3 py-2 text-xs space-y-2">
            {item.sourcesChecked && item.sourcesChecked.length > 0 && (
              <div>
                <span className="font-medium">Sources checked:</span>
                <ul className="mt-1 space-y-0.5">
                  {item.sourcesChecked.map((url) => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                      >
                        {new URL(url).hostname}
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.source && (
              <div>
                <span className="font-medium">Source: </span>
                <a
                  href={item.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  {item.source.name} ({item.source.organization})
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            )}
            {item.relatedThreatIds && item.relatedThreatIds.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="font-medium">Related:</span>
                {item.relatedThreatIds.map((id) => (
                  <Badge key={id} variant="secondary" className="text-[10px]">
                    {id}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function CopEvaluationHistory() {
  const timeline = buildTimeline()

  return (
    <div>
      <div className="space-y-0">
        {timeline.map((item, i) => (
          <TimelineEntry
            key={`${item.date.toISOString()}-${item.title}`}
            item={item}
            isLast={i === timeline.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
