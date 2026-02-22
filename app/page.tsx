// app/page.tsx

"use client"

import { FrameworkCoverage } from "../registry/components/framework-coverage"
import { Threats } from "../registry/components/threats"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setIsDark(false)
    } else {
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex justify-between items-center px-4 md:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Living Governance</h1>
          <p className="text-muted-foreground mt-2">Security framework analysis for AI and MCP threats</p>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg border bg-background hover:bg-accent"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      <div className="px-4 md:px-8">
        {/* Desktop: Side-by-side — Threats left, Framework Coverage right */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          <Threats />
          <FrameworkCoverage />
        </div>

        {/* Mobile/Tablet: Stacked */}
        <div className="lg:hidden space-y-6">
          <Threats />
          <FrameworkCoverage />
        </div>
      </div>
    </div>
  )
}
