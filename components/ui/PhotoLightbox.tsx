"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  caption?: string;
}

interface Props {
  photos: Photo[];
  columns?: 2 | 3 | 4;
}

export default function PhotoLightbox({ photos, columns = 3 }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() =>
    setActive((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length]
  );
  const next = useCallback(() =>
    setActive((i) => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length]
  );

  const gridCols =
    columns === 2
      ? "grid-cols-2"
      : columns === 4
      ? "grid-cols-2 md:grid-cols-4"
      : "grid-cols-2 md:grid-cols-3";

  return (
    <>
      <div className={`grid ${gridCols} gap-3`}>
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-police-red"
          >
            <Image
              src={photo.src}
              alt={photo.caption ?? `Ảnh ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-2xl">🔍</span>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative max-w-5xl max-h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={photos[active].src}
                alt={photos[active].caption ?? `Ảnh ${active + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {photos[active].caption && (
              <p className="text-center text-white/70 text-sm mt-3">{photos[active].caption}</p>
            )}
            <p className="text-center text-white/50 text-xs mt-1">
              {active + 1} / {photos.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-colors"
            aria-label="Ảnh trước"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-colors"
            aria-label="Ảnh tiếp"
          >
            ›
          </button>
          <button
            onClick={close}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors"
            aria-label="Đóng"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
