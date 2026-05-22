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

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gap: "8px",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  return (
    <>
      <div style={gridStyle}>
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              position: "relative",
              aspectRatio: "1",
              overflow: "hidden",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: "var(--surface-2)",
            }}
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
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", maxWidth: "900px", width: "100%" }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/10" }}>
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
              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "13px", marginTop: "12px" }}>
                {photos[active].caption}
              </p>
            )}
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "4px" }}>
              {active + 1} / {photos.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Ảnh trước"
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "white",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Ảnh tiếp"
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "white",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
          <button
            onClick={close}
            aria-label="Đóng"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "rgba(255,255,255,0.12)",
              border: "none",
              color: "white",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
