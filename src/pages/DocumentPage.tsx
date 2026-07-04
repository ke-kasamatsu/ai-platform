import { useState, useRef } from "react";
import { Upload, FileText, Download, ChevronDown, CheckCircle, Loader } from "lucide-react";

type UploadedFile = {
  id: number;
  name: string;
  size: string;
  status: "waiting" | "processing" | "done" | "error";
  result?: Record<string, string>;
};

const MOCK_RESULTS: Record<string, string> = {
  取引先名: "株式会社山田商事",
  請求金額: "¥385,000（税込）",
  請求日: "2026年7月1日",
  支払期限: "2026年7月31日",
  品目: "業務委託費・7月分",
  担当者: "山田 太郎",
};

const OUTPUT_FORMATS = ["JSON", "Excel (.xlsx)", "CSV", "社内システム連携（API）"];

export function DocumentPage() {
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: 1, name: "請求書_2026年7月_山田商事.pdf", size: "248 KB", status: "done", result: MOCK_RESULTS },
    { id: 2, name: "発注書_ABC社_0701.pdf", size: "183 KB", status: "processing" },
  ]);
  const [outputFormat, setOutputFormat] = useState("JSON");
  const [formatOpen, setFormatOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<UploadedFile>(files[0]);

  function addFile(name: string, size: string) {
    const f: UploadedFile = { id: Date.now(), name, size, status: "waiting" };
    setFiles((prev) => [...prev, f]);
    setTimeout(() => {
      setFiles((prev) => prev.map((x) => (x.id === f.id ? { ...x, status: "processing" } : x)));
      setTimeout(() => {
        setFiles((prev) => prev.map((x) => (x.id === f.id ? { ...x, status: "done", result: MOCK_RESULTS } : x)));
      }, 2000);
    }, 500);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) addFile(file.name, `${Math.round(file.size / 1024)} KB`);
  }

  const statusIcon = (s: UploadedFile["status"]) => {
    if (s === "done") return <CheckCircle size={14} className="text-green-500" />;
    if (s === "processing") return <Loader size={14} className="text-blue-400 animate-spin" />;
    return <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />;
  };

  return (
    <div className="flex h-full">
      {/* Left: file list + upload */}
      <div className="w-72 border-r border-gray-100 flex flex-col shrink-0">
        <div className="px-5 py-4 border-b border-gray-100">
          <h1 className="text-[16px] font-bold text-gray-900">文書処理</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">ファイルをアップロードしてデータ化</p>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`mx-4 mt-4 border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${dragging ? "border-[#5b4fcf] bg-purple-50" : "border-gray-200 hover:border-gray-300"}`}
        >
          <Upload size={20} className="mx-auto text-gray-400 mb-2" />
          <p className="text-[12px] text-gray-500">ドラッグ＆ドロップ<br />またはクリックして選択</p>
          <p className="text-[11px] text-gray-400 mt-1">PDF / Excel / CSV</p>
          <input ref={inputRef} type="file" className="hidden" accept=".pdf,.xlsx,.csv"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) addFile(f.name, `${Math.round(f.size / 1024)} KB`); }} />
        </div>

        {/* File list */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          {files.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(f)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-colors ${selected.id === f.id ? "bg-purple-50 border border-purple-100" : "hover:bg-gray-50"}`}
            >
              <FileText size={14} className="text-gray-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-gray-700 truncate">{f.name}</p>
                <p className="text-[11px] text-gray-400">{f.size}</p>
              </div>
              {statusIcon(f.status)}
            </button>
          ))}
        </div>
      </div>

      {/* Right: result */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-8 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <p className="text-[13px] font-semibold text-gray-800 truncate max-w-md">{selected.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {selected.status === "done" && "抽出完了"}
              {selected.status === "processing" && "処理中…"}
              {selected.status === "waiting" && "待機中"}
            </p>
          </div>
          {selected.status === "done" && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setFormatOpen((o) => !o)}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-[12px] text-gray-700 hover:border-gray-300 transition-colors"
                >
                  {outputFormat} <ChevronDown size={12} />
                </button>
                {formatOpen && (
                  <div className="absolute right-0 top-9 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-max">
                    {OUTPUT_FORMATS.map((f) => (
                      <button key={f} onClick={() => { setOutputFormat(f); setFormatOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50">
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-[#5b4fcf] text-white text-[12px] font-medium rounded-lg hover:opacity-90 transition-opacity">
                <Download size={13} /> 出力
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {selected.status === "done" && selected.result ? (
            <>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">抽出データ</p>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {Object.entries(selected.result).map(([k, v], i) => (
                  <div key={k} className={`flex items-center px-5 py-3 text-[13px] ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <span className="w-32 text-gray-500 font-medium shrink-0">{k}</span>
                    <span className="text-gray-900">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">JSONプレビュー</p>
                <pre className="bg-gray-950 text-green-400 text-[12px] rounded-xl p-5 overflow-x-auto leading-relaxed">
{JSON.stringify(selected.result, null, 2)}
                </pre>
              </div>
            </>
          ) : selected.status === "processing" ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Loader size={32} className="animate-spin mb-4 text-[#5b4fcf]" />
              <p className="text-[13px]">AIが読み取り・構造化中…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-300">
              <FileText size={40} className="mb-4" />
              <p className="text-[13px]">ファイルを選択してください</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
