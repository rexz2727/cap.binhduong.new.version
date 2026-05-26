"use client";
import Link from "next/link";
import { SERVICE_CARDS } from "@/constants/services";
import { useI18n } from "@/lib/i18n";

export default function ServiceGrid() {
  const { t } = useI18n();
  return (
    <div className="service-grid">
      {SERVICE_CARDS.map((card) => (
        <Link key={card.href + card.labelKey} href={card.href} className="service-card">
          <div className="sc-icon">
            <svg width="18" height="18" aria-hidden="true"><use href={card.icon} /></svg>
          </div>
          <span className="sc-label">{t(card.labelKey)}</span>
          <span className="sc-desc">{t(card.descKey)}</span>
        </Link>
      ))}
    </div>
  );
}
