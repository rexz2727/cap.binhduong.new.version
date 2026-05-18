import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { NewsPostPreview } from "@/types/news";

interface Props {
  posts: NewsPostPreview[];
}

export default function NguoiTotViecTot({ posts }: Props) {
  if (!posts.length) return null;

  return (
    <section className="py-14 px-4 bg-gradient-to-br from-yellow-50 to-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-police-navy flex items-center gap-2">
              <span className="text-2xl">🌟</span> Người tốt việc tốt
            </h2>
            <p className="text-sm text-gray-500 mt-1">Gương điển hình tiên tiến trong cộng đồng</p>
          </div>
          <Link
            href="/tin-tuc?category=nguoi-tot-viec-tot"
            className="text-sm font-medium text-police-red hover:underline hidden sm:block"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post) => (
            <Link
              key={post._id}
              href={`/tin-tuc/${post.slug.current}`}
              className="group bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-44 bg-amber-100">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(600).height(300).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">
                    🌟
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-police-gold text-police-red text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  Điển hình
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-police-red transition-colors line-clamp-2 text-sm leading-snug">
                  {post.title}
                </h3>
                {post.publishedAt && (
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/tin-tuc?category=nguoi-tot-viec-tot"
            className="text-sm font-medium text-police-red hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>
      </div>
    </section>
  );
}
