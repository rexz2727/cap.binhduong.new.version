import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage, SanitySlug } from "./sanity";

export type NewsCategory =
  | "an-ninh-trat-tu"
  | "hoat-dong-don-vi"
  | "nguoi-tot-viec-tot"
  | "thong-bao"
  | "chi-dao-dieu-hanh";

export interface NewsPost {
  _id: string;
  _createdAt: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  excerpt: string;
  mainImage?: SanityImage;
  category: NewsCategory;
  isFeatured?: boolean;
  body: PortableTextBlock[];
  titleEn?: string;
  excerptEn?: string;
  bodyEn?: import("@portabletext/types").PortableTextBlock[];
}

export type NewsPostPreview = Pick<
  NewsPost,
  "_id" | "title" | "slug" | "publishedAt" | "excerpt" | "mainImage" | "category" | "isFeatured"
>;
