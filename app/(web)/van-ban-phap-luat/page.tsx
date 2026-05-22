import type { Metadata } from "next";
import Link from "next/link";
import { getLegalDocuments } from "@/sanity/lib/queries";
import LegalDocCard from "@/components/ui/LegalDocCard";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Văn bản pháp luật",
  description: "Thư viện văn bản pháp luật — Nghị quyết, Quyết định, Kế hoạch, Thông tư đang có hiệu lực.",
};

const CATEGORIES = [
  { value: "", label: "Tất cả" },
  { value: "nghi-quyet", label: "Nghị quyết" },
  { value: "quyet-dinh", label: "Quyết định" },
  { value: "ke-hoach", label: "Kế hoạch" },
  { value: "thong-tu", label: "Thông tư" },
  { value: "khac", label: "Khác" },
];

export default async function LegalDocsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const docs = await getLegalDocuments(category);

  return (
    <>
      <PageHeader
        title="Văn bản pháp luật"
        breadcrumbs={[{ label: "Văn bản pháp luật" }]}
        description="Thư viện văn bản pháp luật — Nghị quyết, Quyết định, Kế hoạch, Thông tư đang có hiệu lực."
      />

      <section className="block">
        <div className="container">
          <div className="filter-row">
            {CATEGORIES.map((cat) => {
              const isActive = (cat.value === "" && !category) || cat.value === category;
              return (
                <Link
                  key={cat.value}
                  href={cat.value ? `/van-ban-phap-luat?category=${cat.value}` : "/van-ban-phap-luat"}
                  className={isActive ? "chip active" : "chip"}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          {docs.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--muted)", padding: "64px 0" }}>
              Chưa có văn bản nào.
            </p>
          ) : (
            <div className="doc-grid">
              {docs.map((doc) => (
                <LegalDocCard key={doc._id} doc={doc} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
