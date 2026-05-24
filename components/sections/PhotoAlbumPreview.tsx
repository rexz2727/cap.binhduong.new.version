"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { PhotoAlbumPreview as PhotoAlbumPreviewType } from "@/types/photoAlbum";
import { useI18n } from "@/lib/i18n";

interface Props {
  albums: PhotoAlbumPreviewType[];
}

export default function PhotoAlbumPreview({ albums }: Props) {
  const { t } = useI18n();

  if (!albums.length) return null;

  const formattedDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="block">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow" data-i18n="section.gallery.eye">
              {t("section.gallery.eye", "Thư viện ảnh")}
            </div>
            <h2 className="section-title" data-i18n="section.gallery.title">
              {t("section.gallery.title", "Hình ảnh hoạt động của đơn vị")}
            </h2>
          </div>
          <Link href="/thu-vien-anh" className="section-link">
            {t("section.gallery.link", "Xem tất cả album")}
            <svg className="arrow" width="16" height="16">
              <use href="#i-arrow" />
            </svg>
          </Link>
        </div>

        <div className="gallery-grid">
          {albums.slice(0, 4).map((album) => (
            <Link
              href={`/thu-vien-anh/${album.slug.current}`}
              key={album._id}
              className="album-card"
            >
              <div className="cover">
                {album.coverImage && (
                  <Image
                    src={urlFor(album.coverImage).width(400).height(300).url()!}
                    alt={album.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                )}
                {album.photoCount !== undefined && (
                  <span className="badge">{album.photoCount} ảnh</span>
                )}
              </div>
              <div className="body">
                <h4>{album.title}</h4>
                <div className="date">{formattedDate(album.date)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

