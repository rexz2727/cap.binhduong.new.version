"use client";

import { SITE } from "@/constants/site";
import { useI18n, type I18nKey } from "@/lib/i18n";
import type { SiteSettings } from "@/types/siteSettings";

interface ContactInfoProps {
  siteSettings?: SiteSettings | null;
}

export default function ContactInfo({ siteSettings }: ContactInfoProps = {}) {
  const { t } = useI18n();

  const contactItems = [
    {
      icon: "#i-pin",
      label: "Địa chỉ",
      value: siteSettings?.address ?? SITE.address,
      i18nLabel: "contact.address.label",
    },
    {
      icon: "#i-phone",
      label: "Điện thoại",
      value: siteSettings?.phone ?? SITE.phone,
      i18nLabel: "contact.phone.label",
    },
    {
      icon: "#i-mail",
      label: "Email",
      value: siteSettings?.email ?? SITE.email,
      i18nLabel: "contact.email.label",
    },
    {
      icon: "#i-clock",
      label: "Giờ làm việc",
      value: siteSettings?.workingHours ?? SITE.workingHours,
      i18nLabel: "contact.hours.label",
    },
  ];

  return (
    <section className="contact-panel">
      <div className="container">
        <div className="contact-panel-inner">
          <div className="contact-info-block">
            <hgroup className="section-h">
              <p className="eyebrow">Liên hệ</p>
              <h2>Thông tin liên hệ</h2>
            </hgroup>
            <ul className="contact-list">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <svg className="ic">
                    <use href={item.icon} />
                  </svg>
                  <div>
                    <span className="label" data-i18n={item.i18nLabel}>
                      {t(item.i18nLabel as I18nKey, item.label)}
                    </span>
                    <p className="value">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="hotline-block">
            <h3 className="hotline-title">Đường dây nóng 24/7</h3>
            <div className="hotline-num">{siteSettings?.hotline ?? SITE.hotline}</div>
            <div className="emergency-links">
              <a href="tel:113">
                Cảnh sát <b>113</b>
              </a>
              <a href="tel:114">
                PCCC <b>114</b>
              </a>
              <a href="tel:115">
                Cấp cứu <b>115</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
