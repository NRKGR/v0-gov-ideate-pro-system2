'use client';

import { ReactNode } from 'react';
import { Search, Lightbulb, Filter, PenTool, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ThinkingIndicator } from './thinking-indicator';

const iconMap = {
  Search,
  Lightbulb,
  Filter,
  PenTool,
  Shield,
};

type IconName = keyof typeof iconMap;

interface AgentCardProps {
  name: string;
  nameJa: string;
  description: string;
  icon: IconName;
  status: 'idle' | 'thinking' | 'complete';
  children?: ReactNode;
  className?: string;
  defaultExpanded?: boolean;
}

export function AgentCard({
  name,
  nameJa,
  description,
  icon,
  status,
  children,
  className,
  defaultExpanded = true,
}: AgentCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const Icon = iconMap[icon];
  
  const statusColors = {
    idle: 'bg-muted text-muted-foreground',
    thinking: 'bg-primary/20 text-primary animate-pulse',
    complete: 'bg-score-high/20 text-score-high',
  };
  
  const statusText = {
    idle: '待機中',
    thinking: '処理中',
    complete: '完了',
  };
  
  return (
    <div
      className={cn(
        'glass-card glass-card-hover overflow-hidden transition-all duration-300',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-glass-border">
        <div className="flex items-center gap-3">
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg',
            status === 'thinking' ? 'bg-primary/20' : 'bg-muted/50'
          )}>
            <Icon className={cn(
              'h-5 w-5',
              status === 'thinking' ? 'text-primary' : 'text-foreground'
            )} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{name}</h3>
              <Badge variant="secondary" className={cn('text-xs', statusColors[status])}>
                {statusText[status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{nameJa} - {description}</p>
          </div>
        </div>
        
        {status === 'complete' && children && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      
      {status === 'thinking' && (
        <div className="p-6">
          <ThinkingIndicator agentName={`${name} (${nameJa})`} />
        </div>
      )}
      
      {status === 'complete' && isExpanded && children && (
        <div className="p-4 fade-in-up">
          {children}
        </div>
      )}
    </div>
  );
}
