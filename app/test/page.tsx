// app/test/page.tsx

"use client"

import { FrameworkCoverage } from "../../registry/components/compliance/framework-coverage"
import { Moon, Sun, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function TestPage() {
  const [isDark, setIsDark] = useState(true) // Default to dark

  useEffect(() => {
    // Check localStorage on mount
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setIsDark(false)
    } else {
      setIsDark(true) // Default to dark if no preference saved
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
    <>
      {/* Mockup Warning Banner */}
      <div className="w-full bg-red-600 text-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-medium">
          <AlertCircle className="h-4 w-4" />
          <span>This is a mockup site with example data. Production launch expected in August 2025.</span>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="mb-8 flex justify-between items-center px-4 md:px-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Living Governance Components</h1>
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
          {/* Desktop: Side-by-side view */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6">
            {/* Left component - starts with Home view */}
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">Main View</h2>
              <FrameworkCoverage />
            </div>
            
            {/* Right component - starts with Methodology view */}
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">Methodology View</h2>
              <FrameworkCoverage initialView="methodology" />
            </div>
          </div>
          
          {/* Mobile/Tablet: Single component */}
          <div className="lg:hidden">
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">Navigate views using the icons at the bottom</h2>
              <FrameworkCoverage />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}