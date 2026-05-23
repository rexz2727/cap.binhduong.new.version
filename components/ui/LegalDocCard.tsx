import Link from "next/link";
import type { LegalDocumentPreview } from "@/types/legalDocument";
import { LEGAL_CATEGORY_LABELS } from "@/constants/legal";

export default function LegalDocCard({ doc }: { doc: LegalDocumentPreview }) {
  const formattedDate = new Date(doc.issuedDate).toLocaleDateString("vi-VN");

  return (
    <div className="doc-card">
      <div className="doc-icon">
        <svg aria-hidden="true"><use href="#i-doc" /></svg>
      </div>
      <div className="b">
        <span className="badge-type">{LEGAL_CATEGORY_LABELS[doc.category] ?? doc.category}</span>
        <Link href={`/van-ban-phap-luat/${doc.slug.current}`}>
          <h4>{doc.title}</h4>
        </Link>
        <div className="meta">
          <b>Số {doc.documentNumber}</b> · {doc.issuingBody} · {formattedDate}
        </div>
      </div>
      <Link
        href={`/van-ban-phap-luat/${doc.slug.current}`}
        className="doc-download"
        title="Xem chi tiết"
        aria-label="Xem chi tiết văn bản"
      >
        <svg width="18" height="18"><use href="#i-download" /></svg>
      </Link>
    </div>
  );
}
