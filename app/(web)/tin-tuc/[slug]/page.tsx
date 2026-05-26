import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getNewsBySlug } from "@/sanity/lib/queries";
import { getLang } from "@/lib/getLang";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import PrintButton from "@/components/ui/PrintButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, lang] = await Promise.all([getNewsBySlug(slug), getLang()]);
  if (!post) return {};
  const p = post as typeof post & { titleEn?: string; excerptEn?: string };
  const title = lang === "en" && p.titleEn ? p.titleEn : post.title;
  const description =
    lang === "en" && p.excerptEn ? p.excerptEn : post.excerpt;
  return { title, description };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const [post, lang] = await Promise.all([getNewsBySlug(slug), getLang()]);
  if (!post) notFound();

  const p = post as typeof post & {
    titleEn?: string;
    excerptEn?: string;
    bodyEn?: typeof post.body;
  };
  const title = lang === "en" && p.titleEn ? p.titleEn : post.title;
  const excerpt = lang === "en" && p.excerptEn ? p.excerptEn : post.excerpt;
  const body = lang === "en" && p.bodyEn?.length ? p.bodyEn : post.body;

  const imgUrl = post.mainImage
    ? urlFor(post.mainImage).width(900).height(506).url()
    : null;

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === "en" ? "en-US" : "vi-VN",
    {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={[
          { label: "Tin tức", href: "/tin-tuc" },
          { label: title },
        ]}
      />
      <section className="block">
        <div className="article-container">
          <div className="article-meta">
            <Badge category={post.category} />
            <span>{formattedDate}</span>
          </div>

          {imgUrl && (
            <div className="article-cover relative aspect-video overflow-hidden">
              <Image
                src={imgUrl}
                alt={post.mainImage?.alt ?? title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          {excerpt && (
            <p className="article-lede">{excerpt}</p>
          )}

          <div className="article-body">
            <PortableText value={body} />
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
