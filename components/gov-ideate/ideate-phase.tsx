'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Download, Search, Filter, ChevronDown, ChevronUp, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { AgentCard } from './agent-card';
import { IdeaCard } from './idea-card';
import { IdeasListModal } from './ideas-list-modal';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(20);
  
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
  
  // フィルタリング・ソート済みの全アイデア
  const sortedFilteredIdeas = useMemo(() => {
    const filtered = allIdeas.filter(idea => {
      const matchesSearch = searchQuery === '' || 
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === null || idea.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    // スコア降順でソート
    return filtered.sort((a, b) => b.totalScore - a.totalScore);
  }, [allIdeas, searchQuery, selectedCategory]);
  
  // 上位5案
  const top5Ideas = useMemo(() => sortedFilteredIdeas.slice(0, 5), [sortedFilteredIdeas]);
  
  // 残りのアイデア（6位以降）
  const remainingIdeas = useMemo(() => {
    const remaining = sortedFilteredIdeas.slice(5);
    return remaining.slice(0, loadedCount);
  }, [sortedFilteredIdeas, loadedCount]);
  
  const totalRemaining = sortedFilteredIdeas.length - 5;
  const hasMoreToLoad = remainingIdeas.length < totalRemaining;
  
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
            <div className="glass-card p-4">
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
            </div>
            
            {/* カテゴリ別集計 */}
            {showIdeas && (
              <div className="space-y-3 fade-in-up">
                <h4 className="font-semibold text-foreground">カテゴリ別集計</h4>
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
                    <h4 className="font-semibold text-foreground">スコアランキング TOP5</h4>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    総合スコア順
                  </Badge>
                </div>
                
                {/* アイデアリスト - ランキング形式 */}
                <div className="grid gap-4">
                  {top5Ideas.map((idea, index) => {
                    const rank = index + 1;
                    const rankStyles = {
                      1: 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-amber-500/30',
                      2: 'bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-lg shadow-slate-400/30',
                      3: 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-500/30',
                    };
                    const defaultRankStyle = 'bg-muted text-muted-foreground';
                    
                    return (
                      <div key={idea.id} className="flex items-start gap-3">
                        {/* ランキングバッジ */}
                        <div className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-lg mt-3",
                          rankStyles[rank as keyof typeof rankStyles] || defaultRankStyle
                        )}>
                          {rank}
                        </div>
                        <div className="flex-1">
                          <IdeaCard 
                            idea={idea} 
                            variant="full"
                            isSelected={selectedIdea?.id === idea.id}
                            onSelect={onIdeaSelect}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* 残りのアイデア（折りたたみ） */}
                {totalRemaining > 0 && (
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-dashed border-border",
                        "hover:border-primary/50 hover:bg-muted/50 transition-all",
                        "text-sm font-medium text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          6位以降を閉じる
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          他 {totalRemaining}件を表示（6位〜）
                        </>
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="space-y-2 fade-in-up">
                        {/* コンパクトリスト */}
                        <div className="glass-card divide-y divide-border">
                          {remainingIdeas.map((idea, index) => {
                            const rank = index + 6;
                            return (
                              <div
                                key={idea.id}
                                onClick={() => onIdeaSelect?.(idea)}
                                className={cn(
                                  "flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-muted/50",
                                  selectedIdea?.id === idea.id && "bg-primary/10"
                                )}
                              >
                                {/* 順位 */}
                                <span className="w-8 text-sm font-medium text-muted-foreground text-right">
                                  {rank}位
                                </span>
                                {/* スコア */}
                                <span className={cn(
                                  "w-10 text-sm font-bold",
                                  idea.totalScore >= 75 ? 'text-score-high' :
                                  idea.totalScore >= 60 ? 'text-score-medium' : 'text-score-low'
                                )}>
                                  {idea.totalScore}
                                </span>
                                {/* タイトル */}
                                <span className="flex-1 text-sm font-medium text-foreground truncate">
                                  {idea.title}
                                </span>
                                {/* カテゴリ */}
                                <Badge variant="outline" className="text-xs shrink-0">
                                  {idea.category}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* もっと読み込むボタン */}
                        {hasMoreToLoad && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setLoadedCount(prev => prev + 20)}
                            className="w-full"
                          >
                            さらに20件読み込む（残り {totalRemaining - remainingIdeas.length}件）
                          </Button>
                        )}
                      </div>
                    )}
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
