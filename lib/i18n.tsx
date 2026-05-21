"use client";

import React, { createContext, useContext, useState, useEffect, startTransition } from "react";

export const I18N = {
  vi: {
    "hotline": "Đường dây nóng:",
    "brand1": "Cộng hòa Xã hội Chủ nghĩa Việt Nam",
    "brand2": "Công an phường Bình Dương",
    "brand3": "Thành phố Hồ Chí Minh",
    "nav.home": "Trang chủ",
    "nav.about": "Giới thiệu",
    "nav.news": "Tin tức",
    "nav.legal": "Văn bản",
    "nav.procedures": "Thủ tục",
    "nav.qna": "Hỏi đáp",
    "nav.gallery": "Thư viện",
    "nav.schedule": "Lịch tiếp dân",
    "nav.wanted": "Truy nã",
    "nav.cta": "Phản ánh ngay",
    "ticker.label": "Khẩn cấp",
    "hero.eyebrow": "Cổng thông tin chính thống",
    "hero.h1.1": "Vì an ninh trật tự —",
    "hero.h1.2": "vì nhân dân phục vụ.",
    "hero.lead": "Cổng thông tin điện tử của Công an phường Bình Dương, TP. Hồ Chí Minh. Tra cứu thủ tục hành chính, gửi phản ánh trực tuyến, tiếp cận thông tin pháp luật mọi lúc — minh bạch, nhanh chóng, đúng pháp luật.",
    "hero.search.placeholder": "Tìm thủ tục, văn bản, tin tức…",
    "hero.search.btn": "Tra cứu",
    "hero.quicktags": "Tra cứu nhanh:",
    "stat1": "Tin tức & thông báo đã đăng",
    "stat2": "Thủ tục hành chính trực tuyến",
    "stat3": "Thời gian phản hồi phản ánh",
    "stat4": "Quy trình minh bạch, công khai",
    "emergency.title": "Trường hợp khẩn cấp gọi ngay",
    "emergency.police": "Cảnh sát",
    "emergency.fire": "Cứu hỏa",
    "emergency.medical": "Cấp cứu y tế",
    "section.services.eye": "Dịch vụ trực tuyến",
    "section.services.title": "Truy cập nhanh các dịch vụ công",
    "section.services.sub": "Tra cứu thông tin và thực hiện các thủ tục hành chính mọi lúc, không cần đến trực tiếp đơn vị.",
    "section.news.eye": "Tin tức & Thông báo",
    "section.news.title": "Cập nhật tình hình an ninh, trật tự",
    "section.news.link": "Xem tất cả tin tức",
    "section.honor.eye": "Người tốt — Việc tốt",
    "section.honor.title": "Những tấm gương đáng trân trọng",
    "section.honor.sub": "Vinh danh cán bộ, chiến sĩ và quần chúng nhân dân có thành tích xuất sắc trong phong trào Toàn dân bảo vệ an ninh Tổ quốc.",
    "svc.proc": "Thủ tục hành chính",
    "svc.legal": "Văn bản pháp luật",
    "svc.qna": "Hỏi đáp pháp luật",
    "svc.schedule": "Lịch tiếp công dân",
    "svc.feedback": "Phản ánh trực tuyến",
    "svc.about": "Giới thiệu đơn vị",
    "footer.h.links": "Liên kết nhanh",
    "footer.h.agencies": "Cơ quan liên quan",
    "footer.h.social": "Theo dõi chúng tôi",
    "footer.h.emergency": "Đường dây khẩn cấp",
    "contact.address.label": "Địa chỉ",
    "contact.phone.label": "Điện thoại",
    "contact.email.label": "Email",
    "contact.hours.label": "Giờ làm việc",
  },
  en: {
    "hotline": "Hotline:",
    "brand1": "Socialist Republic of Vietnam",
    "brand2": "Binh Duong Ward Police",
    "brand3": "Ho Chi Minh City",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.news": "News",
    "nav.legal": "Documents",
    "nav.procedures": "Procedures",
    "nav.qna": "Q&A",
    "nav.gallery": "Library",
    "nav.schedule": "Reception Schedule",
    "nav.wanted": "Wanted",
    "nav.cta": "Submit Report",
    "ticker.label": "Urgent",
    "hero.eyebrow": "Official Information Portal",
    "hero.h1.1": "For Security & Order —",
    "hero.h1.2": "serving the people.",
    "hero.lead": "Official electronic portal of Binh Duong Ward Police, Ho Chi Minh City. Look up administrative procedures, submit reports online, access legal information anytime — transparent, fast, and lawful.",
    "hero.search.placeholder": "Search procedures, documents, news…",
    "hero.search.btn": "Search",
    "hero.quicktags": "Quick search:",
    "stat1": "News & announcements published",
    "stat2": "Online administrative procedures",
    "stat3": "Average response time",
    "stat4": "Transparent, open process",
    "emergency.title": "In emergency call immediately",
    "emergency.police": "Police",
    "emergency.fire": "Fire",
    "emergency.medical": "Medical",
    "section.services.eye": "Online Services",
    "section.services.title": "Quick access to public services",
    "section.services.sub": "Look up information and complete administrative procedures anytime, without needing to visit our office.",
    "section.news.eye": "News & Announcements",
    "section.news.title": "Security & order updates",
    "section.news.link": "View all news",
    "section.honor.eye": "Good People — Good Deeds",
    "section.honor.title": "Inspiring role models",
    "section.honor.sub": "Honoring officers, soldiers and citizens with outstanding achievements in the All-People Security Protection movement.",
    "svc.proc": "Administrative Procedures",
    "svc.legal": "Legal Documents",
    "svc.qna": "Legal Q&A",
    "svc.schedule": "Citizen Reception",
    "svc.feedback": "Submit Report",
    "svc.about": "About the Unit",
    "footer.h.links": "Quick Links",
    "footer.h.agencies": "Related Agencies",
    "footer.h.social": "Follow Us",
    "footer.h.emergency": "Emergency Hotline",
    "contact.address.label": "Address",
    "contact.phone.label": "Phone",
    "contact.email.label": "Email",
    "contact.hours.label": "Working Hours",
  },
} as const;

export type Lang = "vi" | "en";
export type I18nKey = keyof typeof I18N.vi;

interface LanguageContextProps {
  lang: Lang;
  toggleLang: () => void;
  t: (key: I18nKey, defaultVal?: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("vi");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Lang;
    if (savedLang === "vi" || savedLang === "en") {
      setLang(savedLang);
      document.documentElement.lang = savedLang;
    }
  }, []);

  const toggleLang = () => {
    const nextLang = lang === "vi" ? "en" : "vi";
    startTransition(() => {
      setLang(nextLang);
      document.documentElement.lang = nextLang;
      localStorage.setItem("lang", nextLang);
    });
  };

  const t = (key: I18nKey, defaultVal?: string): string => {
    const dict = I18N[lang];
    if (key in dict) {
      return dict[key];
    }
    return defaultVal ?? String(key);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return a fallback translation function and default values if called outside Provider
    return {
      lang: "vi" as Lang,
      toggleLang: () => {},
      t: (key: I18nKey, defaultVal?: string) => defaultVal ?? String(key),
    };
  }
  return context;
}
