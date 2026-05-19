# TIẾN ĐỘ DỰ ÁN

**Dự án:** Cổng thông tin Công an phường Bình Dương  
**Cập nhật lần cuối:** 19/05/2026  
**Tiến độ tổng thể: ~85%** — Giai đoạn 1 hoàn tất, Giai đoạn 2 còn 4 việc nhỏ

---

## TỔNG QUAN

| Hạng mục | Tổng | Hoàn thành | Còn lại |
|---|---|---|---|
| Trang web (pages) | 19 | 18 | 1 |
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
- [x] Basic Auth bảo vệ `/studio`
- [x] Zod validation tại API routes
- [x] HTML injection prevention (`escapeHtml`)
- [x] Vá 2 lỗ hổng Dependabot (postcss, js-yaml) — `npm audit` = 0
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

### Trang (18/19)
- [x] `/` — Trang chủ *(cần thêm 4 sections — xem B12)*
- [x] `/gioi-thieu`
- [x] `/tin-tuc` + `/tin-tuc/[slug]`
- [x] `/van-ban-phap-luat` + `/van-ban-phap-luat/[slug]`
- [x] `/thu-tuc-hanh-chinh` + `/thu-tuc-hanh-chinh/[slug]`
- [x] `/phan-anh`
- [x] `/hoi-dap` + `/hoi-dap/gui-cau-hoi`
- [x] `/thu-vien-anh` + `/thu-vien-anh/[slug]`
- [x] `/video` + `/video/[slug]`
- [x] `/chinh-sach-phap-luat`
- [x] `/truy-na`
- [x] `/so-do-trang`

### API Routes (2/2)
- [x] `POST /api/feedback` — nhận phản ánh, validate Zod, gửi email Resend
- [x] `POST /api/qna` — nhận câu hỏi, gửi email thông báo

### Tối ưu hiệu năng
- [x] Sanity CDN bật — giảm thời gian phản hồi
- [x] Bỏ thư viện animation nặng (~100KB) — tải nhanh hơn
- [x] Font tối ưu — không chớp trắng khi load
- [x] Loading skeleton — không màn hình trắng
- [x] ISR revalidation đúng mức cho từng loại nội dung

---

## ⏳ CÒN LẠI — LẬP TRÌNH VIÊN (4 việc)

### B9 — Trang `/lich-tiep-cong-dan`
- [ ] Dùng `getScheduleByMonth(startDate, endDate)` → `CitizenSchedule[]`
- [ ] `searchParams ?month=YYYY-MM`, mặc định tháng hiện tại
- [ ] Bảng hiển thị theo ngày, thông tin cán bộ trực

### B10 — Biểu mẫu tải về
- [ ] Thêm section "Biểu mẫu" vào `app/(web)/thu-tuc-hanh-chinh/[slug]/page.tsx`
- [ ] Field `proc.forms?: { title: string, fileUrl: string }[]`, nút tải cho từng form

### B12 — Cập nhật trang chủ
- [ ] `app/(web)/page.tsx` — thêm 4 sections: NewsCarousel, NguoiTotViecTot, PhotoAlbumPreview, VideoPreview
- [ ] Import: `getFeaturedNews`, `getNguoiTotViecTot`, `getPhotoAlbums(4)`, `getVideos("all", 4)`

### B13 — Cập nhật navigation
- [ ] `constants/nav.ts` — thêm: Hỏi đáp, Thư viện (Ảnh/Video), Chính sách PL, Lịch tiếp dân

---

## ⏳ CÒN LẠI — ĐƠN VỊ THỰC HIỆN

- [ ] **A1** — Tạo tài khoản Sanity → lấy Project ID + Read Token → điền `.env.local`
- [ ] **A2** — Tạo tài khoản Resend → lấy API key → điền `.env.local`
- [ ] **A3** — Nhập nội dung mẫu vào Sanity Studio *(cần A1 xong trước)*
- [ ] **A4** — Upload logo chính thức vào `public/logo/`
- [ ] **A5** — Xác nhận địa chỉ, SĐT, email trong `constants/site.ts`
- [ ] **A6** — Deploy lên Vercel *(cần A1+A2 xong)*
- [ ] **A7** — Chạy `npm install` sau khi pull code mới nhất (embla-carousel)

---

## LỊCH SỬ CẬP NHẬT

| Ngày | Nội dung |
|---|---|
| 15/05/2026 | Khởi tạo Giai đoạn 1: hạ tầng, 4 schemas, 10 trang, API feedback |
| 18/05/2026 | Giai đoạn 2: 7 schemas mới, 19 queries, 12+ components, 8 trang mới, vá bảo mật |
| 19/05/2026 | CLAUDE.md + AGENTS.md, chuẩn hoá tài liệu dự án |

---

*Cổng thông tin Công an phường Bình Dương — Cập nhật 19/05/2026*
