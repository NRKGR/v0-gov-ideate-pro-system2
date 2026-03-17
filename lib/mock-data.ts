// Mock data for GOV-IDEATE Pro demonstration

export type PhaseType = 'input' | 'research' | 'ideate' | 'filter' | 'design';

export interface Ministry {
  id: string;
  name: string;
  nameEn: string;
}

export const ministries: Ministry[] = [
  { id: 'digital', name: 'デジタル庁', nameEn: 'Digital Agency' },
  { id: 'meti', name: '経済産業省', nameEn: 'METI' },
  { id: 'mhlw', name: '厚生労働省', nameEn: 'MHLW' },
  { id: 'mlit', name: '国土交通省', nameEn: 'MLIT' },
  { id: 'mext', name: '文部科学省', nameEn: 'MEXT' },
  { id: 'mofa', name: '外務省', nameEn: 'MOFA' },
  { id: 'env', name: '環境省', nameEn: 'MOE' },
  { id: 'maff', name: '農林水産省', nameEn: 'MAFF' },
];

export interface PolicyTheme {
  title: string;
  description: string;
  keywords: string[];
}

export interface ResearchOutput {
  ministry: string;
  focusArea: string;
  policyAnalysis: {
    currentPolicy: string;
    challenges: string[];
    opportunities: string[];
  };
  budgetInfo: {
    totalBudget: string;
    relatedPrograms: { name: string; amount: string }[];
  };
  macroThemes: PolicyTheme[];
  timeline: { year: string; milestone: string }[];
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  feasibility: number;
  impact: number;
  novelty: number;
  tags: string[];
}

export interface ScoredIdea extends Idea {
  totalScore: number;
  quadrant: 'quick-win' | 'moonshot' | 'core' | 'low-priority';
  reasoning: string;
}

export interface BMCData {
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export interface AuditReport {
  overallScore: number;
  goodPoints: string[];
  strategicRisks: string[];
  improvementAdvice: string[];
  userQuestions: string[];
  detailedScores: {
    category: string;
    score: number;
    comment: string;
  }[];
}

// Demo data for デジタル庁 + 行政DX
export const mockResearchOutput: ResearchOutput = {
  ministry: 'デジタル庁',
  focusArea: '行政DX',
  policyAnalysis: {
    currentPolicy: 'デジタル社会の実現に向けた重点計画（2024年度版）では、国・地方のデジタル基盤の統一・標準化、マイナンバーカードの普及・利活用の推進、デジタル人材の育成・確保を3本柱として掲げています。',
    challenges: [
      '地方自治体間のシステム標準化の遅れ',
      'デジタル人材の慢性的な不足',
      '高齢者等のデジタルデバイド',
      'レガシーシステムの刷新コスト',
      '省庁間のデータ連携の困難さ',
    ],
    opportunities: [
      'マイナンバーカード普及率80%超達成',
      'クラウド・バイ・デフォルト原則の浸透',
      'AI・RPA導入への機運の高まり',
      '災害時のデジタル活用ニーズ増大',
      '国際的なデジタルガバメント競争力強化',
    ],
  },
  budgetInfo: {
    totalBudget: '約5,000億円（令和6年度）',
    relatedPrograms: [
      { name: 'ガバメントクラウド整備', amount: '約800億円' },
      { name: '地方公共団体情報システム標準化', amount: '約1,200億円' },
      { name: 'マイナンバー関連施策', amount: '約600億円' },
      { name: 'デジタル田園都市国家構想', amount: '約1,500億円' },
    ],
  },
  macroThemes: [
    {
      title: 'データ駆動型行政の実現',
      description: 'EBPM（証拠に基づく政策立案）の推進と、省庁横断的なデータ利活用基盤の構築',
      keywords: ['EBPM', 'データ連携', 'オープンデータ', 'ダッシュボード'],
    },
    {
      title: '誰一人取り残さないデジタル化',
      description: 'デジタルデバイドの解消と、アクセシビリティに配慮したサービス設計',
      keywords: ['アクセシビリティ', 'UI/UX', 'デジタル支援員', '多言語対応'],
    },
    {
      title: '安全・安心なデジタル社会',
      description: 'サイバーセキュリティの強化と、個人情報保護の徹底',
      keywords: ['サイバーセキュリティ', 'ゼロトラスト', 'プライバシー', '認証基盤'],
    },
  ],
  timeline: [
    { year: '2024', milestone: '地方公共団体の基幹業務システム標準化着手' },
    { year: '2025', milestone: 'ガバメントクラウド本格稼働' },
    { year: '2026', milestone: '行政手続きオンライン化率98%達成目標' },
    { year: '2027', milestone: 'デジタル・ガバメント実行計画最終評価' },
  ],
};

export const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'AI窓口アシスタント「まど助」',
    description: '市区町村の窓口業務をAIがサポート。住民からの問い合わせに24時間対応し、必要書類の案内や手続きのナビゲーションを行う。多言語対応で外国人住民にも対応。',
    category: 'AI・自動化',
    feasibility: 75,
    impact: 82,
    novelty: 68,
    tags: ['AI', 'チャットボット', '多言語', '窓口DX'],
  },
  {
    id: '2',
    title: '行政文書自動要約・検索システム',
    description: '膨大な行政文書をAIが自動要約し、意味検索を可能にする。過去の政策資料や議事録から関連情報を瞬時に抽出し、政策立案の効率を大幅に向上。',
    category: 'AI・自動化',
    feasibility: 80,
    impact: 78,
    novelty: 72,
    tags: ['AI', '文書管理', 'RAG', '業務効率化'],
  },
  {
    id: '3',
    title: 'デジタル防災プラットフォーム',
    description: '災害時の情報集約・配信を一元化するプラットフォーム。避難所の空き状況、物資の配分、救助要請をリアルタイムで管理。平時は防災訓練のシミュレーションにも活用。',
    category: '防災・危機管理',
    feasibility: 70,
    impact: 95,
    novelty: 75,
    tags: ['防災', 'リアルタイム', 'IoT', 'GIS'],
  },
  {
    id: '4',
    title: '公共施設スマート予約統合システム',
    description: '図書館、スポーツ施設、会議室など公共施設の予約を一元化。空き状況の可視化、最適な施設提案、キャンセル待ち機能で利用率を最大化。',
    category: '市民サービス',
    feasibility: 88,
    impact: 65,
    novelty: 55,
    tags: ['予約システム', 'データ活用', '利便性向上'],
  },
  {
    id: '5',
    title: 'シニア向けデジタルコンシェルジュ',
    description: 'タブレット端末を活用した高齢者向けデジタル支援サービス。年金、医療、介護などの手続きをビデオ通話でサポート。定期的な見守り機能も搭載。',
    category: 'デジタルデバイド対策',
    feasibility: 72,
    impact: 80,
    novelty: 65,
    tags: ['高齢者支援', 'リモート支援', '見守り', 'UI/UX'],
  },
  {
    id: '6',
    title: '政策効果可視化ダッシュボード',
    description: '各省庁の政策効果をリアルタイムで可視化するダッシュボード。KPIの進捗、予算執行状況、国民の声を統合表示し、EBPMを支援。',
    category: 'データ分析',
    feasibility: 68,
    impact: 88,
    novelty: 78,
    tags: ['EBPM', 'データ可視化', 'KPI', 'ダッシュボード'],
  },
  {
    id: '7',
    title: '自治体間ベストプラクティス共有プラットフォーム',
    description: '全国の自治体が成功事例、失敗事例を共有するナレッジベース。類似課題を抱える自治体をマッチングし、ノウハウ移転を促進。',
    category: '知識共有',
    feasibility: 85,
    impact: 72,
    novelty: 60,
    tags: ['ナレッジ共有', '自治体連携', 'ベストプラクティス'],
  },
  {
    id: '8',
    title: 'ゼロトラスト行政セキュリティ基盤',
    description: '全省庁統一のゼロトラストセキュリティ基盤を構築。リモートワーク環境でも安全に業務を行える環境を整備し、サイバー攻撃への耐性を強化。',
    category: 'セキュリティ',
    feasibility: 55,
    impact: 92,
    novelty: 70,
    tags: ['ゼロトラスト', 'サイバーセキュリティ', 'リモートワーク'],
  },
];

export const mockScoredIdeas: ScoredIdea[] = mockIdeas.map((idea) => {
  const totalScore = Math.round((idea.feasibility + idea.impact + idea.novelty) / 3);
  let quadrant: ScoredIdea['quadrant'];
  
  if (idea.feasibility >= 70 && idea.impact >= 75) {
    quadrant = 'quick-win';
  } else if (idea.feasibility < 70 && idea.impact >= 75) {
    quadrant = 'moonshot';
  } else if (idea.feasibility >= 70 && idea.impact < 75) {
    quadrant = 'core';
  } else {
    quadrant = 'low-priority';
  }
  
  return {
    ...idea,
    totalScore,
    quadrant,
    reasoning: getReasoningForIdea(idea.id),
  };
});

function getReasoningForIdea(id: string): string {
  const reasonings: Record<string, string> = {
    '1': '既存のAI技術を活用でき、住民サービス向上への即効性が高い。多言語対応により外国人住民へのアプローチも可能。',
    '2': '文書管理の効率化は全省庁共通の課題であり、横展開が容易。LLM技術の成熟により実現可能性が向上。',
    '3': '防災は国民の関心が高く、社会的インパクト大。一方で複数機関との連携が必要で実装には時間を要する。',
    '4': '技術的難易度は低いが、既存システムとの統合が課題。利用者の利便性向上効果は確実。',
    '5': 'デジタルデバイド解消は政策優先度高。人的サポートとの組み合わせで実現可能性を担保。',
    '6': 'EBPM推進の中核となりうる施策。データ連携の整備状況により効果が左右される。',
    '7': '自治体間連携促進は政策的にも推奨。プラットフォーム運営の持続性確保が課題。',
    '8': 'セキュリティ強化は喫緊の課題だが、全省庁統一には予算・体制面での調整が必要。',
  };
  return reasonings[id] || '';
}

export const mockBMCData: BMCData = {
  keyPartners: [
    'クラウドベンダー（AWS、Azure、GCP）',
    'AIスタートアップ企業',
    '地方自治体',
    'シビックテック団体',
    '大学・研究機関',
  ],
  keyActivities: [
    'AIモデルの開発・チューニング',
    '多言語データベースの構築',
    '自治体への導入支援',
    '継続的な改善・運用',
    'ユーザーフィードバックの収集・分析',
  ],
  keyResources: [
    '大規模言語モデル（LLM）',
    '行政手続きデータベース',
    'クラウドインフラ',
    'AI/UXエンジニアチーム',
    'カスタマーサクセスチーム',
  ],
  valuePropositions: [
    '24時間365日の窓口対応',
    '多言語対応（12言語）',
    '待ち時間ゼロ体験',
    '正確な手続き案内',
    '職員の業務負荷軽減',
  ],
  customerRelationships: [
    'セルフサービス（チャット）',
    '有人エスカレーション',
    '定期的な満足度調査',
    'プッシュ通知による情報提供',
  ],
  channels: [
    'Webブラウザ',
    'スマートフォンアプリ',
    'LINE公式アカウント',
    '自治体窓口端末',
  ],
  customerSegments: [
    '住民（日本人）',
    '外国人住民',
    '事業者',
    '地方自治体職員',
  ],
  costStructure: [
    'クラウド利用料',
    'AI API利用料',
    '開発・保守人件費',
    'カスタマーサポート費用',
    '多言語翻訳・監修費用',
  ],
  revenueStreams: [
    '自治体へのSaaS提供（月額制）',
    '初期導入支援費用',
    'カスタマイズ開発費用',
    'データ分析レポート提供',
  ],
};

export const mockAuditReport: AuditReport = {
  overallScore: 78,
  goodPoints: [
    '既存のAI技術を活用した現実的なアプローチ',
    '住民サービス向上への即効性が高い',
    'デジタルデバイド対策としての多言語対応',
    'SaaSモデルによる自治体への導入障壁の低減',
    'クラウドベンダーとの連携による安定性確保',
  ],
  strategicRisks: [
    'AI回答の正確性担保（ハルシネーションリスク）',
    '個人情報取り扱いに関する法的整理の必要性',
    '既存窓口業務との役割分担の明確化',
    '障害発生時のフォールバック体制',
  ],
  improvementAdvice: [
    '回答精度のKPI設定と定期的なモニタリング体制の構築',
    'プライバシー影響評価（PIA）の実施',
    '段階的導入（パイロット→本格展開）のロードマップ策定',
    '職員向けAIリテラシー研修プログラムの併設',
  ],
  userQuestions: [
    'AIが回答できない複雑なケースへの対応方針は？',
    '導入自治体の規模（人口）による価格体系の想定は？',
    '他の行政AIサービスとの差別化ポイントは？',
  ],
  detailedScores: [
    { category: '実現可能性', score: 75, comment: '技術的には成熟しているが、行政特有の要件への対応が必要' },
    { category: '社会的インパクト', score: 82, comment: '住民サービス向上への貢献度は高い' },
    { category: '新規性', score: 68, comment: '類似サービスは存在するが、行政特化は差別化要因' },
    { category: '持続可能性', score: 80, comment: 'SaaSモデルによる継続的な収益確保が可能' },
    { category: '政策整合性', score: 85, comment: 'デジタル庁の方針と高い整合性' },
  ],
};

export const agentInfo = {
  generate: {
    name: 'GENERATE',
    nameJa: '調査エージェント',
    description: '政策分析・予算調査・マクロテーマ抽出',
    icon: 'Search',
  },
  ideate1: {
    name: 'IDEATE 1',
    nameJa: '拡散エージェント',
    description: '300案の新規事業アイデア生成',
    icon: 'Lightbulb',
  },
  ideate2: {
    name: 'IDEATE 2',
    nameJa: '選別エージェント',
    description: 'ペイオフマトリクスによる評価・選別',
    icon: 'Filter',
  },
  ideate3: {
    name: 'IDEATE 3',
    nameJa: '設計エージェント',
    description: 'ビジネスモデルキャンバス作成',
    icon: 'PenTool',
  },
  audit: {
    name: 'AUDIT',
    nameJa: '監査エージェント',
    description: '品質監査・リスク評価・改善提案',
    icon: 'Shield',
  },
};

export const phaseInfo = {
  input: { name: '入力', description: '省庁・分野の選択' },
  research: { name: '調査', description: '政策・予算・テーマ分析' },
  ideate: { name: '拡散', description: '300案のアイデア生成' },
  filter: { name: '選別', description: 'マトリクス評価・絞り込み' },
  design: { name: '設計', description: 'BMC・実行計画策定' },
};
