import { groq } from "next-sanity";
import { client } from "./client";
import type { NewsPost, NewsPostPreview } from "@/types/news";
import type { LegalDocument, LegalDocumentPreview } from "@/types/legalDocument";
import type { Personnel } from "@/types/personnel";
import type { Procedure } from "@/types/procedure";
import type { PhotoAlbum, PhotoAlbumPreview } from "@/types/photoAlbum";
import type { VideoPreviewItem } from "@/types/video";
import type { QnaPreview } from "@/types/qna";
import type { Announcement } from "@/types/announcement";
import type { DraftDocument } from "@/types/draftDocument";
import type { WantedPerson } from "@/types/wantedPerson";
import type { CitizenSchedule } from "@/types/citizenSchedule";

const isConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder";

const noCache = { cache: "no-store" as const };

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isConfigured) return fallback;
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

// ─── News ─────────────────────────────────────────────────────────────────────

export async function getLatestNews(limit = 6): Promise<NewsPostPreview[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "newsPost"] | order(publishedAt desc) [0...$limit] {
        _id, title, slug, publishedAt, excerpt, mainImage, category
      }`,
      { limit },
      noCache
    ),
    []
  );
}

export async function getNewsByCategory(category: string, limit = 20): Promise<NewsPostPreview[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "newsPost" && category == $category] | order(publishedAt desc) [0...$limit] {
        _id, title, slug, publishedAt, excerpt, mainImage, category
      }`,
      { category, limit },
      noCache
    ),
    []
  );
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "newsPost" && slug.current == $slug][0] {
        _id, title, slug, publishedAt, excerpt, mainImage, category, body
      }`,
      { slug },
      noCache
    ),
    null
  );
}

// ─── Legal Documents ──────────────────────────────────────────────────────────

export async function getLegalDocuments(category?: string): Promise<LegalDocumentPreview[]> {
  const filter = category
    ? groq`*[_type == "legalDocument" && category == $category]`
    : groq`*[_type == "legalDocument"]`;
  return safeFetch(
    () => client.fetch(
      groq`${filter} | order(issuedDate desc) { _id, title, slug, documentNumber, issuedDate, category, issuingBody }`,
      { category: category ?? "" },
      noCache
    ),
    []
  );
}

export async function getLegalDocBySlug(slug: string): Promise<LegalDocument | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "legalDocument" && slug.current == $slug][0]`,
      { slug },
      noCache
    ),
    null
  );
}

// ─── Personnel ────────────────────────────────────────────────────────────────

export async function getPersonnel(): Promise<Personnel[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "personnel"] | order(order asc) { _id, fullName, rank, position, unit, photo, order }`,
      {},
      noCache
    ),
    []
  );
}

// ─── Procedures ───────────────────────────────────────────────────────────────

export async function getProcedures(category?: string): Promise<Procedure[]> {
  const filter = category
    ? groq`*[_type == "procedure" && category == $category]`
    : groq`*[_type == "procedure"]`;
  return safeFetch(
    () => client.fetch(
      groq`${filter} | order(title asc) { _id, title, slug, category, processingTime, fee }`,
      { category: category ?? "" },
      noCache
    ),
    []
  );
}

export async function getProcedureBySlug(slug: string): Promise<Procedure | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "procedure" && slug.current == $slug][0]`,
      { slug },
      noCache
    ),
    null
  );
}

// ─── Featured News (NewsCarousel) ────────────────────────────────────────────

export async function getFeaturedNews(): Promise<NewsPostPreview[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "newsPost" && isFeatured == true] | order(publishedAt desc) [0...5] {
        _id, title, slug, publishedAt, excerpt, mainImage, category, isFeatured
      }`,
      {},
      noCache
    ),
    []
  );
}

// ─── Người tốt việc tốt ──────────────────────────────────────────────────────

export async function getNguoiTotViecTot(limit = 6): Promise<NewsPostPreview[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "newsPost" && isNguoiTotViecTot == true] | order(publishedAt desc) [0...$limit] {
        _id, title, slug, publishedAt, excerpt, mainImage, category
      }`,
      { limit },
      noCache
    ),
    []
  );
}

// ─── Announcements (Ticker) ───────────────────────────────────────────────────

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "announcement" && isActive == true && (expiryDate > now() || !defined(expiryDate))]
        | order(priority asc)
        { _id, text, url }`,
      {},
      noCache
    ),
    []
  );
}

// ─── Photo Albums ─────────────────────────────────────────────────────────────

export async function getPhotoAlbums(limit = 12): Promise<PhotoAlbumPreview[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "photoAlbum"] | order(date desc) [0...$limit] {
        _id, title, slug, date, coverImage, description, "photoCount": count(photos)
      }`,
      { limit },
      noCache
    ),
    []
  );
}

export async function getPhotoAlbumBySlug(slug: string): Promise<PhotoAlbum | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "photoAlbum" && slug.current == $slug][0] {
        _id, title, slug, date, description, category,
        photos[]{ asset->, caption }
      }`,
      { slug },
      noCache
    ),
    null
  );
}

// ─── Videos ───────────────────────────────────────────────────────────────────

export async function getVideos(category = "all", limit = 12): Promise<VideoPreviewItem[]> {
  const filter = category === "all"
    ? groq`*[_type == "video"]`
    : groq`*[_type == "video" && category == $category]`;
  return safeFetch(
    () => client.fetch(
      groq`${filter} | order(date desc) [0...$limit] {
        _id, title, slug, date, youtubeId, thumbnail, category
      }`,
      { category, limit },
      noCache
    ),
    []
  );
}

// ─── Q&A ──────────────────────────────────────────────────────────────────────

export async function getQnaAnswered(category = "all", limit = 20): Promise<QnaPreview[]> {
  const filter = category === "all"
    ? groq`*[_type == "qna" && isAnswered == true]`
    : groq`*[_type == "qna" && isAnswered == true && category == $category]`;
  return safeFetch(
    () => client.fetch(
      groq`${filter} | order(publishedAt desc) [0...$limit] {
        _id, question, askerName, category, answer, answeredBy, answeredAt, viewCount, publishedAt
      }`,
      { category, limit },
      noCache
    ),
    []
  );
}

// ─── Draft Documents ──────────────────────────────────────────────────────────

export async function getDraftDocuments(): Promise<DraftDocument[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "draftDocument" && deadline > now()] | order(deadline asc) {
        _id, title, slug, description, deadline, fileUrl, publishedAt
      }`,
      {},
      noCache
    ),
    []
  );
}

// ─── Wanted Persons ───────────────────────────────────────────────────────────

export async function getWantedPersons(status = "dang-truy-na"): Promise<WantedPerson[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "wantedPerson" && status == $status] | order(warrantDate desc) {
        _id, fullName, aliases, photo, birthYear, hometown, crime, warrantDate, warrantAgency, status, note
      }`,
      { status },
      noCache
    ),
    []
  );
}

// ─── Citizen Schedule ─────────────────────────────────────────────────────────

export async function getScheduleByMonth(startDate: string, endDate: string): Promise<CitizenSchedule[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "citizenSchedule" && date >= $startDate && date <= $endDate]
        | order(date asc) {
        _id, date, timeSlot, location, note, isRegular,
        officer->{ fullName, rank, position, photo }
      }`,
      { startDate, endDate },
      noCache
    ),
    []
  );
}

// ─── Search ───────────────────────────────────────────────────────────────────

export interface SearchResult {
  _id: string;
  _type: "newsPost" | "procedure" | "legalDocument";
  title: string;
  slug: { current: string };
  excerpt: string;
}

export async function searchAll(q: string): Promise<SearchResult[]> {
  if (!q.trim()) return [];
  return safeFetch(
    () => client.fetch(
      groq`*[
        (_type == "newsPost" && (title match $q || excerpt match $q)) ||
        (_type == "procedure" && title match $q) ||
        (_type == "legalDocument" && (title match $q || documentNumber match $q))
      ] | order(_score desc) [0...20] {
        _id, _type, title, slug,
        "excerpt": select(
          _type == "newsPost" => excerpt,
          _type == "procedure" => "Thủ tục hành chính",
          _type == "legalDocument" => documentNumber
        )
      }`,
      { q: q.trim() + "*" },
      noCache
    ),
    []
  );
}

// ─── Sitemap slugs ────────────────────────────────────────────────────────────

export async function getAllSlugsForSitemap() {
  return safeFetch(
    () => Promise.all([
      client.fetch<{ slug: string; date: string }[]>(
        groq`*[_type == "newsPost"] { "slug": slug.current, "date": publishedAt }`,
        {}, noCache
      ),
      client.fetch<{ slug: string }[]>(
        groq`*[_type == "procedure"] { "slug": slug.current }`,
        {}, noCache
      ),
      client.fetch<{ slug: string; date: string }[]>(
        groq`*[_type == "legalDocument"] { "slug": slug.current, "date": issuedDate }`,
        {}, noCache
      ),
      client.fetch<{ slug: string }[]>(
        groq`*[_type == "photoAlbum"] { "slug": slug.current }`,
        {}, noCache
      ),
      client.fetch<{ slug: string }[]>(
        groq`*[_type == "video"] { "slug": slug.current }`,
        {}, noCache
      ),
    ]),
    [[], [], [], [], []] as [
      { slug: string; date: string }[],
      { slug: string }[],
      { slug: string; date: string }[],
      { slug: string }[],
      { slug: string }[],
    ]
  );
}

// ─── Legal Docs Filtered ──────────────────────────────────────────────────────

export async function getLegalDocsFiltered(
  category?: string,
  status?: string,
  limit = 20
): Promise<LegalDocumentPreview[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "legalDocument"
        && ($category == null || category == $category)
        && ($status == null || status == $status)]
        | order(issuedDate desc) [0...$limit] {
        _id, title, slug, documentNumber, issuedDate, category, issuingBody, effectiveDate, status
      }`,
      { category: category ?? null, status: status ?? null, limit },
      noCache
    ),
    []
  );
}
