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

  const formattedDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getCategoryLabel = (category?: string) => {
    if (!category) return "";
    if (category === "hoat-dong") return "Hoạt động";
    if (category === "an-ninh") return "An ninh";
    if (category === "cong-dong") return "Cộng đồng";
    return category;
  };

  return (
    <section className="block alt">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow" data-i18n="section.video.eye">
              {t("section.video.eye", "Thư viện video")}
            </div>
            <h2 className="section-title" data-i18n="section.video.title">
              {t("section.video.title", "Video hoạt động nổi bật")}
            </h2>
          </div>
          <Link href="/video" className="section-link">
            {t("section.video.link", "Xem tất cả video")}
            <svg className="arrow" width="16" height="16">
              <use href="#i-arrow" />
            </svg>
          </Link>
        </div>

        <div className="video-grid">
          {videos.slice(0, 3).map((video) => (
            <Link
              href={`/video/${video.slug.current}`}
              key={video._id}
              className="video-card"
            >
              <div className="thumb">
                {video.thumbnail ? (
                  <Image
                    src={urlFor(video.thumbnail).width(480).height(270).url()!}
                    alt={video.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                <div className="play" />
              </div>
              <div className="body">
                <h4>{video.title}</h4>
                <div className="meta">
                  {video.category && (
                    <span className="cat-pill">
                      {getCategoryLabel(video.category)}
                    </span>
                  )}
                  <span>{formattedDate(video.date)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

