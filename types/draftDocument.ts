import type { SanitySlug } from "./sanity";

export interface DraftDocument {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  deadline: string;
  fileUrl?: string;
  publishedAt?: string;
}
