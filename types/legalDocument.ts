import type { SanitySlug } from "./sanity";

export type LegalDocStatus = "con-hieu-luc" | "het-hieu-luc" | "cho-hieu-luc";

export interface LegalDocument {
  _id: string;
  title: string;
  slug: SanitySlug;
  documentNumber: string;
  issuedDate: string;
  issuingBody: string;
  category: "nghi-quyet" | "ke-hoach" | "quyet-dinh" | "thong-tu" | "khac";
  effectiveDate?: string;
  status?: LegalDocStatus;
  summary: string;
  fileUrl?: string;
  body?: import("@portabletext/types").PortableTextBlock[];
}

export type LegalDocumentPreview = Pick<
  LegalDocument,
  "_id" | "title" | "slug" | "documentNumber" | "issuedDate" | "category" | "issuingBody"
>;
