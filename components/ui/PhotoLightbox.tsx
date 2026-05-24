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
  const prev = useCallback(
    () => setActive((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length]
  );
  const next = useCallback(
    () => setActive((i) => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length]
  );

  const gridColsClass =
    columns === 2
      ? "grid-cols-2"
      : columns === 4
      ? "grid-cols-4"
      : "grid-cols-3";

  return (
    <>
      <div className={`grid gap-2 ${gridColsClass}`}>
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative aspect-square overflow-hidden border-none p-0 cursor-pointer bg-[var(--surface-2)]"
          >
            <Image
              src={photo.src}
              alt={photo.caption ?? `Ảnh ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 600px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[900px] w-full"
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
              <p className="text-center text-white/70 text-[13px] mt-3">
                {photos[active].caption}
              </p>
            )}
            <p className="text-center text-white/40 text-xs mt-1">
              {active + 1} / {photos.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Ảnh trước"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 border-none text-white w-11 h-11 rounded-full text-2xl cursor-pointer flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Ảnh tiếp"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 border-none text-white w-11 h-11 rounded-full text-2xl cursor-pointer flex items-center justify-center"
          >
            ›
          </button>
          <button
            onClick={close}
            aria-label="Đóng"
            className="absolute top-4 right-4 bg-white/10 border-none text-white w-9 h-9 rounded-full text-xl cursor-pointer flex items-center justify-center"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
