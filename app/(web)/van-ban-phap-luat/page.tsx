import type { Metadata } from "next";
import Link from "next/link";
import { getLegalDocuments, getPageContent } from "@/sanity/lib/queries";
import LegalDocCard from "@/components/ui/LegalDocCard";
import PageHeader from "@/components/ui/PageHeader";
import { LEGAL_CATEGORY_OPTIONS } from "@/constants/legal";

export const metadata: Metadata = {
  title: "Văn bản pháp luật",
  description: "Thư viện văn bản pháp luật — Nghị quyết, Quyết định, Kế hoạch, Thông tư đang có hiệu lực.",
};

const CATEGORIES = [
  { value: "", label: "Tất cả" },
  ...LEGAL_CATEGORY_OPTIONS,
];

export default async function LegalDocsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [docs, pageContent] = await Promise.all([
    getLegalDocuments(category),
    getPageContent(),
  ]);

  return (
    <>
      <PageHeader
        title="Văn bản pháp luật"
        breadcrumbs={[{ label: "Văn bản pháp luật" }]}
        description={pageContent?.van_ban_phap_luat ?? "Thư viện văn bản pháp luật — Nghị quyết, Quyết định, Kế hoạch, Thông tư đang có hiệu lực."}
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
            <p className="text-center text-[var(--muted)] py-16">
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
