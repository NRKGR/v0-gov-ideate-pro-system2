'use client';

import { FileText, TrendingUp, AlertCircle, Calendar, Wallet, ArrowRight, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgentCard } from './agent-card';
import { ThinkingIndicator } from './thinking-indicator';
import type { ResearchOutput } from '@/lib/mock-data';

interface ResearchPhaseProps {
  data: ResearchOutput;
  isProcessing: boolean;
  onComplete: () => void;
  className?: string;
}

export function ResearchPhase({ data, isProcessing, onComplete, className }: ResearchPhaseProps) {
  if (isProcessing) {
    return (
      <div className={cn('space-y-6', className)}>
        <AgentCard
          name="GENERATE"
          nameJa="調査エージェント"
          description="政策分析・予算調査・マクロテーマ抽出"
          icon="Search"
          status="thinking"
        />
      </div>
    );
  }
  
  return (
    <div className={cn('space-y-6', className)}>
      <AgentCard
        name="GENERATE"
        nameJa="調査エージェント"
        description="政策分析・予算調査・マクロテーマ抽出"
        icon="Search"
        status="complete"
      >
        <div className="space-y-6">
          {/* Policy Analysis */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-foreground">政策分析</h4>
            </div>
            <div className="glass-card p-4 space-y-4">
              <p className="text-sm text-foreground leading-relaxed">
                {data.policyAnalysis.currentPolicy}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Challenges */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-score-medium" />
                    <span className="text-sm font-medium text-foreground">課題</span>
                  </div>
                  <ul className="space-y-1.5">
                    {data.policyAnalysis.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-score-medium mt-1">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Opportunities */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-score-high" />
                    <span className="text-sm font-medium text-foreground">機会</span>
                  </div>
                  <ul className="space-y-1.5">
                    {data.policyAnalysis.opportunities.map((opportunity, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-score-high mt-1">•</span>
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Budget Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-foreground">予算情報</h4>
            </div>
            <div className="glass-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">総予算規模</span>
                <span className="text-lg font-bold text-foreground">{data.budgetInfo.totalBudget}</span>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-foreground">関連プログラム</span>
                <div className="grid gap-2">
                  {data.budgetInfo.relatedPrograms.map((program, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-sm text-muted-foreground">{program.name}</span>
                      <span className="text-sm font-medium text-foreground">{program.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Macro Themes */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-foreground">マクロテーマ</h4>
            </div>
            <div className="grid gap-3">
              {data.macroThemes.map((theme, i) => (
                <div key={i} className="glass-card p-4 space-y-2">
                  <h5 className="font-medium text-foreground">{theme.title}</h5>
                  <p className="text-sm text-muted-foreground">{theme.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {theme.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Timeline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <h4 className="font-semibold text-foreground">ロードマップ</h4>
            </div>
            <div className="glass-card p-4">
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-4">
                  {data.timeline.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      <div className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background z-10',
                        i === 0 ? 'border-primary' : 'border-muted-foreground/30'
                      )}>
                        <span className={cn(
                          'text-xs font-medium',
                          i === 0 ? 'text-primary' : 'text-muted-foreground'
                        )}>
                          {item.year.slice(-2)}
                        </span>
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{item.year}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.milestone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Next Phase Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={onComplete} size="lg">
              アイデア生成へ進む
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </AgentCard>
    </div>
  );
}
