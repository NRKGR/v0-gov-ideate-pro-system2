'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Download, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { AgentCard } from './agent-card';
import { IdeaCard } from './idea-card';
import { PayoffMatrix } from './payoff-matrix';
import { generate300Ideas, exportIdeasToCSV, downloadCSV, type ScoredIdea } from '@/lib/mock-data';

interface IdeatePhaseProps {
  ideas: ScoredIdea[];
  selectedIdea?: ScoredIdea | null;
  onIdeaSelect?: (idea: ScoredIdea | null) => void;
  onComplete: () => void;
  className?: string;
}

// カテゴリ一覧（デジタル庁の5本柱に対応）
const CATEGORIES = [
  'AI・自動化',
  '市民サービス',
  'データ活用',
  '防災・危機管理',
  'デジタルデバイド対策',
  'セキュリティ',
  '知識共有',
  '業務効率化',
];

export function IdeatePhase({ ideas, selectedIdea, onIdeaSelect, onComplete, className }: IdeatePhaseProps) {
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [showIdeas, setShowIdeas] = useState(false);
  const [allIdeas, setAllIdeas] = useState<ScoredIdea[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(20);
  
  // Generate all 300 ideas once when generation completes
  useEffect(() => {
    if (!isGenerating && allIdeas.length === 0) {
      const generated = generate300Ideas();
      setAllIdeas(generated);
    }
  }, [isGenerating, allIdeas.length]);
  
  // カテゴリ別集計
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach(cat => counts[cat] = 0);
    allIdeas.forEach(idea => {
      if (counts[idea.category] !== undefined) {
        counts[idea.category]++;
      }
    });
    return counts;
  }, [allIdeas]);
  
  // フィルタリングされたアイデア
  const filteredIdeas = useMemo(() => {
    return allIdeas.filter(idea => {
      const matchesSearch = searchQuery === '' || 
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === null || idea.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allIdeas, searchQuery, selectedCategory]);
  
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
              
              {/* カテゴリ別集計 */}
              <div className="grid grid-cols-4 gap-3">
                {CATEGORIES.slice(0, 4).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={cn(
                      "glass-card p-3 text-center transition-all cursor-pointer hover:border-primary/50",
                      selectedCategory === cat && "border-primary bg-primary/10"
                    )}
                  >
                    <p className="text-xl font-bold text-foreground">{categoryCounts[cat] || 0}</p>
                    <p className="text-xs text-muted-foreground">{cat}</p>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {CATEGORIES.slice(4).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={cn(
                      "glass-card p-3 text-center transition-all cursor-pointer hover:border-primary/50",
                      selectedCategory === cat && "border-primary bg-primary/10"
                    )}
                  >
                    <p className="text-xl font-bold text-foreground">{categoryCounts[cat] || 0}</p>
                    <p className="text-xs text-muted-foreground">{cat}</p>
                  </button>
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
            
            {/* 300案一覧（検索・フィルタ付き） */}
            {showIdeas && (
              <div className="space-y-4 fade-in-up">
                {/* 検索・フィルタ */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="アイデアを検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Button
                      variant={selectedCategory === null ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                    >
                      すべて
                    </Button>
                    {selectedCategory && (
                      <Badge variant="secondary" className="gap-1">
                        {selectedCategory}
                        <button 
                          onClick={() => setSelectedCategory(null)}
                          className="ml-1 hover:text-foreground"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* ヘッダー */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">アイデア一覧</h4>
                  </div>
                  <Badge variant="outline">{filteredIdeas.length}件 / 300件</Badge>
                </div>
                
                {/* アイデアリスト */}
                <div className="grid gap-4">
                  {filteredIdeas.slice(0, displayCount).map((idea, index) => (
                    <div key={idea.id} className="flex items-start gap-2">
                      <span className="text-xs font-medium text-muted-foreground w-6 pt-4">
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
                  ))}
                </div>
                
                {/* もっと見るボタン */}
                {displayCount < filteredIdeas.length && (
                  <div className="flex justify-center pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setDisplayCount(prev => Math.min(prev + 20, filteredIdeas.length))}
                    >
                      もっと見る（残り {filteredIdeas.length - displayCount} 件）
                    </Button>
                  </div>
                )}
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
