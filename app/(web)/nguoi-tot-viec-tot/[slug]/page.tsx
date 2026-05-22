import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getGoodDeedBySlug } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const deed = await getGoodDeedBySlug(slug);
  if (!deed) return {};
  return { title: deed.name, description: deed.summary };
}

export default async function GoodDeedDetailPage({ params }: Props) {
  const { slug } = await params;
  const deed = await getGoodDeedBySlug(slug);
  if (!deed) notFound();

  const imgUrl = deed.photo
    ? urlFor(deed.photo).width(400).height(400).url()
    : null;

  const formattedDate = new Date(deed.date).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <PageHeader
        title={deed.name}
        breadcrumbs={[
          { label: "Người tốt việc tốt", href: "/nguoi-tot-viec-tot" },
          { label: deed.name },
        ]}
      />
      <section className="block">
        <div className="article-container">
          <div className="article-meta">
            <span>{deed.role}</span>
            <span>{formattedDate}</span>
          </div>

          {imgUrl && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={imgUrl}
                  alt={deed.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
          )}

          {deed.summary && (
            <p className="article-lede">{deed.summary}</p>
          )}

          <div className="article-body">
            <PortableText value={deed.body} />
          </div>
        </div>
      </section>
    </>
  );
}
