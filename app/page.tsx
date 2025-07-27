// app/page.tsx

import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Living Governance
          </h1>
          <p className="text-xl text-muted-foreground">
            Executable knowledge infrastructure for AI governance
          </p>
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <p className="text-lg font-medium">
            Copy. Customize. Govern.
          </p>
          <p className="text-muted-foreground">
            Transform AI governance from static PDFs into self-aware, executable code
          </p>
        </div>

        {/* Launch Info */}
        <div className="py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-muted/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium">Launching August 2025</span>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Link 
            href="/test" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Preview Components
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          
          <p className="text-sm text-muted-foreground">
            Join the waitlist at{" "}
            <a 
              href="https://github.com/living-governance/governed" 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="pt-8 text-xs text-muted-foreground">
          <p>Making expertise executable, not archaeological</p>
        </div>
      </div>
    </div>
  )
}