'use client';

import { Shield, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, ChevronDown, ChevronUp, Target, Layers, Sparkles, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScoreGauge } from './score-gauge';
import { ThinkingIndicator } from './thinking-indicator';
import type { 
  AuditReport, 
  PhaseType, 
  ScoredIdea, 
  PoolAuditReport, 
  IdeaAuditReport, 
  BMCAuditReport 
} from '@/lib/mock-data';
import { useState } from 'react';

interface AuditPanelProps {
  report: AuditReport | null;
  isProcessing?: boolean;
  className?: string;
  currentPhase?: PhaseType;
  selectedIdea?: ScoredIdea | null;
  poolAudit?: PoolAuditReport | null;
  ideaAudit?: IdeaAuditReport | null;
  bmcAudit?: BMCAuditReport | null;
}

export function AuditPanel({ 
  report, 
  isProcessing, 
  className,
  currentPhase = 'research',
  selectedIdea,
  poolAudit,
  ideaAudit,
  bmcAudit,
}: AuditPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    good: true,
    risks: true,
    advice: true,
    questions: false,
    detailed: false,
    scores: true,
  });
  
  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Determine the audit mode based on phase and selected idea
  const getAuditMode = () => {
    if (currentPhase === 'research') return 'research';
    if (currentPhase === 'ideate') {
      return selectedIdea ? 'ideate-idea' : 'ideate-pool';
    }
    if (currentPhase === 'filter') return 'filter';
    if (currentPhase === 'design') return 'design';
    return 'research';
  };

  const auditMode = getAuditMode();

  // Get the title based on mode
  const getAuditTitle = () => {
    switch (auditMode) {
      case 'research':
        return '政策分析評価';
      case 'ideate-pool':
        return 'アイデアプール評価';
      case 'ideate-idea':
        return 'アイデア個別評価';
      case 'filter':
        return '候補アイデア評価';
      case 'design':
        return 'BMC完成度評価';
      default:
        return '総合評価スコア';
    }
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
          ) : (
            <>
              {/* Research Phase - Original Report */}
              {auditMode === 'research' && report && (
                <ResearchAuditContent 
                  report={report} 
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                />
              )}

              {/* Ideate Phase - Pool Audit (no idea selected) */}
              {auditMode === 'ideate-pool' && poolAudit && (
                <PoolAuditContent 
                  audit={poolAudit}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                />
              )}

              {/* Ideate Phase - Individual Idea Audit */}
              {(auditMode === 'ideate-idea' || auditMode === 'filter') && ideaAudit && selectedIdea && (
                <IdeaAuditContent 
                  audit={ideaAudit}
                  idea={selectedIdea}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                />
              )}

              {/* Design Phase - BMC Audit */}
              {auditMode === 'design' && bmcAudit && (
                <BMCAuditContent 
                  audit={bmcAudit}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                />
              )}

              {/* Fallback for phases without specific audit */}
              {!report && !poolAudit && !ideaAudit && !bmcAudit && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-sm text-muted-foreground">
                    分析を開始すると
                    <br />
                    監査レポートが表示されます
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// Research Phase Audit Content (original)
function ResearchAuditContent({ 
  report, 
  expandedSections, 
  toggleSection 
}: { 
  report: AuditReport;
  expandedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
}) {
  return (
    <>
      {/* Overall Score */}
      <div className="glass-card p-4 flex flex-col items-center">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          政策分析評価
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
        title="Questions"
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
  );
}

// Pool Audit Content (for ideate phase without selection)
function PoolAuditContent({ 
  audit, 
  expandedSections, 
  toggleSection 
}: { 
  audit: PoolAuditReport;
  expandedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
}) {
  return (
    <>
      {/* Overall Score */}
      <div className="glass-card p-4 flex flex-col items-center">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          アイデアプール品質
        </p>
        <ScoreGauge score={audit.overallScore} size="lg" />
        <Badge
          className={cn(
            'mt-3',
            audit.overallScore >= 80
              ? 'bg-score-high/20 text-score-high'
              : audit.overallScore >= 60
              ? 'bg-score-medium/20 text-score-medium'
              : 'bg-score-low/20 text-score-low'
          )}
        >
          {audit.overallScore >= 80
            ? '高品質'
            : audit.overallScore >= 60
            ? '標準的'
            : '要改善'}
        </Badge>
      </div>

      {/* Dimension Scores */}
      <CollapsibleSection
        title="評価軸スコア"
        icon={<Layers className="h-4 w-4 text-primary" />}
        count={3}
        isExpanded={expandedSections.scores}
        onToggle={() => toggleSection('scores')}
        variant="primary"
      >
        <div className="space-y-3">
          {[
            { label: '多様性', score: audit.diversityScore, desc: 'カテゴリ・アプローチの幅' },
            { label: '創造性', score: audit.creativityScore, desc: '新規性・独自性' },
            { label: '網羅性', score: audit.coverageScore, desc: '政策課題のカバー率' },
          ].map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className={cn(
                  'text-sm font-bold',
                  item.score >= 80 ? 'text-score-high' : item.score >= 60 ? 'text-score-medium' : 'text-score-low'
                )}>
                  {item.score}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    item.score >= 80 ? 'bg-score-high' : item.score >= 60 ? 'bg-score-medium' : 'bg-score-low'
                  )}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>
      
      {/* Good Points */}
      <CollapsibleSection
        title="Good Points"
        icon={<CheckCircle2 className="h-4 w-4 text-score-high" />}
        count={audit.goodPoints.length}
        isExpanded={expandedSections.good}
        onToggle={() => toggleSection('good')}
        variant="success"
      >
        <ul className="space-y-2">
          {audit.goodPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-score-high shrink-0 mt-0.5" />
              <span className="text-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>
      
      {/* Gaps */}
      <CollapsibleSection
        title="カバレッジ不足"
        icon={<AlertTriangle className="h-4 w-4 text-score-medium" />}
        count={audit.gaps.length}
        isExpanded={expandedSections.risks}
        onToggle={() => toggleSection('risks')}
        variant="warning"
      >
        <ul className="space-y-2">
          {audit.gaps.map((gap, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-score-medium shrink-0 mt-0.5" />
              <span className="text-foreground">{gap}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Recommendations */}
      <CollapsibleSection
        title="推奨アクション"
        icon={<Lightbulb className="h-4 w-4 text-primary" />}
        count={audit.recommendations.length}
        isExpanded={expandedSections.advice}
        onToggle={() => toggleSection('advice')}
        variant="primary"
      >
        <ul className="space-y-2">
          {audit.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <div className="glass-card p-3 text-center">
        <p className="text-xs text-muted-foreground">
          アイデアを選択すると個別評価を表示
        </p>
      </div>
    </>
  );
}

// Individual Idea Audit Content
function IdeaAuditContent({ 
  audit,
  idea,
  expandedSections, 
  toggleSection 
}: { 
  audit: IdeaAuditReport;
  idea: ScoredIdea;
  expandedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
}) {
  return (
    <>
      {/* Selected Idea Info */}
      <div className="glass-card p-3 border-l-2 border-l-primary">
        <p className="text-xs text-muted-foreground mb-1">選択中</p>
        <p className="text-sm font-semibold text-foreground line-clamp-2">{idea.title}</p>
      </div>

      {/* Overall Score */}
      <div className="glass-card p-4 flex flex-col items-center">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          アイデア評価
        </p>
        <ScoreGauge score={audit.overallScore} size="lg" />
        <Badge
          className={cn(
            'mt-3',
            audit.overallScore >= 80
              ? 'bg-score-high/20 text-score-high'
              : audit.overallScore >= 60
              ? 'bg-score-medium/20 text-score-medium'
              : 'bg-score-low/20 text-score-low'
          )}
        >
          {audit.overallScore >= 80
            ? '高評価'
            : audit.overallScore >= 60
            ? '有望'
            : '要検討'}
        </Badge>
      </div>

      {/* Dimension Scores */}
      <CollapsibleSection
        title="評価軸スコア"
        icon={<Target className="h-4 w-4 text-primary" />}
        count={4}
        isExpanded={expandedSections.scores}
        onToggle={() => toggleSection('scores')}
        variant="primary"
      >
        <div className="space-y-3">
          {[
            { label: '実現可能性', score: audit.feasibilityScore },
            { label: 'インパクト', score: audit.impactScore },
            { label: '独自性', score: audit.noveltyScore },
            { label: '政策整合性', score: audit.policyAlignmentScore },
          ].map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className={cn(
                  'text-sm font-bold',
                  item.score >= 80 ? 'text-score-high' : item.score >= 60 ? 'text-score-medium' : 'text-score-low'
                )}>
                  {item.score}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    item.score >= 80 ? 'bg-score-high' : item.score >= 60 ? 'bg-score-medium' : 'bg-score-low'
                  )}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>
      
      {/* Good Points */}
      <CollapsibleSection
        title="Good Points"
        icon={<CheckCircle2 className="h-4 w-4 text-score-high" />}
        count={audit.goodPoints.length}
        isExpanded={expandedSections.good}
        onToggle={() => toggleSection('good')}
        variant="success"
      >
        <ul className="space-y-2">
          {audit.goodPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-score-high shrink-0 mt-0.5" />
              <span className="text-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>
      
      {/* Risks */}
      <CollapsibleSection
        title="リスク・懸念点"
        icon={<AlertTriangle className="h-4 w-4 text-score-medium" />}
        count={audit.risks.length}
        isExpanded={expandedSections.risks}
        onToggle={() => toggleSection('risks')}
        variant="warning"
      >
        <ul className="space-y-2">
          {audit.risks.map((risk, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-score-medium shrink-0 mt-0.5" />
              <span className="text-foreground">{risk}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Recommendations */}
      <CollapsibleSection
        title="推奨アクション"
        icon={<Lightbulb className="h-4 w-4 text-primary" />}
        count={audit.recommendations.length}
        isExpanded={expandedSections.advice}
        onToggle={() => toggleSection('advice')}
        variant="primary"
      >
        <ul className="space-y-2">
          {audit.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>
    </>
  );
}

// BMC Audit Content
function BMCAuditContent({ 
  audit, 
  expandedSections, 
  toggleSection 
}: { 
  audit: BMCAuditReport;
  expandedSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
}) {
  return (
    <>
      {/* Overall Score */}
      <div className="glass-card p-4 flex flex-col items-center">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          BMC完成度
        </p>
        <ScoreGauge score={audit.overallScore} size="lg" />
        <Badge
          className={cn(
            'mt-3',
            audit.overallScore >= 80
              ? 'bg-score-high/20 text-score-high'
              : audit.overallScore >= 60
              ? 'bg-score-medium/20 text-score-medium'
              : 'bg-score-low/20 text-score-low'
          )}
        >
          {audit.overallScore >= 80
            ? '完成度高'
            : audit.overallScore >= 60
            ? '改善余地あり'
            : '要補強'}
        </Badge>
      </div>

      {/* Dimension Scores */}
      <CollapsibleSection
        title="評価軸スコア"
        icon={<FileCheck className="h-4 w-4 text-primary" />}
        count={3}
        isExpanded={expandedSections.scores}
        onToggle={() => toggleSection('scores')}
        variant="primary"
      >
        <div className="space-y-3">
          {[
            { label: '完全性', score: audit.completenessScore, desc: '9要素の記述充実度' },
            { label: '整合性', score: audit.consistencyScore, desc: '要素間の論理的一貫性' },
            { label: '実現性', score: audit.viabilityScore, desc: 'ビジネスとしての成立性' },
          ].map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className={cn(
                  'text-sm font-bold',
                  item.score >= 80 ? 'text-score-high' : item.score >= 60 ? 'text-score-medium' : 'text-score-low'
                )}>
                  {item.score}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    item.score >= 80 ? 'bg-score-high' : item.score >= 60 ? 'bg-score-medium' : 'bg-score-low'
                  )}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>
      
      {/* Good Points */}
      <CollapsibleSection
        title="Good Points"
        icon={<CheckCircle2 className="h-4 w-4 text-score-high" />}
        count={audit.goodPoints.length}
        isExpanded={expandedSections.good}
        onToggle={() => toggleSection('good')}
        variant="success"
      >
        <ul className="space-y-2">
          {audit.goodPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-score-high shrink-0 mt-0.5" />
              <span className="text-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>
      
      {/* Weaknesses */}
      <CollapsibleSection
        title="弱点・課題"
        icon={<AlertTriangle className="h-4 w-4 text-score-medium" />}
        count={audit.weaknesses.length}
        isExpanded={expandedSections.risks}
        onToggle={() => toggleSection('risks')}
        variant="warning"
      >
        <ul className="space-y-2">
          {audit.weaknesses.map((weakness, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-score-medium shrink-0 mt-0.5" />
              <span className="text-foreground">{weakness}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Recommendations */}
      <CollapsibleSection
        title="推奨アクション"
        icon={<Lightbulb className="h-4 w-4 text-primary" />}
        count={audit.recommendations.length}
        isExpanded={expandedSections.advice}
        onToggle={() => toggleSection('advice')}
        variant="primary"
      >
        <ul className="space-y-2">
          {audit.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>
    </>
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
