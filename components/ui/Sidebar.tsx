import Link from "next/link";
import { SITE } from "@/constants/site";
import { getSiteSettings } from "@/sanity/lib/queries";

const QUICK_LINKS = [
  { label: "Thủ tục hành chính", href: "/thu-tuc-hanh-chinh" },
  { label: "Văn bản pháp luật", href: "/van-ban-phap-luat" },
  { label: "Hỏi đáp pháp luật", href: "/hoi-dap" },
  { label: "Thư viện ảnh", href: "/thu-vien-anh" },
  { label: "Video", href: "/video" },
  { label: "Lịch tiếp công dân", href: "/lich-tiep-cong-dan" },
  { label: "Phản ánh trực tuyến", href: "/phan-anh" },
];

export default async function Sidebar() {
  const siteSettings = await getSiteSettings();
  const address = siteSettings?.address ?? SITE.address;
  const phone = siteSettings?.phone ?? SITE.phone;
  const email = siteSettings?.email ?? SITE.email;
  const workingHours = siteSettings?.workingHours ?? SITE.workingHours;

  return (
    <aside>
      <div className="aside-card">
        <h4>Truy cập nhanh</h4>
        <div className="aside-list">
          {QUICK_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </div>
      </div>

      <div className="aside-card">
        <h4>Liên hệ</h4>
        <div className="aside-list">
          <a href="#">{address}</a>
          <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <a href="#">{workingHours}</a>
        </div>
      </div>
    </aside>
  );
}
