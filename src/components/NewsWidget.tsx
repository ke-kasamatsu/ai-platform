import { newsItems, type NewsItem } from "@/data/mockData";

const categoryStyle: Record<string, string> = {
  重要: "bg-red-50 text-red-500",
  お知らせ: "bg-blue-50 text-blue-500",
  更新: "bg-emerald-50 text-emerald-600",
};

function Badge({ category }: { category: string }) {
  const cls = categoryStyle[category] ?? "bg-gray-100 text-gray-500";
  return (
    <span className={`inline-block px-1.5 py-0.5 text-[11px] font-medium rounded ${cls}`}>
      {category}
    </span>
  );
}

function FeatureCard({ item }: { item: NewsItem }) {
  return (
    <div className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        <Badge category={item.category} />
        <span className="text-[11px] text-gray-400">{item.date}</span>
      </div>
      <h3 className="text-[14px] font-semibold text-gray-900 leading-snug mb-1.5">
        {item.title}
      </h3>
      {item.body && (
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{item.body}</p>
      )}
    </div>
  );
}

function SmallCard({ item }: { item: NewsItem }) {
  return (
    <div className="flex-1 min-w-0 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Badge category={item.category} />
        <span className="text-[11px] text-gray-400 shrink-0">{item.date}</span>
      </div>
      <p className="text-[13px] font-medium text-gray-700 leading-snug line-clamp-2">{item.title}</p>
    </div>
  );
}

export function NewsWidget() {
  const [featured, ...rest] = newsItems;
  return (
    <section>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
        社内ニュース
      </p>
      <div className="space-y-2">
        <FeatureCard item={featured} />
        <div className="flex gap-2">
          {rest.map((item) => (
            <SmallCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
