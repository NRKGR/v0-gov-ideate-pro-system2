'use client';

import { Shield, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScoreGauge } from './score-gauge';
import { ThinkingIndicator } from './thinking-indicator';
import type { AuditReport } from '@/lib/mock-data';
import { useState } from 'react';

interface AuditPanelProps {
  report: AuditReport | null;
  isProcessing?: boolean;
  className?: string;
}

export function AuditPanel({ report, isProcessing, className }: AuditPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    good: true,
    risks: true,
    advice: true,
    questions: false,
    detailed: false,
  });
  
  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">AUDIT</h2>
            <p className="text-xs text-muted-foreground">品質監査エージェント</p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {isProcessing ? (
            <ThinkingIndicator agentName="AUDIT" />
          ) : report ? (
            <>
              {/* Overall Score */}
              <div className="glass-card p-4 flex flex-col items-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  総合評価スコア
                </p>
                <ScoreGauge score={report.overallScore} size="lg" />
                <Badge
                  className={cn(
                    'mt-3',
                    report.overallScore >= 80
                      ? 'bg-score-high/20 text-score-high'
                      : report.overallScore >= 60
                      ? 'bg-score-medium/20 text-score-medium'
                      : 'bg-score-low/20 text-score-low'
                  )}
                >
                  {report.overallScore >= 80
                    ? '高評価'
                    : report.overallScore >= 60
                    ? '改善余地あり'
                    : '要検討'}
                </Badge>
              </div>
              
              {/* Good Points */}
              <CollapsibleSection
                title="Good Points"
                icon={<CheckCircle2 className="h-4 w-4 text-score-high" />}
                count={report.goodPoints.length}
                isExpanded={expandedSections.good}
                onToggle={() => toggleSection('good')}
                variant="success"
              >
                <ul className="space-y-2">
                  {report.goodPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-score-high shrink-0 mt-0.5" />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
              
              {/* Strategic Risks */}
              <CollapsibleSection
                title="Strategic Risks"
                icon={<AlertTriangle className="h-4 w-4 text-score-medium" />}
                count={report.strategicRisks.length}
                isExpanded={expandedSections.risks}
                onToggle={() => toggleSection('risks')}
                variant="warning"
              >
                <ul className="space-y-2">
                  {report.strategicRisks.map((risk, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-score-medium shrink-0 mt-0.5" />
                      <span className="text-foreground">{risk}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
              
              {/* Improvement Advice */}
              <CollapsibleSection
                title="Improvement Advice"
                icon={<Lightbulb className="h-4 w-4 text-primary" />}
                count={report.improvementAdvice.length}
                isExpanded={expandedSections.advice}
                onToggle={() => toggleSection('advice')}
                variant="primary"
              >
                <ul className="space-y-2">
                  {report.improvementAdvice.map((advice, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{advice}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
              
              {/* User Questions */}
              <CollapsibleSection
                title="ユーザーへの問いかけ"
                icon={<HelpCircle className="h-4 w-4 text-muted-foreground" />}
                count={report.userQuestions.length}
                isExpanded={expandedSections.questions}
                onToggle={() => toggleSection('questions')}
                variant="muted"
              >
                <ul className="space-y-3">
                  {report.userQuestions.map((question, i) => (
                    <li key={i} className="glass-card p-3 text-sm text-foreground">
                      <span className="text-primary font-medium">Q{i + 1}.</span> {question}
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
              
              {/* Detailed Scores */}
              <CollapsibleSection
                title="詳細スコア"
                icon={<Shield className="h-4 w-4 text-muted-foreground" />}
                count={report.detailedScores.length}
                isExpanded={expandedSections.detailed}
                onToggle={() => toggleSection('detailed')}
                variant="muted"
              >
                <div className="space-y-3">
                  {report.detailedScores.map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {item.category}
                        </span>
                        <span
                          className={cn(
                            'text-sm font-bold',
                            item.score >= 80
                              ? 'text-score-high'
                              : item.score >= 60
                              ? 'text-score-medium'
                              : 'text-score-low'
                          )}
                        >
                          {item.score}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-500',
                            item.score >= 80
                              ? 'bg-score-high'
                              : item.score >= 60
                              ? 'bg-score-medium'
                              : 'bg-score-low'
                          )}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{item.comment}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Shield className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground">
                分析を開始すると
                <br />
                監査レポートが表示されます
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  isExpanded: boolean;
  onToggle: () => void;
  variant: 'success' | 'warning' | 'primary' | 'muted';
  children: React.ReactNode;
}

function CollapsibleSection({
  title,
  icon,
  count,
  isExpanded,
  onToggle,
  variant,
  children,
}: CollapsibleSectionProps) {
  const borderColors = {
    success: 'border-l-score-high',
    warning: 'border-l-score-medium',
    primary: 'border-l-primary',
    muted: 'border-l-muted-foreground/30',
  };
  
  return (
    <div className={cn('glass-card border-l-2 overflow-hidden', borderColors[variant])}>
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 h-auto hover:bg-transparent"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-sm text-foreground">{title}</span>
          <Badge variant="secondary" className="text-xs">
            {count}
          </Badge>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
      {isExpanded && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}
