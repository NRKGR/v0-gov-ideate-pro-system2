'use client';

import { useState } from 'react';
import { Building2, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface InputFormProps {
  onSubmit: (ministry: string) => void;
  className?: string;
}

export function InputForm({ onSubmit, className }: InputFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit('digital'); // デジタル庁固定
  };
  
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[60vh]', className)}>
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground text-balance">
            新規事業アイデア創出
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            デジタル庁の政策に基づき、5つのAIエージェントが協働して事業アイデアを創出します。
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
          {/* Target Ministry - Fixed to Digital Agency */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 text-primary" />
              対象省庁
            </div>
            <div className="h-12 px-4 flex items-center bg-background/50 border border-border rounded-md">
              <span className="text-foreground font-medium">デジタル庁</span>
              <span className="text-muted-foreground text-xs ml-2">(Digital Agency)</span>
            </div>
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-12 text-base"
          >
            {isSubmitting ? (
              '開始中...'
            ) : (
              <>
                分析を開始する
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>
        </form>
        
        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'GENERATE', desc: '政策分析' },
            { label: 'IDEATE', desc: '300案生成' },
            { label: 'AUDIT', desc: '品質監査' },
          ].map((agent) => (
            <div key={agent.label} className="glass-card p-3 space-y-1">
              <p className="text-xs font-medium text-primary">{agent.label}</p>
              <p className="text-xs text-muted-foreground">{agent.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
