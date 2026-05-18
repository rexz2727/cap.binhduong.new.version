import type { PortableTextBlock } from "@portabletext/types";
import type { SanitySlug } from "./sanity";

export interface ProcedureForm {
  title: string;
  fileUrl: string;
}

export interface Procedure {
  _id: string;
  title: string;
  slug: SanitySlug;
  category: "cu-tru" | "cmnd-cccd" | "xe-co" | "khac";
  processingTime: string;
  fee: string;
  requirements: PortableTextBlock[];
  steps: PortableTextBlock[];
  legalBasis?: string[];
  forms?: ProcedureForm[];
  onlineServiceUrl?: string;
}
