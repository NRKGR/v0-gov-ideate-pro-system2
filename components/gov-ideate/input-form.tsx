'use client';

import { useState } from 'react';
import { Building2, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ministries } from '@/lib/mock-data';

interface InputFormProps {
  onSubmit: (ministry: string) => void;
  className?: string;
}

export function InputForm({ onSubmit, className }: InputFormProps) {
  const [selectedMinistry, setSelectedMinistry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMinistry) return;
    
    setIsSubmitting(true);
    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit(selectedMinistry);
  };
  
  const isValid = !!selectedMinistry;
  
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
            対象となる省庁を選択してください。
            5つのAIエージェントが協働して事業アイデアを創出します。
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
          {/* Ministry Selection */}
          <div className="space-y-2">
            <Label htmlFor="ministry" className="flex items-center gap-2 text-foreground">
              <Building2 className="h-4 w-4 text-primary" />
              対象省庁
            </Label>
            <Select value={selectedMinistry} onValueChange={setSelectedMinistry}>
              <SelectTrigger id="ministry" className="h-12 bg-background/50">
                <SelectValue placeholder="省庁を選択してください" />
              </SelectTrigger>
              <SelectContent>
                {ministries.map((ministry) => (
                  <SelectItem key={ministry.id} value={ministry.id}>
                    <span className="flex items-center gap-2">
                      <span>{ministry.name}</span>
                      <span className="text-muted-foreground text-xs">
                        ({ministry.nameEn})
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={!isValid || isSubmitting}
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
