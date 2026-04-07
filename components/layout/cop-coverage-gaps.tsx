"use client"

import { useState } from "react"
import { getThreats, getAllGaps, computeCoverageSummary } from "@/lib/knowledge"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

function coverageColor(type: "direct" | "indirect" | "none"): string {
  if (type === "direct") return "text-green-600 dark:text-green-400"
  if (type === "indirect") return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

function coverageBg(type: "direct" | "indirect" | "none"): string {
  if (type === "direct") return "bg-green-500/20"
  if (type === "indirect") return "bg-amber-500/20"
  return "bg-red-500/20"
}

export function CopCoverageGaps() {
  const threatsData = getThreats()
  const gaps = getAllGaps(threatsData)
  const summary = computeCoverageSummary(threatsData)

  // Sort frameworks by worst coverage (most "none") first
  const frameworkRows = [...summary.gapsByFramework].sort(
    (a, b) => b.noneCount - a.noneCount
  )

  // Group gaps by framework for the detail view
  const gapsByFramework = new Map<string, typeof gaps>()
  for (const gap of gaps) {
    const list = gapsByFramework.get(gap.frameworkId) ?? []
    list.push(gap)
    gapsByFramework.set(gap.frameworkId, list)
  }

  return (
    <div>
      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">
          {summary.totalGaps} gaps
        </Badge>
        <Badge variant="secondary">
          {summary.totalIncidents} incidents analyzed
        </Badge>
        <Badge variant="secondary">
          {frameworkRows.filter((f) => f.noneCount > 0).length} frameworks with holes
        </Badge>
      </div>

      {/* Framework coverage matrix */}
      <div className="rounded-lg border overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left font-medium px-3 py-2">Framework</th>
              <th className="text-center font-medium px-3 py-2 w-20">
                <span className="text-green-600 dark:text-green-400">Direct</span>
              </th>
              <th className="text-center font-medium px-3 py-2 w-20">
                <span className="text-amber-600 dark:text-amber-400">Indirect</span>
              </th>
              <th className="text-center font-medium px-3 py-2 w-20">
                <span className="text-red-600 dark:text-red-400">None</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {frameworkRows.map((f) => (
              <tr key={f.frameworkId} className="border-b last:border-0">
                <td className="px-3 py-2 text-sm">{f.frameworkName}</td>
                <td className="text-center px-3 py-2">
                  <span className={cn("inline-block min-w-6 rounded px-1.5 py-0.5 text-xs font-mono", f.directCount > 0 ? coverageBg("direct") : "")}>
                    {f.directCount}
                  </span>
                </td>
                <td className="text-center px-3 py-2">
                  <span className={cn("inline-block min-w-6 rounded px-1.5 py-0.5 text-xs font-mono", f.indirectCount > 0 ? coverageBg("indirect") : "")}>
                    {f.indirectCount}
                  </span>
                </td>
                <td className="text-center px-3 py-2">
                  <span className={cn("inline-block min-w-6 rounded px-1.5 py-0.5 text-xs font-mono", f.noneCount > 0 ? coverageBg("none") : "")}>
                    {f.noneCount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gap details by framework */}
      <div className="space-y-2">
        {frameworkRows
          .filter((f) => gapsByFramework.has(f.frameworkId))
          .map((f) => (
            <GapGroup
              key={f.frameworkId}
              frameworkName={f.frameworkName}
              gaps={gapsByFramework.get(f.frameworkId)!}
            />
          ))}
      </div>
    </div>
  )
}

function GapGroup({
  frameworkName,
  gaps,
}: {
  frameworkName: string
  gaps: ReturnType<typeof getAllGaps>
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-lg border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
      >
        <span className="text-sm font-medium flex-1">{frameworkName}</span>
        <span className="text-xs text-muted-foreground">{gaps.length} gaps</span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="border-t divide-y">
          {gaps.map((gap, i) => (
            <div
              key={`${gap.frameworkId}-${gap.incidentId}-${i}`}
              className={cn(
                "px-3 py-2.5",
                gap.contributionCandidate && "bg-amber-500/5"
              )}
            >
              <p className="text-sm">{gap.gapDescription}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>Exposed by: {gap.incidentTitle}</span>
                {gap.contributionCandidate && (
                  <Badge variant="secondary" className="text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-400">
                    contribution candidate
                  </Badge>
                )}
                {gap.contributionStatus && (
                  <Badge variant="secondary" className="text-[10px]">
                    {gap.contributionStatus}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
