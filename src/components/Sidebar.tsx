import {
  Home,
  Zap,
  MessageSquare,
  History,
  Star,
  FileText,
  Files,
  Globe,
  Shield,
  BarChart3,
  Users,
  LogOut,
} from "lucide-react";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
  adminOnly?: boolean;
};

const sections: NavSection[] = [
  {
    title: "メニュー",
    items: [
      { icon: <Home size={16} />, label: "ホーム", active: true },
      { icon: <Zap size={16} />, label: "AIワークフロー" },
      { icon: <MessageSquare size={16} />, label: "チャット" },
      { icon: <History size={16} />, label: "実行履歴" },
      { icon: <Star size={16} />, label: "お気に入り" },
    ],
  },
  {
    title: "機能",
    items: [
      { icon: <FileText size={16} />, label: "文書処理" },
      { icon: <Files size={16} />, label: "複数資料分析" },
      { icon: <Globe size={16} />, label: "Web調査" },
    ],
  },
  {
    title: "管理",
    adminOnly: true,
    items: [
      { icon: <Shield size={16} />, label: "監査ログ" },
      { icon: <BarChart3 size={16} />, label: "コスト管理" },
      { icon: <Users size={16} />, label: "権限管理" },
    ],
  },
];

export function Sidebar() {
  return (
    <aside
      className="flex flex-col h-screen sticky top-0 overflow-y-auto"
      style={{ width: 240, backgroundColor: "#1a1a2e", flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: "#5b4fcf" }}
          >
            AI
          </div>
          <span className="text-white font-semibold text-sm">社内AIポータル</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-1 px-2 mb-1">
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
                {section.title}
              </p>
              {section.adminOnly && (
                <span className="text-xs px-1 rounded text-white/30 border border-white/20">
                  Admin
                </span>
              )}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.label}>
                  <button
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors text-left ${
                      item.active
                        ? "text-white"
                        : "text-white/60 hover:text-white/90 hover:bg-white/5"
                    }`}
                    style={
                      item.active
                        ? { backgroundColor: "rgba(91,79,207,0.35)" }
                        : undefined
                    }
                  >
                    <span
                      className={item.active ? "text-white" : "text-white/50"}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User area */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
            style={{ backgroundColor: "#5b4fcf" }}
          >
            笠
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">笠松 健恵</p>
            <p className="text-white/40 text-xs truncate">情報システム部</p>
          </div>
        </div>
        <button className="mt-2 w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-white/50 hover:text-white/80 hover:bg-white/5 text-xs transition-colors">
          <LogOut size={14} />
          ログアウト
        </button>
      </div>
    </aside>
  );
}
