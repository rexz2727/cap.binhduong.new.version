import Link from "next/link";
import { SITE } from "@/constants/site";
import { NAV_ITEMS } from "@/constants/nav";

const RELATED_AGENCIES = [
  { label: "Công an TP. Hồ Chí Minh", href: "https://congan.hochiminhcity.gov.vn" },
  { label: "Bộ Công an", href: "https://bocongan.gov.vn" },
  { label: "Cổng DVCQG", href: "https://dichvucong.gov.vn" },
  { label: "VNeID", href: "https://vneid.gov.vn" },
  { label: "UBND phường Bình Dương", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-police-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Cột 1: Thông tin đơn vị */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-police-gold rounded-full flex items-center justify-center font-extrabold text-police-red text-sm">
              CA
            </div>
            <h3 className="font-bold text-police-gold leading-tight text-sm">{SITE.name}</h3>
          </div>
          <p className="text-sm text-blue-200 leading-relaxed mb-4">{SITE.description}</p>
          <div className="space-y-1.5 text-sm text-blue-300">
            <p>📍 {SITE.address}</p>
            <p>📞 {SITE.phone}</p>
            <p>✉️ {SITE.email}</p>
            <p>🕐 {SITE.workingHours}</p>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.022 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.795-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.928-1.956 1.879v2.256h3.328l-.532 3.49h-2.796v8.437C19.612 23.095 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a
              href={SITE.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </a>
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

        {/* Cột 3: Cơ quan liên quan */}
        <div>
          <h3 className="font-bold text-police-gold mb-4 text-sm uppercase tracking-wider">Cơ quan liên quan</h3>
          <ul className="space-y-2">
            {RELATED_AGENCIES.map((agency) => (
              <li key={agency.label}>
                <a
                  href={agency.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-300 hover:text-white transition-colors duration-150 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all duration-150" />
                  {agency.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <h3 className="font-bold text-police-gold mb-2 text-sm uppercase tracking-wider">Sơ đồ trang</h3>
            <Link href="/so-do-trang" className="text-sm text-blue-300 hover:text-white transition-colors">
              Xem sơ đồ trang →
            </Link>
          </div>
        </div>

        {/* Cột 4: Khẩn cấp */}
        <div>
          <h3 className="font-bold text-police-gold mb-4 text-sm uppercase tracking-wider">Đường dây khẩn cấp</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <p className="text-6xl font-extrabold text-police-gold mb-2 tracking-tight">{SITE.hotline}</p>
            <p className="text-xs text-blue-300">Phản ánh tội phạm 24/7</p>
          </div>
          <div className="mt-4 space-y-2 text-sm text-blue-300">
            <p>🚒 Cứu hỏa: <strong className="text-white">114</strong></p>
            <p>🚑 Cấp cứu: <strong className="text-white">115</strong></p>
            <p>⚡ Điện lực: <strong className="text-white">1900 6006</strong></p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-4">
        <p className="text-center text-xs text-blue-400">
          © {new Date().getFullYear()} {SITE.name} — Phát triển bởi{" "}
          <span className="text-police-gold font-medium">Rex Nguyen</span>
          {" "}·{" "}
          <Link href="/so-do-trang" className="hover:text-white transition-colors">
            Sơ đồ trang
          </Link>
        </p>
      </div>
    </footer>
  );
}
