import Link from "next/link";
import { SERVICE_CARDS } from "@/constants/services";

export default function ServiceGrid() {
  return (
    <div className="service-grid">
      {SERVICE_CARDS.map((card) => (
        <Link key={card.href + card.label} href={card.href} className="service-card">
          <div className="sc-icon">
            <svg width="18" height="18" aria-hidden="true">
              <use href={card.icon} />
            </svg>
          </div>
          <span className="sc-label">{card.label}</span>
          <span className="sc-desc">{card.description}</span>
        </Link>
      ))}
    </div>
  );
}
