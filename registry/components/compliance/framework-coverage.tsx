// registry/components/compliance/framework-coverage.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  frameworkCoverageKnowledge,
  getConfidenceStatus,
  getLatestChange 
} from "../../knowledge/framework-coverage"
import { AlertCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function FrameworkCoverage() {
  const { frameworks, evaluation } = frameworkCoverageKnowledge
  const confidenceStatus = getConfidenceStatus(frameworkCoverageKnowledge)
  
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
                <span className="font-medium text-sm">{framework.name}</span>
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
      </CardContent>
    </Card>
  )
}