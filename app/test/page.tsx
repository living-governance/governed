// app/test/page.tsx

"use client"

import { FrameworkCoverage } from "../../registry/components/compliance/framework-coverage"
import { Moon, Sun, AlertCircle } from "lucide-react"
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
    <>
      {/* Mockup Warning Banner */}
      <div className="w-full bg-red-600 text-white px-4 py-3">
        <div className="container max-w-6xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
          <AlertCircle className="h-4 w-4" />
          <span>This is a mockup site with example data. Production launch expected in August 2025.</span>
        </div>
      </div>

      <div className="container max-w-6xl py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Living Governance Components</h1>
            <p className="text-muted-foreground mt-2">Preview of governance components with living knowledge</p>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg border bg-background hover:bg-accent"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        
        <div className="max-w-2xl">
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Framework Coverage</h2>
              <p className="text-sm text-muted-foreground">
                Security framework analysis for AI and MCP threats
              </p>
            </div>
            <FrameworkCoverage />
          </section>
        </div>
      </div>
    </>
  )
}