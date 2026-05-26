"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/constants/site";
import { HEADER_NAV_ITEMS, UTILITY_ACTIONS } from "@/constants/nav";
import type { Announcement } from "@/types/announcement";
import type { SiteSettings } from "@/types/siteSettings";
import MobileMenu from "./MobileMenu";
import NewsTicker from "./NewsTicker";

interface Props {
  announcements: Announcement[];
  siteSettings?: SiteSettings | null;
}

export default function Header({ announcements, siteSettings }: Props) {
  const hotline = siteSettings?.hotline ?? SITE.hotline;
  const phone = siteSettings?.phone ?? SITE.phone;
  const facebook = siteSettings?.facebook ?? SITE.facebook;
  const youtube = siteSettings?.youtube ?? SITE.youtube;
  const { lang, toggleLang, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [clockText, setClockText] = useState("--:--:--");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Theme Sync on Mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTimeout(() => {
      setTheme(savedTheme);
    }, 0);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Theme Toggler
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    startTransition(() => {
      setTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  };

  // Clock Ticker
  useEffect(() => {
    function tickClock() {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setClockText(
        `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} · ${pad(d.getDate())}/${pad(
          d.getMonth() + 1
        )}/${d.getFullYear()}`
      );
    }
    tickClock();
    const interval = setInterval(tickClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* 1. UTILITY BAR */}
      <div className="utility-bar">
        <div className="container">
          <div className="utility-left">
            <span className="hotline">
              <span data-i18n="hotline">{t("hotline", "Đường dây nóng:")}</span>{" "}
              <b>{hotline}</b>
            </span>
            <span className="sep">|</span>
            <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
          </div>
          <div className="utility-right">
            {UTILITY_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`util-action${action.highlight ? " highlight" : ""}`}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use href={action.icon} />
                </svg>
                {action.label}
              </Link>
            ))}
            <span className="sep">|</span>
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="util-btn"
              aria-label="Đổi ngôn ngữ"
              title="Đổi ngôn ngữ"
            >
              <svg className="ic-social" viewBox="0 0 24 24">
                <use href="#i-globe" />
              </svg>
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="util-btn"
              aria-label="Đổi giao diện"
              title="Sáng / Tối"
            >
              <svg className="ic-social" id="themeIcon">
                <use href={theme === "dark" ? "#i-sun" : "#i-moon"} />
              </svg>
            </button>

            <span className="sep">|</span>
            <span className="clock">{clockText}</span>
            <span className="sep">|</span>

            {/* Social Icons */}
            <a
              href={facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg className="ic-social">
                <use href="#i-fb" />
              </svg>
            </a>
            <a
              href={youtube || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg className="ic-social">
                <use href="#i-yt" />
              </svg>
            </a>
          </div>

        </div>
      </div>
      {/* 2. MAIN NAV BAR */}
      <header className="main-bar">
        <div className="container">
          <Link href="/" className="brand" data-nav="home">
            <Image
              src="/logo/Cong_An_Hieu.jpg"
              alt="Công an hiệu"
              width={48}
              height={48}
              className="emblem-img"
              priority
            />
            <div className="brand-text">
              <span className="brand-line1" data-i18n="brand1">
                {t("brand1", "Cộng hòa Xã hội Chủ nghĩa Việt Nam")}
              </span>
              <span className="brand-line2" data-i18n="brand2">
                {t("brand2", "Công an phường Bình Dương")}
              </span>
              <span className="brand-line3" data-i18n="brand3">
                {t("brand3", "Thành phố Hồ Chí Minh")}
              </span>
            </div>
          </Link>
          <nav className="nav-primary">
            {HEADER_NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <div key={item.href} className="nav-item">
                    <Link
                      href={item.href}
                      className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                    >
                      <span>{item.label}</span>{" "}
                      <svg className="chev"><use href="#i-chev-down" /></svg>
                    </Link>
                    <div className="nav-dropdown">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/phan-anh" className="nav-cta-btn" data-nav="feedback">
              {t("nav.cta", "Phản ánh ngay")}
            </Link>
            <button
              className="search-icon-btn"
              aria-label="Tìm kiếm"
              onClick={() => router.push("/search")}
            >
              <svg width="16" height="16">
                <use href="#i-search" />
              </svg>
            </button>
          </nav>
          <button className="menu-btn" onClick={toggleMobileMenu} aria-label="Mở menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} hotline={hotline} />
        </div>
      </header>

      {/* 3. TIN TỨC KHẨN CẤP TICKER */}
      <NewsTicker items={announcements} />
    </>
  );
}
