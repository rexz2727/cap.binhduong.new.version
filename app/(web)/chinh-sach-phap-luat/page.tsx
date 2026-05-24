import type { Metadata } from "next";
import Link from "next/link";
import { getDraftDocuments, getPageContent } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Chính sách pháp luật | Công an phường Bình Dương",
  description: "Dự thảo văn bản, chính sách pháp luật đang được lấy ý kiến tại Công an phường Bình Dương.",
};

export default async function ChinhSachPhapLuatPage() {
  const docs = await getDraftDocuments();
  const pageContent = await getPageContent();

  return (
    <>
      <PageHeader
        title="Chính sách pháp luật"
        breadcrumbs={[{ label: "Chính sách pháp luật" }]}
        description={pageContent?.chinh_sach_phap_luat ?? "Dự thảo văn bản đang lấy ý kiến và chính sách pháp luật mới ban hành"}
      />

      <section className="block">
        <div className="container">
          {docs.length === 0 ? (
            <p className="text-center text-[var(--muted)] py-16">
              Chưa có văn bản dự thảo nào.
            </p>
          ) : (
            <div className="doc-grid">
              {docs.map((doc) => {
                const isExpired = doc.deadline && new Date(doc.deadline) < new Date();
                return (
                  <div className="doc-card" key={doc._id}>
                    <div className="doc-icon">
                      <svg aria-hidden="true"><use href="#i-doc" /></svg>
                    </div>
                    <div className="b">
                      <span className="badge-type">
                        {isExpired ? "Đã hết hạn" : "Đang lấy ý kiến"}
                      </span>
                      <h4>{doc.title}</h4>
                      {doc.deadline && (
                        <div className="meta">
                          Hạn góp ý: <b>{new Date(doc.deadline).toLocaleDateString("vi-VN")}</b>
                        </div>
                      )}
                      {doc.description && (
                        <div className="meta">{doc.description}</div>
                      )}
                    </div>
                    {doc.fileUrl && (
                      <Link
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="doc-download"
                        title="Tải xuống"
                      >
                        <svg width="18" height="18"><use href="#i-download" /></svg>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
