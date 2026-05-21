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

  return (
    <section className="photo-album-grid">
      <div className="container">
        <hgroup className="section-h">
          <p className="eyebrow">Thư viện</p>
          <h2>Thư viện ảnh</h2>
          <Link href="/thu-vien-anh" className="read-more">
            Xem tất cả
            <svg width="1em" height="1em"><use href="#i-arrow" /></svg>
          </Link>
        </hgroup>
        <div className="grid">
          {albums.slice(0, 4).map((album) => (
            <Link href={`/thu-vien-anh/${album.slug.current}`} key={album._id} className="album-card">
              <figure>
                {album.coverImage && (
                  <Image
                    src={urlFor(album.coverImage).width(400).height(400).url()!}
                    alt={album.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
              </figure>
              <div className="album-card-text">
                <h3>{album.title}</h3>
                {album.photoCount !== undefined && (
                  <p className="sub">{album.photoCount} ảnh</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
