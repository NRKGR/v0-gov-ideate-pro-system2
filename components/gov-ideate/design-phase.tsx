'use client';

import { CheckCircle2, Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgentCard } from './agent-card';
import { BMCCanvas } from './bmc-canvas';
import type { ScoredIdea, BMCData } from '@/lib/mock-data';

interface DesignPhaseProps {
  idea: ScoredIdea;
  bmcData: BMCData;
  className?: string;
}

export function DesignPhase({ idea, bmcData, className }: DesignPhaseProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Selected Idea Summary */}
      <div className="glass-card p-4 border-l-4 border-l-primary">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/20 text-primary">設計対象</Badge>
            </div>
            <h3 className="text-xl font-bold text-foreground">{idea.title}</h3>
            <p className="text-sm text-muted-foreground">{idea.description}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-3xl font-bold text-primary">{idea.totalScore}</div>
            <div className="text-xs text-muted-foreground">総合スコア</div>
          </div>
        </div>
      </div>
      
      <AgentCard
        name="IDEATE 3"
        nameJa="設計エージェント"
        description="ビジネスモデルキャンバス作成"
        icon="PenTool"
        status="complete"
      >
        <div className="space-y-6">
          {/* BMC Canvas */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Business Model Canvas</h4>
            <BMCCanvas data={bmcData} />
          </div>
          
          {/* Completion Status */}
          <div className="glass-card p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-score-high/20">
                <CheckCircle2 className="h-5 w-5 text-score-high" />
              </div>
              <div>
                <p className="font-semibold text-foreground">分析が完了しました</p>
                <p className="text-sm text-muted-foreground">
                  全フェーズの処理が正常に完了しました。結果をご確認ください。
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 pt-2">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                レポート出力
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                共有
              </Button>
            </div>
          </div>
        </div>
      </AgentCard>
    </div>
  );
}
