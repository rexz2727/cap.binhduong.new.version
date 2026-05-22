import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getNewsBySlug } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import PrintButton from "@/components/ui/PrintButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();

  const imgUrl = post.mainImage
    ? urlFor(post.mainImage).width(900).height(506).url()
    : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <PageHeader
        title={post.title}
        breadcrumbs={[
          { label: "Tin tức", href: "/tin-tuc" },
          { label: post.title },
        ]}
      />
      <section className="block">
        <div className="article-container">
          <div className="article-meta">
            <Badge category={post.category} />
            <span>{formattedDate}</span>
          </div>

          {imgUrl && (
            <div className="article-cover" style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
              <Image
                src={imgUrl}
                alt={post.mainImage?.alt ?? post.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          {post.excerpt && (
            <p className="article-lede">{post.excerpt}</p>
          )}

          <div className="article-body">
            <PortableText value={post.body} />
          </div>

          <div className="article-foot">
            <div className="tag-list" />
            <div className="share-btns">
              <button title="Facebook">
                <svg width="14" height="14"><use href="#i-fb" /></svg>
              </button>
              <button title="Chia sẻ">
                <svg width="14" height="14"><use href="#i-share" /></svg>
              </button>
              <PrintButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
