'use client';

import {
  Users,
  Handshake,
  Cog,
  Box,
  Heart,
  Target,
  MessageSquare,
  Megaphone,
  Wallet,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BMCData } from '@/lib/mock-data';

interface BMCCanvasProps {
  data: BMCData;
  className?: string;
}

const sectionConfig = {
  keyPartners: {
    title: 'Key Partners',
    titleJa: 'パートナー',
    icon: Handshake,
  },
  keyActivities: {
    title: 'Key Activities',
    titleJa: '主要活動',
    icon: Cog,
  },
  keyResources: {
    title: 'Key Resources',
    titleJa: '主要リソース',
    icon: Box,
  },
  valuePropositions: {
    title: 'Value Propositions',
    titleJa: '価値提案',
    icon: Heart,
  },
  customerRelationships: {
    title: 'Customer Relationships',
    titleJa: '顧客との関係',
    icon: MessageSquare,
  },
  channels: {
    title: 'Channels',
    titleJa: 'チャネル',
    icon: Megaphone,
  },
  customerSegments: {
    title: 'Customer Segments',
    titleJa: '顧客セグメント',
    icon: Target,
  },
  costStructure: {
    title: 'Cost Structure',
    titleJa: 'コスト構造',
    icon: Wallet,
  },
  revenueStreams: {
    title: 'Revenue Streams',
    titleJa: '収益の流れ',
    icon: TrendingUp,
  },
};

type SectionKey = keyof typeof sectionConfig;

function BMCSection({
  sectionKey,
  items,
  className,
}: {
  sectionKey: SectionKey;
  items: string[];
  className?: string;
}) {
  const config = sectionConfig[sectionKey];
  const Icon = config.icon;
  
  return (
    <div className={cn('glass-card p-3 h-full flex flex-col', className)}>
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
        <Icon className="h-4 w-4 text-primary shrink-0" />
        <div className="min-w-0">
          <h4 className="text-xs font-semibold text-foreground truncate">{config.title}</h4>
          <p className="text-xs text-muted-foreground">{config.titleJa}</p>
        </div>
      </div>
      <ul className="space-y-1.5 flex-1 overflow-auto">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <span className="text-primary mt-0.5">•</span>
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BMCCanvas({ data, className }: BMCCanvasProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {/* Top Row - 5 columns */}
      <div className="grid grid-cols-5 gap-2" style={{ minHeight: '200px' }}>
        {/* Key Partners */}
        <BMCSection sectionKey="keyPartners" items={data.keyPartners} />
        
        {/* Key Activities + Key Resources stacked */}
        <div className="flex flex-col gap-2">
          <BMCSection
            sectionKey="keyActivities"
            items={data.keyActivities}
            className="flex-1"
          />
          <BMCSection
            sectionKey="keyResources"
            items={data.keyResources}
            className="flex-1"
          />
        </div>
        
        {/* Value Propositions */}
        <BMCSection sectionKey="valuePropositions" items={data.valuePropositions} />
        
        {/* Customer Relationships + Channels stacked */}
        <div className="flex flex-col gap-2">
          <BMCSection
            sectionKey="customerRelationships"
            items={data.customerRelationships}
            className="flex-1"
          />
          <BMCSection
            sectionKey="channels"
            items={data.channels}
            className="flex-1"
          />
        </div>
        
        {/* Customer Segments */}
        <BMCSection sectionKey="customerSegments" items={data.customerSegments} />
      </div>
      
      {/* Bottom Row - 2 columns */}
      <div className="grid grid-cols-2 gap-2" style={{ minHeight: '120px' }}>
        <BMCSection sectionKey="costStructure" items={data.costStructure} />
        <BMCSection sectionKey="revenueStreams" items={data.revenueStreams} />
      </div>
    </div>
  );
}
