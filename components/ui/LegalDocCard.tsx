// TODO: Task 8 — Card hiển thị văn bản pháp luật (số hiệu, ngày ban hành, cơ quan)
import type { LegalDocumentPreview } from "@/types/legalDocument";
export default function LegalDocCard({ doc }: { doc: LegalDocumentPreview }) {
  return <div>{doc.title}</div>;
}
