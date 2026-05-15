import type { Metadata } from "next";
import { getLatestNews, getNewsByCategory } from "@/sanity/lib/queries";
import NewsCard from "@/components/ui/NewsCard";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Tin tức, thông báo và cảnh báo từ Công an phường Bình Dương",
};

const CATEGORIES = [
  { value: "", label: "Tất cả" },
  { value: "tin-tuc", label: "Tin tức" },
  { value: "thong-bao", label: "Thông báo" },
  { value: "canh-bao", label: "Cảnh báo" },
];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = category
    ? await getNewsByCategory(category, 20)
    : await getLatestNews(20);

  return (
    <>
      <PageHeader
        title="Tin tức & Thông báo"
        breadcrumbs={[{ label: "Tin tức" }]}
        description="Cập nhật tình hình an ninh trật tự và thông báo từ đơn vị"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = (cat.value === "" && !category) || cat.value === category;
            return (
              <a
                key={cat.value}
                href={cat.value ? `/tin-tuc?category=${cat.value}` : "/tin-tuc"}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  isActive
                    ? "bg-police-red text-white border-police-red"
                    : "text-gray-600 border-gray-300 hover:border-police-red hover:text-police-red"
                }`}
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-16">Chưa có tin tức nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <NewsCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
