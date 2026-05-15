import type { PortableTextBlock } from "@portabletext/types";
import type { SanitySlug } from "./sanity";

export interface Procedure {
  _id: string;
  title: string;
  slug: SanitySlug;
  category: "cu-tru" | "cmnd-cccd" | "xe-co" | "khac";
  processingTime: string;
  fee: string;
  requirements: PortableTextBlock[];
  steps: PortableTextBlock[];
}
