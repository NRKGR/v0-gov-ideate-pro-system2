'use client';

import { useTheme } from 'next-themes';
import { useMemo } from 'react';

// Quadrant colors (consistent across themes, with good contrast)
export const quadrantColors = {
  'quick-win': '#22c55e',    // green - 優先実施
  'moonshot': '#3b82f6',     // blue - 戦略検討
  'core': '#6b7280',         // gray - 継続改善
  'low-priority': '#ef4444', // red - 見送り検討
} as const;

// Quadrant labels in Japanese
export const quadrantLabels = {
  'quick-win': { name: '優先実施', description: 'すぐやる' },
  'moonshot': { name: '戦略検討', description: 'じっくり' },
  'core': { name: '継続改善', description: '着実に' },
  'low-priority': { name: '見送り検討', description: '' },
} as const;

// Axis labels
export const axisLabels = {
  x: { low: '実現困難', high: '実現容易' },
  y: { low: '影響小', high: '影響大' },
} as const;

// Theme-aware colors for charts
export interface ChartThemeColors {
  // Text colors
  foreground: string;
  mutedForeground: string;
  
  // Background colors
  background: string;
  cardBackground: string;
  
  // Grid and axis
  gridLine: string;
  axisLine: string;
  referenceLine: string;
  
  // Quadrant backgrounds (with opacity)
  quadrantBg: {
    'quick-win': string;
    'moonshot': string;
    'core': string;
    'low-priority': string;
  };
  
  // Selection
  selectionStroke: string;
}

const lightThemeColors: ChartThemeColors = {
  foreground: '#1f2937',
  mutedForeground: '#6b7280',
  background: '#ffffff',
  cardBackground: '#f9fafb',
  gridLine: '#e5e7eb',
  axisLine: '#9ca3af',
  referenceLine: '#d1d5db',
  quadrantBg: {
    'quick-win': 'rgba(34, 197, 94, 0.08)',
    'moonshot': 'rgba(59, 130, 246, 0.08)',
    'core': 'rgba(107, 114, 128, 0.08)',
    'low-priority': 'rgba(239, 68, 68, 0.08)',
  },
  selectionStroke: '#1f2937',
};

const darkThemeColors: ChartThemeColors = {
  foreground: '#f9fafb',
  mutedForeground: '#9ca3af',
  background: '#111827',
  cardBackground: '#1f2937',
  gridLine: '#374151',
  axisLine: '#6b7280',
  referenceLine: '#4b5563',
  quadrantBg: {
    'quick-win': 'rgba(34, 197, 94, 0.15)',
    'moonshot': 'rgba(59, 130, 246, 0.15)',
    'core': 'rgba(107, 114, 128, 0.15)',
    'low-priority': 'rgba(239, 68, 68, 0.15)',
  },
  selectionStroke: '#f9fafb',
};

// Hook to get theme-aware chart colors
export function useChartTheme(): ChartThemeColors {
  const { resolvedTheme } = useTheme();
  
  return useMemo(() => {
    return resolvedTheme === 'dark' ? darkThemeColors : lightThemeColors;
  }, [resolvedTheme]);
}

// Get quadrant color by key
export function getQuadrantColor(quadrant: string, isSelected: boolean = false): string {
  if (isSelected) return '#8b5cf6'; // purple for selection highlight
  return quadrantColors[quadrant as keyof typeof quadrantColors] || quadrantColors['core'];
}

// Get quadrant label
export function getQuadrantLabel(quadrant: string): { name: string; description: string } {
  return quadrantLabels[quadrant as keyof typeof quadrantLabels] || { name: quadrant, description: '' };
}
