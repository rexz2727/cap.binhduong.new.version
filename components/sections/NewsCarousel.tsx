"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { NewsPostPreview } from "@/types/news";

interface Props {
  posts: NewsPostPreview[];
}

export default function NewsCarousel({ posts }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!posts.length) return null;

  return (
    <section className="relative overflow-hidden bg-police-navy">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {posts.map((post) => (
            <div key={post._id} className="relative min-w-full h-[420px] md:h-[500px]">
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).width(1200).height(500).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-police-navy-dark" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl">
                <span className="inline-block bg-police-red text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  {post.category ?? "Tin tức"}
                </span>
                <Link href={`/tin-tuc/${post.slug.current}`}>
                  <h2 className="text-white text-xl md:text-3xl font-bold leading-tight mb-3 hover:text-police-gold transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                {post.excerpt && (
                  <p className="text-blue-200 text-sm md:text-base line-clamp-2">{post.excerpt}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10 text-xl"
        aria-label="Tin trước"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10 text-xl"
        aria-label="Tin tiếp"
      >
        ›
      </button>
    </section>
  );
}
