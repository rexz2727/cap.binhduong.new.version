"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { GoodDeedPreview } from "@/types/goodDeed";
import { urlFor } from "@/sanity/lib/image";
import { useI18n } from "@/lib/i18n";

interface Props {
  posts: GoodDeedPreview[];
}

export default function NguoiTotViecTot({ posts }: Props) {
  const { t } = useI18n();

  if (!posts.length) return null;

  return (
    <section className="block honor-strip">
      <div className="container">
        <div className="section-head-center">
          <div
            className="section-eyebrow"
            style={{ color: "var(--gold)" }}
            data-i18n="section.honor.eye"
          >
            <span style={{ "--bg": "var(--gold)" } as React.CSSProperties}></span>
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
          {posts.slice(0, 4).map((post) => {
            const imgUrl = post.photo
              ? urlFor(post.photo).width(240).height(240).url()
              : null;
            return (
              <Link
                href={`/nguoi-tot-viec-tot/${post.slug.current}`}
                key={post._id}
                className="honor-card"
              >
                <div className="avatar">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={post.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="120px"
                    />
                  ) : null}
                </div>
                <div className="name">{post.name}</div>
                <div className="role">{post.role}</div>
                <div className="desc">{post.summary}</div>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link
            href="/nguoi-tot-viec-tot"
            className="btn btn-outline"
            style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
          >
            {t("section.honor.viewAll", "Xem tất cả")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
