import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getNewsBySlug } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";

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
    ? urlFor(post.mainImage).width(900).height(500).url()
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
        breadcrumbs={[{ label: "Tin tức", href: "/tin-tuc" }, { label: post.title }]}
      />
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge category={post.category} />
          <time className="text-sm text-gray-500">{formattedDate}</time>
        </div>

        {imgUrl && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
            <Image
              src={imgUrl}
              alt={post.mainImage?.alt ?? post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <p className="text-lg text-gray-600 font-medium border-l-4 border-police-red pl-4 mb-6">
          {post.excerpt}
        </p>

        <div className="prose prose-gray max-w-none prose-headings:text-police-navy prose-a:text-police-red">
          <PortableText value={post.body} />
        </div>
      </article>
    </>
  );
}
