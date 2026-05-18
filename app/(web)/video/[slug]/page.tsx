import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getVideos } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import VideoPlayer from "@/components/ui/VideoPlayer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const videos = await getVideos("all", 100);
  const video = videos.find((v) => v.slug.current === slug);
  if (!video) return {};
  return { title: `${video.title} | Video` };
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const videos = await getVideos("all", 100);
  const video = videos.find((v) => v.slug.current === slug);
  if (!video) notFound();

  const related = videos.filter((v) => v._id !== video._id).slice(0, 4);

  return (
    <>
      <PageHeader
        title={video.title}
        breadcrumbs={[{ label: "Video", href: "/video" }, { label: video.title }]}
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            <VideoPlayer youtubeId={video.youtubeId} title={video.title} />
            <h1 className="text-xl font-bold text-police-navy mt-5">{video.title}</h1>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(video.date).toLocaleDateString("vi-VN")}
            </p>
          </main>

          {related.length > 0 && (
            <aside className="w-full lg:w-80 shrink-0">
              <h3 className="font-bold text-police-navy text-sm mb-4 uppercase tracking-wider">
                Video liên quan
              </h3>
              <div className="space-y-3">
                {related.map((v) => (
                  <Link
                    key={v._id}
                    href={`/video/${v.slug.current}`}
                    className="group flex gap-3 bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className="relative w-28 h-20 shrink-0 bg-gray-800 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg)`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-7 h-7 bg-police-red/80 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs ml-0.5">▶</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 py-2 pr-3">
                      <p className="text-xs font-medium text-gray-900 group-hover:text-police-red line-clamp-2">
                        {v.title}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {new Date(v.date).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
