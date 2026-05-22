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
      <section className="block">
        <div className="container">
          <p style={{ fontSize: "13px", color: "var(--subtle)", marginBottom: "24px" }}>
            {album.date && new Date(album.date).toLocaleDateString("vi-VN")}
            {photos.length > 0 && ` · ${photos.length} ảnh`}
          </p>

          {photos.length === 0 ? (
            <p style={{ color: "var(--subtle)", textAlign: "center", padding: "64px 0" }}>
              Album chưa có ảnh.
            </p>
          ) : (
            <PhotoLightbox photos={photos} columns={3} />
          )}
        </div>
      </section>
    </>
  );
}
