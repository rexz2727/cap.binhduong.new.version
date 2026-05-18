import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPhotoAlbumBySlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHeader from "@/components/ui/PageHeader";
import PhotoLightbox from "@/components/ui/PhotoLightbox";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = await getPhotoAlbumBySlug(slug);
  if (!album) return {};
  return { title: `${album.title} | Thư viện ảnh` };
}

export default async function AlbumDetailPage({ params }: Props) {
  const { slug } = await params;
  const album = await getPhotoAlbumBySlug(slug);
  if (!album) notFound();

  const photos = (album.photos ?? [])
    .filter((p) => p.asset)
    .map((p) => ({
      src: urlFor(p.asset).width(1200).height(900).url(),
      caption: p.caption,
    }));

  return (
    <>
      <PageHeader
        title={album.title}
        breadcrumbs={[
          { label: "Thư viện ảnh", href: "/thu-vien-anh" },
          { label: album.title },
        ]}
        description={album.description}
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {new Date(album.date).toLocaleDateString("vi-VN")} · {photos.length} ảnh
          </p>
        </div>
        {photos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-3">📷</p>
            <p>Album chưa có ảnh.</p>
          </div>
        ) : (
          <PhotoLightbox photos={photos} columns={3} />
        )}
      </div>
    </>
  );
}
