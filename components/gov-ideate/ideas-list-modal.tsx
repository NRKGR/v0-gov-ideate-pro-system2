'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ScoredIdea } from '@/lib/mock-data';

interface IdeasListModalProps {
  ideas: ScoredIdea[];
  selectedIdea?: ScoredIdea | null;
  onIdeaSelect?: (idea: ScoredIdea | null) => void;
  className?: string;
}

const categories = [
  'すべて',
  'AI・自動化',
  '市民サービス',
  'データ活用',
  '防災・危機管理',
  'デジタルデバイド対策',
  'セキュリティ',
  '知識共有',
  '業務効率化',
];

const quadrantLabels: Record<string, { label: string; color: string }> = {
  'quick-win': { label: '優先実施', color: 'bg-score-high/20 text-score-high' },
  'moonshot': { label: '戦略検討', color: 'bg-primary/20 text-primary' },
  'core': { label: '継続改善', color: 'bg-score-medium/20 text-score-medium' },
  'low-priority': { label: '見送り検討', color: 'bg-muted text-muted-foreground' },
};

type SortField = 'totalScore' | 'feasibility' | 'impact' | 'novelty';
type SortOrder = 'asc' | 'desc';

export function IdeasListModal({ ideas, selectedIdea, onIdeaSelect, className }: IdeasListModalProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('すべて');
  const [sortField, setSortField] = useState<SortField>('totalScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredAndSortedIdeas = useMemo(() => {
    let result = [...ideas];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (idea) =>
          idea.title.toLowerCase().includes(query) ||
          idea.description.toLowerCase().includes(query) ||
          idea.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (categoryFilter !== 'すべて') {
      result = result.filter((idea) => idea.category === categoryFilter);
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

    return result;
  }, [ideas, searchQuery, categoryFilter, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleSelectIdea = (idea: ScoredIdea) => {
    onIdeaSelect?.(idea);
    setOpen(false);
  };

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className={cn(
        'flex items-center gap-1 hover:text-foreground transition-colors',
        sortField === field ? 'text-primary font-semibold' : 'text-muted-foreground'
      )}
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={cn('gap-2', className)}>
          <List className="h-4 w-4" />
          一覧表示
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <List className="h-5 w-5 text-primary" />
            アイデア一覧（{filteredAndSortedIdeas.length}件 / {ideas.length}件）
          </DialogTitle>
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-border">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="タイトル・説明で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="カテゴリ" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <ScrollArea className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead className="min-w-[200px]">タイトル</TableHead>
                <TableHead className="w-[120px]">カテゴリ</TableHead>
                <TableHead className="w-[80px]">
                  <SortButton field="totalScore" label="総合" />
                </TableHead>
                <TableHead className="w-[80px]">
                  <SortButton field="feasibility" label="実現性" />
                </TableHead>
                <TableHead className="w-[80px]">
                  <SortButton field="impact" label="影響度" />
                </TableHead>
                <TableHead className="w-[80px]">
                  <SortButton field="novelty" label="独自性" />
                </TableHead>
                <TableHead className="w-[100px]">象限</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedIdeas.map((idea) => {
                const quadrant = quadrantLabels[idea.quadrant];
                const isSelected = selectedIdea?.id === idea.id;
                return (
                  <TableRow
                    key={idea.id}
                    className={cn(
                      'cursor-pointer transition-colors',
                      isSelected && 'bg-primary/10 hover:bg-primary/15'
                    )}
                    onClick={() => handleSelectIdea(idea)}
                  >
                    <TableCell className="font-mono text-muted-foreground">
                      {idea.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{idea.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {idea.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {idea.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'font-bold',
                          idea.totalScore >= 75
                            ? 'text-score-high'
                            : idea.totalScore >= 60
                              ? 'text-score-medium'
                              : 'text-score-low'
                        )}
                      >
                        {idea.totalScore}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {idea.feasibility}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {idea.impact}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {idea.novelty}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('text-xs', quadrant.color)}>
                        {quadrant.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
