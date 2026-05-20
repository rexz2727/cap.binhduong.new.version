# KẾ HOẠCH DỰ ÁN

**Dự án:** Cổng thông tin Công an phường Bình Dương  
**Người thực hiện:** Rex Nguyen  
**Ngày lập:** 18/05/2026 | **Cập nhật:** 20/05/2026  
**Mục tiêu hoàn thành:** Quý III/2026

---

## I. BẢN ĐỒ FILE HIỆN TẠI

```
/ (root)
├── next.config.ts              ✅ Security headers + CSP YouTube
├── middleware.ts               ✅ Basic Auth /studio
├── tsconfig.json               ✅
├── eslint.config.mjs           ✅ eslint-plugin-security
├── .env.local                  ⚠️  Chưa có — cần đơn vị điền thật
│
├── constants/
│   ├── site.ts                 ⚠️  Facebook/YouTube URL cần URL thật (A5)
│   └── nav.ts                  ✅ 9 mục đầy đủ
│
├── types/                      ✅ 11 files — đủ cho tất cả schemas
│
├── sanity/
│   ├── sanity.config.ts        ✅
│   ├── schemas/                ✅ 11 schemas
│   └── lib/
│       ├── client.ts           ✅ CDN bật
│       └── queries.ts          ✅ 19 queries với safeFetch + revalidate
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          ✅ LiveClock, NewsTicker, social icons
│   │   ├── Footer.tsx          ✅ 4 cột, số khẩn cấp
│   │   ├── MobileMenu.tsx      ✅
│   │   ├── PageTransition.tsx  ✅ CSS thuần, không framer-motion
│   │   └── NewsTicker.tsx      ✅
│   ├── sections/
│   │   ├── HeroSection.tsx     ✅ blur-xl (đã tối ưu GPU)
│   │   ├── HeroSearch.tsx      ⚠️  UI có sẵn nhưng chưa có logic tìm kiếm (C1)
│   │   ├── NewsCarousel.tsx    ✅
│   │   ├── NguoiTotViecTot.tsx ✅
│   │   ├── PhotoAlbumPreview.tsx ✅
│   │   ├── VideoPreview.tsx    ✅
│   │   ├── LatestNews.tsx      ✅
│   │   ├── QuickLinks.tsx      ✅
│   │   ├── ContactInfo.tsx     ✅
│   │   └── GioiThieuTabs.tsx   ✅
│   ├── ui/
│   │   ├── Badge.tsx           ✅
│   │   ├── Button.tsx          ✅
│   │   ├── CopBubble.tsx       ✅
│   │   ├── LegalDocCard.tsx    ✅
│   │   ├── NewsCard.tsx        ✅
│   │   ├── PageHeader.tsx      ✅
│   │   ├── Sidebar.tsx         ✅
│   │   ├── PhotoLightbox.tsx   ✅
│   │   ├── VideoPlayer.tsx     ✅
│   │   ├── QnaCard.tsx         ✅
│   │   └── WantedCard.tsx      ✅
│   ├── LiveClock.tsx           ✅
│   └── forms/
│       └── QnaForm.tsx         ✅
│
├── app/
│   ├── layout.tsx              ✅ next/font Be Vietnam Pro
│   ├── globals.css             ✅ Tailwind v4 @theme, animate-fade-in
│   ├── not-found.tsx           ❌ Chưa có — Next.js dùng trang 404 mặc định (C2)
│   ├── sitemap.ts              ❌ Chưa có — cần cho SEO (C3)
│   ├── robots.ts               ❌ Chưa có — cần cho SEO (C3)
│   ├── (admin)/studio/         ✅ NextStudio đầy đủ
│   ├── (web)/
│   │   ├── layout.tsx          ✅ CopBubble tích hợp
│   │   ├── loading.tsx         ✅ Skeleton
│   │   ├── page.tsx            ✅ 8 sections đầy đủ
│   │   ├── tin-tuc/            ✅
│   │   ├── van-ban-phap-luat/  ✅
│   │   ├── thu-tuc-hanh-chinh/ ✅ có biểu mẫu tải về + ⚠️ cần print CSS (C4)
│   │   ├── gioi-thieu/         ✅
│   │   ├── phan-anh/           ✅ ⚠️ cần feedback rõ hơn sau submit (C5)
│   │   ├── hoi-dap/            ✅ ⚠️ cần feedback rõ hơn sau submit (C5)
│   │   ├── thu-vien-anh/       ✅
│   │   ├── video/              ✅
│   │   ├── chinh-sach-phap-luat/ ✅
│   │   ├── truy-na/            ✅
│   │   ├── so-do-trang/        ✅
│   │   └── lich-tiep-cong-dan/ ✅
│   └── api/
│       ├── feedback/route.ts   ✅ Zod + escapeHtml
│       └── qna/route.ts        ✅
│
└── public/
    └── logo/                   ⚠️  Chỉ có .gitkeep — cần logo thật (A4)
```

---

## II. MỤC TIÊU

Xây dựng cổng thông tin điện tử chính thức cho Công an phường Bình Dương nhằm:
- Công khai minh bạch thông tin, thủ tục hành chính cho người dân
- Tiếp nhận phản ánh, kiến nghị trực tuyến 24/7
- Đăng tải tin tức, văn bản pháp luật kịp thời
- Xây dựng kênh tương tác hiện đại giữa đơn vị và nhân dân

---

## III. CÔNG NGHỆ

| Hạng mục | Công nghệ | Ghi chú |
|---|---|---|
| Nền tảng | Next.js 16, App Router | Breaking changes — đọc docs trước khi code |
| Giao diện | React 19, Tailwind CSS v4 | v4 khác hoàn toàn v3 |
| CMS | Sanity v5 | Không có database khác |
| Email | Resend v6 | 100 email/ngày miễn phí |
| Validation | Zod v4 | v4 có breaking changes |
| Deploy | Vercel | Free tier, CDN toàn cầu |

---

## IV. PHẠM VI CHỨC NĂNG

### Giai đoạn 1 — Nền tảng cốt lõi ✅ HOÀN THÀNH

| # | Tính năng | Trạng thái |
|---|---|---|
| 1 | Trang chủ với thông tin tổng quan | ✅ |
| 2 | Giới thiệu đơn vị, ban lãnh đạo | ✅ |
| 3 | Tin tức — đăng, tìm kiếm, lọc danh mục | ✅ |
| 4 | Văn bản pháp luật — tra cứu, tải về | ✅ |
| 5 | Thủ tục hành chính — hướng dẫn chi tiết + biểu mẫu tải về | ✅ |
| 6 | Form phản ánh trực tuyến (gửi qua email) | ✅ |
| 7 | Bảo mật: Basic Auth, security headers OWASP | ✅ |
| 8 | Tối ưu: CDN, font, loading skeleton | ✅ |

### Giai đoạn 2 — Mở rộng tính năng ✅ HOÀN THÀNH

| Mã | Tính năng | Trạng thái |
|---|---|---|
| B5 | GROQ queries đầy đủ (19 queries) | ✅ |
| B6 | Thư viện carousel (embla) | ✅ |
| B7 | 12 components mới | ✅ |
| B8 | Cập nhật Header, Footer, MobileMenu, QuickLinks | ✅ |
| B9 | Trang `/lich-tiep-cong-dan` | ✅ |
| B10 | Biểu mẫu tải về trong trang thủ tục | ✅ |
| B11 | API `POST /api/qna` | ✅ |
| B12 | Cập nhật trang chủ (4 sections mới) | ✅ |
| B13 | Cập nhật navigation (4 mục mới) | ✅ |

### Giai đoạn 3 — Hoàn thiện UX & SEO 🔄 KẾ HOẠCH

| Mã | Tính năng | Ưu tiên | Mô tả |
|---|---|---|---|
| C1 | Tìm kiếm toàn site | 🔴 Cao | `HeroSearch` hiện chỉ là UI — cần route `/search?q=` và GROQ full-text search |
| C2 | Trang 404 tùy chỉnh | 🔴 Cao | Tạo `app/not-found.tsx` — hiện Next.js hiển thị trang trắng mặc định |
| C3 | Sitemap + robots.txt | 🔴 Cao | `app/sitemap.ts` + `app/robots.ts` — cần để Google index đúng khi deploy |
| C4 | CSS in ấn thủ tục | 🟡 Trung bình | `@media print` cho trang thủ tục — người dân hay in mang theo |
| C5 | Feedback sau submit form | 🟡 Trung bình | Toast/banner thành công rõ ràng sau khi gửi phản ánh và hỏi đáp |
| C6 | Nút gọi khẩn trên mobile | 🟡 Trung bình | Nút 113 cố định trên mobile — tương tự CopBubble nhưng cho khẩn cấp |
| C7 | YouTube lazy-load | 🟢 Thấp | Click-to-play thay iframe load ngay — giảm ~500KB script |
| C8 | OpenGraph image động | 🟢 Thấp | `app/opengraph-image.tsx` — đẹp khi share lên Zalo/Facebook |

---

## V. PHÂN CÔNG ĐƠN VỊ

| Mã | Nội dung | Trạng thái |
|---|---|---|
| A1 | Tạo tài khoản Sanity → lấy Project ID + Token | ⏳ |
| A2 | Tạo tài khoản Resend → lấy API key | ⏳ |
| A3 | Nhập nội dung mẫu vào Sanity Studio | ⏳ Cần A1 |
| A4 | Upload logo chính thức vào `public/logo/` | ⏳ |
| A5 | Xác nhận Facebook/YouTube URL thật trong `constants/site.ts` | ⏳ |
| A6 | Deploy Vercel + điền env vars | ⏳ Cần A1+A2 |
| A7 | Chạy `npm install` sau khi pull code mới nhất | ⏳ |

---

## VI. TIẾN ĐỘ ĐỀ XUẤT

```
Tuần 3 (20–25/05):  Giai đoạn 3 — C1, C2, C3 (ưu tiên cao)
Tuần 4 (26–01/06):  Giai đoạn 3 — C4, C5, C6 + đơn vị cung cấp nội dung (A1–A5)
Tuần 5 (02–08/06):  Kiểm thử tổng thể + tối ưu + C7, C8 nếu còn thời gian
Tuần 6 (09–15/06):  Deploy chính thức (A6)

Song song: Đơn vị thực hiện A1 → A2 → A3 → A4 → A5
```

---

## VII. CHI PHÍ HẠ TẦNG

| Dịch vụ | Gói | Chi phí |
|---|---|---|
| Sanity CMS | Free (đủ cho quy mô phường) | 0 đ/tháng |
| Resend email | Free (100 email/ngày) | 0 đ/tháng |
| Vercel hosting | Free (1 project) | 0 đ/tháng |
| Tên miền (tuỳ chọn) | .vn hoặc .gov.vn | ~300.000 đ/năm |

---

*Cổng thông tin Công an phường Bình Dương — Cập nhật 20/05/2026*
