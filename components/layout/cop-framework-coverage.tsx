"use client"

import { getFrameworkCoverage } from "@/lib/knowledge"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const statusColor: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  applicable: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  "no-guidance": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

function progressColor(score: number): string {
  if (score >= 70) return "[&>*]:bg-green-500"
  if (score >= 40) return "[&>*]:bg-yellow-500"
  return "[&>*]:bg-red-500"
}

export function CopFrameworkCoverage() {
  const knowledge = getFrameworkCoverage()
  const frameworks = [...knowledge.frameworks].sort(
    (a, b) => b.aiCoverageScore - a.aiCoverageScore
  )
  const readyCount = frameworks.filter((f) => f.aiCoverageScore >= 0.7).length

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Only {readyCount} of {frameworks.length} frameworks ready for AI threats
        {" \u00b7 "}
        {frameworks.length - readyCount} lack adequate coverage
      </p>

      <div className="space-y-4">
        {frameworks.map((f, i) => {
          const score = Math.round(f.aiCoverageScore * 100)
          return (
            <div key={f.id}>
              <div className="flex items-center gap-3">
                <span className="w-6 text-right text-xs text-muted-foreground font-mono">
                  #{i + 1}
                </span>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline inline-flex items-center gap-1"
                >
                  {f.name}
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </a>
                <Badge
                  variant="secondary"
                  className={cn("text-[10px] px-1.5 py-0", statusColor[f.status])}
                >
                  {f.status}
                </Badge>
                <span className="ml-auto text-sm font-mono tabular-nums">
                  {score}%
                </span>
              </div>

              <div className="mt-1 ml-9">
                <Progress
                  value={score}
                  className={cn("h-2", progressColor(score))}
                />
              </div>

              {score < 40 && f.gaps.length > 0 && (
                <div className="mt-1 ml-9 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{f.gaps[0]}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
