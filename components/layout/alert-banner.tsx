"use client"

import { getPosture, getThreats, type Threat } from "@/lib/knowledge"
import { X } from "lucide-react"

interface AlertBannerProps {
  onDismiss: () => void
}

export function AlertBanner({ onDismiss }: AlertBannerProps) {
  const posture = getPosture()
  if (posture !== "critical") return null

  const threats = getThreats()
  const criticalThreat = threats.threats.find(
    (t: Threat) => t.severity === "critical"
  )
  if (!criticalThreat) return null

  return (
    <div className="relative flex items-start gap-3 bg-red-950 px-4 py-3 text-red-100">
      {/* Pulsing dot — the only animation on the site */}
      <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400" />
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">
          CRITICAL: {criticalThreat.name}
        </p>
        <p className="mt-0.5 text-xs text-red-300 line-clamp-2">
          {criticalThreat.description}
        </p>
        <a
          href="#threats"
          className="mt-1 inline-block text-xs font-medium text-red-200 underline underline-offset-2 hover:text-white"
        >
          Jump to threat details &rarr;
        </a>
      </div>

      <button
        onClick={onDismiss}
        className="shrink-0 rounded p-1 text-red-300 hover:bg-red-900 hover:text-red-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
