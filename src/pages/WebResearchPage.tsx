import { useState } from "react";
import { Globe, Search, Plus, X, Loader, Download, Link, Calendar } from "lucide-react";

const SCOPES = ["市場調査", "競合分析", "技術動向", "ニュース収集", "規制・法令確認"];

const MOCK_SOURCES = [
  { title: "国内SaaS市場、2026年も二桁成長継続—MM総研調査", url: "mmri.co.jp/press/...", date: "7/3" },
  { title: "中堅・中小企業のDX投資動向 最新レポート", url: "ipa.go.jp/publish/...", date: "7/1" },
  { title: "競合A社、SMB向け新プランを6月発表", url: "prnews.jp/...", date: "6/28" },
  { title: "SaaS解約率に影響する主要因子—2026年版", url: "openview.co/blog/...", date: "6/20" },
];

const MOCK_REPORT = `## 国内SaaS市場 動向調査レポート
**調査日**: 2026年7月4日　**スコープ**: 市場調査

---

### エグゼクティブサマリー
国内SaaS市場は2026年も二桁成長を維持しており、MM総研の最新調査では市場規模が前年比+18%の1兆2,400億円に達する見込みです。特に中堅・中小企業（SMB）セグメントにおけるクラウド移行需要が旺盛で、当社製品が対象とする業務自動化領域への投資意欲は高水準を継続しています。

### 市場トレンド
1. **AI統合機能の標準化**: 2026年上半期に主要SaaSベンダーの約70%がAI機能を標準搭載
2. **SMBセグメントの価格競争激化**: 競合A社が6月に月額980円〜の廉価プランを投入
3. **セキュリティ・コンプライアンス要件強化**: 改正個人情報保護法対応が購買基準に浮上

### 競合動向
競合A社のSMB向け新プランは価格訴求が中心で、機能面では当社より簡易。ただし認知度の高さから中小企業への浸透リスクあり。

### 示唆
- SMB向けには機能より「導入容易性」の訴求を強化
- AI機能の早期リリースが差別化の維持に直結
- パートナー経由の間接販売チャネル強化を検討

---
*参照元: 4件のWebソース（2026年6月〜7月）*`;

export function WebResearchPage() {
  const [scope, setScope] = useState(SCOPES[0]);
  const [keywords, setKeywords] = useState<string[]>(["国内SaaS市場", "中小企業DX"]);
  const [kwInput, setKwInput] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(MOCK_REPORT);
  const [sources, setSources] = useState(MOCK_SOURCES);

  function addKeyword() {
    if (kwInput.trim() && !keywords.includes(kwInput.trim())) {
      setKeywords((k) => [...k, kwInput.trim()]);
      setKwInput("");
    }
  }

  function addUrl() {
    if (urlInput.trim()) {
      setUrls((u) => [...u, urlInput.trim()]);
      setUrlInput("");
    }
  }

  function runResearch() {
    setLoading(true);
    setReport(null);
    setTimeout(() => {
      setReport(MOCK_REPORT);
      setSources(MOCK_SOURCES);
      setLoading(false);
    }, 2500);
  }

  return (
    <div className="flex h-full">
      {/* Left: settings */}
      <div className="w-72 border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto">
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-[16px] font-bold text-gray-900">Web調査</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">市場・競合・技術動向を自動収集</p>
        </div>

        <div className="px-4 py-4 space-y-5">
          {/* Scope */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">調査スコープ</p>
            <div className="flex flex-wrap gap-1.5">
              {SCOPES.map((s) => (
                <button key={s} onClick={() => setScope(s)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${scope === s ? "border-[#5b4fcf] bg-purple-50 text-[#5b4fcf]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">検索キーワード</p>
            <div className="flex gap-2 mb-2">
              <input value={kwInput} onChange={(e) => setKwInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                placeholder="キーワードを追加"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#5b4fcf]" />
              <button onClick={addKeyword} className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {keywords.map((k) => (
                <span key={k} className="flex items-center gap-1 text-[11px] bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {k}
                  <button onClick={() => setKeywords((kw) => kw.filter((x) => x !== k))}>
                    <X size={10} className="text-gray-400" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* URLs */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">参照URL（任意）</p>
            <div className="flex gap-2 mb-2">
              <input value={urlInput} onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addUrl()}
                placeholder="https://..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#5b4fcf]" />
              <button onClick={addUrl} className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
            {urls.map((u) => (
              <div key={u} className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-1">
                <Link size={10} />
                <span className="truncate flex-1">{u}</span>
                <button onClick={() => setUrls((arr) => arr.filter((x) => x !== u))}>
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={runResearch}
            disabled={loading || keywords.length === 0}
            className="w-full py-2.5 bg-[#5b4fcf] text-white text-[13px] font-medium rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-2"
          >
            {loading ? <><Loader size={13} className="animate-spin" /> 調査中…</> : <><Search size={13} /> 調査実行</>}
          </button>
        </div>
      </div>

      {/* Right: sources + report */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sources */}
        {sources.length > 0 && (
          <div className="px-8 py-3 border-b border-gray-100 shrink-0">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">参照ソース</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {sources.map((s, i) => (
                <div key={i} className="shrink-0 w-52 p-2.5 border border-gray-200 rounded-lg">
                  <p className="text-[11px] font-medium text-gray-800 leading-snug line-clamp-2 mb-1">{s.title}</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Globe size={9} /><span className="truncate">{s.url}</span>
                    <Calendar size={9} className="ml-auto shrink-0" />{s.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Report */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Loader size={32} className="animate-spin mb-4 text-[#5b4fcf]" />
              <p className="text-[13px]">Webを調査・分析中…</p>
            </div>
          ) : report ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">調査レポート</p>
                <button className="flex items-center gap-1 text-[11px] text-[#5b4fcf] hover:opacity-80">
                  <Download size={11} /> 保存
                </button>
              </div>
              <div>
                {report.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) return <h2 key={i} className="text-[16px] font-bold text-gray-900 mb-2">{line.slice(3)}</h2>;
                  if (line.startsWith("### ")) return <h3 key={i} className="text-[13px] font-bold text-gray-800 mt-5 mb-2">{line.slice(4)}</h3>;
                  if (line.startsWith("**") && line.includes("**:")) {
                    const [label, ...rest] = line.split("**:");
                    return <p key={i} className="text-[12px] text-gray-500 mb-3"><strong>{label.replace(/\*\*/g, "")}</strong>:{rest.join("")}</p>;
                  }
                  if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
                    const [, ...rest] = line.split(". ");
                    return <li key={i} className="text-[13px] text-gray-700 ml-4 mb-2 list-decimal">{rest.join(". ")}</li>;
                  }
                  if (line.startsWith("- ")) return <li key={i} className="text-[13px] text-gray-700 ml-4 mb-1">{line.slice(2)}</li>;
                  if (line.startsWith("---")) return <hr key={i} className="border-gray-200 my-4" />;
                  if (line.startsWith("*")) return <p key={i} className="text-[11px] text-gray-400 italic">{line.replace(/\*/g, "")}</p>;
                  return line ? <p key={i} className="text-[13px] text-gray-700 leading-relaxed mb-2">{line}</p> : <div key={i} className="h-1" />;
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-300">
              <Globe size={40} className="mb-4" />
              <p className="text-[13px]">キーワードを設定して調査を実行してください</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
