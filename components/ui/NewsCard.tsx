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
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {imgUrl && (
        <div className="relative h-48">
          <Image
            src={imgUrl}
            alt={post.mainImage?.alt ?? post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge category={post.category} />
          <time className="text-xs text-gray-400">{formattedDate}</time>
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
          <Link href={`/tin-tuc/${post.slug.current}`} className="hover:text-police-red">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
      </div>
    </article>
  );
}
