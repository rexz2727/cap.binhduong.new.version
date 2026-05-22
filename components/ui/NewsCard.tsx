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
    <article className="news-card">
      <div className="thumb relative">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={post.mainImage?.alt ?? post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="placeholder-img w-full h-full" />
        )}
      </div>
      <div className="body">
        <div className="flex items-center gap-2 mb-2">
          <Badge category={post.category} />
          <time className="text-xs text-gray-400">{formattedDate}</time>
        </div>
        <h3>
          <Link href={`/tin-tuc/${post.slug.current}`}>
            {post.title}
          </Link>
        </h3>
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}
