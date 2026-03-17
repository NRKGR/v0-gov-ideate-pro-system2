'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, Sparkles, ChevronRight } from 'lucide-react';
import type { ScoredIdea } from '@/lib/mock-data';

interface IdeaCardProps {
  idea: ScoredIdea;
  isSelected?: boolean;
  onSelect?: (idea: ScoredIdea) => void;
  variant?: 'compact' | 'full';
  className?: string;
}

export function IdeaCard({
  idea,
  isSelected,
  onSelect,
  variant = 'full',
  className,
}: IdeaCardProps) {
  const quadrantColors = {
    'quick-win': 'border-l-score-high bg-score-high/5',
    'moonshot': 'border-l-primary bg-primary/5',
    'core': 'border-l-muted-foreground bg-muted/30',
    'low-priority': 'border-l-score-low bg-score-low/5',
  };
  
  const quadrantLabels = {
    'quick-win': 'Quick Win',
    'moonshot': 'Strategic Moonshot',
    'core': 'Sustainable Core',
    'low-priority': 'Low Priority',
  };
  
  const quadrantLabelColors = {
    'quick-win': 'bg-score-high/20 text-score-high',
    'moonshot': 'bg-primary/20 text-primary',
    'core': 'bg-muted text-muted-foreground',
    'low-priority': 'bg-score-low/20 text-score-low',
  };
  
  if (variant === 'compact') {
    return (
      <button
        onClick={() => onSelect?.(idea)}
        className={cn(
          'w-full text-left p-3 rounded-lg border border-border/50 transition-all',
          'hover:bg-accent/50 hover:border-primary/30',
          isSelected && 'border-primary bg-primary/10',
          className
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-sm text-foreground truncate">
            {idea.title}
          </span>
          <Badge variant="secondary" className="text-xs shrink-0">
            {idea.totalScore}点
          </Badge>
        </div>
      </button>
    );
  }
  
  return (
    <div
      className={cn(
        'glass-card border-l-4 overflow-hidden transition-all',
        quadrantColors[idea.quadrant],
        isSelected && 'ring-2 ring-primary',
        className
      )}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={cn('text-xs', quadrantLabelColors[idea.quadrant])}>
                {quadrantLabels[idea.quadrant]}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {idea.category}
              </Badge>
            </div>
            <h4 className="font-semibold text-foreground text-lg">{idea.title}</h4>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-foreground">{idea.totalScore}</div>
            <div className="text-xs text-muted-foreground">総合スコア</div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {idea.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-score-medium" />
            <span className="text-muted-foreground">実現性</span>
            <span className="font-medium text-foreground">{idea.feasibility}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-score-high" />
            <span className="text-muted-foreground">影響度</span>
            <span className="font-medium text-foreground">{idea.impact}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">新規性</span>
            <span className="font-medium text-foreground">{idea.novelty}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {idea.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-muted/50">
              {tag}
            </Badge>
          ))}
        </div>
        
        {idea.reasoning && (
          <div className="pt-3 border-t border-border/50">
            <p className="text-sm text-muted-foreground italic">
              {`"${idea.reasoning}"`}
            </p>
          </div>
        )}
        
        {onSelect && (
          <div className="pt-2">
            <Button
              onClick={() => onSelect(idea)}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              className="w-full"
            >
              {isSelected ? '選択中' : 'この案を選択'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
