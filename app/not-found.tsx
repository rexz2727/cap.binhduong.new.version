import Link from "next/link";
import { SITE } from "@/constants/site";

const QUICK_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Thủ tục hành chính", href: "/thu-tuc-hanh-chinh" },
  { label: "Phản ánh trực tuyến", href: "/phan-anh" },
  { label: "Hỏi đáp", href: "/hoi-dap" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[var(--bg)]">
      <span className="text-8xl font-black tracking-tight select-none text-navy mb-6">
        404
      </span>

      <h1 className="text-xl font-bold text-navy mb-2">Trang không tồn tại</h1>
      <p className="text-muted text-sm max-w-sm mb-8">
        Địa chỉ bạn truy cập không tìm thấy hoặc đã được di chuyển. Vui lòng
        kiểm tra lại đường dẫn.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {QUICK_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="chip">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-red px-6 py-4 text-sm bg-[var(--red-soft)] text-[var(--red-deep)]">
        <p className="font-semibold mb-0.5">Cần hỗ trợ khẩn cấp?</p>
        <p>
          Gọi ngay{" "}
          <a href="tel:113" className="font-black text-lg underline-offset-2 hover:underline">
            113
          </a>{" "}
          — {SITE.name}
        </p>
      </div>
    </div>
  );
}
