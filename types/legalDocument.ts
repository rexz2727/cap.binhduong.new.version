import type { SanitySlug } from "./sanity";

export interface LegalDocument {
  _id: string;
  title: string;
  slug: SanitySlug;
  documentNumber: string;
  issuedDate: string;
  issuingBody: string;
  category: "nghi-quyet" | "ke-hoach" | "quyet-dinh" | "thong-tu" | "khac";
  summary: string;
  fileUrl?: string;
}

export type LegalDocumentPreview = Pick<
  LegalDocument,
  "_id" | "title" | "slug" | "documentNumber" | "issuedDate" | "category" | "issuingBody"
>;
