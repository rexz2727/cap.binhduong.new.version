"use client";

import { useState, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { SITE } from "@/constants/site";
import { HEADER_NAV_ITEMS } from "@/constants/nav";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  hotline?: string;
}

export default function MobileMenu({ isOpen, onClose, hotline }: Props) {
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
          <div className="flex items-center gap-3">
            <div className="emblem w-9 h-9"></div>
            <div className="brand-text">
              <div className="brand-line2">{t("brand2", "Công an phường Bình Dương")}</div>
              <div className="text-[11px] opacity-65">{t("brand3", "TP. Hồ Chí Minh")}</div>
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
          {HEADER_NAV_ITEMS.map(item => {
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
                    <svg className={`chev${isOpen ? " rotate-180" : ""}`}><use href="#i-chev-down" /></svg>
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
            <b>{hotline ?? SITE.hotline}</b>
          </div>
        </div>
      </aside>
    </>
  );
}
