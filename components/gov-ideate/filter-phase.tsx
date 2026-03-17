'use client';

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AgentCard } from './agent-card';
import { PayoffMatrix } from './payoff-matrix';
import { IdeaCard } from './idea-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ScoredIdea } from '@/lib/mock-data';

interface FilterPhaseProps {
  ideas: ScoredIdea[];
  selectedIdea: ScoredIdea | null;
  onIdeaSelect: (idea: ScoredIdea) => void;
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
  const topIdeas = [...ideas]
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 5);
  
  return (
    <div className={cn('space-y-6', className)}>
      <AgentCard
        name="IDEATE 2"
        nameJa="選別エージェント"
        description="ペイオフマトリクスによる評価・選別"
        icon="Filter"
        status="complete"
      >
        <div className="space-y-6">
          {/* Payoff Matrix */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">ペイオフマトリクス</h4>
            <div className="glass-card p-4">
              <PayoffMatrix
                ideas={ideas}
                selectedIdea={selectedIdea}
                onIdeaSelect={onIdeaSelect}
              />
            </div>
          </div>
          
          {/* Top Ideas List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Top 5 候補案</h4>
            <div className="grid gap-4">
              {topIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  isSelected={selectedIdea?.id === idea.id}
                  onSelect={onIdeaSelect}
                  variant="full"
                />
              ))}
            </div>
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
