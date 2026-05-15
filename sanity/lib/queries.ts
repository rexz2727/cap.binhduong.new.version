import { groq } from "next-sanity";
import { client } from "./client";
import type { NewsPost, NewsPostPreview } from "@/types/news";
import type { LegalDocument, LegalDocumentPreview } from "@/types/legalDocument";
import type { Personnel } from "@/types/personnel";
import type { Procedure } from "@/types/procedure";

// ─── News ─────────────────────────────────────────────────────────────────────

export async function getLatestNews(limit = 6): Promise<NewsPostPreview[]> {
  return client.fetch(
    groq`*[_type == "newsPost"] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, publishedAt, excerpt, mainImage, category
    }`,
    { limit },
    { next: { revalidate: 300 } }
  );
}

export async function getNewsByCategory(category: string, limit = 20): Promise<NewsPostPreview[]> {
  return client.fetch(
    groq`*[_type == "newsPost" && category == $category] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, publishedAt, excerpt, mainImage, category
    }`,
    { category, limit },
    { next: { revalidate: 300 } }
  );
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  return client.fetch(
    groq`*[_type == "newsPost" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, excerpt, mainImage, category, body
    }`,
    { slug },
    { next: { revalidate: 600 } }
  );
}

// ─── Legal Documents ──────────────────────────────────────────────────────────

export async function getLegalDocuments(category?: string): Promise<LegalDocumentPreview[]> {
  const filter = category
    ? groq`*[_type == "legalDocument" && category == $category]`
    : groq`*[_type == "legalDocument"]`;
  return client.fetch(
    groq`${filter} | order(issuedDate desc) { _id, title, slug, documentNumber, issuedDate, category, issuingBody }`,
    { category: category ?? "" },
    { next: { revalidate: 3600 } }
  );
}

export async function getLegalDocBySlug(slug: string): Promise<LegalDocument | null> {
  return client.fetch(
    groq`*[_type == "legalDocument" && slug.current == $slug][0]`,
    { slug },
    { next: { revalidate: 3600 } }
  );
}

// ─── Personnel ────────────────────────────────────────────────────────────────

export async function getPersonnel(): Promise<Personnel[]> {
  return client.fetch(
    groq`*[_type == "personnel"] | order(order asc) { _id, fullName, rank, position, unit, photo, order }`,
    {},
    { next: { revalidate: 86400 } }
  );
}

// ─── Procedures ───────────────────────────────────────────────────────────────

export async function getProcedures(category?: string): Promise<Procedure[]> {
  const filter = category
    ? groq`*[_type == "procedure" && category == $category]`
    : groq`*[_type == "procedure"]`;
  return client.fetch(
    groq`${filter} | order(title asc) { _id, title, slug, category, processingTime, fee }`,
    { category: category ?? "" },
    { next: { revalidate: 3600 } }
  );
}

export async function getProcedureBySlug(slug: string): Promise<Procedure | null> {
  return client.fetch(
    groq`*[_type == "procedure" && slug.current == $slug][0]`,
    { slug },
    { next: { revalidate: 3600 } }
  );
}
