import Link from "next/link";
import type { LegalDocumentPreview } from "@/types/legalDocument";

export default function LegalDocCard({ doc }: { doc: LegalDocumentPreview }) {
  const formattedDate = new Date(doc.issuedDate).toLocaleDateString("vi-VN");

  return (
    <div className="doc-card">
      <div className="doc-icon">
        <svg aria-hidden="true"><use href="#i-doc" /></svg>
      </div>
      <div className="b">
        <span className="badge-type">{doc.category}</span>
        <Link href={`/van-ban-phap-luat/${doc.slug.current}`}>
          <h4>{doc.title}</h4>
        </Link>
        <p className="meta">
          <b>Số:</b> {doc.documentNumber} &nbsp;·&nbsp; {doc.issuingBody} &nbsp;·&nbsp; {formattedDate}
        </p>
      </div>
    </div>
  );
}
