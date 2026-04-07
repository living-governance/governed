"use client"

import {
  LayoutGrid,
  Box,
  MessageSquare,
  Link,
  Sun,
  Moon,
  User,
  Settings,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type ViewType = 'dashboard' | 'components'

interface ActivityBarProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
  onChatToggle: () => void
  isDark: boolean
  onThemeToggle: () => void
}

function ActivityBarButton({
  icon: Icon,
  label,
  isActive = false,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  isActive?: boolean
  onClick?: () => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "relative flex h-10 w-full items-center justify-center rounded-md",
            "hover:bg-accent hover:text-accent-foreground transition-colors",
            isActive
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {isActive && (
            <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-foreground" />
          )}
          <Icon className="h-5 w-5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export function ActivityBar({
  activeView,
  onViewChange,
  onChatToggle,
  isDark,
  onThemeToggle,
}: ActivityBarProps) {
  return (
    <div className="flex h-full w-12 flex-col border-r bg-secondary">
      {/* Views */}
      <div className="flex flex-col gap-1 px-1 pt-2">
        <ActivityBarButton
          icon={LayoutGrid}
          label="Dashboard"
          isActive={activeView === 'dashboard'}
          onClick={() => onViewChange('dashboard')}
        />
        <ActivityBarButton
          icon={Box}
          label="Components"
          isActive={activeView === 'components'}
          onClick={() => onViewChange('components')}
        />
      </div>

      {/* Interaction */}
      <div className="flex flex-col gap-1 border-t px-1 pt-2 mt-2">
        <ActivityBarButton
          icon={MessageSquare}
          label="Chat"
          onClick={onChatToggle}
        />
        <ActivityBarButton
          icon={Link}
          label="MCP"
        />
      </div>

      {/* System — pushed to bottom */}
      <div className="mt-auto flex flex-col gap-1 border-t px-1 py-2">
        <ActivityBarButton
          icon={isDark ? Sun : Moon}
          label={isDark ? "Light mode" : "Dark mode"}
          onClick={onThemeToggle}
        />
        <ActivityBarButton
          icon={User}
          label="Profile"
        />
        <ActivityBarButton
          icon={Settings}
          label="Settings"
        />
      </div>
    </div>
  )
}
