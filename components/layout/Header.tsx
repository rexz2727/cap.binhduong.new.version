import Link from "next/link";
import { NAV_ITEMS } from "@/constants/nav";
import { SITE } from "@/constants/site";
import { getActiveAnnouncements } from "@/sanity/lib/queries";
import MobileMenu from "./MobileMenu";
import NewsTicker from "./NewsTicker";
import LiveClock from "@/components/LiveClock";

export default async function Header() {
  const announcements = await getActiveAnnouncements();

  return (
    <header className="bg-police-red text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-police-red-dark/80 py-1.5 px-4 text-xs flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="opacity-80">Đường dây nóng:</span>{" "}
          <strong className="text-police-gold text-sm">{SITE.hotline}</strong>
          <span className="mx-1 opacity-40">|</span>
          <span className="opacity-80 hidden sm:inline">{SITE.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <LiveClock />
          <a
            href={SITE.facebook ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.022 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.795-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.928-1.956 1.879v2.256h3.328l-.532 3.49h-2.796v8.437C19.612 23.095 24 18.1 24 12.073z"/>
            </svg>
          </a>
          <a
            href={SITE.youtube ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
            </svg>
          </a>
        </div>
      </div>

      <NewsTicker items={announcements} />

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

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-white/15 transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
