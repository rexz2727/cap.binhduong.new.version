import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage, SanitySlug } from "./sanity";

export interface NewsPost {
  _id: string;
  _createdAt: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  excerpt: string;
  mainImage?: SanityImage;
  category: "tin-tuc" | "thong-bao" | "canh-bao";
  body: PortableTextBlock[];
}

export type NewsPostPreview = Pick<
  NewsPost,
  "_id" | "title" | "slug" | "publishedAt" | "excerpt" | "mainImage" | "category"
>;
