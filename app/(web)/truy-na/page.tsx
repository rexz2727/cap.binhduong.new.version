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
        breadcrumbs={[{ label: "Thông báo truy nã" }]}
        description="Danh sách các đối tượng đang bị truy nã theo thông báo của cơ quan điều tra."
      />
      <section className="block">
        <div className="container">
          <div className="wanted-banner">
            <svg>
              <use href="#i-warn" />
            </svg>
            <div>
              <div className="t">Lưu ý an toàn — Không tự ý tiếp cận đối tượng</div>
              <div className="s">
                Nếu phát hiện các đối tượng này, vui lòng <b>gọi ngay 113</b> hoặc liên hệ Công an phường Bình Dương theo số <b>0274 3515 097</b>. Mọi thông tin tố giác đều được bảo mật theo Luật Tố cáo 2018.
              </div>
            </div>
          </div>

          <div className="filter-row">
            <Link
              href="/truy-na"
              className={`chip${activeStatus === "dang-truy-na" ? " active" : ""}`}
            >
              Đang truy nã
            </Link>
            <Link
              href="/truy-na?status=da-bat"
              className={`chip${activeStatus === "da-bat" ? " active" : ""}`}
            >
              Đã bắt được
            </Link>
          </div>

          {persons.length === 0 ? (
            <p style={{ color: "var(--subtle)", textAlign: "center", padding: "64px 0" }}>
              Không có đối tượng nào trong danh sách này.
            </p>
          ) : (
            <div className="wanted-grid">
              {persons.map((person) => (
                <WantedCard key={person._id} person={person} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
