"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { NewsPostPreview } from "@/types/news";
import { useI18n } from "@/lib/i18n";
import Badge from "./Badge";

export default function NewsCard({ post }: { post: NewsPostPreview }) {
  const { lang } = useI18n();
  const imgUrl = post.mainImage
    ? urlFor(post.mainImage).width(400).height(250).url()
    : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const postI18n = post as NewsPostPreview & { titleEn?: string; excerptEn?: string };
  const displayTitle =
    lang === "en" && postI18n.titleEn ? postI18n.titleEn : post.title;
  const displayExcerpt =
    lang === "en" && postI18n.excerptEn ? postI18n.excerptEn : post.excerpt;

  return (
    <Link href={`/tin-tuc/${post.slug.current}`} className="no-underline">
      <article className="news-card">
        <div className="thumb">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={post.mainImage?.alt ?? displayTitle}
              fill
              className="object-cover"
            />
          ) : (
            <div className="placeholder-img" />
          )}
        </div>
        <div className="body">
          <div className="news-meta">
            <Badge category={post.category} />
            <span>{formattedDate}</span>
          </div>
          <h3>{displayTitle}</h3>
          <p>{displayExcerpt}</p>
        </div>
      </article>
    </Link>
  );
}
