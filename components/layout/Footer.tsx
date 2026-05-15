import Link from "next/link";
import { SITE } from "@/constants/site";
import { NAV_ITEMS } from "@/constants/nav";

export default function Footer() {
  return (
    <footer className="bg-police-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Cột 1: Thông tin đơn vị */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-police-gold rounded-full flex items-center justify-center font-extrabold text-police-red text-sm">
              CA
            </div>
            <h3 className="font-bold text-police-gold leading-tight">{SITE.name}</h3>
          </div>
          <p className="text-sm text-blue-200 leading-relaxed mb-4">{SITE.description}</p>
          <div className="space-y-1.5 text-sm text-blue-300">
            <p>📍 {SITE.address}</p>
            <p>📞 {SITE.phone}</p>
            <p>✉️ {SITE.email}</p>
            <p>🕐 {SITE.workingHours}</p>
          </div>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h3 className="font-bold text-police-gold mb-4 text-sm uppercase tracking-wider">Liên kết nhanh</h3>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-blue-300 hover:text-white transition-colors duration-150 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-police-gold rounded-full group-hover:w-2 transition-all duration-150" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Khẩn cấp */}
        <div>
          <h3 className="font-bold text-police-gold mb-4 text-sm uppercase tracking-wider">Đường dây khẩn cấp</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <p className="text-6xl font-extrabold text-police-gold mb-2 tracking-tight">{SITE.hotline}</p>
            <p className="text-xs text-blue-300 mb-4">Phản ánh tội phạm 24/7</p>
            <Link
              href="/phan-anh"
              className="block bg-police-red hover:bg-police-red-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150"
            >
              Gửi phản ánh trực tuyến →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-4">
        <p className="text-center text-xs text-blue-400">
          © {new Date().getFullYear()} {SITE.name} — Phát triển bởi{" "}
          <span className="text-police-gold font-medium">Rex Nguyen</span>
        </p>
      </div>
    </footer>
  );
}
