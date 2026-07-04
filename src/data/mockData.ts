export type NewsItem = {
  id: number;
  category: string;
  categoryColor: "red" | "blue" | "green" | "amber";
  title: string;
  body?: string;
  date: string;
};

export type Task = {
  id: number;
  title: string;
  subtitle: string;
  deadline: string;
  completed: boolean;
};

export type LinkItem = {
  id: number;
  label: string;
  icon: string;
  href: string;
};

export type WorkflowApp = {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: "popular" | "business";
};

export const newsItems: NewsItem[] = [
  {
    id: 1,
    category: "重要",
    categoryColor: "red",
    title: "2026年度下期 目標設定期間のお知らせ",
    body: "2026年度下期の目標設定期間が開始されました。対象者は7月31日までに人事システムより目標を登録してください。部門長による承認は8月15日が締め切りとなります。",
    date: "7/4",
  },
  {
    id: 2,
    category: "お知らせ",
    categoryColor: "blue",
    title: "夏季休暇取得推奨期間について",
    date: "7/3",
  },
  {
    id: 3,
    category: "更新",
    categoryColor: "green",
    title: "経費精算システムUIリニューアル",
    date: "7/2",
  },
  {
    id: 4,
    category: "お知らせ",
    categoryColor: "blue",
    title: "社内AI活用ガイドライン v2.0 公開",
    date: "7/1",
  },
];

export const tasks: Task[] = [
  {
    id: 1,
    title: "7月分請求書の確認",
    subtitle: "山田商事",
    deadline: "2026-07-05",
    completed: false,
  },
  {
    id: 2,
    title: "新入社員 田中さんのアカウント申請",
    subtitle: "",
    deadline: "2026-07-04",
    completed: false,
  },
  {
    id: 3,
    title: "Q2経費レポートの承認",
    subtitle: "",
    deadline: "2026-06-30",
    completed: false,
  },
  {
    id: 4,
    title: "契約書レビュー",
    subtitle: "ABC社",
    deadline: "2026-07-10",
    completed: false,
  },
];

export const links: LinkItem[] = [
  { id: 1, label: "勤怠システム", icon: "Clock", href: "#" },
  { id: 2, label: "経費精算", icon: "Receipt", href: "#" },
  { id: 3, label: "社内Wiki", icon: "BookOpen", href: "#" },
  { id: 4, label: "Slack", icon: "MessageSquare", href: "#" },
  { id: 5, label: "採用管理", icon: "Users", href: "#" },
  { id: 6, label: "契約書管理", icon: "FileText", href: "#" },
  { id: 7, label: "AIワークフロー", icon: "Zap", href: "#" },
  { id: 8, label: "ヘルプデスク", icon: "HelpCircle", href: "#" },
];

export const workflowApps: WorkflowApp[] = [
  {
    id: 1,
    name: "チャット対話",
    description: "自由にAIと対話",
    icon: "MessageSquare",
    color: "#5b4fcf",
    category: "popular",
  },
  {
    id: 2,
    name: "文書要約",
    description: "ファイルを即座に要約",
    icon: "FileSearch",
    color: "#1d9e75",
    category: "popular",
  },
  {
    id: 3,
    name: "文章校正",
    description: "公用文・社内文書を校正",
    icon: "PenLine",
    color: "#185fa5",
    category: "popular",
  },
  {
    id: 4,
    name: "Web調査レポート",
    description: "URLや検索結果を分析",
    icon: "Globe",
    color: "#ba7517",
    category: "popular",
  },
  {
    id: 5,
    name: "請求書データ化",
    description: "PDF→構造化JSON＋Excel",
    icon: "FileSpreadsheet",
    color: "#5b4fcf",
    category: "business",
  },
  {
    id: 6,
    name: "経費レポート分類",
    description: "領収書を自動分類・集計",
    icon: "Receipt",
    color: "#1d9e75",
    category: "business",
  },
  {
    id: 7,
    name: "契約書リスク確認",
    description: "リスク条項を自動検出",
    icon: "FileWarning",
    color: "#993556",
    category: "business",
  },
  {
    id: 8,
    name: "複数資料横断分析",
    description: "複数ファイルを横断分析",
    icon: "Files",
    color: "#ba7517",
    category: "business",
  },
  {
    id: 9,
    name: "議事録生成",
    description: "テキストから議事録作成",
    icon: "Mic",
    color: "#3b6d11",
    category: "business",
  },
  {
    id: 10,
    name: "履歴書サマリー",
    description: "応募書類を構造化",
    icon: "IdCard",
    color: "#185fa5",
    category: "business",
  },
];
