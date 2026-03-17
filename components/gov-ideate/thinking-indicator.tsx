'use client';

import { Brain, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThinkingIndicatorProps {
  agentName?: string;
  className?: string;
  variant?: 'compact' | 'full';
}

export function ThinkingIndicator({
  agentName,
  className,
  variant = 'full',
}: ThinkingIndicatorProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2 text-muted-foreground', className)}>
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span className="text-sm">思考中...</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'glass-card p-6 flex flex-col items-center justify-center gap-4',
        className
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl thinking-pulse" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
          <Brain className="h-8 w-8 text-primary animate-pulse" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        {agentName && (
          <p className="text-sm font-medium text-primary">{agentName}</p>
        )}
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-lg font-medium text-foreground">思考中</span>
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary thinking-dot" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary thinking-dot" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary thinking-dot" />
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          AIエージェントが分析を行っています
        </p>
      </div>
    </div>
  );
}
