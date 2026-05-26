import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalDocBySlug } from "@/sanity/lib/queries";
import { getLang } from "@/lib/getLang";
import PageHeader from "@/components/ui/PageHeader";
import { LEGAL_CATEGORY_LABELS } from "@/constants/legal";

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
  const [doc, lang] = await Promise.all([getLegalDocBySlug(slug), getLang()]);
  if (!doc) notFound();

  const d = doc as typeof doc & { titleEn?: string; summaryEn?: string };
  const title = lang === "en" && d.titleEn ? d.titleEn : doc.title;
  const summary = lang === "en" && d.summaryEn ? d.summaryEn : doc.summary;

  const issuedDate = new Date(doc.issuedDate).toLocaleDateString(
    lang === "en" ? "en-US" : "vi-VN"
  );
  const effectiveDate = doc.effectiveDate
    ? new Date(doc.effectiveDate).toLocaleDateString(
        lang === "en" ? "en-US" : "vi-VN"
      )
    : null;

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={[
          { label: "Văn bản pháp luật", href: "/van-ban-phap-luat" },
          { label: doc.documentNumber },
        ]}
      />

      <section className="block">
        <div className="container-narrow">
          <div className="org-card mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="doc-icon shrink-0">
                <svg aria-hidden="true"><use href="#i-doc" /></svg>
              </div>
              <span className="badge-type">{LEGAL_CATEGORY_LABELS[doc.category] ?? doc.category}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="lbl">Số hiệu</div>
                <b>{doc.documentNumber}</b>
              </div>
              <div>
                <div className="lbl">Ngày ban hành</div>
                <b>{issuedDate}</b>
              </div>
              {effectiveDate && (
                <div>
                  <div className="lbl">Có hiệu lực</div>
                  <b>{effectiveDate}</b>
                </div>
              )}
              <div>
                <div className="lbl">Cơ quan ban hành</div>
                <b>{doc.issuingBody}</b>
              </div>
            </div>

            {(() => {
              const fileHref = doc.attachedFileUrl ?? doc.fileUrl;
              if (!fileHref) return null;
              const isPdf = fileHref.toLowerCase().includes(".pdf");
              return (
                <div className="mt-5 space-y-3">
                  <a
                    href={fileHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-download inline-flex items-center gap-2"
                  >
                    <svg width="18" height="18"><use href="#i-download" /></svg>
                    {isPdf ? "Xem / Tải văn bản (PDF)" : "Tải văn bản đính kèm"}
                  </a>
                  {isPdf && (
                    <iframe
                      src={fileHref}
                      className="doc-pdf-viewer"
                      title="Xem PDF"
                    />
                  )}
                </div>
              );
            })()}
          </div>

          {summary && (
            <div className="article-body">
              <h2>Tóm tắt nội dung</h2>
              <p>{summary}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
