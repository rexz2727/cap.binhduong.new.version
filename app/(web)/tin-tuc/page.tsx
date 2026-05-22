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
  { value: "an-ninh-trat-tu", label: "An ninh trật tự" },
  { value: "thong-bao", label: "Thông báo" },
  { value: "canh-bao", label: "Cảnh báo" },
  { value: "hoat-dong-don-vi", label: "Hoạt động đơn vị" },
  { value: "nguoi-tot-viec-tot", label: "Người tốt việc tốt" },
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
        breadcrumbs={[{ label: "Tin tức & Thông báo" }]}
        description="Cập nhật tình hình an ninh trật tự và thông báo chính thức từ Công an phường Bình Dương."
      />
      <section className="block">
        <div className="container">
          <div className="filter-row">
            {CATEGORIES.map((cat) => {
              const isActive = (cat.value === "" && !category) || cat.value === category;
              return (
                <a
                  key={cat.value}
                  href={cat.value ? `/tin-tuc?category=${cat.value}` : "/tin-tuc"}
                  className={isActive ? "chip active" : "chip"}
                >
                  {cat.label}
                </a>
              );
            })}
            <div className="search-box">
              <svg className="ic"><use href="#i-search" /></svg>
              <input type="text" placeholder="Tìm tin tức theo từ khóa…" />
            </div>
          </div>

          {posts.length === 0 ? (
            <p style={{ textAlign: "center", padding: "64px 0" }}>Chưa có tin tức nào.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
              {posts.map((post) => (
                <NewsCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
