import type { SanityImage, SanitySlug } from "./sanity";

export interface PhotoAlbumPhoto {
  asset: { _ref: string; _type: "reference" };
  caption?: string;
}

export interface PhotoAlbum {
  _id: string;
  title: string;
  slug: SanitySlug;
  date: string;
  coverImage?: SanityImage;
  description?: string;
  category?: "hoat-dong" | "su-kien" | "cong-dong";
  photos?: PhotoAlbumPhoto[];
  photoCount?: number;
}

export type PhotoAlbumPreview = Pick<
  PhotoAlbum,
  "_id" | "title" | "slug" | "date" | "coverImage" | "description" | "photoCount"
>;
