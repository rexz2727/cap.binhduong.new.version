# TIẾN ĐỘ DỰ ÁN

**Dự án:** Cổng thông tin Công an phường Bình Dương  
**Cập nhật lần cuối:** 21/05/2026  
**Tiến độ tổng thể: ~99%** — Giai đoạn 1, 2, 3 & 4 hoàn tất; Giao diện trang chủ đã đồng bộ v4 hoàn chỉnh

---

## TỔNG QUAN

| Hạng mục | Tổng | Hoàn thành | Còn lại |
|---|---|---|---|
| Trang web (pages) | 19 | 19 | 0 |
| Sanity schemas | 11 | 11 | 0 |
| TypeScript types | 11 | 11 | 0 |
| GROQ queries | 19 | 19 | 0 |
| Components | 27+ | 27+ | 0 |
| API Routes | 2 | 2 | 0 |
| Tài liệu (CLAUDE.md, AGENTS.md) | 2 | 2 | 0 |

---

## ✅ HOÀN THÀNH

### Hạ tầng & Bảo mật
- [x] Next.js 16, TypeScript, Tailwind CSS v4
- [x] Sanity CMS v5 tích hợp
- [x] Resend email tích hợp
- [x] Security headers OWASP đầy đủ (HSTS, CSP, X-Frame-Options...)
- [x] CSP `frame-src` cho phép YouTube — VideoPlayer hoạt động đúng
- [x] Basic Auth bảo vệ `/studio`
- [x] Sanity Studio nhúng đầy đủ bằng `NextStudio` — không còn placeholder
- [x] Zod validation tại API routes
- [x] HTML injection prevention (`escapeHtml`)
- [x] Vá 2 lỗ hổng Dependabot (postcss, js-yaml) — `npm audit` = 0
- [x] Rate limiting API routes — `/api/feedback` & `/api/qna`, 5 request/phút/IP, trả `429` — chống spam vét quota Resend
- [x] Sửa 2 lỗi build có sẵn (thiếu `sanity/lib/image.ts`, lỗi type 3 schema) — `npm run build` pass sạch
- [x] CLAUDE.md và AGENTS.md — hướng dẫn AI agent đầy đủ

### Dữ liệu (11/11 schemas + 19 queries)
- [x] `newsPost` — tin tức, isFeatured, isNguoiTotViecTot
- [x] `legalDocument` — số hiệu, ngày ban hành, file đính kèm
- [x] `personnel` — cấp bậc, chức vụ, ảnh
- [x] `procedure` — thời gian xử lý, phí, các bước
- [x] `photoAlbum` — gallery theo sự kiện
- [x] `video` — YouTube tích hợp
- [x] `qna` — câu hỏi người dân, trả lời cán bộ
- [x] `announcement` — ticker có thời hạn, ưu tiên
- [x] `draftDocument` — văn bản dự thảo, thời hạn góp ý
- [x] `wantedPerson` — đối tượng truy nã, ảnh, tội danh
- [x] `citizenSchedule` — lịch tiếp công dân, cán bộ trực

### Thư viện
- [x] `embla-carousel-react` + `embla-carousel-autoplay` — đã thêm vào `package.json`
- [x] `@portabletext/react` — render rich text Sanity
- [x] `@sanity/image-url` — tối ưu ảnh từ CDN Sanity

### Components (27+)
- [x] `components/LiveClock.tsx`
- [x] `components/layout/NewsTicker.tsx`
- [x] `components/layout/Header.tsx` — LiveClock, NewsTicker, social icons
- [x] `components/layout/Footer.tsx` — 4 cột, số khẩn cấp
- [x] `components/layout/MobileMenu.tsx` — hamburger, backdrop, aria-expanded
- [x] `components/sections/HeroSection.tsx` + `HeroSearch.tsx`
- [x] `components/sections/NewsCarousel.tsx`
- [x] `components/sections/NguoiTotViecTot.tsx`
- [x] `components/sections/PhotoAlbumPreview.tsx`
- [x] `components/sections/VideoPreview.tsx`
- [x] `components/sections/GioiThieuTabs.tsx`
- [x] `components/sections/ContactInfo.tsx`
- [x] `components/sections/QuickLinks.tsx`
- [x] `components/ui/Sidebar.tsx`
- [x] `components/ui/PhotoLightbox.tsx`
- [x] `components/ui/VideoPlayer.tsx`
- [x] `components/ui/QnaCard.tsx`
- [x] `components/ui/WantedCard.tsx`
- [x] `components/ui/CopBubble.tsx` — nút phản ánh nổi góc phải
- [x] `components/forms/QnaForm.tsx`
- [x] `components/ui/Badge.tsx`, `Button.tsx`, `PageHeader.tsx`, `NewsCard.tsx`, `LegalDocCard.tsx`

### Trang (19/19)
- [x] `/` — Trang chủ — đủ 8 sections: Hero, NewsCarousel, QuickLinks, LatestNews, NguoiTotViecTot, PhotoAlbumPreview, VideoPreview, ContactInfo
- [x] `/gioi-thieu`
- [x] `/tin-tuc` + `/tin-tuc/[slug]`
- [x] `/van-ban-phap-luat` + `/van-ban-phap-luat/[slug]`
- [x] `/thu-tuc-hanh-chinh` + `/thu-tuc-hanh-chinh/[slug]` — có section biểu mẫu tải về
- [x] `/phan-anh`
- [x] `/hoi-dap` + `/hoi-dap/gui-cau-hoi`
- [x] `/thu-vien-anh` + `/thu-vien-anh/[slug]`
- [x] `/video` + `/video/[slug]`
- [x] `/chinh-sach-phap-luat`
- [x] `/truy-na`
- [x] `/so-do-trang`
- [x] `/lich-tiep-cong-dan` — điều hướng tháng, nhóm lịch theo ngày, thông tin cán bộ trực

### API Routes (2/2)
- [x] `POST /api/feedback` — nhận phản ánh, validate Zod, gửi email Resend
- [x] `POST /api/qna` — nhận câu hỏi, gửi email thông báo

### Navigation
- [x] `constants/nav.ts` — đủ 9 mục: Trang chủ, Giới thiệu, Tin tức, Văn bản PL, Thủ tục HC, Hỏi đáp, Thư viện (Ảnh/Video), Chính sách PL, Lịch tiếp dân

### Tối ưu hiệu năng
- [x] Sanity CDN bật — giảm thời gian phản hồi
- [x] Bỏ thư viện animation nặng (~100KB) — tải nhanh hơn
- [x] Font tối ưu — không chớp trắng khi load
- [x] Loading skeleton — không màn hình trắng
- [x] ISR revalidation đúng mức cho từng loại nội dung
- [x] `Promise.all` fetch song song trên trang chủ

### Giai đoạn 3 — UX & SEO ✅ HOÀN THÀNH

- [x] **C1** — Tìm kiếm toàn site: `HeroSearch` điều hướng `/search?q=`, GROQ full-text trên 3 content types
- [x] **C2** — Trang 404 tùy chỉnh `app/not-found.tsx` — quick links, nút gọi 113
- [x] **C3** — `app/sitemap.ts` + `app/robots.ts` — sitemap động từ Sanity, robots chặn `/studio/` và `/api/`
- [x] **C4** — `@media print` trong `globals.css` — ẩn header/footer/nav/fixed elements khi in
- [x] **C5** — Form feedback: `phan-anh` và `QnaForm` đều có success state rõ ràng (đã có từ trước)
- [x] **C6** — `EmergencyButton` — thanh "GỌI KHẨN CẤP 113" cố định đáy mobile (`sm:hidden`)

### Còn lại (tuỳ chọn, ưu tiên thấp)

| Mã | Nội dung |
|---|---|
| C7 | YouTube click-to-play thay iframe tải ngay — giảm ~500KB script |
| C8 | OpenGraph image động cho từng bài tin — đẹp khi share Zalo/Facebook |

---

## 🔄 GIAI ĐOẠN 4 — ĐỒNG BỘ GIAO DIỆN THIẾT KẾ v4 (ĐANG LÀM)

Nguồn thiết kế chuẩn: `design-reference/index-v4.html` (phần `<main id="page-home">`, dòng ~276–512) + `design-reference/styles-v4.css`. Quy ước khóa thiết kế: `DESIGN_LOCK.md`. CSS đã port đầy đủ vào `app/globals.css`; việc còn lại là đồng bộ JSX component về đúng tên class của design.

### Lỗi build do phiên design trước để lại — đã sửa

- [x] Đổi tên `lib/i18n.ts` → `lib/i18n.tsx` (file chứa JSX)
- [x] `MobileMenu.tsx` — thay `item.id` (không tồn tại trên `NavItem`) bằng `item.href`
- [x] `lib/i18n.tsx` — thêm 4 key `contact.address/phone/email/hours.label` (VI + EN)
- [x] `ContactInfo.tsx`, `QuickLinks.tsx` — import + cast `I18nKey` cho hàm `t()`
- [x] `ContactInfo.tsx` — thêm directive `"use client"`

### Đồng bộ section trang chủ với design v4

| # | Section | Class design | Trạng thái |
|---|---|---|---|
| 1 | HeroSection + HeroSearch | `section.hero` / `hero-inner` / `hero-stats` | ✅ Xong |
| 2 | EmergencyRow | `emergency-strip` / `e-title` / `e-num` | ✅ Xong |
| 3 | QuickLinks | `section.block` / `service-grid` / `service-cell` / `service-ic` / `.more` | ✅ Xong |
| 4 | LatestNews | `section.block.alt` / `news-grid` / `news-feature` / `news-side` / `news-item-side` | ✅ Xong |
| 5 | NguoiTotViecTot | `section.block.honor-strip` / `honor-grid` / `honor-card` | ✅ Xong |
| 6 | ValuesStrip (tạo mới) | `section.values-strip` / `values-grid` / `value-cell` (4 ô value props) | ✅ Xong |

### Quyết định phạm vi trang chủ

Giữ `PhotoAlbumPreview` + `VideoPreview` (restyle theo design tokens), **bỏ** `NewsCarousel` + `ContactInfo` (ContactInfo đã có trong Footer). Thứ tự section mới trong `app/(web)/page.tsx`:

```
Hero → Emergency → Values → QuickLinks → LatestNews → NguoiTotViecTot → PhotoAlbumPreview → VideoPreview
```

### Còn lại của Giai đoạn 4

- [x] Đồng bộ JSX section 3–6 (QuickLinks, LatestNews, NguoiTotViecTot, tạo ValuesStrip)
- [x] Cập nhật `app/(web)/page.tsx` — bỏ import/usage `NewsCarousel` + `ContactInfo`, thêm `<ValuesStrip />`
- [x] Thêm key i18n `section.honor.sub` (VI + EN) cho section NguoiTotViecTot
- [x] `npm run build` — pass sạch (`Compiled successfully`)
- [x] Restyle `PhotoAlbumPreview` + `VideoPreview` theo design tokens

> `NewsCarousel.tsx` và `ContactInfo.tsx` vẫn giữ trong repo (không xóa) — chỉ gỡ khỏi trang chủ.

---

## ⏳ CÒN LẠI — ĐƠN VỊ THỰC HIỆN (chặn deploy)

- [x] **A1** — Tạo tài khoản Sanity → lấy Project ID + Token → điền `.env.local`
- [x] **A2** — Tạo tài khoản Resend → lấy API key → điền `.env.local`
- [x] **A3** — Nhập nội dung mẫu vào Sanity Studio
- [x] **A4** — Upload logo chính thức vào `public/logo/`
- [x] **A5** — Xác nhận Facebook/YouTube URL thật trong `constants/site.ts`
- [/] **A6** — Deploy lên Vercel + điền env vars *(cần A1+A2 xong)*
- [x] **A7** — Chạy `npm install` sau khi pull code mới nhất

---

## LỊCH SỬ CẬP NHẬT

| Ngày | Nội dung |
|---|---|
| 15/05/2026 | Khởi tạo Giai đoạn 1: hạ tầng, 4 schemas, 10 trang, API feedback |
| 18/05/2026 | Giai đoạn 2: 7 schemas mới, 19 queries, 12+ components, 8 trang mới, vá bảo mật |
| 19/05/2026 | CLAUDE.md + AGENTS.md, chuẩn hoá tài liệu dự án |
| 20/05/2026 | Hoàn thiện Giai đoạn 2: B9/B10/B12/B13 + sửa bug CSP YouTube + Studio page |
| 20/05/2026 | Giai đoạn 3: C1 tìm kiếm, C2 trang 404, C3 sitemap/robots, C4 print CSS, C6 nút 113 mobile |
| 20/05/2026 | Rate limiting `/api/feedback` & `/api/qna` (5 req/phút/IP); sửa 2 lỗi build có sẵn (`sanity/lib/image.ts`, lỗi type 3 schema) |
| 21/05/2026 | Sửa 5 lỗi build do phiên design v4 (`i18n.tsx`, `MobileMenu`, i18n keys, cast `I18nKey`, `use client`); Giai đoạn 4 — đồng bộ HeroSection + HeroSearch + EmergencyRow với thiết kế v4 (2/6 section trang chủ) |
| 21/05/2026 | Giai đoạn 4 — đồng bộ JSX QuickLinks, LatestNews, NguoiTotViecTot, tạo `ValuesStrip`; cập nhật `page.tsx` (bỏ NewsCarousel/ContactInfo, thứ tự section v4); thêm key i18n `section.honor.sub`; build pass (6/6 section trang chủ) |
| 21/05/2026 | Đơn vị hoàn thành A1 (Sanity), A2 (Resend), A3 (nhập nội dung mẫu), A7 (`npm install`) — còn lại A4 logo, A5 URL mạng xã hội, A6 deploy Vercel |
| 21/05/2026 | Hoàn thành Giai đoạn 4 — restyle PhotoAlbumPreview + VideoPreview theo đúng thiết kế v4 và thêm các key dịch i18n; build biên dịch thành công 100%. |

---

*Cổng thông tin Công an phường Bình Dương — Cập nhật 21/05/2026*
