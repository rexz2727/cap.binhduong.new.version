import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPhotoAlbums } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Thư viện ảnh | Công an phường Bình Dương",
  description: "Album ảnh hoạt động, sự kiện của Công an phường Bình Dương.",
};

export default async function ThuVienAnhPage() {
  const albums = await getPhotoAlbums(24);

  return (
    <>
      <PageHeader
        title="Thư viện ảnh"
        breadcrumbs={[{ label: "Thư viện ảnh" }]}
        description="Album ảnh hoạt động, sự kiện của đơn vị"
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {albums.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-3">📷</p>
            <p>Chưa có album ảnh nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {albums.map((album) => (
              <Link key={album._id} href={`/thu-vien-anh/${album.slug.current}`} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                  {album.coverImage ? (
                    <Image
                      src={urlFor(album.coverImage).width(500).height(375).url()}
                      alt={album.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">📷</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    {album.photoCount !== undefined && (
                      <span className="text-xs bg-black/40 text-white px-2 py-0.5 rounded-full">
                        {album.photoCount} ảnh
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 px-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-police-red transition-colors text-sm line-clamp-2">
                    {album.title}
                  </h3>
                  {album.date && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(album.date).toLocaleDateString("vi-VN")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
