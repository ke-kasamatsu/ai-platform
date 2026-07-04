import { useState, useRef } from "react";
import { Mic, Upload, Play, Pause, Download, ChevronDown, Loader, CheckCircle } from "lucide-react";

const OUTPUT_FORMATS = ["議事録（標準）", "要約レポート", "アクションアイテム抽出", "Q&A形式", "ナレッジ記事"];

const MOCK_TRANSCRIPT = `[00:00] 山田：本日はお時間いただきありがとうございます。Q3の製品ロードマップについて議題としたいと思います。
[00:12] 佐藤：よろしくお願いします。先に確認ですが、Q2の振り返りは別途共有済みでよろしいでしょうか。
[00:20] 山田：はい、すでに共有済みです。では本題に入りますが、8月リリース予定の新機能について、開発側の進捗を田中さんからお願いできますか。
[00:35] 田中：現在75%完了しています。残りはUIの最終調整とQAテストの2フェーズです。スケジュール通り8月15日リリースを維持できる見込みです。
[01:02] 山田：ありがとうございます。マーケティング側の準備状況は？
[01:08] 鈴木：プレスリリースのドラフトは完成しています。パートナー向けのウェビナーを8月10日に設定しました。
[01:20] 山田：了解です。では各自のネクストアクションを確認して締めたいと思います。`;

const MOCK_MINUTES = `# 議事録

**日時**: 2026年7月4日
**参加者**: 山田、佐藤、田中、鈴木
**議題**: Q3製品ロードマップ確認

---

## 決定事項
- 新機能リリース日：**8月15日**（変更なし）
- パートナー向けウェビナー：**8月10日**開催

## 進捗報告
- 開発進捗：75%完了、QAフェーズへ移行予定
- マーケティング：プレスリリースドラフト完成済み

## アクションアイテム
| 担当 | タスク | 期限 |
|------|--------|------|
| 田中 | UIファイナル＆QA完了 | 8/12 |
| 鈴木 | ウェビナー案内送付 | 7/20 |
| 山田 | 全体スケジュール最終確認 | 7/10 |

## 次回
次回定例：7月18日（金）14:00〜`;

export function AudioPage() {
  const [file, setFile] = useState<{ name: string; duration: string } | null>({
    name: "会議録音_2026-07-04.m4a",
    duration: "1:28",
  });
  const [status, setStatus] = useState<"idle" | "transcribing" | "done">("done");
  const [outputFormat, setOutputFormat] = useState(OUTPUT_FORMATS[0]);
  const [formatOpen, setFormatOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(MOCK_MINUTES);
  const inputRef = useRef<HTMLInputElement>(null);

  function onFileSelect(f: File) {
    setFile({ name: f.name, duration: "—" });
    setStatus("transcribing");
    setOutput(null);
    setTimeout(() => setStatus("done"), 3000);
  }

  function generateOutput() {
    setGenerating(true);
    setOutput(null);
    setTimeout(() => { setOutput(MOCK_MINUTES); setGenerating(false); }, 1500);
  }

  return (
    <div className="flex h-full">
      {/* Left panel */}
      <div className="w-72 border-r border-gray-100 flex flex-col shrink-0">
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-[16px] font-bold text-gray-900">音声データ</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">音声→トランスクリプト→ナレッジ化</p>
        </div>

        {/* Upload */}
        <div
          onClick={() => inputRef.current?.click()}
          className="mx-4 mt-4 border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-gray-300 transition-colors"
        >
          <Mic size={20} className="mx-auto text-gray-400 mb-2" />
          <p className="text-[12px] text-gray-500">音声ファイルをアップロード</p>
          <p className="text-[11px] text-gray-400 mt-1">MP3 / M4A / WAV / MP4</p>
          <input ref={inputRef} type="file" className="hidden" accept=".mp3,.m4a,.wav,.mp4"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onFileSelect(f); }} />
        </div>

        {/* File info */}
        {file && (
          <div className="mx-4 mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Mic size={13} className="text-[#5b4fcf]" />
              <p className="text-[12px] font-medium text-gray-700 truncate">{file.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="w-7 h-7 rounded-full bg-[#5b4fcf] text-white flex items-center justify-center hover:opacity-90"
              >
                {playing ? <Pause size={11} /> : <Play size={11} />}
              </button>
              <div className="flex-1 h-1 bg-gray-200 rounded-full">
                <div className="h-1 bg-[#5b4fcf] rounded-full" style={{ width: playing ? "40%" : "0%" }} />
              </div>
              <span className="text-[11px] text-gray-400">{file.duration}</span>
            </div>
          </div>
        )}

        {/* Status */}
        {status === "transcribing" && (
          <div className="mx-4 mt-3 flex items-center gap-2 text-[12px] text-blue-500">
            <Loader size={13} className="animate-spin" /> 文字起こし中…
          </div>
        )}
        {status === "done" && (
          <div className="mx-4 mt-3 flex items-center gap-2 text-[12px] text-green-500">
            <CheckCircle size={13} /> 文字起こし完了
          </div>
        )}

        {/* Output format */}
        {status === "done" && (
          <div className="px-4 mt-4 space-y-2">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">出力形式</p>
            <div className="relative">
              <button
                onClick={() => setFormatOpen((o) => !o)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-[12px] text-gray-700 hover:border-gray-300 transition-colors"
              >
                {outputFormat} <ChevronDown size={12} />
              </button>
              {formatOpen && (
                <div className="absolute left-0 right-0 top-9 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                  {OUTPUT_FORMATS.map((f) => (
                    <button key={f} onClick={() => { setOutputFormat(f); setFormatOpen(false); }}
                      className="w-full text-left px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50">
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={generateOutput}
              disabled={generating}
              className="w-full py-2 bg-[#5b4fcf] text-white text-[12px] font-medium rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-2"
            >
              {generating ? <><Loader size={12} className="animate-spin" /> 生成中…</> : "生成する"}
            </button>
          </div>
        )}
      </div>

      {/* Right: transcript + output */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {/* Transcript */}
          <div className="flex-1 border-r border-gray-100 flex flex-col overflow-hidden">
            <div className="px-6 py-3 border-b border-gray-100 shrink-0">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">トランスクリプト</p>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {status === "done" ? (
                <pre className="text-[12px] text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">{MOCK_TRANSCRIPT}</pre>
              ) : status === "transcribing" ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                  <Loader size={28} className="animate-spin mb-3 text-[#5b4fcf]" />
                  <p className="text-[13px]">文字起こし中…</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-gray-300">
                  <Upload size={32} className="mb-3" />
                  <p className="text-[13px]">音声ファイルをアップロードしてください</p>
                </div>
              )}
            </div>
          </div>

          {/* Output */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{outputFormat}</p>
              {output && (
                <button className="flex items-center gap-1 text-[11px] text-[#5b4fcf] hover:opacity-80">
                  <Download size={11} /> 保存
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {generating ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                  <Loader size={28} className="animate-spin mb-3 text-[#5b4fcf]" />
                  <p className="text-[13px]">生成中…</p>
                </div>
              ) : output ? (
                <div>
                  {output.split("\n").map((line, i) => {
                    if (line.startsWith("# ")) return <h1 key={i} className="text-[16px] font-bold text-gray-900 mb-3">{line.slice(2)}</h1>;
                    if (line.startsWith("## ")) return <h2 key={i} className="text-[13px] font-bold text-gray-800 mt-4 mb-1.5">{line.slice(3)}</h2>;
                    if (line.startsWith("**") && line.endsWith("**")) return null;
                    if (line.startsWith("---")) return <hr key={i} className="border-gray-200 my-3" />;
                    if (line.startsWith("| ")) return <p key={i} className="text-[12px] text-gray-600 font-mono">{line}</p>;
                    if (line.startsWith("- ")) return <li key={i} className="text-[12px] text-gray-700 ml-4 mb-1">{line.slice(2)}</li>;
                    return line ? <p key={i} className="text-[12px] text-gray-700 leading-relaxed mb-1">{line}</p> : <div key={i} className="h-1" />;
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-gray-300">
                  <p className="text-[13px]">出力形式を選んで生成してください</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
