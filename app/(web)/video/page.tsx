import type { Metadata } from "next";
import Link from "next/link";
import { getVideos } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Video | Công an phường Bình Dương",
  description: "Video, phim tài liệu hoạt động của Công an phường Bình Dương.",
};

const CATEGORIES = [
  { value: "all", label: "Tất cả" },
  { value: "hoat-dong", label: "Hoạt động" },
  { value: "an-ninh", label: "An ninh" },
  { value: "cong-dong", label: "Cộng đồng" },
];

const CATEGORY_LABELS: Record<string, string> = {
  "hoat-dong": "Hoạt động",
  "an-ninh": "An ninh",
  "cong-dong": "Cộng đồng",
};

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function VideoPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const videos = await getVideos(category ?? "all", 24);

  return (
    <>
      <PageHeader
        title="Video"
        breadcrumbs={[
          { label: "Thư viện", href: "/thu-vien-anh" },
          { label: "Video" },
        ]}
        description="Phim tài liệu và clip hoạt động của đơn vị."
      />
      <section className="block">
        <div className="container">
          <div className="filter-row">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value === "all" ? "/video" : `/video?category=${cat.value}`}
                className={`chip${(cat.value === "all" && !category) || cat.value === category ? " active" : ""}`}
              >
                {cat.label}
              </Link>
            ))}
            <Link href="/thu-vien-anh" className="chip">
              ← Xem ảnh
            </Link>
          </div>

          {videos.length === 0 ? (
            <p style={{ color: "var(--subtle)", textAlign: "center", padding: "64px 0" }}>
              Chưa có video nào.
            </p>
          ) : (
            <div className="video-grid">
              {videos.map((video) => (
                <Link
                  key={video._id}
                  href={`/video/${video.slug.current}`}
                  className="video-card"
                >
                  <div
                    className="thumb"
                    style={{
                      backgroundImage: video.thumbnail
                        ? `url(${urlFor(video.thumbnail).width(600).height(338).url()})`
                        : `url(https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg)`,
                    }}
                  >
                    <div className="play" />
                  </div>
                  <div className="body">
                    <h4>{video.title}</h4>
                    <div className="meta">
                      {video.category && (
                        <span className="cat-pill">
                          {CATEGORY_LABELS[video.category] ?? video.category}
                        </span>
                      )}
                      <span>{new Date(video.date).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
