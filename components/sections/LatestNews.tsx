"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { NewsPostPreview, NewsCategory } from "@/types/news";
import { useI18n } from "@/lib/i18n";
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_CONFIG } from "@/constants/news";

function catPillClass(category: NewsCategory) {
  const modifier = NEWS_CATEGORY_CONFIG[category]?.modifier;
  return modifier ? `cat-pill ${modifier}` : "cat-pill";
}

export default function LatestNews({ posts }: { posts: NewsPostPreview[] }) {
  const { t, lang } = useI18n();

  if (posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 5);

  const mainPostI18n = mainPost as NewsPostPreview & { titleEn?: string; excerptEn?: string };
  const mainTitle =
    lang === "en" && mainPostI18n.titleEn ? mainPostI18n.titleEn : mainPost.title;
  const mainExcerpt =
    lang === "en" && mainPostI18n.excerptEn ? mainPostI18n.excerptEn : mainPost.excerpt;

  const fullDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const shortDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });

  return (
    <section className="block alt">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow" data-i18n="section.news.eye">
              {t("section.news.eye", "Tin tức & Thông báo")}
            </div>
            <h2 className="section-title" data-i18n="section.news.title">
              {t("section.news.title", "Cập nhật tình hình an ninh, trật tự")}
            </h2>
          </div>
          <Link href="/tin-tuc" className="section-link" data-i18n="section.news.link">
            {t("section.news.link", "Xem tất cả tin tức")}
            <svg className="arrow" width="16" height="16">
              <use href="#i-arrow" />
            </svg>
          </Link>
        </div>

        <div className="news-grid">
          <Link href={`/tin-tuc/${mainPost.slug.current}`} className="news-feature">
            <div className="thumb">
              {mainPost.mainImage ? (
                <Image
                  src={urlFor(mainPost.mainImage).width(800).height(500).url()!}
                  alt={mainPost.mainImage.alt ?? mainTitle}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="placeholder-img">Ảnh tin nổi bật</div>
              )}
            </div>
            <div className="body">
              <div className="news-meta">
                <span className={catPillClass(mainPost.category)}>
                  {NEWS_CATEGORY_LABELS[mainPost.category]}
                </span>
                <span>{fullDate(mainPost.publishedAt)}</span>
              </div>
              <h3>{mainTitle}</h3>
              <p>{mainExcerpt}</p>
              <span className="section-link">
                Đọc tiếp
                <svg className="arrow" width="14" height="14">
                  <use href="#i-arrow" />
                </svg>
              </span>
            </div>
          </Link>

          <div className="news-side">
            {sidePosts.map((post) => {
              const postI18n = post as NewsPostPreview & { titleEn?: string };
              const sideTitle =
                lang === "en" && postI18n.titleEn ? postI18n.titleEn : post.title;
              return (
                <Link
                  href={`/tin-tuc/${post.slug.current}`}
                  key={post._id}
                  className="news-item-side"
                >
                  <div className="thumb">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(200).height(200).url()!}
                        alt={post.mainImage.alt ?? sideTitle}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="placeholder-img">img</div>
                    )}
                  </div>
                  <div>
                    <div className="news-meta">
                      <span className={catPillClass(post.category)}>
                        {NEWS_CATEGORY_LABELS[post.category]}
                      </span>
                      <span>{shortDate(post.publishedAt)}</span>
                    </div>
                    <h4>{sideTitle}</h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
