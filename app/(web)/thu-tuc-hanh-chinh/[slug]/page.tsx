import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getProcedureBySlug } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proc = await getProcedureBySlug(slug);
  if (!proc) return {};
  return { title: proc.title };
}

export default async function ProcedureDetailPage({ params }: Props) {
  const { slug } = await params;
  const proc = await getProcedureBySlug(slug);
  if (!proc) notFound();

  return (
    <>
      <PageHeader
        title={proc.title}
        breadcrumbs={[
          { label: "Thủ tục hành chính", href: "/thu-tuc-hanh-chinh" },
          { label: proc.title },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-blue-50 rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Lĩnh vực: </span>
            <Badge category={proc.category} />
          </div>
          <div>
            <span className="font-medium text-gray-600">Thời gian: </span>
            <span>{proc.processingTime}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Lệ phí: </span>
            <span>{proc.fee}</span>
          </div>
        </div>

        {proc.requirements && (
          <div>
            <h2 className="text-lg font-bold text-police-navy mb-3">Thành phần hồ sơ</h2>
            <div className="prose prose-gray max-w-none">
              <PortableText value={proc.requirements} />
            </div>
          </div>
        )}

        {proc.steps && (
          <div>
            <h2 className="text-lg font-bold text-police-navy mb-3">Các bước thực hiện</h2>
            <div className="prose prose-gray max-w-none">
              <PortableText value={proc.steps} />
            </div>
          </div>
        )}

        {proc.forms && proc.forms.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-police-navy mb-3">Biểu mẫu tải về</h2>
            <div className="space-y-2">
              {proc.forms.map((form, i) => (
                <a
                  key={i}
                  href={form.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-police-navy hover:bg-blue-50 transition-colors text-sm"
                >
                  <span className="text-xl">📥</span>
                  <span className="text-police-navy font-medium">{form.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
