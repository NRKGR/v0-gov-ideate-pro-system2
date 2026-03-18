'use client';

import { ArrowRight, ArrowUpDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgentCard } from './agent-card';
import { IdeaCard } from './idea-card';
import type { ScoredIdea } from '@/lib/mock-data';
import { useState } from 'react';

interface FilterPhaseProps {
  ideas: ScoredIdea[];
  selectedIdea: ScoredIdea | null;
  onIdeaSelect: (idea: ScoredIdea | null) => void;
  onComplete: () => void;
  className?: string;
}

export function FilterPhase({
  ideas,
  selectedIdea,
  onIdeaSelect,
  onComplete,
  className,
}: FilterPhaseProps) {
  const [sortBy, setSortBy] = useState<'score' | 'feasibility' | 'impact'>('score');
  const [filterQuadrant, setFilterQuadrant] = useState<string | null>(null);
  
  // Sort and filter ideas
  const filteredIdeas = [...ideas]
    .filter(idea => !filterQuadrant || idea.quadrant === filterQuadrant)
    .sort((a, b) => {
      switch (sortBy) {
        case 'feasibility':
          return b.feasibility - a.feasibility;
        case 'impact':
          return b.impact - a.impact;
        default:
          return b.totalScore - a.totalScore;
      }
    })
    .slice(0, 20);
  
  const quadrantLabels: Record<string, string> = {
    'quick-win': '優先実施',
    'moonshot': '戦略検討',
    'core': '継続改善',
    'low-priority': '見送り検討',
  };
  
  return (
    <div className={cn('space-y-6', className)}>
      <AgentCard
        name="IDEATE 2"
        nameJa="選別エージェント"
        description="上位20案の比較・絞り込み"
        icon="Filter"
        status="complete"
      >
        <div className="space-y-6">
          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">並び替え:</span>
              {(['score', 'feasibility', 'impact'] as const).map((option) => (
                <Button
                  key={option}
                  variant={sortBy === option ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy(option)}
                >
                  {option === 'score' ? 'スコア' : option === 'feasibility' ? '実現性' : 'インパクト'}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">象限:</span>
              <Button
                variant={filterQuadrant === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterQuadrant(null)}
              >
                すべて
              </Button>
              {Object.entries(quadrantLabels).map(([key, label]) => (
                <Button
                  key={key}
                  variant={filterQuadrant === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterQuadrant(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Ideas Count */}
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">候補案一覧</h4>
            <Badge variant="outline">{filteredIdeas.length}件表示</Badge>
          </div>
          
          {/* Ideas List */}
          <div className="grid gap-4">
            {filteredIdeas.map((idea, index) => (
              <div key={idea.id} className="flex items-start gap-2">
                <span className="text-xs font-medium text-muted-foreground w-6 pt-4">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <IdeaCard
                    idea={idea}
                    isSelected={selectedIdea?.id === idea.id}
                    onSelect={onIdeaSelect}
                    variant="full"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Selected Idea Summary */}
          {selectedIdea && (
            <div className="glass-card border-l-4 border-l-primary p-4 space-y-2 fade-in-up">
              <p className="text-sm text-muted-foreground">選択中のアイデア</p>
              <p className="font-semibold text-foreground text-lg">{selectedIdea.title}</p>
              <p className="text-sm text-muted-foreground">{selectedIdea.description}</p>
            </div>
          )}
          
          {/* Next Phase Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={onComplete}
              size="lg"
              disabled={!selectedIdea}
            >
              ビジネス設計へ進む
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </AgentCard>
    </div>
  );
}
