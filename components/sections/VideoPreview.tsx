import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { VideoPreviewItem } from "@/types/video";

interface Props {
  videos: VideoPreviewItem[];
}

export default function VideoPreview({ videos }: Props) {
  if (!videos.length) return null;

  const [featured, ...rest] = videos;

  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-police-navy flex items-center gap-2">
              <span>🎬</span> Video
            </h2>
            <p className="text-sm text-gray-500 mt-1">Phim tài liệu và hoạt động của đơn vị</p>
          </div>
          <Link
            href="/video"
            className="text-sm font-medium text-police-red hover:underline hidden sm:block"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link
            href={`/video/${featured.slug.current}`}
            className="group lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm bg-gray-900 aspect-video"
          >
            {featured.thumbnail ? (
              <Image
                src={urlFor(featured.thumbnail).width(800).height(450).url()}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
              />
            ) : (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://i.ytimg.com/vi/${featured.youtubeId}/maxresdefault.jpg)`,
                }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-police-red/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-white text-2xl ml-1">▶</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
              <h3 className="text-white font-semibold line-clamp-2">{featured.title}</h3>
            </div>
          </Link>

          <div className="flex flex-col gap-3">
            {rest.slice(0, 3).map((video) => (
              <Link
                key={video._id}
                href={`/video/${video.slug.current}`}
                className="group flex gap-3 bg-gray-50 rounded-xl overflow-hidden hover:bg-gray-100 transition-colors"
              >
                <div className="relative w-28 h-20 shrink-0 bg-gray-800">
                  {video.thumbnail ? (
                    <Image
                      src={urlFor(video.thumbnail).width(200).height(140).url()}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://i.ytimg.com/vi/${video.youtubeId}/mqdefault.jpg)`,
                      }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 bg-police-red/80 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs ml-0.5">▶</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 py-2 pr-3">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-police-red transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(video.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/video" className="text-sm font-medium text-police-red hover:underline">
            Xem tất cả →
          </Link>
        </div>
      </div>
    </section>
  );
}
