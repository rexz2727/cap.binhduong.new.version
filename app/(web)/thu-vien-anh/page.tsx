import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPhotoAlbums, getPageContent } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Thư viện ảnh | Công an phường Bình Dương",
  description: "Album ảnh hoạt động, sự kiện của Công an phường Bình Dương.",
};

export default async function ThuVienAnhPage() {
  const [albums, pageContent] = await Promise.all([
    getPhotoAlbums(24),
    getPageContent(),
  ]);

  return (
    <>
      <PageHeader
        title="Thư viện ảnh"
        breadcrumbs={[{ label: "Thư viện ảnh" }]}
        description={pageContent?.thu_vien_anh ?? "Album ảnh hoạt động và sự kiện của Công an phường Bình Dương."}
      />
      <section className="block">
        <div className="container">
          <div className="filter-row">
            <span className="chip active">
              Tất cả album {albums.length > 0 ? `(${albums.length})` : ""}
            </span>
            <Link href="/video" className="chip">
              Xem video →
            </Link>
          </div>

          {albums.length === 0 ? (
            <p className="text-center text-[var(--subtle)] py-16">
              Chưa có album ảnh nào.
            </p>
          ) : (
            <div className="gallery-grid">
              {albums.map((album) => (
                <Link
                  key={album._id}
                  href={`/thu-vien-anh/${album.slug.current}`}
                  className="album-card"
                >
                  <div className="cover">
                    {album.coverImage ? (
                      <Image
                        src={urlFor(album.coverImage).width(500).height(375).url()}
                        alt={album.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
                      />
                    ) : null}
                    {album.photoCount !== undefined && (
                      <span className="badge">{album.photoCount} ảnh</span>
                    )}
                  </div>
                  <div className="body">
                    <h4>{album.title}</h4>
                    {album.date && (
                      <div className="date">
                        {new Date(album.date).toLocaleDateString("vi-VN")}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
