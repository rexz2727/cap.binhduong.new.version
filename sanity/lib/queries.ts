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
import type { GoodDeed, GoodDeedPreview } from "@/types/goodDeed";
import type { SiteSettings } from "@/types/siteSettings";
import type { HomeContent } from "@/types/homeContent";
import type { UnitProfile } from "@/types/unitProfile";
import type { FeedbackProcess } from "@/types/feedbackProcess";
import type { EmergencyContent } from "@/types/emergencyContent";
import type { PageContent } from "@/types/pageContent";

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
        _id, title, titleEn, slug, publishedAt, excerpt, excerptEn, mainImage, category
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
        _id, title, titleEn, slug, publishedAt, excerpt, excerptEn, mainImage, category
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
        _id, title, titleEn, slug, publishedAt, excerpt, excerptEn, mainImage, category, body, bodyEn
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
      groq`${filter} | order(issuedDate desc) { _id, title, titleEn, slug, documentNumber, issuedDate, category, issuingBody }`,
      { category: category ?? "" },
      noCache
    ),
    []
  );
}

export async function getLegalDocBySlug(slug: string): Promise<LegalDocument | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "legalDocument" && slug.current == $slug][0]{
        ...,
        "attachedFileUrl": attachedFile.asset->url
      }`,
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
      groq`*[_type == "personnel"] | order(order asc) { _id, fullName, rank, position, positionEn, unit, unitEn, photo, order }`,
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
      groq`${filter} | order(title asc) { _id, title, titleEn, slug, category, processingTime, fee, onlineServiceUrl }`,
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

// ─── Good Deeds ───────────────────────────────────────────────────────────────

export async function getGoodDeeds(limit = 6): Promise<GoodDeedPreview[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "goodDeed"] | order(date desc) [0...$limit] {
        _id, name, slug, photo, role, summary, date
      }`,
      { limit },
      noCache
    ),
    []
  );
}

export async function getGoodDeedBySlug(slug: string): Promise<GoodDeed | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "goodDeed" && slug.current == $slug][0] {
        _id, name, slug, photo, role, summary, date, body
      }`,
      { slug },
      noCache
    ),
    null
  );
}

// ─── Announcements (Ticker) ───────────────────────────────────────────────────

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "announcement" && isActive == true && (expiryDate > now() || !defined(expiryDate))]
        | order(priority asc)
        { _id, text, textEn, url }`,
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
      client.fetch<{ slug: string; date: string }[]>(
        groq`*[_type == "goodDeed"] { "slug": slug.current, "date": date }`,
        {}, noCache
      ),
    ]),
    [[], [], [], [], [], []] as [
      { slug: string; date: string }[],
      { slug: string }[],
      { slug: string; date: string }[],
      { slug: string }[],
      { slug: string }[],
      { slug: string; date: string }[],
    ]
  );
}

// ─── Hero Stats ───────────────────────────────────────────────────────────────

export type HeroStats = { newsCount: number; procedureCount: number };

export async function getHeroStats(): Promise<HeroStats> {
  return safeFetch(
    () => client.fetch<HeroStats>(
      groq`{
        "newsCount": count(*[_type == "newsPost" && !(_id in path("drafts.**"))])
          + count(*[_type == "announcement" && !(_id in path("drafts.**"))]),
        "procedureCount": count(*[_type == "procedure" && !(_id in path("drafts.**"))])
      }`,
      {},
      noCache
    ),
    { newsCount: 0, procedureCount: 0 }
  );
}

// ─── Site Settings (Singleton) ────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "siteSettings"][0] {
        _id, name, address, phone, email, hotline, workingHours, workingHoursSat,
        description, facebook, youtube, zalo,
        relatedAgencies[]{ _key, label, href },
        emergencyNumbers[]{ _key, label, number }
      }`,
      {},
      noCache
    ),
    null
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
        _id, title, titleEn, slug, documentNumber, issuedDate, category, issuingBody, effectiveDate, status
      }`,
      { category: category ?? null, status: status ?? null, limit },
      noCache
    ),
    []
  );
}

// ─── Home Content (Singleton) ─────────────────────────────────────────────────

export async function getHomeContent(): Promise<HomeContent | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "homeContent" && _id == "homeContent"][0]{
        _id, heroEyebrow, heroH1Part1, heroH1Part2, heroLead,
        heroQuickTags[]{ _key, label, href },
        valuesItems[]{ _key, icon, title, desc }
      }`,
      {},
      { next: { revalidate: 3600 } }
    ),
    null
  );
}

// ─── Unit Profile (Singleton) ─────────────────────────────────────────────────

export async function getUnitProfile(): Promise<UnitProfile | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "unitProfile" && _id == "unitProfile"][0]{
        _id, unitDescription1, unitDescription2,
        duties[]{ _key, title, body },
        departments[]{ _key, label, sub },
        orgStats[]{ _key, label, value }
      }`,
      {},
      { next: { revalidate: 86400 } }
    ),
    null
  );
}

// ─── Feedback Process (Singleton) ─────────────────────────────────────────────

export async function getFeedbackProcess(): Promise<FeedbackProcess | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "feedbackProcess" && _id == "feedbackProcess"][0]{
        _id, pageDescription, warningNotice, emergencyDesc,
        processSteps[]{ _key, title, body }
      }`,
      {},
      { next: { revalidate: 86400 } }
    ),
    null
  );
}

// ─── Emergency Content (Singleton) ────────────────────────────────────────────

export async function getEmergencyContent(): Promise<EmergencyContent | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "emergencyContent" && _id == "emergencyContent"][0]{
        _id, title,
        emergencyNumbers[]{ _key, number, label, href },
        externalLinks[]{ _key, label, href }
      }`,
      {},
      { next: { revalidate: 86400 } }
    ),
    null
  );
}

// ─── Page Content (Singleton) ─────────────────────────────────────────────────

export async function getPageContent(): Promise<PageContent | null> {
  return safeFetch(
    () => client.fetch(
      groq`*[_type == "pageContent" && _id == "pageContent"][0]{
        _id, gioi_thieu, tin_tuc, van_ban_phap_luat, thu_tuc_hanh_chinh,
        hoi_dap, thu_vien_anh, video, lich_tiep_cong_dan, truy_na,
        nguoi_tot_viec_tot, chinh_sach_phap_luat, search, so_do_trang
      }`,
      {},
      { next: { revalidate: 86400 } }
    ),
    null
  );
}
