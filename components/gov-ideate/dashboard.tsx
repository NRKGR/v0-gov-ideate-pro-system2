'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PhaseSidebar } from './phase-sidebar';
import { AuditPanel } from './audit-panel';
import { InputForm } from './input-form';
import { ThemeToggle } from './theme-toggle';
import { ResearchPhase } from './research-phase';
import { IdeatePhase } from './ideate-phase';
import { FilterPhase } from './filter-phase';
import { DesignPhase } from './design-phase';
import {
  type PhaseType,
  type ScoredIdea,
  ministries,
  mockResearchOutput,
  mockScoredIdeas,
  mockBMCData,
  mockAuditReport,
  mockPoolAuditReport,
  mockBMCAuditReport,
  generateIdeaAuditReport,
} from '@/lib/mock-data';

export function Dashboard() {
  const [currentPhase, setCurrentPhase] = useState<PhaseType>('input');
  const [completedPhases, setCompletedPhases] = useState<PhaseType[]>([]);
  const [selectedMinistry, setSelectedMinistry] = useState('');
  const [selectedIdea, setSelectedIdea] = useState<ScoredIdea | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  
  const handleInputSubmit = useCallback(async (ministry: string) => {
    setSelectedMinistry(ministry);
    setCompletedPhases(['input']);
    setCurrentPhase('research');
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 3000));
    setIsProcessing(false);
    setShowAudit(true);
  }, []);
  
  const handlePhaseComplete = useCallback((phase: PhaseType, nextPhase: PhaseType) => {
    setCompletedPhases((prev) => [...prev.filter((p) => p !== phase), phase]);
    setCurrentPhase(nextPhase);
  }, []);
  
  const handlePhaseClick = useCallback((phase: PhaseType) => {
    setCurrentPhase(phase);
  }, []);
  
  const handleIdeaSelect = useCallback((idea: ScoredIdea | null) => {
    if (idea && selectedIdea?.id === idea.id) {
      setSelectedIdea(null); // Toggle off if clicking same idea
    } else {
      setSelectedIdea(idea);
    }
  }, [selectedIdea]);
  
  const getMinistryName = () => {
    const ministry = ministries.find((m) => m.id === selectedMinistry);
    return ministry?.name || '';
  };
  
  const renderMainContent = () => {
    switch (currentPhase) {
      case 'input':
        return <InputForm onSubmit={handleInputSubmit} />;
      case 'research':
        return (
          <ResearchPhase
            data={mockResearchOutput}
            isProcessing={isProcessing}
            onComplete={() => handlePhaseComplete('research', 'ideate')}
          />
        );
      case 'ideate':
        return (
          <IdeatePhase
            ideas={mockScoredIdeas.slice(0, 5)}
            selectedIdea={selectedIdea}
            onIdeaSelect={handleIdeaSelect}
            onComplete={() => handlePhaseComplete('ideate', 'filter')}
          />
        );
      case 'filter':
        return (
          <FilterPhase
            ideas={mockScoredIdeas}
            selectedIdea={selectedIdea}
            onIdeaSelect={handleIdeaSelect}
            onComplete={() => handlePhaseComplete('filter', 'design')}
          />
        );
      case 'design':
        return (
          <DesignPhase
            idea={selectedIdea || mockScoredIdeas[0]}
            bmcData={mockBMCData}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Sidebar - Phase Navigation */}
      <aside className="hidden lg:flex w-60 flex-col border-r border-border/50 glass-card rounded-none">
        <PhaseSidebar
          currentPhase={currentPhase}
          completedPhases={completedPhases}
          onPhaseClick={handlePhaseClick}
        />
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
              <span className="text-sm font-bold text-primary">G</span>
            </div>
            {currentPhase !== 'input' && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">対象:</span>
                <span className="font-medium text-foreground">{getMinistryName()}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        
        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            {renderMainContent()}
          </div>
        </ScrollArea>
      </main>
      
      {/* Right Sidebar - Audit Panel */}
      {showAudit && (
        <aside className="hidden xl:flex w-80 flex-col border-l border-border/50 glass-card rounded-none">
          <AuditPanel
            report={isProcessing ? null : mockAuditReport}
            isProcessing={isProcessing}
            currentPhase={currentPhase}
            selectedIdea={selectedIdea}
            poolAudit={mockPoolAuditReport}
            ideaAudit={selectedIdea ? generateIdeaAuditReport(selectedIdea) : null}
            bmcAudit={mockBMCAuditReport}
          />
        </aside>
      )}
    </div>
  );
}
