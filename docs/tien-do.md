# TIẾN ĐỘ DỰ ÁN — Cổng thông tin Công an phường Bình Dương
> Cập nhật lần cuối: 18/05/2026

---

## ✅ HOÀN THÀNH

### Hạ tầng & Bảo mật
- [x] Cấu hình Next.js 16, TypeScript, Tailwind CSS v4
- [x] Tích hợp Sanity CMS
- [x] Tích hợp Resend email
- [x] Security headers (OWASP)
- [x] Basic Auth bảo vệ /studio (B1)
- [x] Xác thực form bằng Zod

### Dữ liệu
- [x] Schema: news, legalDocument, personnel, procedure (B2 — nâng cấp)
- [x] Schema mới: photoAlbum, video, qna, announcement, draftDocument, wantedPerson, citizenSchedule (B3)
- [x] Types TypeScript tương ứng 11 schemas (B4)
- [x] GROQ queries Giai đoạn 2 — 19 queries (B5) ✓

### Thư viện
- [x] `package.json` đã thêm `embla-carousel-react` + `embla-carousel-autoplay` (B6)
- [ ] **⚠️ Cần chạy `npm install` thủ công**

### Components (B7 — 12 mới + B8 — 4 cập nhật)
- [x] `components/LiveClock.tsx`
- [x] `components/layout/NewsTicker.tsx`
- [x] `components/sections/NewsCarousel.tsx`
- [x] `components/sections/NguoiTotViecTot.tsx`
- [x] `components/sections/PhotoAlbumPreview.tsx`
- [x] `components/sections/VideoPreview.tsx`
- [x] `components/ui/Sidebar.tsx`
- [x] `components/ui/PhotoLightbox.tsx`
- [x] `components/ui/VideoPlayer.tsx`
- [x] `components/ui/QnaCard.tsx`
- [x] `components/ui/WantedCard.tsx`
- [x] `components/forms/QnaForm.tsx`
- [x] `Header.tsx` — LiveClock, NewsTicker, social icons (B8)
- [x] `Footer.tsx` — 4 cột: đơn vị + social, nav, cơ quan liên quan, số khẩn cấp (B8)
- [x] `MobileMenu.tsx` — hamburger SVG, backdrop overlay, aria-expanded (B8)
- [x] `QuickLinks.tsx` — 6 cards (thêm Hỏi đáp + Lịch tiếp dân) (B8)

### Trang (17/19 — chưa tính /lich-tiep-cong-dan)
- [x] Trang chủ `/` *(chưa có 4 sections mới — xem B12)*
- [x] Giới thiệu `/gioi-thieu`
- [x] Tin tức `/tin-tuc` + `/tin-tuc/[slug]`
- [x] Văn bản pháp luật `/van-ban-phap-luat` + `/van-ban-phap-luat/[slug]`
- [x] Thủ tục hành chính `/thu-tuc-hanh-chinh` + `/thu-tuc-hanh-chinh/[slug]` *(chưa có forms — xem B10)*
- [x] Phản ánh `/phan-anh`
- [x] Hỏi đáp `/hoi-dap` + `/hoi-dap/gui-cau-hoi` (B9)
- [x] Thư viện ảnh `/thu-vien-anh` + `/thu-vien-anh/[slug]` (B9)
- [x] Video `/video` + `/video/[slug]` (B9)
- [x] Chính sách pháp luật `/chinh-sach-phap-luat` (B9)
- [x] Truy nã `/truy-na` (B9)
- [x] Sơ đồ trang `/so-do-trang` (B9)

### API
- [x] `POST /api/feedback` — nhận phản ánh, gửi email
- [x] `POST /api/qna` — nhận câu hỏi, gửi email thông báo (B11)

---

## ⏳ CÒN LẠI — LẬP TRÌNH VIÊN (4 việc)

### B9 — Trang còn thiếu (1 trang)
- [ ] `/lich-tiep-cong-dan` — Lịch tiếp công dân theo tháng
  - Dùng `getScheduleByMonth(startDate, endDate)` → `CitizenSchedule[]`
  - searchParams `?month=YYYY-MM`, mặc định tháng hiện tại
  - Hiển thị theo bảng, thông tin cán bộ trực

### B10 — Biểu mẫu tải về
- [ ] Thêm section "Biểu mẫu" vào `app/(web)/thu-tuc-hanh-chinh/[slug]/page.tsx`
  - `proc.forms?: ProcedureForm[]` = `[{ title, fileUrl }]`
  - Đặt sau block `steps`, nút tải cho từng biểu mẫu

### B12 — Cập nhật trang chủ
- [ ] `app/(web)/page.tsx` — thêm 4 sections mới:
  1. `<NewsCarousel posts={featuredNews} />` — sau HeroSection
  2. `<NguoiTotViecTot posts={nguoiTotPosts} />` — sau LatestNews
  3. `<PhotoAlbumPreview albums={albums} />` — sau NguoiTotViecTot
  4. `<VideoPreview videos={videos} />` — trước ContactInfo
  - Cần import: `getFeaturedNews`, `getNguoiTotViecTot`, `getPhotoAlbums(4)`, `getVideos("all", 4)`

### B13 — Cập nhật navigation
- [ ] `constants/nav.ts` — thêm vào NAV_ITEMS:
  - `{ label: "Hỏi đáp", href: "/hoi-dap" }`
  - `{ label: "Thư viện", href: "/thu-vien-anh", children: [Ảnh, Video] }`
  - `{ label: "Chính sách PL", href: "/chinh-sach-phap-luat" }`
  - `{ label: "Lịch tiếp dân", href: "/lich-tiep-cong-dan" }`

---

## ⏳ CHƯA LÀM — ĐƠN VỊ THỰC HIỆN

- [ ] A1 — Tạo tài khoản Sanity → lấy Project ID + Read Token → điền `.env.local`
- [ ] A2 — Tạo tài khoản Resend → lấy API key → điền `.env.local`
- [ ] A3 — Nhập nội dung mẫu vào Sanity Studio *(cần A1 xong trước)*
- [ ] A4 — Upload logo chính thức vào `public/logo/`
- [ ] A5 — Xác nhận địa chỉ, SĐT, email trong `constants/site.ts`
- [ ] A6 — Deploy lên Vercel *(cần A1+A2 xong)*
- [ ] A7 — Chạy `npm install` sau khi pull code mới nhất (embla-carousel)
