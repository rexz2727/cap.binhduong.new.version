import Link from "next/link";
import type { LegalDocumentPreview } from "@/types/legalDocument";
import Badge from "./Badge";

export default function LegalDocCard({ doc }: { doc: LegalDocumentPreview }) {
  const formattedDate = new Date(doc.issuedDate).toLocaleDateString("vi-VN");

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-police-red hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-2 mb-2">
        <Badge category={doc.category} />
        <time className="text-xs text-gray-400 whitespace-nowrap">{formattedDate}</time>
      </div>
      <Link href={`/van-ban-phap-luat/${doc.slug.current}`}>
        <h3 className="font-semibold text-gray-900 hover:text-police-red line-clamp-2 mb-1">
          {doc.title}
        </h3>
      </Link>
      <p className="text-sm text-gray-500">Số: {doc.documentNumber}</p>
      <p className="text-xs text-gray-400">{doc.issuingBody}</p>
    </div>
  );
}
