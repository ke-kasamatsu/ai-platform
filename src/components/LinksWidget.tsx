import {
  Clock,
  Receipt,
  BookOpen,
  MessageSquare,
  Users,
  FileText,
  Zap,
  HelpCircle,
} from "lucide-react";
import { links } from "@/data/mockData";

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock size={14} />,
  Receipt: <Receipt size={14} />,
  BookOpen: <BookOpen size={14} />,
  MessageSquare: <MessageSquare size={14} />,
  Users: <Users size={14} />,
  FileText: <FileText size={14} />,
  Zap: <Zap size={14} />,
  HelpCircle: <HelpCircle size={14} />,
};

export function LinksWidget() {
  return (
    <section>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
        よく使うリンク
      </p>
      <div className="grid grid-cols-2 gap-1">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="flex items-center gap-2 px-2.5 py-2 rounded-md text-gray-600 text-[13px] hover:bg-gray-100 hover:text-gray-900 transition-colors group"
          >
            <span className="text-gray-400 group-hover:text-gray-600 transition-colors shrink-0">
              {iconMap[link.icon]}
            </span>
            <span className="truncate">{link.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
