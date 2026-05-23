import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalDocBySlug } from "@/sanity/lib/queries";
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
  const doc = await getLegalDocBySlug(slug);
  if (!doc) notFound();

  const issuedDate = new Date(doc.issuedDate).toLocaleDateString("vi-VN");
  const effectiveDate = doc.effectiveDate
    ? new Date(doc.effectiveDate).toLocaleDateString("vi-VN")
    : null;

  return (
    <>
      <PageHeader
        title={doc.title}
        breadcrumbs={[
          { label: "Văn bản pháp luật", href: "/van-ban-phap-luat" },
          { label: doc.documentNumber },
        ]}
      />

      <section className="block">
        <div className="container-narrow">
          <div className="org-card" style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div className="doc-icon" style={{ flexShrink: 0 }}>
                <svg aria-hidden="true"><use href="#i-doc" /></svg>
              </div>
              <span className="badge-type">{LEGAL_CATEGORY_LABELS[doc.category] ?? doc.category}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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

            {doc.fileUrl && (
              <div style={{ marginTop: "20px" }}>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-download"
                  title="Tải xuống PDF"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <svg width="18" height="18"><use href="#i-download" /></svg>
                  Tải văn bản (PDF)
                </a>
              </div>
            )}
          </div>

          {doc.summary && (
            <div className="article-body">
              <h2>Tóm tắt nội dung</h2>
              <p>{doc.summary}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
