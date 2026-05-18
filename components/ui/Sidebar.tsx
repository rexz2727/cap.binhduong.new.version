import Link from "next/link";
import { SITE } from "@/constants/site";

interface QuickLink {
  label: string;
  href: string;
  icon: string;
}

const QUICK_LINKS: QuickLink[] = [
  { label: "Thủ tục hành chính", href: "/thu-tuc-hanh-chinh", icon: "📋" },
  { label: "Văn bản pháp luật", href: "/van-ban-phap-luat", icon: "📄" },
  { label: "Hỏi đáp pháp luật", href: "/hoi-dap", icon: "💬" },
  { label: "Thư viện ảnh", href: "/thu-vien-anh", icon: "📷" },
  { label: "Video", href: "/video", icon: "🎬" },
  { label: "Lịch tiếp công dân", href: "/lich-tiep-cong-dan", icon: "📅" },
  { label: "Phản ánh trực tuyến", href: "/phan-anh", icon: "📢" },
];

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <div className="bg-police-red rounded-2xl p-5 text-white text-center">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">Đường dây khẩn cấp</p>
        <p className="text-4xl font-extrabold text-police-gold tracking-tight">{SITE.hotline}</p>
        <p className="text-xs opacity-70 mt-1">24/7 · Miễn phí</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Truy cập nhanh</h3>
        <ul className="space-y-1">
          {QUICK_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-police-red/5 hover:text-police-red transition-colors"
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm text-gray-600 space-y-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Liên hệ</h3>
        <p>📍 {SITE.address}</p>
        <p>📞 {SITE.phone}</p>
        <p>✉️ {SITE.email}</p>
        <p>🕐 {SITE.workingHours}</p>
      </div>
    </aside>
  );
}
