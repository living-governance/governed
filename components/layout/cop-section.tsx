"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CopSectionProps {
  id: string
  title: string
  phase?: string
  credibilityLine: string
  sourcesAndMethodology?: string
  variant?: "full" | "half"
  children: React.ReactNode
}

export function CopSection({
  id,
  title,
  phase,
  credibilityLine,
  sourcesAndMethodology,
  variant = "full",
  children,
}: CopSectionProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section
      id={id}
      className={cn(
        "rounded-lg border",
        variant === "half" && "lg:col-span-1"
      )}
    >
      <div className="px-4 pt-4 pb-2">
        {phase && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            {phase}
          </span>
        )}
        <h2 className="text-base font-medium">{title}</h2>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{credibilityLine}</span>
          {sourcesAndMethodology && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{expanded ? "▾" : "▸"}</span>
              <span>sources and methodology</span>
            </button>
          )}
        </div>

        {expanded && sourcesAndMethodology && (
          <div className="mt-3 rounded border bg-muted/50 px-3 py-2 text-xs text-muted-foreground whitespace-pre-line">
            {sourcesAndMethodology}
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        {children}
      </div>
    </section>
  )
}
