import Link from "next/link";
import { NAV_ITEMS } from "@/constants/nav";
import { SITE } from "@/constants/site";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="bg-police-red text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-police-red-dark/80 py-1.5 px-4 text-xs text-center border-b border-white/10">
        <span className="opacity-80">Đường dây nóng:</span>{" "}
        <strong className="text-police-gold text-sm">{SITE.hotline}</strong>
        <span className="mx-2 opacity-40">|</span>
        <span className="opacity-80">{SITE.phone}</span>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-police-gold rounded-full flex items-center justify-center font-extrabold text-police-red text-sm shadow-md group-hover:scale-105 transition-transform">
            CA
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-sm leading-tight tracking-wide">{SITE.name}</p>
            <p className="text-xs opacity-70">{SITE.address}</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-white/15 transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/phan-anh"
            className="ml-2 bg-white text-police-red font-semibold text-sm px-4 py-2 rounded-lg hover:bg-police-gold transition-colors duration-150 shadow-sm"
          >
            Phản ánh ngay
          </Link>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
