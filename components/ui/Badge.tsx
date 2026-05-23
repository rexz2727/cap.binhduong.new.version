import { NEWS_CATEGORY_CONFIG } from "@/constants/news";

export default function Badge({ category }: { category: string }) {
  const config = NEWS_CATEGORY_CONFIG[category] ?? { label: category };
  const className = config.modifier ? `cat-pill ${config.modifier}` : "cat-pill";
  return <span className={className}>{config.label}</span>;
}
