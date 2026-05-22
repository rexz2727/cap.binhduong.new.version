"use client";

import { useI18n } from "@/lib/i18n";
import HeroSearch from "./HeroSearch";

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div>
          <div className="hero-eyebrow" data-i18n="hero.eyebrow">
            {t("hero.eyebrow", "Cổng thông tin chính thống")}
          </div>
          <h1>
            <span data-i18n="hero.h1.1">{t("hero.h1.1", "Vì an ninh trật tự —")}</span>{" "}
            <span className="accent" data-i18n="hero.h1.2">
              {t("hero.h1.2", "vì nhân dân phục vụ.")}
            </span>
          </h1>
          <p className="hero-lead" data-i18n="hero.lead">
            {t(
              "hero.lead",
              "Cổng thông tin điện tử của Công an phường Bình Dương, TP. Hồ Chí Minh. Tra cứu thủ tục hành chính, gửi phản ánh trực tuyến, tiếp cận thông tin pháp luật mọi lúc — minh bạch, nhanh chóng, đúng pháp luật."
            )}
          </p>
          <HeroSearch />
          <div className="hero-quick-tags">
            <span data-i18n="hero.quicktags">{t("hero.quicktags", "Tra cứu nhanh:")}</span>
            <a href="#">Cấp CCCD</a>
            <a href="#">Đăng ký tạm trú</a>
            <a href="#">Xe máy điện</a>
            <a href="#">Hộ chiếu</a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <svg className="ic">
              <use href="#i-news" />
            </svg>
            <div className="v">1.247</div>
            <div className="l" data-i18n="stat1">
              {t("stat1", "Tin tức & thông báo đã đăng")}
            </div>
          </div>
          <div className="hero-stat">
            <svg className="ic">
              <use href="#i-doc" />
            </svg>
            <div className="v">89</div>
            <div className="l" data-i18n="stat2">
              {t("stat2", "Thủ tục hành chính trực tuyến")}
            </div>
          </div>
          <div className="hero-stat">
            <svg className="ic">
              <use href="#i-clock-fast" />
            </svg>
            <div className="v">&lt; 24h</div>
            <div className="l" data-i18n="stat3">
              {t("stat3", "Thời gian phản hồi phản ánh")}
            </div>
          </div>
          <div className="hero-stat">
            <svg className="ic">
              <use href="#i-check-shield" />
            </svg>
            <div className="v">100%</div>
            <div className="l" data-i18n="stat4">
              {t("stat4", "Quy trình minh bạch, công khai")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
