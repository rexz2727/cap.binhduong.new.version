# KẾ HOẠCH DỰ ÁN

**Dự án:** Cổng thông tin Công an phường Bình Dương  
**Người thực hiện:** Rex Nguyen  
**Ngày lập:** 18/05/2026 | **Cập nhật:** 19/05/2026  
**Mục tiêu hoàn thành:** Quý III/2026

---

## I. BẢN ĐỒ FILE HIỆN TẠI

```
/ (root)
├── next.config.ts              ✅ Security headers đầy đủ
├── middleware.ts               ✅ Basic Auth /studio
├── tsconfig.json               ✅
├── eslint.config.mjs           ✅ eslint-plugin-security
├── .env.local                  ⚠️  Còn placeholder — cần điền thật
│
├── constants/
│   ├── site.ts                 ⚠️  Cần xác nhận SĐT/địa chỉ chính thức
│   └── nav.ts                  ⏳ Cần thêm mục menu Giai đoạn 2 (B13)
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
│   │   ├── MobileMenu.tsx      ✅ cần cập nhật menu mới (B13)
│   │   ├── PageTransition.tsx  ✅ CSS thuần, không framer-motion
│   │   └── NewsTicker.tsx      ✅
│   ├── sections/
│   │   ├── HeroSection.tsx     ✅ blur-xl (đã tối ưu GPU)
│   │   ├── HeroSearch.tsx      ✅
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
│   ├── (admin)/studio/         ✅
│   ├── (web)/
│   │   ├── layout.tsx          ✅ CopBubble tích hợp
│   │   ├── loading.tsx         ✅ Skeleton
│   │   ├── page.tsx            ⏳ Cần thêm 4 sections (B12)
│   │   ├── tin-tuc/            ✅
│   │   ├── van-ban-phap-luat/  ✅
│   │   ├── thu-tuc-hanh-chinh/ ⏳ Cần thêm biểu mẫu tải về (B10)
│   │   ├── gioi-thieu/         ✅
│   │   ├── phan-anh/           ✅
│   │   ├── hoi-dap/            ✅
│   │   ├── thu-vien-anh/       ✅
│   │   ├── video/              ✅
│   │   ├── chinh-sach-phap-luat/ ✅
│   │   ├── truy-na/            ✅
│   │   ├── so-do-trang/        ✅
│   │   └── lich-tiep-cong-dan/ ❌ Chưa có (B9)
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

## II. CÔNG NGHỆ

| Hạng mục | Công nghệ | Ghi chú |
|---|---|---|
| Nền tảng | Next.js 16, App Router | Breaking changes — đọc docs trước khi code |
| Giao diện | React 19, Tailwind CSS v4 | v4 khác hoàn toàn v3 |
| CMS | Sanity v5 | Không có database khác |
| Email | Resend v6 | 100 email/ngày miễn phí |
| Validation | Zod v4 | v4 có breaking changes |
| Deploy | Vercel | Free tier, CDN toàn cầu |

---

## III. PHẠM VI CHỨC NĂNG

### Giai đoạn 1 — Nền tảng cốt lõi ✅ HOÀN THÀNH

| # | Tính năng | Trạng thái |
|---|---|---|
| 1 | Trang chủ với thông tin tổng quan | ✅ |
| 2 | Giới thiệu đơn vị, ban lãnh đạo | ✅ |
| 3 | Tin tức — đăng, tìm kiếm, lọc danh mục | ✅ |
| 4 | Văn bản pháp luật — tra cứu, tải về | ✅ |
| 5 | Thủ tục hành chính — hướng dẫn chi tiết | ✅ |
| 6 | Form phản ánh trực tuyến (gửi qua email) | ✅ |
| 7 | Bảo mật: Basic Auth, security headers OWASP | ✅ |
| 8 | Tối ưu: CDN, font, loading skeleton | ✅ |

### Giai đoạn 2 — Mở rộng tính năng 🔄 ĐANG THỰC HIỆN

| Mã | Tính năng | Trạng thái |
|---|---|---|
| B5 | GROQ queries đầy đủ (19 queries) | ✅ |
| B6 | Thư viện carousel (embla) | ✅ cài, cần `npm install` |
| B7 | 12 components mới | ✅ |
| B8 | Cập nhật Header, Footer, MobileMenu, QuickLinks | ✅ |
| B9 | 8/9 trang Giai đoạn 2 | ✅ thiếu `/lich-tiep-cong-dan` |
| B10 | Biểu mẫu tải về trong trang thủ tục | ⏳ |
| B11 | API `POST /api/qna` | ✅ |
| B12 | Cập nhật trang chủ (4 sections mới) | ⏳ |
| B13 | Cập nhật navigation (4 mục mới) | ⏳ |

### Còn lại cần làm (lập trình viên)

**1. Trang `/lich-tiep-cong-dan`**
- Dùng `getScheduleByMonth(startDate, endDate)` → `CitizenSchedule[]`
- `searchParams ?month=YYYY-MM`, mặc định tháng hiện tại
- Hiển thị bảng theo ngày, thông tin cán bộ trực

**2. Biểu mẫu tải về (B10)**
- Thêm section vào `app/(web)/thu-tuc-hanh-chinh/[slug]/page.tsx`
- Field: `proc.forms?: { title: string, fileUrl: string }[]`
- Đặt sau block `steps`

**3. Cập nhật trang chủ (B12)**
- `app/(web)/page.tsx` — thêm theo thứ tự:
  1. `<NewsCarousel />` — sau HeroSection
  2. `<NguoiTotViecTot />` — sau LatestNews
  3. `<PhotoAlbumPreview />` — sau NguoiTotViecTot
  4. `<VideoPreview />` — trước ContactInfo

**4. Cập nhật navigation (B13)**
- `constants/nav.ts` — thêm: Hỏi đáp, Thư viện (Ảnh/Video), Chính sách PL, Lịch tiếp dân

---

## IV. PHÂN CÔNG ĐƠN VỊ

| Mã | Nội dung | Trạng thái |
|---|---|---|
| A1 | Tạo tài khoản Sanity → lấy Project ID + Token | ⏳ |
| A2 | Tạo tài khoản Resend → lấy API key | ⏳ |
| A3 | Nhập nội dung mẫu vào Sanity Studio | ⏳ Cần A1 |
| A4 | Upload logo chính thức vào `public/logo/` | ⏳ |
| A5 | Xác nhận địa chỉ, SĐT, email trong `constants/site.ts` | ⏳ |
| A6 | Deploy Vercel + điền env vars | ⏳ Cần A1+A2 |
| A7 | Chạy `npm install` sau khi pull code mới nhất | ⏳ |

---

## V. TIẾN ĐỘ ĐỀ XUẤT

```
Tuần 3 (19–25/05):  B10 + B12 + B13 + trang /lich-tiep-cong-dan
Tuần 4 (26–01/06):  Tích hợp nội dung thật từ đơn vị (A3–A5)
Tuần 5 (02–08/06):  Kiểm thử tổng thể + tối ưu
Tuần 6 (09–15/06):  Deploy chính thức (A6)

Song song: Đơn vị thực hiện A1 → A2 → A3 → A4 → A5
```

---

## VI. CHI PHÍ HẠ TẦNG

| Dịch vụ | Gói | Chi phí |
|---|---|---|
| Sanity CMS | Free (đủ cho quy mô phường) | 0 đ/tháng |
| Resend email | Free (100 email/ngày) | 0 đ/tháng |
| Vercel hosting | Free (1 project) | 0 đ/tháng |
| Tên miền (tuỳ chọn) | .vn hoặc .gov.vn | ~300.000 đ/năm |

---

*Cổng thông tin Công an phường Bình Dương — Cập nhật 19/05/2026*
