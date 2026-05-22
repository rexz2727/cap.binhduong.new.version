import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage, SanitySlug } from "./sanity";

export interface GoodDeedPreview {
  _id: string;
  name: string;
  slug: SanitySlug;
  photo: SanityImage | null;
  role: string;
  summary: string;
  date: string;
}

export interface GoodDeed extends GoodDeedPreview {
  body: PortableTextBlock[];
}
