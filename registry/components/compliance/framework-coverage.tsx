// registry/components/compliance/framework-coverage.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  frameworkCoverageKnowledge,
  getConfidenceStatus,
  getLatestChange 
} from "../../knowledge/framework-coverage"
import { AlertCircle, Clock, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function FrameworkCoverage() {
  const { frameworks, insights, evaluation, timeline } = frameworkCoverageKnowledge
  const confidenceStatus = getConfidenceStatus(frameworkCoverageKnowledge)
  const latestChange = getLatestChange(frameworkCoverageKnowledge)
  
  // Function to determine color based on coverage percentage
  const getProgressColor = (coverage: number) => {
    if (coverage >= 0.7) return "[&>*]:bg-success"
    if (coverage >= 0.4) return "[&>*]:bg-warning"
    return "[&>*]:bg-danger"
  }
  
  // Badge color based on confidence
  const getConfidenceBadgeVariant = (confidence: number) => {
    if (confidence >= 0.7) return "default"
    if (confidence >= 0.5) return "secondary"
    return "destructive"
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>Framework Coverage</CardTitle>
            <CardDescription>
              How well security frameworks address AI-specific threats
            </CardDescription>
          </div>
          <Badge 
            variant={getConfidenceBadgeVariant(confidenceStatus.confidence) as any}
            className="text-xs"
          >
            <Clock className="h-3 w-3 mr-1" />
            {confidenceStatus.status}
          </Badge>
        </div>
        
        {/* Living Knowledge metadata */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Info className="h-3 w-3" />
            Evaluated: {evaluation.date.toLocaleDateString()} by {evaluation.by}
          </span>
          {confidenceStatus.daysUntilStale > 0 && (
            <span>
              • Review in {confidenceStatus.daysUntilStale} days
            </span>
          )}
          {timeline.length > 0 && (
            <span className="block w-full mt-1 italic">
              Latest: {latestChange}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {frameworks.map((framework) => (
          <div key={framework.id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{framework.name}</span>
              <span className="text-muted-foreground">
                {Math.round(framework.aiCoverage.overall * 100)}%
              </span>
            </div>
            <Progress 
              value={framework.aiCoverage.overall * 100} 
              className={cn("h-2", getProgressColor(framework.aiCoverage.overall))}
            />
            {framework.aiCoverage.overall < 0.4 && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertCircle className="h-3 w-3 text-danger" />
                {framework.gaps[0]}
              </p>
            )}
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {insights[0]}
          </p>
          <a 
            href="/patterns/compliance/framework-gaps" 
            className="text-sm text-primary hover:underline"
          >
            View detailed gap analysis →
          </a>
        </div>
      </CardContent>
    </Card>
  )
}