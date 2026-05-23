import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getProcedureBySlug } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import { PROCEDURE_CATEGORY_LABELS } from "@/constants/procedure";

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

      <section className="block">
        <div className="container-narrow">
          <div className="org-card" style={{ marginBottom: "32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <div className="lbl">Lĩnh vực</div>
                <b>{PROCEDURE_CATEGORY_LABELS[proc.category] ?? proc.category}</b>
              </div>
              <div>
                <div className="lbl">Thời gian xử lý</div>
                <b>{proc.processingTime}</b>
              </div>
              <div>
                <div className="lbl">Phí, lệ phí</div>
                <b>{proc.fee}</b>
              </div>
              <div>
                <div className="lbl">Hình thức</div>
                <b>{proc.onlineServiceUrl ? "Trực tuyến" : "Trực tiếp"}</b>
              </div>
            </div>

            {proc.onlineServiceUrl && (
              <div style={{ marginTop: "20px" }}>
                <a
                  href={proc.onlineServiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge online"
                >
                  Thực hiện trực tuyến →
                </a>
              </div>
            )}
          </div>

          <div className="article-body">
            {proc.requirements && (
              <>
                <h2>Thành phần hồ sơ</h2>
                <PortableText value={proc.requirements} />
              </>
            )}

            {proc.steps && (
              <>
                <h2>Các bước thực hiện</h2>
                <PortableText value={proc.steps} />
              </>
            )}

            {proc.legalBasis && proc.legalBasis.length > 0 && (
              <>
                <h2>Căn cứ pháp lý</h2>
                <ul>
                  {proc.legalBasis.map((basis, i) => (
                    <li key={i}>{basis}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {proc.forms && proc.forms.length > 0 && (
            <div style={{ marginTop: "32px" }}>
              <h3 style={{ fontWeight: 700, marginBottom: "12px" }}>Biểu mẫu tải về</h3>
              <div className="doc-grid">
                {proc.forms.map((form, i) => (
                  <div className="doc-card" key={i}>
                    <div className="doc-icon">
                      <svg aria-hidden="true"><use href="#i-doc" /></svg>
                    </div>
                    <div className="b">
                      <h4>{form.title}</h4>
                    </div>
                    <a
                      href={form.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="doc-download"
                      title="Tải xuống"
                    >
                      <svg width="18" height="18"><use href="#i-download" /></svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
