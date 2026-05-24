import type { Metadata } from "next";
import Link from "next/link";
import { getVideos } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
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
      <section className="block">
        <div className="container-narrow">
          <VideoPlayer youtubeId={video.youtubeId} title={video.title} />
          <h2 className="mt-6 mb-2">{video.title}</h2>
          <p className="text-[13px] text-[var(--subtle)]">
            {new Date(video.date).toLocaleDateString("vi-VN")}
          </p>

          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-[0.06em] text-[var(--navy)]">
                Video liên quan
              </h3>
              <div className="flex flex-col gap-3">
                {related.map((v) => (
                  <Link
                    key={v._id}
                    href={`/video/${v.slug.current}`}
                    className="flex gap-3 items-center no-underline"
                  >
                    <div className="video-card flex-1 flex gap-3 items-start">
                      <div
                        className="thumb w-[120px] min-w-[120px] h-20 flex-none bg-cover bg-center"
                        style={{ backgroundImage: `url(https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg)` }}
                      >
                        <div className="play [transform:translate(-50%,-50%)_scale(0.6)]" />
                      </div>
                      <div className="body py-1">
                        <h4 className="text-[13px] line-clamp-2">{v.title}</h4>
                        <div className="meta">
                          <span>{new Date(v.date).toLocaleDateString("vi-VN")}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
