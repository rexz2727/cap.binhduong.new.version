"use client";

import { useI18n } from "@/lib/i18n";

export default function EmergencyRow() {
  const { t } = useI18n();

  return (
    <div className="emergency-strip">
      <div className="container">
        <span className="e-title" data-i18n="emergency.title">
          <svg width="16" height="16">
            <use href="#i-warn" />
          </svg>
          {t("emergency.title", "Trường hợp khẩn cấp gọi ngay")}
        </span>
        <a href="tel:113" className="e-num">
          113 <span data-i18n="emergency.police">{t("emergency.police", "Cảnh sát")}</span>
        </a>
        <a href="tel:114" className="e-num">
          114 <span data-i18n="emergency.fire">{t("emergency.fire", "Cứu hỏa")}</span>
        </a>
        <a href="tel:115" className="e-num">
          115{" "}
          <span data-i18n="emergency.medical">
            {t("emergency.medical", "Cấp cứu y tế")}
          </span>
        </a>
        <div className="e-list">
          <a
            href="https://dichvucong.gov.vn"
            target="_blank"
            rel="noopener noreferrer"
            style={{ opacity: 0.85, fontSize: "13px" }}
          >
            Cổng dịch vụ công Quốc gia →
          </a>
        </div>
      </div>
    </div>
  );
}
