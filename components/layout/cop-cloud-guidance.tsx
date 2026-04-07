"use client"

import { useState } from "react"
import { getCloudGuidance } from "@/lib/knowledge"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, Check, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type Provider = "aws" | "gcp" | "azure"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="shrink-0 rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}

export function CopCloudGuidance() {
  const cloud = getCloudGuidance()
  const [activeProvider, setActiveProvider] = useState<Provider>("aws")
  const aws = cloud.aws

  const providers: { id: Provider; label: string; disabled: boolean }[] = [
    { id: "aws", label: "AWS", disabled: false },
    { id: "gcp", label: "GCP", disabled: true },
    { id: "azure", label: "Azure", disabled: true },
  ]

  const services = Object.values(aws.serviceOverview)
  const quickDeployCount = aws.frameworkMappings.reduce(
    (sum, m) => sum + m.implementations.length,
    0
  )

  return (
    <div>
      {/* Provider tabs */}
      <div className="flex items-center gap-2 mb-4">
        {providers.map((p) => (
          <button
            key={p.id}
            disabled={p.disabled}
            onClick={() => !p.disabled && setActiveProvider(p.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeProvider === p.id
                ? "bg-foreground text-background"
                : p.disabled
                  ? "text-muted-foreground/50 cursor-not-allowed"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            {p.label}
            {p.disabled && (
              <Badge variant="secondary" className="ml-1.5 text-[9px] px-1 py-0">
                soon
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Key message */}
      <div className="flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/5 px-3 py-2.5 mb-5">
        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">{aws.keyMessage}</p>
      </div>

      {/* Service overview grid */}
      <h3 className="text-sm font-medium mb-3">AWS Security Services</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {services.map((svc) => (
          <a
            key={svc.name}
            href={svc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border p-3 hover:border-foreground/20 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-[10px] font-mono text-muted-foreground shrink-0">
                AWS
              </div>
              <span className="text-sm font-medium group-hover:underline">{svc.name}</span>
              <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{svc.description}</p>
            <p className="mt-1 text-xs text-muted-foreground/70 italic">When: {svc.when}</p>
          </a>
        ))}
      </div>

      {/* Framework mappings */}
      <h3 className="text-sm font-medium mb-3">Framework Mappings</h3>
      <div className="space-y-4 mb-6">
        {aws.frameworkMappings.map((mapping) => (
          <div key={mapping.framework} className="rounded-lg border">
            <div className="px-3 py-2 border-b bg-muted/30">
              <span className="text-sm font-medium">{mapping.framework}</span>
            </div>
            <div className="divide-y">
              {mapping.implementations.map((impl) => (
                <div key={impl.approach} className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {impl.approach}
                    </Badge>
                    <a
                      href={impl.serviceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline inline-flex items-center gap-1"
                    >
                      {impl.service}
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </a>
                  </div>

                  {impl.details.map((d) => (
                    <div key={d.name} className="mt-1.5 text-xs text-muted-foreground">
                      <span className="font-medium">{d.name}</span>
                      {" \u2014 "}
                      {d.description}
                      {d.specs && <span className="text-muted-foreground/70"> ({d.specs})</span>}
                    </div>
                  ))}

                  {/* Quick deploy — the actionable value */}
                  <div className="mt-2 flex items-center gap-2 rounded bg-muted px-2.5 py-1.5">
                    <code className="flex-1 text-xs font-mono">{impl.quickDeploy}</code>
                    <CopyButton text={impl.quickDeploy} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Best practices */}
      <h3 className="text-sm font-medium mb-2">Best Practices</h3>
      <ul className="space-y-1">
        {aws.bestPractices.map((bp) => (
          <li key={bp} className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-0.5">•</span>
            <span>{bp}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
