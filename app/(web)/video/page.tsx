import type { Metadata } from "next";
import Image from "next/image";
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
        breadcrumbs={[{ label: "Video" }]}
        description="Video, phim tài liệu hoạt động của đơn vị"
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value === "all" ? "/video" : `/video?category=${cat.value}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                (cat.value === "all" && !category) || cat.value === category
                  ? "bg-police-red text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-3">🎬</p>
            <p>Chưa có video nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Link
                key={video._id}
                href={`/video/${video.slug.current}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative aspect-video bg-gray-900">
                  {video.thumbnail ? (
                    <Image
                      src={urlFor(video.thumbnail).width(600).height(338).url()}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg)` }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-police-red/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <span className="text-white text-lg ml-0.5">▶</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-police-red transition-colors line-clamp-2 text-sm">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {new Date(video.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
