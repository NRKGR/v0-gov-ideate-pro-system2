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
  { id: 'cfa', name: 'こども家庭庁', nameEn: 'CFA' },
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

// Phase-specific audit types
export type AuditMode = 'research' | 'ideate-pool' | 'ideate-idea' | 'filter' | 'design';

export interface IdeaAuditReport {
  ideaId: string;
  overallScore: number;
  feasibilityScore: number;
  impactScore: number;
  noveltyScore: number;
  policyAlignmentScore: number;
  goodPoints: string[];
  risks: string[];
  recommendations: string[];
}

export interface PoolAuditReport {
  overallScore: number;
  diversityScore: number;
  creativityScore: number;
  coverageScore: number;
  goodPoints: string[];
  gaps: string[];
  recommendations: string[];
}

export interface BMCAuditReport {
  overallScore: number;
  completenessScore: number;
  consistencyScore: number;
  viabilityScore: number;
  goodPoints: string[];
  weaknesses: string[];
  recommendations: string[];
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
    description: '市区町村の窓口業務をAIがサポート。住民から���問い合わせに24時間対応し、必要書類の案内や手続きのナビゲーションを行う。多言語対応で外国人住民にも対応。',
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
    tags: ['予約システム', 'データ活用', '利便性���上'],
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
    '1': '既存のAI技術を活用でき、住民サービス向上への即効��が高い。多言語対応により外国人住民へのアプローチも可能。',
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

// Pool audit (for ideate phase when no idea is selected)
export const mockPoolAuditReport: PoolAuditReport = {
  overallScore: 82,
  diversityScore: 85,
  creativityScore: 78,
  coverageScore: 83,
  goodPoints: [
    '技術・サービス・データ活用の3軸でバランスよく生成',
    '既存政策との整合性を保ちつつ新規性のある提案',
    'ユーザー視点（住民・職員）の両面からアプローチ',
    'スケーラビリティを意識した提案が多い',
  ],
  gaps: [
    '国際連携・海外展開の観点が弱い',
    '民間企業との協業モデルの深������が不足',
    '長期的な社会変化への対応案が少ない',
  ],
  recommendations: [
    '海外先進事例の参照を追加',
    '官民連携スキームの具体化',
    '10年後の社会像を起点としたバックキャスト案の追加',
  ],
};

// Individual idea audit reports (keyed by idea ID)
export const mockIdeaAuditReports: Record<string, IdeaAuditReport> = {
  '1': {
    ideaId: '1',
    overallScore: 78,
    feasibilityScore: 75,
    impactScore: 82,
    noveltyScore: 68,
    policyAlignmentScore: 85,
    goodPoints: [
      '既存AI技術の活用で実現性が高い',
      '住民サービス向上への直接的効果',
      '多言語対応で外国人住民にも配慮',
    ],
    risks: [
      'AI回答の正確性担保が課題',
      '個人情報の取り扱いに注意が必要',
    ],
    recommendations: [
      '段階的な導入計画の策定',
      '人間によるエスカレーション体制の整備',
    ],
  },
  '2': {
    ideaId: '2',
    overallScore: 77,
    feasibilityScore: 80,
    impactScore: 78,
    noveltyScore: 72,
    policyAlignmentScore: 78,
    goodPoints: [
      'LLM技術の成熟により実現可能性が向上',
      '全省庁共通の課題解決に寄与',
      '横展開が容易な設計',
    ],
    risks: [
      '機密文書の取り扱いルール整備が必要',
      '既存の文書管理システムとの連携',
    ],
    recommendations: [
      'パイロット省庁での先行実施',
      'セキュリティ要件の明確化',
    ],
  },
  '3': {
    ideaId: '3',
    overallScore: 80,
    feasibilityScore: 70,
    impactScore: 95,
    noveltyScore: 75,
    policyAlignmentScore: 80,
    goodPoints: [
      '社会的インパクトが非常に高い',
      '防災は国民の関心が高い分野',
      'リアルタイム情報共有で命を救える',
    ],
    risks: [
      '複数機関との調整が必要',
      '災害時のシステム可用性確保',
    ],
    recommendations: [
      '関係機関との協議体制の構築',
      '冗長性を持ったインフラ設計',
    ],
  },
  '4': {
    ideaId: '4',
    overallScore: 69,
    feasibilityScore: 88,
    impactScore: 65,
    noveltyScore: 55,
    policyAlignmentScore: 68,
    goodPoints: [
      '技術的難易度が低く即座に着手可能',
      '利用者の利便性向上が確実',
      '既存技術の組み合わせで実現',
    ],
    risks: [
      '既存システムとの統合コスト',
      '利用率向上のための周知が必要',
    ],
    recommendations: [
      '既存システムの棚卸しを先行',
      '利用者向けインセンティブの検討',
    ],
  },
  '5': {
    ideaId: '5',
    overallScore: 72,
    feasibilityScore: 72,
    impactScore: 80,
    noveltyScore: 65,
    policyAlignmentScore: 78,
    goodPoints: [
      'デジタルデバイド解消の政策優先度に合致',
      '見守り機能で付加価値を創出',
      '人的サポートとの組み合わせが効果的',
    ],
    risks: [
      '高齢者の端末操作習熟に時間が必要',
      'サポート人員の確保・育成',
    ],
    recommendations: [
      '地域のデジタル支援員との連携',
      '段階的な機能追加アプローチ',
    ],
  },
  '6': {
    ideaId: '6',
    overallScore: 78,
    feasibilityScore: 68,
    impactScore: 88,
    noveltyScore: 78,
    policyAlignmentScore: 90,
    goodPoints: [
      'EBPM推進の中核施策となりうる',
      '政策効果の可視化で説明責任を果たせる',
      'データ連携基盤の活用促進',
    ],
    risks: [
      'データ連携の整備状況に依存',
      'KPI設定の妥当性確保が課題',
    ],
    recommendations: [
      'データ整備と並行した段階的構築',
      '専門家によるKPIレビュー体制',
    ],
  },
  '7': {
    ideaId: '7',
    overallScore: 72,
    feasibilityScore: 85,
    impactScore: 72,
    noveltyScore: 60,
    policyAlignmentScore: 75,
    goodPoints: [
      '自治体間連携は政策的にも推奨',
      '成功・失敗事例の共有で効率化',
      '横展開のスピードアップに寄与',
    ],
    risks: [
      'プラットフォーム運営の持続性',
      '情報の質の担保が課題',
    ],
    recommendations: [
      '運営主体の明確化',
      '情報の評価・キュレーション体制',
    ],
  },
  '8': {
    ideaId: '8',
    overallScore: 72,
    feasibilityScore: 55,
    impactScore: 92,
    noveltyScore: 70,
    policyAlignmentScore: 82,
    goodPoints: [
      'セキュリティ強化は喫緊の課題',
      'リモートワーク環境の整備促進',
      'サイバー攻撃への耐性強化',
    ],
    risks: [
      '全省庁統一には大規模な予算が必要',
      '既存システムからの移行が困難',
    ],
    recommendations: [
      '段階的な導入計画の策定',
      'パイロット省庁での実証実験',
    ],
  },
};

// BMC audit report
export const mockBMCAuditReport: BMCAuditReport = {
  overallScore: 81,
  completenessScore: 85,
  consistencyScore: 78,
  viabilityScore: 80,
  goodPoints: [
    '9つの構成要素がバランスよく記述されている',
    '価値提案と顧客セグメントの整合性が高い',
    '収益モデルが具体的で実現可能',
    'パートナーシップ戦略が明確',
  ],
  weaknesses: [
    'コスト構造の詳細な見積もりが不足',
    'チャネル間の連携戦略が不明確',
    '競合との差別化ポイントの深掘りが必要',
  ],
  recommendations: [
    'コストシミュレーションの実施',
    'オムニチャネル戦略の策定',
    '競合分析の追加と差別化要因の明確化',
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

// Generate 300 mock ideas for CSV export
const ideaTemplates = [
  { category: 'AI・自動化', prefix: 'AI' },
  { category: '市民サービス', prefix: 'CS' },
  { category: 'データ活用', prefix: 'DA' },
  { category: '防災・危機管理', prefix: 'DM' },
  { category: 'デジタルデバイド対策', prefix: 'DD' },
  { category: 'セキュリティ', prefix: 'SC' },
  { category: '知識共有', prefix: 'KS' },
  { category: '業務効率化', prefix: 'EF' },
];

const ideaTitles: Record<string, string[]> = {
  'AI・自動化': [
    'AI窓口アシスタント', '文書自動要約システム', 'AIチャットボット相談窓口', '自動翻訳支援ツール',
    'AI議事録作成システム', '予測分析ダッシュボード', 'RPA��務自動化基盤', 'AIコールセンター支援',
    '自動FAQ生成システム', 'AI申請書類チェック', '音声認識窓口システム', 'AIスケジュール最適化',
  ],
  '市民サービス': [
    'オンライン申請ポータル', 'マイページ統合サービス', '予約統合プラットフォーム', 'プッシュ通知サービス',
    '行政サービス検索エンジン', 'ワンストップ窓口', '電子申請ナビゲーター', 'サービス満足度可視化',
    'コンシェルジュサービス', 'ライフイベント支援', '多言語対応ポータル', '手続き進捗トラッカー',
  ],
  'データ活用': [
    '政策効果ダッシュボード', 'オープンデータ基盤', 'データカタログシステム', 'BI分析ツール',
    '人流データ活用基盤', 'EBPMデータプラットフォーム', 'リアルタイム統計システム', 'GIS分析基盤',
    '省庁間データ連携', 'データマーケットプレイス', '統計API基盤', 'データ品質管理システム',
  ],
  '防災・危機管理': [
    'デジタル防災プラットフォーム', '避難所管理システム', '災害情報集約基盤', 'リアルタイム警報システム',
    '防災訓練シミュレーター', '物資配分最適化', '安否確認システム', '復旧支援ダッシュボード',
    'ドローン災害監視', 'SNS情報収集システム', '被災者支援マッチング', 'インフラ監視基盤',
  ],
  'デジタルデバイド対策': [
    'シニア向けデジタル支援', 'アクセシビリティ診断', '音声操作インターフェース', 'やさしい日本語変換',
    'デジタル支援員マッチング', '高齢者見守りシステム', '簡易操作端末', 'リモート支援サービス',
    'デジタル活用研修', '多世代交流プラットフォーム', '視覚障害者支援ツール', 'タッチレス操作端末',
  ],
  'セキュリティ': [
    'ゼロトラスト基盤', 'サイバー脅威検知', '統合認証基盤', 'セキュリティ監査ツール',
    '脆弱性管理システム', 'インシデント対応基盤', '暗号化通信基盤', 'アクセス制御システム',
    'セキュリティ教育プラットフォーム', 'ペネトレーションテスト自動化', 'ログ分析基盤', 'SOCダッシュボード',
  ],
  '知識共有': [
    '自治体ナレッジベース', 'ベストプラクティス共有', '政策事例データベース', 'FAQ共有プラットフォーム',
    '職員向けWiki', 'メンタリングマッチング', '研修コンテンツ共有', 'コミュニティフォーラム',
    '失敗事例データベース', 'ノウハウ可視化ツール', 'Q&Aボット', '専門家ネットワーク',
  ],
  '業務効率化': [
    '電子決裁システム', 'ワークフロー自動化', 'タスク管理ダッシュボード', '会議室予約最適化',
    '勤怠管理システム', 'プロジェクト管理ツール', '経費精算自動化', '人事評価支援システム',
    '文書管理システム', 'ナレッジ検索エンジン', 'コミュニケーション基盤', '業務可視化ツール',
  ],
};

export function generate300Ideas(): ScoredIdea[] {
  const ideas: ScoredIdea[] = [];
  let id = 1;
  
  // Generate ideas for each category
  for (const template of ideaTemplates) {
    const titles = ideaTitles[template.category] || [];
    const count = template.category === 'AI・自動化' ? 78 :
                  template.category === '市民サービス' ? 65 :
                  template.category === 'データ活用' ? 52 : 
                  Math.floor((300 - 78 - 65 - 52) / 5);
    
    for (let i = 0; i < count; i++) {
      const titleIndex = i % titles.length;
      const variant = Math.floor(i / titles.length) + 1;
      const baseTitle = titles[titleIndex];
      const title = variant > 1 ? `${baseTitle} v${variant}` : baseTitle;
      
      const feasibility = Math.floor(Math.random() * 40) + 50; // 50-90
      const impact = Math.floor(Math.random() * 40) + 50; // 50-90
      const novelty = Math.floor(Math.random() * 40) + 40; // 40-80
      const totalScore = Math.round((feasibility + impact + novelty) / 3);
      
      let quadrant: ScoredIdea['quadrant'];
      if (feasibility >= 70 && impact >= 75) {
        quadrant = 'quick-win';
      } else if (feasibility < 70 && impact >= 75) {
        quadrant = 'moonshot';
      } else if (feasibility >= 70 && impact < 75) {
        quadrant = 'core';
      } else {
        quadrant = 'low-priority';
      }
      
      ideas.push({
        id: String(id),
        title,
        description: `${template.category}カテゴリの施策案。${baseTitle}を活用した行政サービスの改善・効率化を目指す。`,
        category: template.category,
        feasibility,
        impact,
        novelty,
        tags: [template.prefix, template.category.slice(0, 4)],
        totalScore,
        quadrant,
        reasoning: `${template.category}分野における${baseTitle}の導入により、業務効率化と住民サービス向上が期待できる。`,
      });
      id++;
    }
  }
  
  return ideas;
}

export function exportIdeasToCSV(ideas: ScoredIdea[]): string {
  const headers = ['ID', 'タイトル', '説明', 'カテゴリ', '実現可能性', 'インパクト', '独自性', '総合スコア', '象限', 'タグ', '評価理由'];
  
  const rows = ideas.map(idea => [
    idea.id,
    `"${idea.title.replace(/"/g, '""')}"`,
    `"${idea.description.replace(/"/g, '""')}"`,
    idea.category,
    idea.feasibility,
    idea.impact,
    idea.novelty,
    idea.totalScore,
    idea.quadrant,
    `"${idea.tags.join(', ')}"`,
    `"${idea.reasoning.replace(/"/g, '""')}"`,
  ]);
  
  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

export function downloadCSV(content: string, filename: string): void {
  const BOM = '\uFEFF'; // UTF-8 BOM for Excel compatibility
  const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Generate audit report dynamically based on idea properties
export function generateIdeaAuditReport(idea: ScoredIdea): IdeaAuditReport {
  // Check if we have a predefined report
  if (mockIdeaAuditReports[idea.id]) {
    return mockIdeaAuditReports[idea.id];
  }
  
  // Generate dynamic report based on idea properties
  const policyAlignmentScore = Math.floor(Math.random() * 20) + 70; // 70-90
  
  const goodPointsTemplates = [
    `${idea.category}分野の重要課題に対応`,
    '既存技術の活用で実現性が高い',
    '住民サービス向上への直接的効果',
    '横展開が容易な設計',
    'コスト効率が良い',
    '政策優先度との整合性が高い',
    'ステークホルダーの理解を得やすい',
  ];
  
  const risksTemplates = [
    '関係機関との調整が必要',
    '既存システムとの連携に課題',
    '運用体制の整備が必要',
    '予算確保の見通しが不透明',
    'セキュリティ要件の精査が必要',
  ];
  
  const recommendationsTemplates = [
    '段階的な導入計画の策定',
    'パイロット事業での実証を推奨',
    'ステークホルダーとの早期協議',
    'KPI設定と効果測定の仕組み構築',
    'リスク軽減策の具体化',
  ];
  
  // Select items based on scores
  const numGoodPoints = idea.totalScore >= 70 ? 4 : idea.totalScore >= 60 ? 3 : 2;
  const numRisks = idea.feasibility < 70 ? 3 : 2;
  const numRecommendations = 3;
  
  const shuffleAndTake = <T,>(arr: T[], n: number): T[] => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  };
  
  return {
    ideaId: idea.id,
    overallScore: idea.totalScore,
    feasibilityScore: idea.feasibility,
    impactScore: idea.impact,
    noveltyScore: idea.novelty,
    policyAlignmentScore,
    goodPoints: shuffleAndTake(goodPointsTemplates, numGoodPoints),
    risks: shuffleAndTake(risksTemplates, numRisks),
    recommendations: shuffleAndTake(recommendationsTemplates, numRecommendations),
  };
}
