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
          <h2 style={{ marginTop: "24px", marginBottom: "8px" }}>{video.title}</h2>
          <p style={{ fontSize: "13px", color: "var(--subtle)" }}>
            {new Date(video.date).toLocaleDateString("vi-VN")}
          </p>

          {related.length > 0 && (
            <div style={{ marginTop: "48px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--navy)" }}>
                Video liên quan
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {related.map((v) => (
                  <Link
                    key={v._id}
                    href={`/video/${v.slug.current}`}
                    style={{ display: "flex", gap: "12px", alignItems: "center", textDecoration: "none" }}
                  >
                    <div
                      className="video-card"
                      style={{ flex: 1, display: "flex", gap: "12px", alignItems: "flex-start" }}
                    >
                      <div
                        className="thumb"
                        style={{
                          width: "120px",
                          minWidth: "120px",
                          height: "80px",
                          backgroundImage: `url(https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg)`,
                          flex: "none",
                        }}
                      >
                        <div className="play" style={{ transform: "translate(-50%, -50%) scale(0.6)" }} />
                      </div>
                      <div className="body" style={{ padding: "4px 0" }}>
                        <h4 style={{ fontSize: "13px", WebkitLineClamp: 2 }}>{v.title}</h4>
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
