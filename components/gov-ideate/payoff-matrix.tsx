'use client';

import { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Label,
} from 'recharts';
import { cn } from '@/lib/utils';
import { useChartTheme, getQuadrantColor } from '@/lib/chart-theme';
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
  const theme = useChartTheme();
  
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
  
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof chartData[number] }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const idea = ideas.find((i) => i.id === data.id);
      if (!idea) return null;
      
      const quadrantNames: Record<string, string> = {
        'quick-win': '優先実施',
        'moonshot': '戦略検討',
        'core': '継続改善',
        'low-priority': '見送り検討',
      };
      
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
            <div>
              <span className="text-muted-foreground">総合スコア:</span>
              <span className="ml-1 font-medium text-foreground">{idea.totalScore}</span>
            </div>
            <div>
              <span className="text-muted-foreground">分類:</span>
              <span className="ml-1 font-medium text-foreground">{quadrantNames[idea.quadrant]}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className={cn('relative', className)}>
      {/* Chart Container */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 40, right: 40, bottom: 40, left: 50 }}>
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 100]}
              ticks={[0, 50, 100]}
              tickLine={false}
              axisLine={{ stroke: theme.axisLine }}
              tick={{ fill: theme.mutedForeground, fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 100]}
              ticks={[0, 50, 100]}
              tickLine={false}
              axisLine={{ stroke: theme.axisLine }}
              tick={{ fill: theme.mutedForeground, fontSize: 11 }}
            />
            
            {/* Center Cross Lines */}
            <ReferenceLine
              x={50}
              stroke={theme.referenceLine}
              strokeWidth={1.5}
            >
              <Label
                value="優先実施"
                position="insideTopRight"
                offset={15}
                fill={theme.foreground}
                fontSize={12}
                fontWeight={500}
              />
              <Label
                value="戦略検討"
                position="insideTopLeft"
                offset={15}
                fill={theme.foreground}
                fontSize={12}
                fontWeight={500}
              />
            </ReferenceLine>
            <ReferenceLine
              y={50}
              stroke={theme.referenceLine}
              strokeWidth={1.5}
            >
              <Label
                value="継続改善"
                position="insideBottomRight"
                offset={15}
                fill={theme.mutedForeground}
                fontSize={12}
              />
              <Label
                value="見送り検討"
                position="insideBottomLeft"
                offset={15}
                fill={theme.mutedForeground}
                fontSize={12}
              />
            </ReferenceLine>
            
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
                  stroke={selectedIdea?.id === entry.id ? theme.selectionStroke : 'transparent'}
                  strokeWidth={selectedIdea?.id === entry.id ? 2 : 0}
                  r={selectedIdea?.id === entry.id ? 8 : 5}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      {/* Axis Labels - Outside Chart */}
      <div className="flex justify-between items-center px-12 -mt-2 text-xs text-muted-foreground">
        <span>実現困難</span>
        <span className="font-medium text-foreground">実現可能性</span>
        <span>実現容易</span>
      </div>
      
      {/* Y-Axis Label */}
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">影響大</span>
          <span className="font-medium text-foreground">影響度</span>
          <span className="text-muted-foreground">影響小</span>
        </div>
      </div>
    </div>
  );
}
