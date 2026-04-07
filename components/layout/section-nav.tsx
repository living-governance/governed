"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface NavSection {
  id: string
  label: string
}

interface SectionNavProps {
  sections: NavSection[]
  activeSection: string
  onSectionChange: (id: string) => void
}

export function SectionNav({ sections, activeSection, onSectionChange }: SectionNavProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onSectionChange(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )

    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observerRef.current.observe(el)
    }

    return () => observerRef.current?.disconnect()
  }, [sections, onSectionChange])

  function handleClick(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="sticky top-0 z-30 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="flex-1 overflow-x-auto">
        <div className="flex items-center gap-1 px-2 py-2 text-sm whitespace-nowrap">
          {sections.map((section, i) => (
            <span key={section.id} className="flex items-center">
              {i > 0 && (
                <span className="mx-1 text-muted-foreground/40">/</span>
              )}
              <button
                onClick={() => handleClick(section.id)}
                className={cn(
                  "rounded px-2 py-1 transition-colors",
                  activeSection === section.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {section.label}
              </button>
            </span>
          ))}
        </div>
      </nav>

      {/* Expert lens slot — populated in Layer 1 */}
      <div id="expert-lens-slot" className="shrink-0 px-2" />
    </div>
  )
}
