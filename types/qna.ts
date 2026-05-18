import type { PortableTextBlock } from "@portabletext/types";

export type QnaCategory = "cu-tru" | "cccd" | "vneid" | "xe-may" | "hanh-chinh" | "khac";

export interface Qna {
  _id: string;
  question: string;
  askerName?: string;
  category: QnaCategory;
  answer?: PortableTextBlock[];
  isAnswered: boolean;
  answeredBy?: string;
  answeredAt?: string;
  viewCount?: number;
  publishedAt?: string;
}

export type QnaPreview = Pick<
  Qna,
  "_id" | "question" | "askerName" | "category" | "answer" | "answeredBy" | "answeredAt" | "viewCount" | "publishedAt"
>;
