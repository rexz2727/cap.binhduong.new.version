"use client";

import Link from "next/link";
import type { LegalDocumentPreview } from "@/types/legalDocument";
import { LEGAL_CATEGORY_LABELS } from "@/constants/legal";
import { useI18n } from "@/lib/i18n";

export default function LegalDocCard({ doc }: { doc: LegalDocumentPreview }) {
  const { lang } = useI18n();
  const formattedDate = new Date(doc.issuedDate).toLocaleDateString("vi-VN");

  const docI18n = doc as LegalDocumentPreview & { titleEn?: string };
  const displayTitle =
    lang === "en" && docI18n.titleEn ? docI18n.titleEn : doc.title;

  return (
    <div className="doc-card">
      <div className="doc-icon">
        <svg aria-hidden="true"><use href="#i-doc" /></svg>
      </div>
      <div className="b">
        <span className="badge-type">{LEGAL_CATEGORY_LABELS[doc.category] ?? doc.category}</span>
        <Link href={`/van-ban-phap-luat/${doc.slug.current}`}>
          <h4>{displayTitle}</h4>
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
