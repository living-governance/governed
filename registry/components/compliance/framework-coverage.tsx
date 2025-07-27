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
import { AlertCircle, Clock, ExternalLink, Download, Share2, Link, Info, Cloud, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function FrameworkCoverage() {
  const { frameworks, evaluation } = frameworkCoverageKnowledge
  const confidenceStatus = getConfidenceStatus(frameworkCoverageKnowledge)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  
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
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }
  
  return (
    <Card>
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
      
      <CardContent className="space-y-4">
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
            
            {/* Organization info */}
            <p className="text-xs text-muted-foreground">
              {framework.organization}
            </p>
          </div>
        ))}
        
        {/* Footer with evaluation info */}
        <div className="pt-4 border-t text-xs text-muted-foreground">
          Last evaluated: {evaluation.date.toLocaleDateString()} by {evaluation.by}
          {confidenceStatus.daysUntilStale > 0 && (
            <span> • Review in {confidenceStatus.daysUntilStale} days</span>
          )}
        </div>
        
        {/* Metadata access icons */}
        <div className="flex items-center gap-1 pt-3 mt-3 border-t">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => toggleSection('methodology')}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Methodology</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => toggleSection('sources')}
                >
                  <Link className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => toggleSection('cloud')}
                >
                  <Cloud className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cloud Guidance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => toggleSection('history')}
                >
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>History</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => toggleSection('download')}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => toggleSection('share')}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Expanded sections */}
        {expandedSection === 'methodology' && (
          <div className="mt-3 p-3 bg-muted rounded-md text-sm">
            <p className="font-medium mb-1">Evaluation Methodology</p>
            <p className="text-muted-foreground">
              [Placeholder: How we evaluate framework coverage - methodology from knowledge file]
            </p>
          </div>
        )}
        
        {expandedSection === 'sources' && (
          <div className="mt-3 p-3 bg-muted rounded-md text-sm">
            <p className="font-medium mb-1">Sources</p>
            <p className="text-muted-foreground">
              [Placeholder: Links to framework documentation and references]
            </p>
          </div>
        )}
        
        {expandedSection === 'cloud' && (
          <div className="mt-3 p-3 bg-muted rounded-md text-sm">
            <p className="font-medium mb-1">Cloud Provider Guidance</p>
            <p className="text-muted-foreground">
              [Placeholder: AWS, GCP, Azure specific implementation guidance]
            </p>
          </div>
        )}
        
        {expandedSection === 'history' && (
          <div className="mt-3 p-3 bg-muted rounded-md text-sm">
            <p className="font-medium mb-1">Coverage Evolution</p>
            <p className="text-muted-foreground">
              [Placeholder: Timeline showing how framework coverage has evolved]
            </p>
          </div>
        )}
        
        {expandedSection === 'download' && (
          <div className="mt-3 p-3 bg-muted rounded-md text-sm">
            <p className="font-medium mb-1">Download Options</p>
            <p className="text-muted-foreground">
              [Placeholder: Download as TypeScript, JSON, or Markdown report]
            </p>
          </div>
        )}
        
        {expandedSection === 'share' && (
          <div className="mt-3 p-3 bg-muted rounded-md text-sm">
            <p className="font-medium mb-1">Share This Analysis</p>
            <p className="text-muted-foreground">
              [Placeholder: Copy link or share on social media]
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}