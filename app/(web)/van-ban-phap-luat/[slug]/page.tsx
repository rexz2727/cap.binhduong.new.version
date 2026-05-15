import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalDocBySlug } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getLegalDocBySlug(slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.summary };
}

export default async function LegalDocDetailPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getLegalDocBySlug(slug);
  if (!doc) notFound();

  return (
    <>
      <PageHeader
        title={doc.title}
        breadcrumbs={[
          { label: "Văn bản pháp luật", href: "/van-ban-phap-luat" },
          { label: doc.documentNumber },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge category={doc.category} />
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Số hiệu</dt>
              <dd className="text-gray-900">{doc.documentNumber}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Ngày ban hành</dt>
              <dd className="text-gray-900">
                {new Date(doc.issuedDate).toLocaleDateString("vi-VN")}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Cơ quan ban hành</dt>
              <dd className="text-gray-900">{doc.issuingBody}</dd>
            </div>
          </dl>
        </div>

        {doc.summary && (
          <div className="prose prose-gray max-w-none mb-6">
            <h2 className="text-lg font-semibold text-police-navy">Tóm tắt nội dung</h2>
            <p>{doc.summary}</p>
          </div>
        )}

        {doc.fileUrl && (
          <Button href={doc.fileUrl} variant="primary">
            Tải văn bản (PDF) →
          </Button>
        )}
      </div>
    </>
  );
}
