import { useState } from "react";
import {
  MessageSquare,
  FileSearch,
  PenLine,
  Globe,
  FileSpreadsheet,
  Receipt,
  FileWarning,
  Files,
  Mic,
  IdCard,
  ChevronDown,
  Play,
} from "lucide-react";
import { workflowApps, type WorkflowApp } from "@/data/mockData";
import type { Page } from "@/App";

const iconMap: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare size={15} />,
  FileSearch: <FileSearch size={15} />,
  PenLine: <PenLine size={15} />,
  Globe: <Globe size={15} />,
  FileSpreadsheet: <FileSpreadsheet size={15} />,
  Receipt: <Receipt size={15} />,
  FileWarning: <FileWarning size={15} />,
  Files: <Files size={15} />,
  Mic: <Mic size={15} />,
  IdCard: <IdCard size={15} />,
};

const CONFIDENTIALITY_OPTIONS = ["一般", "社外秘", "機密"] as const;
type Confidentiality = (typeof CONFIDENTIALITY_OPTIONS)[number];

const confidentialityStyle: Record<Confidentiality, string> = {
  一般: "text-gray-400",
  社外秘: "text-amber-500",
  機密: "text-red-400",
};

function AppCard({ app, onNavigate }: { app: WorkflowApp; onNavigate: (p: Page) => void }) {
  const [level, setLevel] = useState<Confidentiality>("一般");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-shrink-0 w-44 p-3.5 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Confidentiality */}
      <div className="absolute top-2.5 right-2.5">
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className={`flex items-center gap-0.5 text-[11px] font-medium ${confidentialityStyle[level]}`}
          >
            {level}
            <ChevronDown size={9} />
          </button>
          {open && (
            <div className="absolute right-0 top-5 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-max">
              {CONFIDENTIALITY_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setLevel(opt); setOpen(false); }}
                  className="w-full text-left px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 text-white"
        style={{ backgroundColor: app.color }}
      >
        {iconMap[app.icon]}
      </div>

      <p className="text-[13px] font-semibold text-gray-800 leading-snug mb-1 pr-8">{app.name}</p>
      <p className="text-[12px] text-gray-400 leading-snug mb-3">{app.description}</p>

      <button
        onClick={() => app.href && onNavigate("file-agent")}
        className="flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-800 transition-colors"
      >
        <Play size={11} />
        実行
      </button>
    </div>
  );
}

export function WorkflowWidget({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [tab, setTab] = useState<"popular" | "business">("popular");
  const filtered = workflowApps.filter((a) => a.category === tab);

  return (
    <section>
      <div className="flex items-center gap-4 mb-3">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          AIワークフロー
        </p>
        <div className="flex gap-0.5">
          {(["popular", "business"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[12px] px-2.5 py-1 rounded-md transition-colors ${
                tab === t
                  ? "bg-gray-100 text-gray-800 font-medium"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t === "popular" ? "よく使う" : "業務特化"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filtered.map((app) => (
          <AppCard key={app.id} app={app} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
