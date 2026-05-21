import Link from "next/link";
import { SITE } from "@/constants/site";
import { NAV_ITEMS } from "@/constants/nav";

const RELATED_AGENCIES = [
  { label: "Công an TP. Hồ Chí Minh", href: "https://congan.hochiminhcity.gov.vn" },
  { label: "Bộ Công an", href: "https://bocongan.gov.vn" },
  { label: "Cổng DVC Quốc gia", href: "https://dichvucong.gov.vn" },
  { label: "VNeID", href: "https://vneid.gov.vn" },
  { label: "UBND phường Bình Dương", href: "#" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-main">
        <div>
          <div className="footer-brand">
            <div className="emblem"></div>
            <div className="brand-text">
              <span className="brand-line1" style={{ color: "var(--gold)" }}>Cổng thông tin chính thống</span>
              <span className="brand-line2">{SITE.name}</span>
              <span className="brand-line3" style={{ color: "rgba(255,255,255,0.6)" }}>Thành phố Hồ Chí Minh</span>
            </div>
          </div>
          <p className="footer-about">{SITE.description}</p>
          <ul className="footer-contact-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><svg className="ic"><use href="#i-pin" /></svg>{SITE.address}</li>
            <li><svg className="ic"><use href="#i-phone" /></svg>{SITE.phone}</li>
            <li><svg className="ic"><use href="#i-mail" /></svg>{SITE.email}</li>
            <li><svg className="ic"><use href="#i-clock" /></svg>{SITE.workingHours}</li>
          </ul>
        </div>

        <div>
          <h3 className="footer-h" data-i18n="footer.h.links">Liên kết nhanh</h3>
          <ul className="footer-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-h" data-i18n="footer.h.agencies">Cơ quan liên quan</h3>
          <ul className="footer-list">
            {RELATED_AGENCIES.map((agency) => (
              <li key={agency.label}>
                <a href={agency.href} target="_blank" rel="noopener noreferrer">
                  {agency.label}
                </a>
              </li>
            ))}
          </ul>

          <h3 className="footer-h" style={{ marginTop: "24px" }} data-i18n="footer.h.social">Theo dõi chúng tôi</h3>
          <div style={{ display: "flex", gap: "8px" }}>
            <a href={SITE.facebook} style={{ width: "36px", height: "36px", display: "grid", placeItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "rgba(255,255,255,0.85)" }} aria-label="Facebook">
              <svg width="14" height="14"><use href="#i-fb" /></svg>
            </a>
            <a href={SITE.youtube} style={{ width: "36px", height: "36px", display: "grid", placeItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "rgba(255,255,255,0.85)" }} aria-label="YouTube">
              <svg width="14" height="14"><use href="#i-yt" /></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="footer-h" data-i18n="footer.h.emergency">Đường dây khẩn cấp</h3>
          <div className="footer-emergency">
            <div className="label">Phản ánh tội phạm 24/7</div>
            <div className="number">{SITE.hotline}</div>
            <div className="sub">Gọi ngay khi có sự việc nguy cấp</div>
          </div>
          <div className="footer-other-nums">
            <div>Cứu hỏa<b>114</b></div>
            <div>Cấp cứu<b>115</b></div>
            <div>Điện lực<b>1900 6006</b></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.name}. Cổng thông tin điện tử chính thức.</span>
          <div style={{ display: "flex", gap: "18px" }}>
            <Link href="/so-do-trang">Sơ đồ trang</Link>
            <Link href="/chinh-sach-phap-luat">Chính sách bảo mật</Link>
            <a href="#">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
