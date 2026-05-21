"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import type { Announcement } from "@/types/announcement";

interface Props {
  items: Announcement[];
}

export default function NewsTicker({ items }: Props) {
  const { t } = useI18n();

  if (!items || !items.length) {
    // If no real items from Sanity, show the design reference placeholders to respect pixel perfect mockup
    return (
      <div className="ticker">
        <span className="ticker-label" data-i18n="ticker.label">{t("ticker.label", "Khẩn cấp")}</span>
        <div className="ticker-viewport">
          <div className="ticker-track">
            <span className="ticker-item">
              <b>[15/05]</b> Đang diễn ra đợt ra quân tuần tra kiểm soát an ninh trật tự trên địa bàn phường.
            </span>
            <span className="ticker-item">
              <b>[12/05]</b> Cảnh báo thủ đoạn giả mạo cán bộ Công an gọi điện lừa đảo hướng dẫn cài đặt VNeID kích hoạt định danh điện tử.
            </span>
            <span className="ticker-item">
              <b>[08/05]</b> Lịch tiếp công dân của Ban Chỉ huy Công an phường được niêm yết công khai tại trụ sở và trang thông tin.
            </span>
            {/* Duplicated for smooth loop */}
            <span className="ticker-item">
              <b>[15/05]</b> Đang diễn ra đợt ra quân tuần tra kiểm soát an ninh trật tự trên địa bàn phường.
            </span>
            <span className="ticker-item">
              <b>[12/05]</b> Cảnh báo thủ đoạn giả mạo cán bộ Công an gọi điện lừa đảo hướng dẫn cài đặt VNeID kích hoạt định danh điện tử.
            </span>
            <span className="ticker-item">
              <b>[08/05]</b> Lịch tiếp công dân của Ban Chỉ huy Công an phường được niêm yết công khai tại trụ sở và trang thông tin.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Double items for seamless infinite scroll loop animation
  const doubled = [...items, ...items];

  return (
    <div className="ticker">
      <span className="ticker-label" data-i18n="ticker.label">
        {t("ticker.label", "Khẩn cấp")}
      </span>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <span key={`${item._id}-${i}`} className="ticker-item">
              {item.url ? (
                <Link href={item.url} className="hover:underline">
                  {item.text}
                </Link>
              ) : (
                item.text
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
