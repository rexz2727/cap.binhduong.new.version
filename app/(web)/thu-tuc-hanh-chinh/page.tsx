import type { Metadata } from "next";
import Link from "next/link";
import { getProcedures } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Thủ tục hành chính",
  description: "Hướng dẫn thủ tục hành chính về cư trú, CCCD và phương tiện",
};

const CATEGORIES = [
  { value: "", label: "Tất cả" },
  { value: "cu-tru", label: "Cư trú" },
  { value: "cmnd-cccd", label: "CMND/CCCD" },
  { value: "xe-co", label: "Phương tiện" },
  { value: "khac", label: "Khác" },
];

export default async function ProceduresPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const procedures = await getProcedures(category);

  return (
    <>
      <PageHeader
        title="Thủ tục Hành chính"
        breadcrumbs={[{ label: "Thủ tục hành chính" }]}
        description="Hướng dẫn chi tiết các thủ tục hành chính tại Công an phường"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = (cat.value === "" && !category) || cat.value === category;
            return (
              <a
                key={cat.value}
                href={
                  cat.value
                    ? `/thu-tuc-hanh-chinh?category=${cat.value}`
                    : "/thu-tuc-hanh-chinh"
                }
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

        {procedures.length === 0 ? (
          <p className="text-center text-gray-500 py-16">Chưa có thủ tục nào.</p>
        ) : (
          <div className="space-y-4">
            {procedures.map((proc) => (
              <div
                key={proc._id}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:border-police-red hover:shadow-sm transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge category={proc.category} />
                    </div>
                    <Link href={`/thu-tuc-hanh-chinh/${proc.slug.current}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-police-red">
                        {proc.title}
                      </h3>
                    </Link>
                  </div>
                  <div className="text-sm text-right text-gray-500">
                    <p>Thời gian: <strong>{proc.processingTime}</strong></p>
                    <p>Lệ phí: <strong>{proc.fee}</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
