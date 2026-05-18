import type { SanityImage, SanitySlug } from "./sanity";

export interface Video {
  _id: string;
  title: string;
  slug: SanitySlug;
  date: string;
  youtubeId: string;
  thumbnail?: SanityImage;
  description?: string;
  category?: "hoat-dong" | "an-ninh" | "cong-dong";
}

export type VideoPreviewItem = Pick<
  Video,
  "_id" | "title" | "slug" | "date" | "youtubeId" | "thumbnail" | "category"
>;
