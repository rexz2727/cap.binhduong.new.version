import type { Metadata } from "next";
import { getLegalDocuments } from "@/sanity/lib/queries";
import LegalDocCard from "@/components/ui/LegalDocCard";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Văn bản pháp luật",
  description: "Thư viện văn bản pháp luật, nghị quyết và kế hoạch triển khai",
};

const CATEGORIES = [
  { value: "", label: "Tất cả" },
  { value: "nghi-quyet", label: "Nghị quyết" },
  { value: "ke-hoach", label: "Kế hoạch" },
  { value: "quyet-dinh", label: "Quyết định" },
  { value: "thong-tu", label: "Thông tư" },
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
        title="Văn bản Pháp luật"
        breadcrumbs={[{ label: "Văn bản pháp luật" }]}
        description="Nghị quyết 57, Đề án 06 và các văn bản pháp lý liên quan"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = (cat.value === "" && !category) || cat.value === category;
            return (
              <a
                key={cat.value}
                href={cat.value ? `/van-ban-phap-luat?category=${cat.value}` : "/van-ban-phap-luat"}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  isActive
                    ? "bg-police-red text-white border-police-red"
                    : "text-gray-600 border-gray-300 hover:border-police-red hover:text-police-red"
                }`}
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {docs.length === 0 ? (
          <p className="text-center text-gray-500 py-16">Chưa có văn bản nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {docs.map((doc) => (
              <LegalDocCard key={doc._id} doc={doc} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
