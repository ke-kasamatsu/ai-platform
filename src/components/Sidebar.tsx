import {
  Home, Zap, MessageSquare, History, Star,
  FileText, Files, Globe, Mic,
  Shield, BarChart3, Users, LogOut, ChevronDown,
} from "lucide-react";
import type { Page } from "@/App";

type NavItem = { icon: React.ReactNode; label: string; page?: Page };
type NavSection = { title: string; items: NavItem[]; adminOnly?: boolean };

const sections: NavSection[] = [
  {
    title: "メニュー",
    items: [
      { icon: <Home size={14} />,          label: "ホーム",        page: "home" },
      { icon: <Zap size={14} />,           label: "AIワークフロー" },
      { icon: <MessageSquare size={14} />, label: "チャット",      page: "chat" },
      { icon: <History size={14} />,       label: "実行履歴" },
      { icon: <Star size={14} />,          label: "お気に入り" },
    ],
  },
  {
    title: "機能",
    items: [
      { icon: <FileText size={14} />, label: "文書処理",       page: "document" },
      { icon: <Files size={14} />,    label: "複数資料分析",   page: "analysis" },
      { icon: <Mic size={14} />,      label: "音声データ",     page: "audio" },
      { icon: <Globe size={14} />,    label: "Web調査",        page: "web-research" },
    ],
  },
  {
    title: "管理",
    adminOnly: true,
    items: [
      { icon: <Shield size={14} />,   label: "監査ログ" },
      { icon: <BarChart3 size={14} />,label: "コスト管理" },
      { icon: <Users size={14} />,    label: "権限管理" },
    ],
  },
];

type Props = { currentPage: Page; onNavigate: (page: Page) => void };

export function Sidebar({ currentPage, onNavigate }: Props) {
  return (
    <aside
      className="flex flex-col h-screen sticky top-0 overflow-y-auto shrink-0"
      style={{ width: 240, backgroundColor: "#191919" }}
    >
      <button
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2 px-3 py-3 hover:bg-white/5 transition-colors text-left w-full"
      >
        <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold shrink-0"
          style={{ backgroundColor: "#5b4fcf" }}>
          AI
        </div>
        <span className="text-white/85 text-[13px] font-medium flex-1 truncate">社内AIポータル</span>
        <ChevronDown size={13} className="text-white/30" />
      </button>

      <nav className="flex-1 px-1 pt-1 pb-2">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <div className="flex items-center gap-1.5 px-2 py-1 mb-0.5">
              <span className="text-[11px] font-medium text-white/30 uppercase tracking-wider">{section.title}</span>
              {section.adminOnly && (
                <span className="text-[10px] px-1 rounded text-white/20 border border-white/15">Admin</span>
              )}
            </div>
            {section.items.map((item) => {
              const isActive = !!item.page && item.page === currentPage;
              return (
                <button
                  key={item.label}
                  onClick={() => item.page && onNavigate(item.page)}
                  className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-[13px] transition-colors text-left mb-0.5
                    ${isActive ? "bg-white/10 text-white/90" : "text-white/45 hover:text-white/75 hover:bg-white/5"}
                    ${!item.page ? "cursor-default" : "cursor-pointer"}`}
                >
                  <span className={isActive ? "text-white/65" : "text-white/30"}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-1 py-2 border-t border-white/[0.07]">
        <div className="flex items-center gap-2 px-2 py-[5px] rounded-md hover:bg-white/5 transition-colors cursor-pointer">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0"
            style={{ backgroundColor: "#5b4fcf" }}>
            笠
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/75 text-[13px] leading-tight truncate">笠松 健恵</p>
            <p className="text-white/30 text-[11px] truncate">情報システム部</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-white/30 hover:text-white/55 hover:bg-white/5 text-[13px] transition-colors mt-0.5">
          <LogOut size={13} />ログアウト
        </button>
      </div>
    </aside>
  );
}
