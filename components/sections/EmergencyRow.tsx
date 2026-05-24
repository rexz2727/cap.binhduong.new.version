"use client";

import { useI18n } from "@/lib/i18n";
import type { EmergencyContent } from "@/types/emergencyContent";

export default function EmergencyRow({
  emergencyContent,
}: {
  emergencyContent?: EmergencyContent | null;
}) {
  const { t } = useI18n();

  const title =
    emergencyContent?.title ?? t("emergency.title", "Trường hợp khẩn cấp gọi ngay");

  const defaultNumbers = [
    { _key: "113", number: "113", label: t("emergency.police", "Cảnh sát"), href: "tel:113" },
    { _key: "114", number: "114", label: t("emergency.fire", "Cứu hỏa"), href: "tel:114" },
    { _key: "115", number: "115", label: t("emergency.medical", "Cấp cứu y tế"), href: "tel:115" },
  ];

  const numbers =
    emergencyContent?.emergencyNumbers && emergencyContent.emergencyNumbers.length > 0
      ? emergencyContent.emergencyNumbers
      : defaultNumbers;

  const externalLinks = emergencyContent?.externalLinks ?? [];
  const hasCustomLinks = externalLinks.length > 0;

  return (
    <div className="emergency-strip">
      <div className="container">
        <span className="e-title">
          <svg width="16" height="16">
            <use href="#i-warn" />
          </svg>
          {title}
        </span>
        {numbers.map((n) => (
          <a key={n._key} href={n.href} className="e-num">
            {n.number} <span>{n.label}</span>
          </a>
        ))}
        <div className="e-list">
          {hasCustomLinks ? (
            externalLinks.map((link) => (
              <a
                key={link._key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-85 text-[13px]"
              >
                {link.label} →
              </a>
            ))
          ) : (
            <a
              href="https://dichvucong.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-85 text-[13px]"
            >
              Cổng dịch vụ công Quốc gia →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
