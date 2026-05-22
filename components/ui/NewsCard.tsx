import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { NewsPostPreview } from "@/types/news";
import Badge from "./Badge";

export default function NewsCard({ post }: { post: NewsPostPreview }) {
  const imgUrl = post.mainImage
    ? urlFor(post.mainImage).width(400).height(250).url()
    : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Link href={`/tin-tuc/${post.slug.current}`} style={{ textDecoration: "none" }}>
      <article className="news-card">
        <div className="thumb">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={post.mainImage?.alt ?? post.title}
              fill
              style={{ objectFit: "cover" }}
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
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
