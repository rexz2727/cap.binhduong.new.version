"use client";

import { useState, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/constants/site";
import { NAV_ITEMS } from "@/constants/nav";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  const [newsOpen, setNewsOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  const handleLinkClick = () => {
    startTransition(() => {
      onClose();
    });
  };

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile drawer backdrop */}
      <div
        className={`mobile-drawer-backdrop ${isOpen ? "open" : ""}`}
        onClick={handleLinkClick}
      />

      {/* Mobile drawer */}
      <aside className={`mobile-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-head">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="emblem" style={{ width: "36px", height: "36px" }}></div>
            <div className="brand-text">
              <div className="brand-line2">{t("brand2", "Công an phường Bình Dương")}</div>
              <div style={{ fontSize: "11px", opacity: 0.65 }}>{t("brand3", "TP. Hồ Chí Minh")}</div>
            </div>
          </div>
          <button className="drawer-close" onClick={handleLinkClick} aria-label="Đóng menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="drawer-nav">
          {NAV_ITEMS.map(item => {
            if (item.children) {
              const isOpen = item.href === '/tin-tuc' ? newsOpen : galleryOpen;
              const setIsOpen = item.href === '/tin-tuc' ? setNewsOpen : setGalleryOpen;
              const isParentActive = item.children.some(child => isActive(child.href)) || isActive(item.href);

              return (
                <div key={item.href}>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`drawer-nav-item ${isParentActive ? "active" : ""}`}
                  >
                    {item.label}
                    <svg className="chev" style={{ transform: isOpen ? 'rotate(180deg)' : ''}}><use href="#i-chev-down" /></svg>
                  </button>
                  <div
                    className="drawer-sub"
                    style={isOpen ? undefined : { display: "none" }}
                  >
                    {item.children.map(child => (
                      <Link href={child.href} key={child.href} onClick={handleLinkClick}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
            return (
              <Link
                href={item.href}
                key={item.href}
                onClick={handleLinkClick}
                className={`drawer-nav-item ${isActive(item.href) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link href="/phan-anh" onClick={handleLinkClick} className="drawer-cta">
          <svg width="16" height="16"><use href="#i-megaphone"/></svg>
          {t("nav.cta", "Gửi phản ánh ngay")}
        </Link>

        <div className="drawer-foot">
          Đường dây nóng 24/7
          <div className="hotline-big">
            <span>Khẩn cấp</span>
            <b>{SITE.hotline}</b>
          </div>
        </div>
      </aside>
    </>
  );
}
