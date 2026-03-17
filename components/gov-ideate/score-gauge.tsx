'use client';

import { cn } from '@/lib/utils';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function ScoreGauge({
  score,
  size = 'md',
  showLabel = true,
  label,
  className,
}: ScoreGaugeProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;
  
  const sizeConfig = {
    sm: { width: 64, fontSize: 'text-lg', labelSize: 'text-xs' },
    md: { width: 96, fontSize: 'text-2xl', labelSize: 'text-sm' },
    lg: { width: 140, fontSize: 'text-4xl', labelSize: 'text-base' },
  };
  
  const { width, fontSize, labelSize } = sizeConfig[size];
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'stroke-score-high text-score-high';
    if (score >= 60) return 'stroke-score-medium text-score-medium';
    return 'stroke-score-low text-score-low';
  };
  
  const colorClass = getScoreColor(clampedScore);
  
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="relative" style={{ width, height: width }}>
        <svg
          className="transform -rotate-90"
          width={width}
          height={width}
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            className="stroke-muted/30"
          />
          {/* Score circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className={cn('transition-all duration-1000 ease-out', colorClass.split(' ')[0])}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold score-counter', fontSize, colorClass.split(' ')[1])}>
            {clampedScore}
          </span>
          {showLabel && (
            <span className={cn('text-muted-foreground', labelSize)}>
              / 100
            </span>
          )}
        </div>
      </div>
      {label && (
        <span className={cn('font-medium text-foreground', labelSize)}>
          {label}
        </span>
      )}
    </div>
  );
}
