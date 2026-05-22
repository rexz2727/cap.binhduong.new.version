import type { MetadataRoute } from "next";
import { getAllSlugsForSitemap } from "@/sanity/lib/queries";
import { SITE } from "@/constants/site";

const base = SITE.url;

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: base, priority: 1.0, changeFrequency: "daily" },
  { url: `${base}/tin-tuc`, priority: 0.9, changeFrequency: "daily" },
  { url: `${base}/thu-tuc-hanh-chinh`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${base}/van-ban-phap-luat`, priority: 0.8, changeFrequency: "weekly" },
  { url: `${base}/chinh-sach-phap-luat`, priority: 0.7, changeFrequency: "weekly" },
  { url: `${base}/gioi-thieu`, priority: 0.6, changeFrequency: "monthly" },
  { url: `${base}/phan-anh`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${base}/hoi-dap`, priority: 0.7, changeFrequency: "weekly" },
  { url: `${base}/thu-vien-anh`, priority: 0.6, changeFrequency: "weekly" },
  { url: `${base}/video`, priority: 0.6, changeFrequency: "weekly" },
  { url: `${base}/truy-na`, priority: 0.7, changeFrequency: "weekly" },
  { url: `${base}/lich-tiep-cong-dan`, priority: 0.6, changeFrequency: "monthly" },
  { url: `${base}/so-do-trang`, priority: 0.5, changeFrequency: "monthly" },
  { url: `${base}/search`, priority: 0.5, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, procedures, legalDocs, albums, videos, goodDeeds] = await getAllSlugsForSitemap();

  return [
    ...STATIC_ROUTES,
    ...news.map((item) => ({
      url: `${base}/tin-tuc/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...procedures.map((item) => ({
      url: `${base}/thu-tuc-hanh-chinh/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...legalDocs.map((item) => ({
      url: `${base}/van-ban-phap-luat/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...albums.map((item) => ({
      url: `${base}/thu-vien-anh/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...videos.map((item) => ({
      url: `${base}/video/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...goodDeeds.map((item) => ({
      url: `${base}/nguoi-tot-viec-tot/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
