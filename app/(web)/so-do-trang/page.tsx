import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Sơ đồ trang | Công an phường Bình Dương",
  description: "Sơ đồ tổng thể các trang của cổng thông tin Công an phường Bình Dương.",
};

const SITEMAP = [
  {
    section: "Trang chính",
    links: [
      { label: "Trang chủ", href: "/" },
      { label: "Sơ đồ trang", href: "/so-do-trang" },
    ],
  },
  {
    section: "Giới thiệu",
    links: [
      { label: "Giới thiệu đơn vị", href: "/gioi-thieu" },
    ],
  },
  {
    section: "Tin tức & Sự kiện",
    links: [
      { label: "Tất cả tin tức", href: "/tin-tuc" },
      { label: "Thông báo", href: "/tin-tuc?category=thong-bao" },
      { label: "Cảnh báo", href: "/tin-tuc?category=canh-bao" },
      { label: "Điển hình tiên tiến", href: "/tin-tuc?category=dien-hinh" },
    ],
  },
  {
    section: "Pháp luật & Văn bản",
    links: [
      { label: "Văn bản pháp luật", href: "/van-ban-phap-luat" },
      { label: "Chính sách pháp luật (Dự thảo)", href: "/chinh-sach-phap-luat" },
    ],
  },
  {
    section: "Thủ tục hành chính",
    links: [
      { label: "Tất cả thủ tục", href: "/thu-tuc-hanh-chinh" },
      { label: "Cư trú", href: "/thu-tuc-hanh-chinh?category=cu-tru" },
      { label: "CCCD / CMND", href: "/thu-tuc-hanh-chinh?category=cmnd-cccd" },
      { label: "Xe cộ", href: "/thu-tuc-hanh-chinh?category=xe-co" },
    ],
  },
  {
    section: "Hỏi đáp pháp luật",
    links: [
      { label: "Câu hỏi thường gặp", href: "/hoi-dap" },
      { label: "Gửi câu hỏi", href: "/hoi-dap/gui-cau-hoi" },
    ],
  },
  {
    section: "Thư viện",
    links: [
      { label: "Thư viện ảnh", href: "/thu-vien-anh" },
      { label: "Video", href: "/video" },
    ],
  },
  {
    section: "Công dân",
    links: [
      { label: "Lịch tiếp công dân", href: "/lich-tiep-cong-dan" },
      { label: "Gửi phản ánh / Kiến nghị", href: "/phan-anh" },
      { label: "Thông báo truy nã", href: "/truy-na" },
    ],
  },
];

export default function SoDoTrangPage() {
  return (
    <>
      <PageHeader
        title="Sơ đồ trang"
        breadcrumbs={[{ label: "Sơ đồ trang" }]}
        description="Danh mục toàn bộ các trang trên cổng thông tin"
      />
      <section className="block">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITEMAP.map((group) => (
              <div key={group.section} className="aside-card">
                <h4>{group.section}</h4>
                <div className="aside-list">
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
