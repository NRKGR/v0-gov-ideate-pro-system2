'use client';

import { Search, Lightbulb, Filter, PenTool, Check, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import type { PhaseType } from '@/lib/mock-data';

interface PhaseSidebarProps {
  currentPhase: PhaseType;
  completedPhases: PhaseType[];
  onPhaseClick?: (phase: PhaseType) => void;
  className?: string;
}

const phases = [
  { id: 'input' as const, name: '入力', icon: ClipboardList, description: '省庁・分野選択' },
  { id: 'research' as const, name: '調査', icon: Search, description: '政策分析' },
  { id: 'ideate' as const, name: '拡散', icon: Lightbulb, description: '300案生成' },
  { id: 'filter' as const, name: '選別', icon: Filter, description: 'マトリクス評価' },
  { id: 'design' as const, name: '設計', icon: PenTool, description: 'BMC作成' },
];

export function PhaseSidebar({
  currentPhase,
  completedPhases,
  onPhaseClick,
  className,
}: PhaseSidebarProps) {
  const currentPhaseIndex = phases.findIndex((p) => p.id === currentPhase);
  const progressPercent = ((currentPhaseIndex + 1) / phases.length) * 100;
  
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <span className="text-lg font-bold text-primary">G</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">GOV-IDEATE</h1>
            <p className="text-xs text-muted-foreground">Pro Edition</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">進捗</span>
            <span className="text-foreground font-medium">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>
      </div>
      
      {/* Phase List */}
      <div className="flex-1 p-3 space-y-1">
        <p className="text-xs font-medium text-muted-foreground px-2 mb-2">フェーズ</p>
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const isCompleted = completedPhases.includes(phase.id);
          const isCurrent = currentPhase === phase.id;
          const isClickable = isCompleted || isCurrent || phases.findIndex(p => p.id === phase.id) <= currentPhaseIndex;
          
          return (
            <button
              key={phase.id}
              onClick={() => isClickable && onPhaseClick?.(phase.id)}
              disabled={!isClickable}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left',
                isCurrent && 'bg-primary/10 border border-primary/30',
                isCompleted && !isCurrent && 'bg-score-high/5 hover:bg-score-high/10',
                !isCurrent && !isCompleted && isClickable && 'hover:bg-muted/50',
                !isClickable && 'opacity-40 cursor-not-allowed'
              )}
            >
              <div className={cn(
                'relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all',
                isCurrent && 'border-primary bg-primary/20',
                isCompleted && 'border-score-high bg-score-high/20',
                !isCurrent && !isCompleted && 'border-muted-foreground/30 bg-muted/30'
              )}>
                {isCompleted ? (
                  <Check className="h-4 w-4 text-score-high" />
                ) : (
                  <Icon className={cn(
                    'h-4 w-4',
                    isCurrent ? 'text-primary' : 'text-muted-foreground'
                  )} />
                )}
                {isCurrent && (
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'font-medium text-sm',
                    isCurrent ? 'text-primary' : isCompleted ? 'text-score-high' : 'text-foreground'
                  )}>
                    {phase.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {index + 1}/{phases.length}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {phase.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Agent Status */}
      <div className="p-4 border-t border-border/50">
        <p className="text-xs font-medium text-muted-foreground mb-3">エージェント状態</p>
        <div className="grid grid-cols-5 gap-2">
          {['G', 'I1', 'I2', 'I3', 'A'].map((label, i) => {
            const isActive = i <= currentPhaseIndex;
            return (
              <div
                key={label}
                className={cn(
                  'flex h-8 w-full items-center justify-center rounded text-xs font-medium transition-all',
                  isActive ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'
                )}
                title={['GENERATE', 'IDEATE 1', 'IDEATE 2', 'IDEATE 3', 'AUDIT'][i]}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
