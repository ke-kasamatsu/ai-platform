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
  Clock: <Clock size={16} />,
  Receipt: <Receipt size={16} />,
  BookOpen: <BookOpen size={16} />,
  MessageSquare: <MessageSquare size={16} />,
  Users: <Users size={16} />,
  FileText: <FileText size={16} />,
  Zap: <Zap size={16} />,
  HelpCircle: <HelpCircle size={16} />,
};

export function LinksWidget() {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-card h-fit">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        よく使うリンク
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm hover:border-purple-400 hover:text-purple-700 transition-colors"
          >
            <span className="text-gray-400 group-hover:text-purple-400">
              {iconMap[link.icon]}
            </span>
            <span className="truncate">{link.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
