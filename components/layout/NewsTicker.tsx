"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import type { Announcement } from "@/types/announcement";

interface Props {
  items: Announcement[];
}

export default function NewsTicker({ items }: Props) {
  const { t, lang } = useI18n();

  if (!items || !items.length) return null;

  // Double items for seamless infinite scroll loop animation
  const doubled = [...items, ...items];

  return (
    <div className="ticker">
      <span className="ticker-label" data-i18n="ticker.label">
        {t("ticker.label", "Khẩn cấp")}
      </span>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {doubled.map((item, i) => {
            const itemI18n = item as Announcement & { textEn?: string };
            const displayText =
              lang === "en" && itemI18n.textEn ? itemI18n.textEn : item.text;
            return (
              <span key={`${item._id}-${i}`} className="ticker-item">
                {item.url ? (
                  <Link href={item.url} className="hover:underline">
                    {displayText}
                  </Link>
                ) : (
                  displayText
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
