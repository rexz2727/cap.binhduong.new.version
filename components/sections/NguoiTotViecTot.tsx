"use client";

import Link from "next/link";
import type { NewsPostPreview } from "@/types/news";
import { useI18n } from "@/lib/i18n";

interface Props {
  posts: NewsPostPreview[];
}

export default function NguoiTotViecTot({ posts }: Props) {
  const { t } = useI18n();

  if (!posts.length) return null;

  const formattedDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <section className="block honor-strip">
      <div className="container">
        <div className="section-head-center">
          <div
            className="section-eyebrow"
            style={{ color: "var(--gold)" }}
            data-i18n="section.honor.eye"
          >
            {t("section.honor.eye", "Người tốt — Việc tốt")}
          </div>
          <h2
            className="section-title"
            style={{ color: "white" }}
            data-i18n="section.honor.title"
          >
            {t("section.honor.title", "Những tấm gương đáng trân trọng")}
          </h2>
          <p
            className="section-sub"
            style={{ color: "rgba(255,255,255,0.7)" }}
            data-i18n="section.honor.sub"
          >
            {t(
              "section.honor.sub",
              "Vinh danh cán bộ, chiến sĩ và quần chúng nhân dân có thành tích xuất sắc trong phong trào Toàn dân bảo vệ an ninh Tổ quốc."
            )}
          </p>
        </div>

        <div className="honor-grid">
          {posts.slice(0, 4).map((post) => (
            <Link
              href={`/tin-tuc/${post.slug.current}`}
              key={post._id}
              className="honor-card"
            >
              <div className="avatar" />
              <div className="name">{post.title}</div>
              <div className="role">{formattedDate(post.publishedAt)}</div>
              <div className="desc">{post.excerpt}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
