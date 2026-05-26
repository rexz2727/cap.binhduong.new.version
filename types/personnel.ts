import type { SanityImage } from "./sanity";

export interface Personnel {
  _id: string;
  fullName: string;
  rank: string;
  position: string;
  unit: string;
  positionEn?: string;
  unitEn?: string;
  photo?: SanityImage;
  order: number;
}
