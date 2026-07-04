import { newsItems, type NewsItem } from "@/data/mockData";

const categoryStyles: Record<string, string> = {
  重要: "bg-red-50 text-red-600 border border-red-200",
  お知らせ: "bg-blue-50 text-blue-600 border border-blue-200",
  更新: "bg-green-50 text-green-600 border border-green-200",
  amber: "bg-amber-50 text-amber-600 border border-amber-200",
};

function Badge({ category }: { category: string }) {
  const cls = categoryStyles[category] ?? "bg-gray-50 text-gray-600 border border-gray-200";
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${cls}`}>
      {category}
    </span>
  );
}

function FeatureCard({ item }: { item: NewsItem }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-card hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-2 mb-3">
        <Badge category={item.category} />
        <span className="text-xs text-gray-400">{item.date}</span>
      </div>
      <h3 className="font-semibold text-gray-900 text-base leading-snug mb-2">
        {item.title}
      </h3>
      {item.body && (
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {item.body}
        </p>
      )}
    </div>
  );
}

function SmallCard({ item }: { item: NewsItem }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-card hover:shadow-md transition-shadow cursor-pointer flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-2">
        <Badge category={item.category} />
        <span className="text-xs text-gray-400 shrink-0">{item.date}</span>
      </div>
      <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">
        {item.title}
      </p>
    </div>
  );
}

export function NewsWidget() {
  const [featured, ...rest] = newsItems;
  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        社内ニュース
      </h2>
      <div className="space-y-3">
        <FeatureCard item={featured} />
        <div className="flex gap-3">
          {rest.map((item) => (
            <SmallCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
