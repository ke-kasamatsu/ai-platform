import { useState } from "react";
import { Files, FileText, Plus, Loader, BarChart3 } from "lucide-react";

type KnowledgeFile = { id: number; name: string; pages: number; added: string };

const KNOWLEDGE_FILES: KnowledgeFile[] = [
  { id: 1, name: "2026年Q2業績レポート.pdf", pages: 28, added: "7/3" },
  { id: 2, name: "中期経営計画2026-2028.pdf", pages: 45, added: "6/20" },
  { id: 3, name: "市場動向レポート_2026H1.pdf", pages: 18, added: "6/15" },
  { id: 4, name: "部門別KPI一覧_2026Q2.xlsx", pages: 3, added: "7/1" },
];

const MOCK_REPORT = `## Q2業績の主要トレンド分析

### 売上成長の要因
中期経営計画で掲げた「法人向けSaaS強化」施策が奏功し、Q2法人契約数は前期比+15%（87件）を記録しました。市場動向レポートが示す通り、国内中堅企業のDX投資意欲は継続的に高く、当社製品との親和性が高い層への訴求が効果的でした。

### リスク項目
- SMB（中小企業）セグメントの解約率が1.8%→2.3%に上昇
- 市場レポートによるとSMB向け競合製品が価格競争を強化中
- Q3以降のカスタマーサクセスへの投資増が必要と判断

### Q3への示唆
中期計画の売上目標（通期10億円）達成には、Q3で約2.7億円が必要です。新製品ローンチ（8月予定）の初速が鍵となります。

---
*参照ファイル: 2026年Q2業績レポート.pdf / 中期経営計画2026-2028.pdf / 市場動向レポート_2026H1.pdf*`;

export function AnalysisPage() {
  const [files] = useState<KnowledgeFile[]>(KNOWLEDGE_FILES);
  const [query, setQuery] = useState("");
  const [report, setReport] = useState<string | null>(MOCK_REPORT);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 2, 3]);

  function toggleFile(id: number) {
    setSelectedIds((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  }

  function runAnalysis() {
    if (!query.trim()) return;
    setLoading(true);
    setReport(null);
    setTimeout(() => {
      setReport(MOCK_REPORT);
      setLoading(false);
    }, 2000);
  }

  return (
    <div className="flex h-full">
      {/* Left: knowledge base */}
      <div className="w-72 border-r border-gray-100 flex flex-col shrink-0">
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-[16px] font-bold text-gray-900">複数資料分析</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">ナレッジファイルを選択して分析</p>
        </div>

        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">ナレッジベース</p>
          <button className="flex items-center gap-1 text-[11px] text-[#5b4fcf] hover:opacity-80">
            <Plus size={12} /> 追加
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {files.map((f) => (
            <div key={f.id}
              onClick={() => toggleFile(f.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${selectedIds.includes(f.id) ? "bg-purple-50 border border-purple-100" : "hover:bg-gray-50"}`}
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${selectedIds.includes(f.id) ? "border-[#5b4fcf] bg-[#5b4fcf]" : "border-gray-300"}`}>
                {selectedIds.includes(f.id) && <svg viewBox="0 0 10 8" className="w-2.5 h-2" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <FileText size={13} className="text-gray-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-gray-700 truncate">{f.name}</p>
                <p className="text-[11px] text-gray-400">{f.pages}ページ · {f.added}追加</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">{selectedIds.length}件選択中</p>
        </div>
      </div>

      {/* Right: query + report */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Query input */}
        <div className="px-8 py-5 border-b border-gray-100 shrink-0">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">分析クエリ</p>
          <div className="flex gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runAnalysis()}
              placeholder="例：Q2の業績トレンドと市場動向を踏まえてQ3の課題を分析してください"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5b4fcf] transition-colors"
            />
            <button
              onClick={runAnalysis}
              disabled={loading || selectedIds.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#5b4fcf] text-white text-[13px] font-medium rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              {loading ? <Loader size={14} className="animate-spin" /> : <BarChart3 size={14} />}
              分析実行
            </button>
          </div>
        </div>

        {/* Report output */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Loader size={32} className="animate-spin mb-4 text-[#5b4fcf]" />
              <p className="text-[13px]">{selectedIds.length}件のファイルを横断分析中…</p>
            </div>
          ) : report ? (
            <>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">分析レポート</p>
              <div className="prose prose-sm max-w-none">
                {report.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) return <h2 key={i} className="text-[15px] font-bold text-gray-900 mt-6 mb-2">{line.slice(3)}</h2>;
                  if (line.startsWith("### ")) return <h3 key={i} className="text-[13px] font-bold text-gray-800 mt-4 mb-1.5">{line.slice(4)}</h3>;
                  if (line.startsWith("- ")) return <li key={i} className="text-[13px] text-gray-700 ml-4 mb-1">{line.slice(2)}</li>;
                  if (line.startsWith("---")) return <hr key={i} className="border-gray-200 my-4" />;
                  if (line.startsWith("*")) return <p key={i} className="text-[11px] text-gray-400 italic">{line.replace(/\*/g, "")}</p>;
                  return line ? <p key={i} className="text-[13px] text-gray-700 leading-relaxed mb-2">{line}</p> : <div key={i} className="h-1" />;
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-300">
              <Files size={40} className="mb-4" />
              <p className="text-[13px]">ファイルを選択してクエリを入力してください</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
