import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { PhotoAlbumPreview } from "@/types/photoAlbum";

interface Props {
  albums: PhotoAlbumPreview[];
}

export default function PhotoAlbumPreview({ albums }: Props) {
  if (!albums.length) return null;

  return (
    <section className="py-14 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-police-navy flex items-center gap-2">
              <span>📷</span> Thư viện ảnh
            </h2>
            <p className="text-sm text-gray-500 mt-1">Album ảnh hoạt động của đơn vị</p>
          </div>
          <Link
            href="/thu-vien-anh"
            className="text-sm font-medium text-police-red hover:underline hidden sm:block"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {albums.slice(0, 4).map((album) => (
            <Link
              key={album._id}
              href={`/thu-vien-anh/${album.slug.current}`}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm bg-gray-200"
            >
              {album.coverImage ? (
                <Image
                  src={urlFor(album.coverImage).width(400).height(400).url()}
                  alt={album.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                  📷
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-xs font-semibold line-clamp-2">{album.title}</p>
                {album.photoCount !== undefined && (
                  <p className="text-white/70 text-[10px] mt-0.5">{album.photoCount} ảnh</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/thu-vien-anh" className="text-sm font-medium text-police-red hover:underline">
            Xem tất cả →
          </Link>
        </div>
      </div>
    </section>
  );
}
