'use client';

import { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { cn } from '@/lib/utils';
import type { ScoredIdea } from '@/lib/mock-data';

interface PayoffMatrixProps {
  ideas: ScoredIdea[];
  selectedIdea: ScoredIdea | null;
  onIdeaSelect: (idea: ScoredIdea | null) => void;
  className?: string;
}

export function PayoffMatrix({
  ideas,
  selectedIdea,
  onIdeaSelect,
  className,
}: PayoffMatrixProps) {
  const chartData = useMemo(() => {
    return ideas.map((idea) => ({
      x: idea.feasibility,
      y: idea.impact,
      z: idea.totalScore,
      id: idea.id,
      title: idea.title,
      quadrant: idea.quadrant,
    }));
  }, [ideas]);
  
  const getQuadrantColor = (quadrant: string, isSelected: boolean) => {
    if (isSelected) return '#3b82f6'; // primary blue
    switch (quadrant) {
      case 'quick-win':
        return '#22c55e'; // green
      case 'moonshot':
        return '#3b82f6'; // blue
      case 'core':
        return '#6b7280'; // gray
      case 'low-priority':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };
  
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof chartData[number] }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const idea = ideas.find((i) => i.id === data.id);
      if (!idea) return null;
      
      return (
        <div className="glass-card p-3 max-w-xs border border-border shadow-lg">
          <p className="font-semibold text-sm text-foreground mb-1">{idea.title}</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">実現可能性:</span>
              <span className="ml-1 font-medium text-foreground">{idea.feasibility}</span>
            </div>
            <div>
              <span className="text-muted-foreground">影響度:</span>
              <span className="ml-1 font-medium text-foreground">{idea.impact}</span>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">総合スコア:</span>
              <span className="ml-1 font-medium text-foreground">{idea.totalScore}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className={cn('space-y-4', className)}>
      {/* Quadrant Labels */}
      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Strategic Moonshot（高影響・低実現性）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-score-high" />
          <span className="text-muted-foreground">Quick Win（高影響・高実現性）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-score-low" />
          <span className="text-muted-foreground">Low Priority（低影響・低実現性）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
          <span className="text-muted-foreground">Sustainable Core（低影響・高実現性）</span>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#d1d5db"
              opacity={0.5}
            />
            <XAxis
              type="number"
              dataKey="x"
              name="実現可能性"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={{ stroke: '#9ca3af' }}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              label={{
                value: '実現可能性 →',
                position: 'insideBottom',
                fill: '#6b7280',
                fontSize: 12,
                offset: -10,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="社会的インパクト"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={{ stroke: '#9ca3af' }}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              label={{
                value: '社会的インパクト →',
                angle: -90,
                position: 'insideLeft',
                fill: '#6b7280',
                fontSize: 12,
                offset: 10,
                style: { textAnchor: 'middle' },
              }}
            />
            <ReferenceLine
              x={50}
              stroke="#9ca3af"
              strokeDasharray="5 5"
            />
            <ReferenceLine
              y={50}
              stroke="#9ca3af"
              strokeDasharray="5 5"
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              data={chartData}
              cursor="pointer"
              onClick={(data) => {
                const idea = ideas.find((i) => i.id === data.id);
                if (idea) onIdeaSelect(idea);
              }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getQuadrantColor(entry.quadrant, selectedIdea?.id === entry.id)}
                  stroke={selectedIdea?.id === entry.id ? '#1f2937' : 'transparent'}
                  strokeWidth={selectedIdea?.id === entry.id ? 2 : 0}
                  r={selectedIdea?.id === entry.id ? 10 : 8}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
