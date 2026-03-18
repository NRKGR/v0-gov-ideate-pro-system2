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
  ReferenceArea,
} from 'recharts';
import { cn } from '@/lib/utils';
import { 
  useChartTheme, 
  quadrantColors, 
  quadrantLabels, 
  axisLabels,
  getQuadrantColor,
} from '@/lib/chart-theme';
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
      
      const label = quadrantLabels[idea.quadrant as keyof typeof quadrantLabels];
      
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
              <span className="ml-1 font-medium text-foreground">{label?.name}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom label component for quadrants
  const QuadrantLabel = ({ x, y, label, color }: { x: number; y: number; label: { name: string; description: string }; color: string }) => (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={11}
      fontWeight={500}
      fill={theme.mutedForeground}
    >
      <tspan x={x} dy="-0.5em" fill={color}>{label.name}</tspan>
      {label.description && (
        <tspan x={x} dy="1.2em" fontSize={10} fill={theme.mutedForeground}>（{label.description}）</tspan>
      )}
    </text>
  );
  
  return (
    <div className={cn('space-y-4', className)}>
      {/* Chart */}
      <div className="h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 30, right: 30, bottom: 50, left: 60 }}>
            {/* Quadrant Background Areas */}
            <ReferenceArea
              x1={50} x2={100} y1={50} y2={100}
              fill={theme.quadrantBg['quick-win']}
              fillOpacity={1}
            />
            <ReferenceArea
              x1={0} x2={50} y1={50} y2={100}
              fill={theme.quadrantBg['moonshot']}
              fillOpacity={1}
            />
            <ReferenceArea
              x1={50} x2={100} y1={0} y2={50}
              fill={theme.quadrantBg['core']}
              fillOpacity={1}
            />
            <ReferenceArea
              x1={0} x2={50} y1={0} y2={50}
              fill={theme.quadrantBg['low-priority']}
              fillOpacity={1}
            />
            
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.gridLine}
              opacity={0.5}
            />
            <XAxis
              type="number"
              dataKey="x"
              name="実現可能性"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={{ stroke: theme.axisLine }}
              tick={{ fill: theme.mutedForeground, fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="影響度"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={{ stroke: theme.axisLine }}
              tick={{ fill: theme.mutedForeground, fontSize: 11 }}
            />
            
            {/* Center Reference Lines */}
            <ReferenceLine
              x={50}
              stroke={theme.referenceLine}
              strokeWidth={2}
            />
            <ReferenceLine
              y={50}
              stroke={theme.referenceLine}
              strokeWidth={2}
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
                  stroke={selectedIdea?.id === entry.id ? theme.selectionStroke : 'transparent'}
                  strokeWidth={selectedIdea?.id === entry.id ? 2 : 0}
                  r={selectedIdea?.id === entry.id ? 8 : 5}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      {/* Axis Labels */}
      <div className="flex justify-between items-center px-12 text-xs">
        <span className="text-muted-foreground">{axisLabels.x.low}</span>
        <span className="font-medium text-foreground">実現可能性</span>
        <span className="text-muted-foreground">{axisLabels.x.high}</span>
      </div>
      
      {/* Legend with Japanese labels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2">
        {(Object.entries(quadrantLabels) as [keyof typeof quadrantLabels, { name: string; description: string }][]).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: quadrantColors[key] }}
            />
            <div>
              <span className="font-medium text-foreground">{label.name}</span>
              {label.description && (
                <span className="text-muted-foreground ml-1">（{label.description}）</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Y-Axis Label (positioned on left side) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs hidden">
        <span className="text-muted-foreground">{axisLabels.y.low}</span>
        <span className="mx-2 font-medium text-foreground">影響度</span>
        <span className="text-muted-foreground">{axisLabels.y.high}</span>
      </div>
    </div>
  );
}
