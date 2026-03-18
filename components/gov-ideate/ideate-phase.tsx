'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AgentCard } from './agent-card';
import { IdeaCard } from './idea-card';
import { IdeasListModal } from './ideas-list-modal';
import { PayoffMatrix } from './payoff-matrix';
import { generate300Ideas, exportIdeasToCSV, downloadCSV, type ScoredIdea } from '@/lib/mock-data';

interface IdeatePhaseProps {
  ideas: ScoredIdea[];
  selectedIdea?: ScoredIdea | null;
  onIdeaSelect?: (idea: ScoredIdea | null) => void;
  onComplete: () => void;
  className?: string;
}

export function IdeatePhase({ ideas, selectedIdea, onIdeaSelect, onComplete, className }: IdeatePhaseProps) {
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [showIdeas, setShowIdeas] = useState(false);
  const [allIdeas, setAllIdeas] = useState<ScoredIdea[]>([]);
  const [top20Ideas, setTop20Ideas] = useState<ScoredIdea[]>([]);
  
  // Generate all 300 ideas once when generation completes
  useEffect(() => {
    if (!isGenerating && allIdeas.length === 0) {
      const generated = generate300Ideas();
      setAllIdeas(generated);
      // Sort by totalScore descending and get top 20
      const sorted = [...generated].sort((a, b) => b.totalScore - a.totalScore);
      setTop20Ideas(sorted.slice(0, 20));
    }
  }, [isGenerating, allIdeas.length]);
  
  const handleExportCSV = useCallback(() => {
    const ideasToExport = allIdeas.length > 0 ? allIdeas : generate300Ideas();
    const csv = exportIdeasToCSV(ideasToExport);
    const timestamp = new Date().toISOString().slice(0, 10);
    downloadCSV(csv, `gov-ideate-300ideas-${timestamp}.csv`);
  }, [allIdeas]);
  
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
                <div className="flex items-center gap-2">
                  <IdeasListModal
                    ideas={allIdeas}
                    selectedIdea={selectedIdea}
                    onIdeaSelect={onIdeaSelect}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleExportCSV}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    CSV出力
                  </Button>
                  <Badge className="bg-score-high/20 text-score-high text-lg px-3 py-1">
                    300案
                  </Badge>
                </div>
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
            
{/* Payoff Matrix - 300 ideas */}
            {showIdeas && allIdeas.length > 0 && (
              <div className="space-y-3 fade-in-up">
                <h4 className="font-semibold text-foreground">ペイオフマトリクス（300案全体）</h4>
                <PayoffMatrix
                  ideas={allIdeas}
                  selectedIdea={selectedIdea}
                  onIdeaSelect={onIdeaSelect}
                />
              </div>
            )}
            
            {/* Top 20 Ideas */}
            {showIdeas && (
              <div className="space-y-3 fade-in-up">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">上位20案</h4>
                  <Badge variant="outline" className="ml-2">スコア順</Badge>
                </div>
                <div className="grid gap-4">
                  {top20Ideas.map((idea, index) => (
                    <div key={idea.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground w-6">
                          {index + 1}.
                        </span>
                        <div className="flex-1">
                          <IdeaCard 
                            idea={idea} 
                            variant="full"
                            isSelected={selectedIdea?.id === idea.id}
                            onSelect={onIdeaSelect}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
                      {/* Show indicator for similar ideas (not the first one which is the target) */}
                      {index > 0 && sampleIdeas[0]?.id === selectedIdea?.id && (
                        <p className="text-xs text-muted-foreground text-center">
                          類似案
                        </p>
                      )}
                    </div>
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
