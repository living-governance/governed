"use client"

import { getKPIs, type PostureLevel } from "@/lib/knowledge"
import { cn } from "@/lib/utils"

function formatTimeSince(date: Date): string {
  const ms = Date.now() - date.getTime()
  const hours = Math.floor(ms / (1000 * 60 * 60))
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function PostureBadge({ posture }: { posture: PostureLevel }) {
  return (
    <div
      className={cn(
        "flex flex-col items-start rounded-md px-3 py-2",
        posture === "nominal" && "bg-green-500/10 text-green-600 dark:text-green-400",
        posture === "elevated" && "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/30",
        posture === "critical" && "bg-red-500/10 text-red-600 dark:text-red-400 ring-1 ring-red-500/30",
      )}
    >
      <span className="text-[11px] uppercase tracking-wide opacity-70">Risk posture</span>
      <span className="text-sm font-semibold uppercase">{posture}</span>
    </div>
  )
}

function KPIBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start rounded-md bg-secondary px-3 py-2">
      <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  )
}

export function StatusStrip() {
  const kpis = getKPIs()

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
      <KPIBadge label="Coverage" value={`${kpis.coveragePercent}%`} />
      <KPIBadge label="Threats" value={String(kpis.threatCount)} />
      <KPIBadge label="Last eval" value={formatTimeSince(kpis.lastEvaluation)} />
      <KPIBadge label="MCP tools" value={String(kpis.mcpToolCount)} />
      <PostureBadge posture={kpis.posture} />
    </div>
  )
}
