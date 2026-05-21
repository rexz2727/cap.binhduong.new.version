"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/constants/site";
import type { Announcement } from "@/types/announcement";
import MobileMenu from "./MobileMenu";
import NewsTicker from "./NewsTicker";

interface Props {
  announcements: Announcement[];
}

export default function Header({ announcements }: Props) {
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
    setTheme(savedTheme);
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
              <b>{SITE.hotline}</b>
            </span>
            <span className="sep">|</span>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
          </div>
          <div className="utility-right">
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
              href={SITE.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg className="ic-social">
                <use href="#i-fb" />
              </svg>
            </a>
            <a
              href={SITE.youtube || "#"}
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
            <Link
              href="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              data-nav="home"
              data-i18n="nav.home"
            >
              {t("nav.home", "Trang chủ")}
            </Link>
            <Link
              href="/gioi-thieu"
              className={`nav-link ${
                isActive("/gioi-thieu") ? "active" : ""
              }`}
              data-nav="about"
              data-i18n="nav.about"
            >
              {t("nav.about", "Giới thiệu")}
            </Link>
            <div className="nav-item">
              <Link
                href="/tin-tuc"
                className={`nav-link ${isActive("/tin-tuc") ? "active" : ""}`}
              >
                <span data-i18n="nav.news">{t("nav.news", "Tin tức")}</span>{" "}
                <svg className="chev">
                  <use href="#i-chev-down" />
                </svg>
              </Link>
              <div className="nav-dropdown">
                <Link href="/tin-tuc">
                  <svg className="ic">
                    <use href="#i-news" />
                  </svg>
                  Tất cả tin tức{" "}
                  <span className="sub">Mọi danh mục · 1.247 bài</span>
                </Link>
                <Link href="/tin-tuc?category=thong-bao">
                  <svg className="ic">
                    <use href="#i-doc" />
                  </svg>
                  Thông báo{" "}
                  <span className="sub">Thông báo chính thức · 286 bài</span>
                </Link>
                <Link href="/tin-tuc?category=canh-bao">
                  <svg className="ic">
                    <use href="#i-warn" />
                  </svg>
                  Cảnh báo{" "}
                  <span className="sub">An ninh, lừa đảo · 145 bài</span>
                </Link>
                <Link href="/tin-tuc?category=antt">
                  <svg className="ic">
                    <use href="#i-shield" />
                  </svg>
                  An ninh trật tự{" "}
                  <span className="sub">Tin nghiệp vụ · 412 bài</span>
                </Link>
              </div>
            </div>
            <Link
              href="/van-ban-phap-luat"
              className={`nav-link ${
                isActive("/van-ban-phap-luat") ? "active" : ""
              }`}
              data-nav="legal"
              data-i18n="nav.legal"
            >
              {t("nav.legal", "Văn bản")}
            </Link>
            <Link
              href="/thu-tuc-hanh-chinh"
              className={`nav-link ${
                isActive("/thu-tuc-hanh-chinh") ? "active" : ""
              }`}
              data-nav="procedures"
              data-i18n="nav.procedures"
            >
              {t("nav.procedures", "Thủ tục")}
            </Link>
            <Link
              href="/hoi-dap"
              className={`nav-link ${isActive("/hoi-dap") ? "active" : ""}`}
              data-nav="qna"
              data-i18n="nav.qna"
            >
              {t("nav.qna", "Hỏi đáp")}
            </Link>
            <div className="nav-item">
              <Link
                href="/thu-vien-anh"
                className={`nav-link ${
                  isActive("/thu-vien-anh") || isActive("/video") ? "active" : ""
                }`}
              >
                <span data-i18n="nav.gallery">
                  {t("nav.gallery", "Thư viện")}
                </span>{" "}
                <svg className="chev">
                  <use href="#i-chev-down" />
                </svg>
              </Link>
              <div className="nav-dropdown">
                <Link href="/thu-vien-anh">
                  <svg className="ic">
                    <use href="#i-image" />
                  </svg>
                  Thư viện ảnh{" "}
                  <span className="sub">Album hoạt động · 48 album</span>
                </Link>
                <Link href="/video">
                  <svg className="ic">
                    <use href="#i-news" />
                  </svg>
                  Video <span className="sub">Phim tài liệu · 6 video</span>
                </Link>
              </div>
            </div>
            <Link
              href="/lich-tiep-cong-dan"
              className={`nav-link ${
                isActive("/lich-tiep-cong-dan") ? "active" : ""
              }`}
              data-nav="schedule"
              data-i18n="nav.schedule"
            >
              {t("nav.schedule", "Lịch tiếp dân")}
            </Link>
            <Link
              href="/truy-na"
              className={`nav-link ${isActive("/truy-na") ? "active" : ""}`}
              data-nav="wanted"
              data-i18n="nav.wanted"
            >
              {t("nav.wanted", "Truy nã")}
            </Link>
            <Link
              href="/phan-anh"
              className="nav-cta-btn"
              data-nav="feedback"
              data-i18n="nav.cta"
            >
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
          <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        </div>
      </header>

      {/* 3. TIN TỨC KHẨN CẤP TICKER */}
      <NewsTicker items={announcements} />
    </>
  );
}
