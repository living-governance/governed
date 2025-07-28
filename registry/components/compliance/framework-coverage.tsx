// registry/components/compliance/framework-coverage.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  frameworkCoverageKnowledge,
  getConfidenceStatus,
  getLatestChange 
} from "../../knowledge/framework-coverage"
import { 
  AlertCircle, Clock, ExternalLink, Download, Share2, Link, 
  Info, Cloud, TrendingUp, ChevronLeft, Home
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

type ViewType = 'main' | 'methodology' | 'sources' | 'cloud' | 'history' | 'download' | 'share'

export function FrameworkCoverage() {
  const { frameworks, evaluation } = frameworkCoverageKnowledge
  const confidenceStatus = getConfidenceStatus(frameworkCoverageKnowledge)
  const [currentView, setCurrentView] = useState<ViewType>('main')
  
  // Function to determine color based on coverage percentage
  const getProgressColor = (coverage: number) => {
    if (coverage >= 0.7) return "[&>*]:bg-success"
    if (coverage >= 0.4) return "[&>*]:bg-warning"
    return "[&>*]:bg-danger"
  }
  
  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'applicable': return 'secondary'
      case 'no-guidance': return 'outline'
      default: return 'outline'
    }
  }
  
  // Calculate summary statistics
  const avgCoverage = Math.round(
    (frameworks.reduce((sum, f) => sum + f.aiCoverage.overall, 0) / frameworks.length) * 100
  )
  const withGuidance = frameworks.filter(f => f.status !== 'no-guidance').length
  
  // Icon button component for cleaner code
  const IconButton = ({ icon: Icon, view, label, isActive = false }: { 
    icon: any, 
    view: ViewType | 'main', 
    label: string,
    isActive?: boolean 
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={isActive ? "secondary" : "ghost"}
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setCurrentView(view as ViewType)}
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
  
  // Icon bar component - reused in all views
  const IconBar = () => (
    <div className="flex items-center gap-1">
      <IconButton icon={Home} view="main" label="Home" isActive={currentView === 'main'} />
      <div className="w-px h-6 bg-border mx-1" /> {/* Separator */}
      <IconButton icon={Link} view="sources" label="Sources" isActive={currentView === 'sources'} />
      <IconButton icon={Info} view="methodology" label="Methodology" isActive={currentView === 'methodology'} />
      <IconButton icon={Cloud} view="cloud" label="Cloud Guidance" isActive={currentView === 'cloud'} />
      <IconButton icon={TrendingUp} view="history" label="History" isActive={currentView === 'history'} />
      <IconButton icon={Download} view="download" label="Download" isActive={currentView === 'download'} />
      <IconButton icon={Share2} view="share" label="Share" isActive={currentView === 'share'} />
    </div>
  )
  
  // Render metadata view content
  const renderMetadataContent = () => {
    switch (currentView) {
      case 'methodology':
        return (
          <>
            <p className="font-medium mb-4">Evaluation Methodology</p>
            <div className="space-y-6">
              {/* Threat Identification */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Threat Identification</h4>
                  <span className="text-xs text-muted-foreground">40 points</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Memory attacks', points: 5, owasp: true, nist: false },
                    { name: 'Tool/API abuse', points: 5, owasp: true, nist: false },
                    { name: 'Privilege escalation', points: 5, owasp: true, nist: false },
                    { name: 'Multi-agent threats', points: 5, owasp: true, nist: false },
                    { name: 'Temporal behaviors', points: 5, owasp: true, nist: false },
                    { name: 'Human manipulation', points: 5, owasp: true, nist: false },
                    { name: 'Communication poisoning', points: 5, owasp: true, nist: false },
                    { name: 'Identity/auth threats', points: 5, owasp: true, nist: false }
                  ].map(item => (
                    <div key={item.name} className="grid grid-cols-12 gap-2 text-sm items-center">
                      <span className="col-span-6 text-muted-foreground">• {item.name}</span>
                      <span className="col-span-2 text-xs text-muted-foreground">{item.points}pts</span>
                      <span className="col-span-2 text-center">{item.owasp ? '✓' : '✗'}</span>
                      <span className="col-span-2 text-center">{item.nist ? '✓' : '✗'}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium pt-2 border-t">
                    <span className="col-span-6">Subtotal</span>
                    <span className="col-span-2"></span>
                    <span className="col-span-2 text-center text-success">40/40</span>
                    <span className="col-span-2 text-center text-danger">0/40</span>
                  </div>
                </div>
              </div>

              {/* Practical Guidance */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Practical Guidance</h4>
                  <span className="text-xs text-muted-foreground">30 points</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Clear patterns', points: 10, owasp: true, nist: true },
                    { name: 'Specific tools', points: 5, owasp: true, nist: false },
                    { name: 'Checklists', points: 5, owasp: true, nist: true },
                    { name: 'Architecture diagrams', points: 5, owasp: true, nist: false },
                    { name: 'Step-by-step instructions', points: 5, owasp: true, nist: true }
                  ].map(item => (
                    <div key={item.name} className="grid grid-cols-12 gap-2 text-sm items-center">
                      <span className="col-span-6 text-muted-foreground">• {item.name}</span>
                      <span className="col-span-2 text-xs text-muted-foreground">{item.points}pts</span>
                      <span className="col-span-2 text-center">{item.owasp ? '✓' : '✗'}</span>
                      <span className="col-span-2 text-center">{item.nist ? '✓' : '✗'}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium pt-2 border-t">
                    <span className="col-span-6">Subtotal</span>
                    <span className="col-span-2"></span>
                    <span className="col-span-2 text-center text-success">30/30</span>
                    <span className="col-span-2 text-center text-warning">20/30</span>
                  </div>
                </div>
              </div>

              {/* Evidence Quality */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Evidence Quality</h4>
                  <span className="text-xs text-muted-foreground">20 points</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Credible research', points: 5, owasp: true, nist: true },
                    { name: 'Real incidents', points: 5, owasp: true, nist: false },
                    { name: 'Attack patterns', points: 5, owasp: true, nist: false },
                    { name: 'Detection guidance', points: 5, owasp: true, nist: false }
                  ].map(item => (
                    <div key={item.name} className="grid grid-cols-12 gap-2 text-sm items-center">
                      <span className="col-span-6 text-muted-foreground">• {item.name}</span>
                      <span className="col-span-2 text-xs text-muted-foreground">{item.points}pts</span>
                      <span className="col-span-2 text-center">{item.owasp ? '✓' : '✗'}</span>
                      <span className="col-span-2 text-center">{item.nist ? '✓' : '✗'}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium pt-2 border-t">
                    <span className="col-span-6">Subtotal</span>
                    <span className="col-span-2"></span>
                    <span className="col-span-2 text-center text-success">20/20</span>
                    <span className="col-span-2 text-center text-danger">5/20</span>
                  </div>
                </div>
              </div>

              {/* Completeness */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Completeness</h4>
                  <span className="text-xs text-muted-foreground">10 points</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Detection methods', points: 5, owasp: true, nist: false },
                    { name: 'Response procedures', points: 5, owasp: true, nist: false }
                  ].map(item => (
                    <div key={item.name} className="grid grid-cols-12 gap-2 text-sm items-center">
                      <span className="col-span-6 text-muted-foreground">• {item.name}</span>
                      <span className="col-span-2 text-xs text-muted-foreground">{item.points}pts</span>
                      <span className="col-span-2 text-center">{item.owasp ? '✓' : '✗'}</span>
                      <span className="col-span-2 text-center">{item.nist ? '✓' : '✗'}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium pt-2 border-t">
                    <span className="col-span-6">Subtotal</span>
                    <span className="col-span-2"></span>
                    <span className="col-span-2 text-center text-success">10/10</span>
                    <span className="col-span-2 text-center text-danger">0/10</span>
                  </div>
                </div>
              </div>

              {/* Total Score */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-12 gap-2 text-sm font-medium">
                  <span className="col-span-6">Total Score</span>
                  <span className="col-span-2"></span>
                  <span className="col-span-2 text-center">
                    <Badge variant="default" className="bg-success">100/100</Badge>
                  </span>
                  <span className="col-span-2 text-center">
                    <Badge variant="outline" className="text-danger border-danger">25/100</Badge>
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="text-xs text-muted-foreground pt-4 space-y-1">
                <div className="grid grid-cols-12 gap-2 font-medium">
                  <span className="col-span-6"></span>
                  <span className="col-span-2"></span>
                  <span className="col-span-2 text-center">OWASP</span>
                  <span className="col-span-2 text-center">NIST</span>
                </div>
                <p className="mt-2">✓ = Criteria met | ✗ = Criteria not met</p>
                <p>Scores reflect coverage of agentic AI security threats specifically.</p>
              </div>
            </div>
          </>
        )
      case 'sources':
        return (
          <>
            <p className="font-medium mb-2">Sources</p>
            <div className="space-y-3 text-sm">
              {/* OWASP sources */}
              <div>
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide mb-1">OWASP Foundation</p>
                <div className="space-y-1">
                  {frameworks.filter(f => f.organization === 'OWASP Foundation').map(framework => (
                    <a 
                      key={framework.id}
                      href={framework.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1 ml-3"
                    >
                      {framework.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                  {frameworkCoverageKnowledge.sources
                    .filter(s => s.name.includes('OWASP') && s.url)
                    .map((source, index) => (
                      <a 
                        key={`owasp-source-${index}`}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1 ml-3"
                      >
                        {source.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                </div>
              </div>
              
              {/* Other framework organizations */}
              {Array.from(new Set(frameworks.map(f => f.organization)))
                .filter(org => org !== 'OWASP Foundation')
                .map(org => {
                  const orgFrameworks = frameworks.filter(f => f.organization === org)
                  return (
                    <div key={org}>
                      <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide mb-1">{org}</p>
                      {orgFrameworks.map(framework => (
                        <a 
                          key={framework.id}
                          href={framework.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1 ml-3"
                        >
                          {framework.name}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  )
                })}
              
              {/* Other research sources without URLs */}
              {frameworkCoverageKnowledge.sources
                .filter(s => !s.name.includes('OWASP') && !s.url)
                .length > 0 && (
                <div>
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide mb-1">Research Archives</p>
                  {frameworkCoverageKnowledge.sources
                    .filter(s => !s.name.includes('OWASP') && !s.url)
                    .map((source, index) => (
                      <div key={`research-${index}`} className="text-muted-foreground ml-3">
                        {source.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        )
      case 'cloud':
        return (
          <>
            <p className="font-medium mb-2">Cloud Provider Guidance</p>
            <p className="text-muted-foreground">
              [Placeholder: AWS, GCP, Azure specific implementation guidance]
            </p>
          </>
        )
      case 'history':
        return (
          <>
            <p className="font-medium mb-2">Coverage Evolution</p>
            <p className="text-muted-foreground">
              [Placeholder: Timeline showing how framework coverage has evolved]
            </p>
          </>
        )
      case 'download':
        return (
          <>
            <p className="font-medium mb-2">Download Options</p>
            <p className="text-muted-foreground">
              [Placeholder: Download as TypeScript, JSON, or Markdown report]
            </p>
          </>
        )
      case 'share':
        return (
          <>
            <p className="font-medium mb-2">Share This Analysis</p>
            <p className="text-muted-foreground">
              [Placeholder: Copy link or share on social media]
            </p>
          </>
        )
      default:
        return null
    }
  }
  
  // Main view rendering
  if (currentView === 'main') {
    return (
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <CardTitle>AI Security Framework Coverage</CardTitle>
            <Badge 
              variant={confidenceStatus.confidence >= 0.7 ? "default" : "secondary"}
              className="text-xs"
            >
              <Clock className="h-3 w-3 mr-1" />
              {confidenceStatus.status}
            </Badge>
          </div>
          <CardDescription>
            {withGuidance} of {frameworks.length} frameworks provide AI guidance • Average coverage: {avgCoverage}%
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {/* Framework list */}
            {frameworks.map((framework) => (
              <div key={framework.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                  <a 
                  href={framework.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm hover:text-primary hover:underline transition-colors flex items-center gap-1"
                  >
                  {framework.name}
                  <ExternalLink className="h-3 w-3" />
                  </a>

                    <Badge variant={getStatusVariant(framework.status)} className="text-xs">
                    {framework.status.replace('-', ' ')}
                  </Badge>
                </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(framework.aiCoverage.overall * 100)}%
                  </span>
                </div>
                
                <Progress 
                  value={framework.aiCoverage.overall * 100} 
                  className={cn("h-2", getProgressColor(framework.aiCoverage.overall))}
                />
                
                {/* Show most critical gap for low-coverage frameworks */}
                {framework.aiCoverage.overall < 0.4 && framework.gaps.length > 0 && (
                  <p className="text-xs text-muted-foreground flex items-start gap-1">
                    <AlertCircle className="h-3 w-3 text-danger mt-0.5 flex-shrink-0" />
                    <span>{framework.gaps[0]}</span>
                  </p>
                )}
                

              </div>
            ))}
          </div>
          
          {/* Footer - always at bottom */}
          <div className="flex-shrink-0 space-y-3 pt-4">
            <div className="border-t pt-3 text-xs text-muted-foreground">
              Last evaluated: {evaluation.date.toLocaleDateString()} by {evaluation.by}
              {confidenceStatus.daysUntilStale > 0 && (
                <span> • Review in {confidenceStatus.daysUntilStale} days</span>
              )}
            </div>
            
            {/* Metadata access icons */}
            <div className="pt-3 border-t">
              <IconBar />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  // Metadata view rendering
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-fit -ml-2"
          onClick={() => setCurrentView('main')}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {renderMetadataContent()}
        </div>
        
        {/* Icon bar at bottom of metadata views too */}
        <div className="flex-shrink-0 pt-4 mt-4 border-t">
          <IconBar />
        </div>
      </CardContent>
    </Card>
  )
}