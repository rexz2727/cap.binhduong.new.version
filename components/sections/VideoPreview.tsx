"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { VideoPreviewItem } from "@/types/video";
import { useI18n } from "@/lib/i18n";

interface Props {
  videos: VideoPreviewItem[];
}

export default function VideoPreview({ videos }: Props) {
  const { t } = useI18n();

  if (!videos.length) return null;

  const [featured, ...rest] = videos;

  const formattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="video-grid">
      <div className="container">
        <hgroup className="section-h">
          <p className="eyebrow">Thư viện</p>
          <h2>Video</h2>
          <Link href="/video" className="read-more">
            Xem tất cả
            <svg width="1em" height="1em"><use href="#i-arrow" /></svg>
          </Link>
        </hgroup>
        <div className="grid">
          {featured && (
            <Link href={`/video/${featured.slug.current}`} className="main-video">
              <figure>
                {featured.thumbnail ? (
                  <Image
                    src={urlFor(featured.thumbnail).width(800).height(450).url()!}
                    alt={featured.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  // Fallback for YouTube videos without Sanity thumbnail
                  <div
                    style={{
                      backgroundImage: `url(https://img.youtube.com/vi/${featured.youtubeId}/maxresdefault.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                )}
                <div className="play-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </figure>
              <div className="main-video-text">
                <h3>{featured.title}</h3>
              </div>
            </Link>
          )}

          <div className="video-list-side">
            {rest.slice(0, 3).map((video) => (
              <Link href={`/video/${video.slug.current}`} key={video._id} className="video-list-item">
                <figure>
                  {video.thumbnail ? (
                    <Image
                      src={urlFor(video.thumbnail).width(200).height(140).url()!}
                      alt={video.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    // Fallback for YouTube videos without Sanity thumbnail
                    <div
                      style={{
                        backgroundImage: `url(https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  )}
                  <div className="play-overlay-small">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </figure>
                <div className="video-list-item-text">
                  <h3>{video.title}</h3>
                  <time>{formattedDate(video.date)}</time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
