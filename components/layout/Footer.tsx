"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/constants/site";
import { NAV_ITEMS } from "@/constants/nav";
import { useI18n } from "@/lib/i18n";
import type { SiteSettings } from "@/types/siteSettings";

const RELATED_AGENCIES = [
  { label: "Công an TP. Hồ Chí Minh", href: "https://congan.hochiminhcity.gov.vn" },
  { label: "Bộ Công an", href: "https://bocongan.gov.vn" },
  { label: "Cổng DVC Quốc gia", href: "https://dichvucong.gov.vn" },
  { label: "VNeID", href: "https://vneid.gov.vn" },
  { label: "UBND phường Bình Dương", href: "#" },
];

const EMERGENCY_NUMBERS_FALLBACK = [
  { _key: "fire", label: "Cứu hỏa", number: "114" },
  { _key: "ambulance", label: "Cấp cứu", number: "115" },
  { _key: "electric", label: "Điện lực", number: "1900 6006" },
];

interface FooterProps {
  siteSettings?: SiteSettings | null;
}

export default function Footer({ siteSettings }: FooterProps = {}) {
  const { t } = useI18n();
  const relatedAgencies =
    siteSettings?.relatedAgencies && siteSettings.relatedAgencies.length > 0
      ? siteSettings.relatedAgencies
      : RELATED_AGENCIES;
  const emergencyNums =
    siteSettings?.emergencyNumbers && siteSettings.emergencyNumbers.length > 0
      ? siteSettings.emergencyNumbers
      : EMERGENCY_NUMBERS_FALLBACK;

  return (
    <footer className="site-footer">
      <div className="container site-footer-main">
        <div>
          <div className="footer-brand">
            <Image
              src="/logo/Cong_An_Hieu.jpg"
              alt="Công an hiệu"
              width={48}
              height={48}
              className="emblem-img"
            />
            <div className="brand-text">
              <span className="brand-line1 text-[var(--gold)]">Cổng thông tin chính thống</span>
              <span className="brand-line2">{siteSettings?.name ?? SITE.name}</span>
              <span className="brand-line3 text-white/60">Thành phố Hồ Chí Minh</span>
            </div>
          </div>
          <p className="footer-about">{siteSettings?.description ?? SITE.description}</p>
          <ul className="footer-contact-list list-none p-0 m-0">
            <li><svg className="ic"><use href="#i-pin" /></svg>{siteSettings?.address ?? SITE.address}</li>
            <li><svg className="ic"><use href="#i-phone" /></svg>{siteSettings?.phone ?? SITE.phone}</li>
            <li><svg className="ic"><use href="#i-mail" /></svg>{siteSettings?.email ?? SITE.email}</li>
            <li><svg className="ic"><use href="#i-clock" /></svg>{siteSettings?.workingHours ?? SITE.workingHours}</li>
          </ul>
        </div>

        <div>
          <h3 className="footer-h" data-i18n="footer.h.links">{t("footer.h.links", "Liên kết nhanh")}</h3>
          <ul className="footer-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-h" data-i18n="footer.h.agencies">{t("footer.h.agencies", "Cơ quan liên quan")}</h3>
          <ul className="footer-list">
            {relatedAgencies.map((agency) => (
              <li key={agency.label}>
                <a href={agency.href} target="_blank" rel="noopener noreferrer">
                  {agency.label}
                </a>
              </li>
            ))}
          </ul>

          <h3 className="footer-h mt-6" data-i18n="footer.h.social">{t("footer.h.social", "Theo dõi chúng tôi")}</h3>
          <div className="flex gap-2 mt-4">
            <a href={siteSettings?.facebook ?? SITE.facebook} className="footer-social-btn" aria-label="Facebook">
              <svg width="14" height="14"><use href="#i-fb" /></svg>
            </a>
            <a href={siteSettings?.youtube ?? SITE.youtube} className="footer-social-btn" aria-label="YouTube">
              <svg width="14" height="14"><use href="#i-yt" /></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="footer-h" data-i18n="footer.h.emergency">{t("footer.h.emergency", "Đường dây khẩn cấp")}</h3>
          <div className="footer-emergency">
            <div className="label">Phản ánh tội phạm 24/7</div>
            <div className="number">{siteSettings?.hotline ?? SITE.hotline}</div>
            <div className="sub">Gọi ngay khi có sự việc nguy cấp</div>
          </div>
          <div className="footer-other-nums">
            {emergencyNums.map((item) => (
              <div key={item._key}>{item.label}<b>{item.number}</b></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteSettings?.name ?? SITE.name}. Cổng thông tin điện tử chính thức.</span>
          <div className="flex gap-[18px]">
            <Link href="/so-do-trang">Sơ đồ trang</Link>
            <Link href="/chinh-sach-phap-luat">Chính sách bảo mật</Link>
            <a href="#">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
