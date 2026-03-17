'use client';

import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AgentCard } from './agent-card';
import { IdeaCard } from './idea-card';
import type { ScoredIdea } from '@/lib/mock-data';

interface IdeatePhaseProps {
  ideas: ScoredIdea[];
  onComplete: () => void;
  className?: string;
}

export function IdeatePhase({ ideas, onComplete, className }: IdeatePhaseProps) {
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [showIdeas, setShowIdeas] = useState(false);
  
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setTimeout(() => setShowIdeas(true), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);
  
  const generatedCount = Math.round((generationProgress / 100) * 300);
  
  return (
    <div className={cn('space-y-6', className)}>
      <AgentCard
        name="IDEATE 1"
        nameJa="拡散エージェント"
        description="300案の新規事業アイデア生成"
        icon="Lightbulb"
        status={isGenerating ? 'thinking' : 'complete'}
      >
        {!isGenerating && (
          <div className="space-y-6">
            {/* Generation Summary */}
            <div className="glass-card p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-score-high/20">
                    <CheckCircle2 className="h-5 w-5 text-score-high" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">300案の生成が完了しました</p>
                    <p className="text-sm text-muted-foreground">
                      マクロテーマに基づき、多角的な視点からアイデアを創出
                    </p>
                  </div>
                </div>
                <Badge className="bg-score-high/20 text-score-high text-lg px-3 py-1">
                  300案
                </Badge>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'AI・自動化', count: 78 },
                  { label: '市民サービス', count: 65 },
                  { label: 'データ活用', count: 52 },
                  { label: 'その他', count: 105 },
                ].map((cat) => (
                  <div key={cat.label} className="glass-card p-3 text-center">
                    <p className="text-xl font-bold text-foreground">{cat.count}</p>
                    <p className="text-xs text-muted-foreground">{cat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sample Ideas */}
            {showIdeas && (
              <div className="space-y-3 fade-in-up">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">サンプルアイデア（5案）</h4>
                </div>
                <div className="grid gap-4">
                  {ideas.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} variant="full" />
                  ))}
                </div>
              </div>
            )}
            
            {/* Next Phase Button */}
            <div className="flex justify-end pt-4">
              <Button onClick={onComplete} size="lg">
                評価・選別へ進む
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </AgentCard>
      
      {/* Generation Progress (shown while generating) */}
      {isGenerating && (
        <div className="glass-card p-6 space-y-4 fade-in-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="font-medium text-foreground">アイデア生成中...</span>
            </div>
            <span className="text-2xl font-bold text-primary">{generatedCount} / 300</span>
          </div>
          <Progress value={generationProgress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>政策課題からの展開</span>
            <span>技術トレンドとの融合</span>
            <span>ユーザー視点の創出</span>
          </div>
        </div>
      )}
    </div>
  );
}
