import Link from "next/link";
import NewsCard from "@/components/ui/NewsCard";
import type { NewsPostPreview } from "@/types/news";

export default function LatestNews({ posts }: { posts: NewsPostPreview[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-police-navy mb-2">Tin tức mới nhất</h2>
            <div className="w-12 h-1 rounded-full bg-police-red" />
          </div>
          <Link
            href="/tin-tuc"
            className="text-police-red hover:text-police-red-dark font-semibold text-sm flex items-center gap-1 group"
          >
            Xem tất cả
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <div key={post._id} className="animate-fade-up card-hover" style={{ animationDelay: `${i * 100}ms` }}>
              <NewsCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
