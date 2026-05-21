"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { NewsPostPreview } from "@/types/news";
import { useI18n } from "@/lib/i18n";

interface Props {
  posts: NewsPostPreview[];
}

export default function NewsCarousel({ posts }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const { t } = useI18n();

  if (!posts.length) return null;

  return (
    <div className="news-carousel">
      <div className="news-carousel-inner" ref={emblaRef}>
        <div className="news-carousel-track">
          {posts.map((post) => (
            <div className="carousel-slide" key={post._id}>
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).width(1200).height(600).url()}
                  alt={post.title}
                  fill
                  sizes="100vw"
                  priority
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full bg-police-navy-dark" />
              )}
              <div className="carousel-caption">
                <div className="container">
                  <span className="cat">{post.category ?? "Tin tức"}</span>
                  <Link href={`/tin-tuc/${post.slug.current}`}>
                    <h2 className="title">{post.title}</h2>
                  </Link>
                  <Link href="/tin-tuc" className="read-more" data-i18n="section.news.link">
                    {t("section.news.link", "Xem tất cả tin tức")}
                    <svg width="1em" height="1em"><use href="#i-arrow" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-nav">
        <div className="container">
          <button className="carousel-prev" onClick={scrollPrev} aria-label="Tin trước">
            <svg width="1em" height="1em"><use href="#i-chev-left" /></svg>
          </button>
          <button className="carousel-next" onClick={scrollNext} aria-label="Tin tiếp">
            <svg width="1em" height="1em"><use href="#i-chev-right" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
