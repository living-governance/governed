// app/test/page.tsx

"use client"

import { FrameworkCoverage } from "../../registry/components/compliance/framework-coverage"
import { frameworkCoverageKnowledge } from "../../registry/knowledge/framework-coverage"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function TestPage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Component Test Page</h1>
          <p className="text-muted-foreground mt-2">Testing governance components in isolation</p>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg border bg-background hover:bg-accent"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
      
      <div className="grid gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Framework Coverage Component</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Component at different widths to test responsive behavior */}
            <FrameworkCoverage />
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Component Details</h3>
              <p className="text-sm text-muted-foreground">
                {frameworkCoverageKnowledge.metadata.description}
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                {frameworkCoverageKnowledge.metadata.details.map((detail, i) => (
                  <li key={i}>• {detail}</li>
                ))}
              </ul>
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  Category: {frameworkCoverageKnowledge.metadata.category}
                </p>
                <p className="text-xs text-muted-foreground">
                  Tags: {frameworkCoverageKnowledge.metadata.tags.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}