"use client"

import { useState } from "react"
import { getThreats, type Threat, type SeverityLevel } from "@/lib/knowledge"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const sevStyle: Record<SeverityLevel, string> = {
  critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
}

function SeveritySummary({ threats }: { threats: Threat[] }) {
  const counts: Record<SeverityLevel, number> = { critical: 0, high: 0, medium: 0, low: 0 }
  for (const t of threats) counts[t.severity]++

  const parts = (["critical", "high", "medium", "low"] as SeverityLevel[])
    .filter((s) => counts[s] > 0)

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {parts.map((s) => (
        <Badge key={s} variant="secondary" className={cn("text-xs", sevStyle[s])}>
          {counts[s]} {s}
        </Badge>
      ))}
      <span className="text-xs text-muted-foreground">
        {threats.length} threats total
      </span>
    </div>
  )
}

function ThreatRow({ threat }: { threat: Threat }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={cn(
        "rounded-lg border transition-colors",
        expanded && "ring-1 ring-primary/20"
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
      >
        <span className="text-xs font-mono text-muted-foreground w-14 shrink-0">
          {threat.id}
        </span>
        <Badge
          variant="secondary"
          className={cn("text-[10px] px-1.5 py-0 shrink-0", sevStyle[threat.severity])}
        >
          {threat.severity}
        </Badge>
        <span className="text-sm font-medium truncate flex-1">
          {threat.name}
        </span>
        <span className="text-xs text-muted-foreground shrink-0">
          {threat.incidentIds.length} incidents
        </span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="border-t px-3 py-3 space-y-3">
          <p className="text-sm text-muted-foreground">
            {threat.description}
          </p>

          {threat.severityRationale && (
            <p className="text-xs text-muted-foreground italic">
              {threat.severityRationale}
            </p>
          )}

          {/* Cross-taxonomy mappings */}
          {threat.sourceMappings.length > 0 && (
            <div>
              <h4 className="text-xs font-medium mb-1">Source mappings</h4>
              <div className="flex flex-wrap gap-1.5">
                {threat.sourceMappings.map((m) => (
                  <a
                    key={`${m.taxonomy}-${m.sourceId}`}
                    href={m.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[11px] font-mono hover:bg-accent transition-colors"
                  >
                    {m.taxonomy}:{m.sourceId}
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Scope */}
          <div className="grid gap-2 sm:grid-cols-2 text-xs">
            <div>
              <h4 className="font-medium mb-1">Applies to</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                {threat.scope.appliesTo.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">Does not apply to</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                {threat.scope.doesNotApplyTo.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function CopThreats() {
  const knowledge = getThreats()
  const threats = [...knowledge.threats].sort((a, b) => {
    const order: Record<SeverityLevel, number> = { critical: 0, high: 1, medium: 2, low: 3 }
    return order[a.severity] - order[b.severity]
  })

  return (
    <div>
      <SeveritySummary threats={threats} />
      <div className="space-y-2">
        {threats.map((t) => (
          <ThreatRow key={t.id} threat={t} />
        ))}
      </div>
    </div>
  )
}
