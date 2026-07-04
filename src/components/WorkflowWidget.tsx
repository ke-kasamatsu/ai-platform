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
} from "lucide-react";
import { workflowApps, type WorkflowApp } from "@/data/mockData";

const iconMap: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare size={20} />,
  FileSearch: <FileSearch size={20} />,
  PenLine: <PenLine size={20} />,
  Globe: <Globe size={20} />,
  FileSpreadsheet: <FileSpreadsheet size={20} />,
  Receipt: <Receipt size={20} />,
  FileWarning: <FileWarning size={20} />,
  Files: <Files size={20} />,
  Mic: <Mic size={20} />,
  IdCard: <IdCard size={20} />,
};

const CONFIDENTIALITY_OPTIONS = ["一般", "社外秘", "機密"] as const;
type Confidentiality = (typeof CONFIDENTIALITY_OPTIONS)[number];

const confidentialityStyle: Record<Confidentiality, string> = {
  一般: "bg-gray-100 text-gray-600",
  社外秘: "bg-amber-50 text-amber-700",
  機密: "bg-red-50 text-red-700",
};

function AppCard({ app }: { app: WorkflowApp }) {
  const [level, setLevel] = useState<Confidentiality>("一般");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-shrink-0 w-48 bg-white border border-gray-200 rounded-xl p-4 shadow-card hover:shadow-md transition-shadow">
      {/* Confidentiality badge */}
      <div className="absolute top-3 right-3">
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${confidentialityStyle[level]}`}
          >
            {level}
            <ChevronDown size={10} />
          </button>
          {open && (
            <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-max">
              {CONFIDENTIALITY_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setLevel(opt);
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
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
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white"
        style={{ backgroundColor: app.color }}
      >
        {iconMap[app.icon]}
      </div>

      {/* Info */}
      <p className="text-sm font-semibold text-gray-900 mb-1 pr-10 leading-snug">
        {app.name}
      </p>
      <p className="text-xs text-gray-400 leading-snug mb-4">{app.description}</p>

      {/* Run button */}
      <button
        className="w-full text-xs font-medium py-1.5 rounded-lg border transition-colors text-white"
        style={{ backgroundColor: app.color, borderColor: app.color }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.opacity = "0.85")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.opacity = "1")
        }
      >
        実行
      </button>
    </div>
  );
}

export function WorkflowWidget() {
  const [tab, setTab] = useState<"popular" | "business">("popular");
  const filtered = workflowApps.filter((a) => a.category === tab);

  return (
    <section>
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          AIワークフロー
        </h2>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setTab("popular")}
            className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${
              tab === "popular"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            よく使う
          </button>
          <button
            onClick={() => setTab("business")}
            className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${
              tab === "business"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            業務特化
          </button>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
        {filtered.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
