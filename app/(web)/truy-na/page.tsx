import type { Metadata } from "next";
import Link from "next/link";
import { getWantedPersons } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import WantedCard from "@/components/ui/WantedCard";

export const metadata: Metadata = {
  title: "Truy nã | Công an phường Bình Dương",
  description: "Danh sách đối tượng đang bị truy nã của Công an phường Bình Dương.",
};

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function TruyNaPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const activeStatus = status === "da-bat" ? "da-bat" : "dang-truy-na";
  const persons = await getWantedPersons(activeStatus);

  return (
    <>
      <PageHeader
        title="Thông báo truy nã"
        breadcrumbs={[{ label: "Truy nã" }]}
        description="Danh sách các đối tượng đang bị truy nã theo thông báo của cơ quan điều tra"
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-8 flex gap-3">
          <span className="text-yellow-600 text-xl">⚠️</span>
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-0.5">Lưu ý quan trọng</p>
            <p>
              Nếu phát hiện các đối tượng này, vui lòng liên hệ ngay Công an phường Bình Dương
              hoặc gọi số <strong>113</strong>. Không tự ý tiếp cận khi chưa có lực lượng hỗ trợ.
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Link
            href="/truy-na"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeStatus === "dang-truy-na"
                ? "bg-police-red text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Đang truy nã
          </Link>
          <Link
            href="/truy-na?status=da-bat"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeStatus === "da-bat"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Đã bắt được
          </Link>
        </div>

        {persons.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-3">🔍</p>
            <p>Không có đối tượng nào trong danh sách này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {persons.map((person) => (
              <WantedCard key={person._id} person={person} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
