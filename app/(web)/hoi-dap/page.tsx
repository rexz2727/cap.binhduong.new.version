import type { Metadata } from "next";
import { getQnaAnswered } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import QnaCard from "@/components/ui/QnaCard";
import Sidebar from "@/components/ui/Sidebar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hỏi đáp pháp luật | Công an phường Bình Dương",
  description: "Giải đáp thắc mắc pháp luật về cư trú, CCCD, VNeID, xe máy và thủ tục hành chính.",
};

const CATEGORIES = [
  { value: "all", label: "Tất cả" },
  { value: "cu-tru", label: "Cư trú" },
  { value: "cccd", label: "CCCD" },
  { value: "vneid", label: "VNeID" },
  { value: "xe-may", label: "Xe máy" },
  { value: "hanh-chinh", label: "Hành chính" },
  { value: "khac", label: "Khác" },
];

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function HoiDapPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const items = await getQnaAnswered(category ?? "all", 50);

  return (
    <>
      <PageHeader
        title="Hỏi đáp pháp luật"
        breadcrumbs={[{ label: "Hỏi đáp" }]}
        description="Tổng hợp câu hỏi thường gặp và giải đáp của cán bộ Công an phường Bình Dương"
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.value}
                  href={cat.value === "all" ? "/hoi-dap" : `/hoi-dap?category=${cat.value}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    (cat.value === "all" && !category) || cat.value === category
                      ? "bg-police-red text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-police-navy text-sm">Chưa tìm thấy câu trả lời?</p>
                <p className="text-xs text-gray-500 mt-0.5">Gửi câu hỏi — sẽ được trả lời trong 1–3 ngày làm việc.</p>
              </div>
              <Link
                href="/hoi-dap/gui-cau-hoi"
                className="shrink-0 bg-police-red hover:bg-police-red-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Gửi câu hỏi
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">💬</p>
                <p>Chưa có câu hỏi nào trong danh mục này.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((qna) => (
                  <QnaCard key={qna._id} qna={qna} />
                ))}
              </div>
            )}
          </main>

          <div className="w-full lg:w-72 shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
