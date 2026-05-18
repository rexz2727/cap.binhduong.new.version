import type { SanityImage } from "./sanity";

export type WantedStatus = "dang-truy-na" | "da-bat";

export interface WantedPerson {
  _id: string;
  fullName: string;
  aliases?: string[];
  photo?: SanityImage;
  birthYear?: number;
  hometown?: string;
  crime: string;
  warrantDate?: string;
  warrantAgency?: string;
  status: WantedStatus;
  note?: string;
}
