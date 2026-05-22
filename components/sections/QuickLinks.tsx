"use client";

import Link from "next/link";
import { useI18n, type I18nKey } from "@/lib/i18n";

const LINKS = [
  {
    icon: "#i-doc",
    title: "Thủ tục hành chính",
    more: "Tra cứu thủ tục",
    href: "/thu-tuc-hanh-chinh",
    i18nTitle: "svc.proc",
  },
  {
    icon: "#i-scroll",
    title: "Văn bản pháp luật",
    more: "Xem văn bản",
    href: "/van-ban-phap-luat",
    i18nTitle: "svc.legal",
  },
  {
    icon: "#i-help",
    title: "Hỏi đáp pháp luật",
    more: "Đặt câu hỏi",
    href: "/hoi-dap",
    i18nTitle: "svc.qna",
  },
  {
    icon: "#i-cal",
    title: "Lịch tiếp công dân",
    more: "Đặt lịch hẹn",
    href: "/lich-tiep-cong-dan",
    i18nTitle: "svc.schedule",
  },
  {
    icon: "#i-megaphone",
    title: "Phản ánh trực tuyến",
    more: "Gửi phản ánh",
    href: "/phan-anh",
    i18nTitle: "svc.feedback",
  },
  {
    icon: "#i-shield",
    title: "Giới thiệu đơn vị",
    more: "Tìm hiểu thêm",
    href: "/gioi-thieu",
    i18nTitle: "svc.about",
  },
];

export default function QuickLinks() {
  const { t } = useI18n();

  return (
    <section className="block">
      <div className="container">
        <div className="section-head-center">
          <div className="section-eyebrow" data-i18n="section.services.eye">
            {t("section.services.eye", "Dịch vụ trực tuyến")}
          </div>
          <h2 className="section-title" data-i18n="section.services.title">
            {t("section.services.title", "Truy cập nhanh các dịch vụ công")}
          </h2>
          <p className="section-sub" data-i18n="section.services.sub">
            {t("section.services.sub", "Tra cứu thông tin và thực hiện các thủ tục hành chính mọi lúc, không cần đến trực tiếp đơn vị.")}
          </p>
        </div>
        <div className="service-grid">
          {LINKS.map((link) => (
            <Link href={link.href} key={link.href} className="service-cell">
              <div className="service-ic">
                <svg>
                  <use href={link.icon} />
                </svg>
              </div>
              <h3 data-i18n={link.i18nTitle}>
                {t(link.i18nTitle as I18nKey, link.title)}
              </h3>
              <span className="more">{link.more}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
