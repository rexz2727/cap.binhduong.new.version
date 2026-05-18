# Cổng thông tin Công an phường Bình Dương — Kế hoạch tổng hợp

> **File duy nhất** — thay thế hai file kế hoạch cũ:
> - `2026-05-15-website-cong-an-phuong-binh-duong.md` (Phase 1)
> - `2026-05-18-phase2-mo-rong-tinh-nang.md` (Phase 2)
>
> Cập nhật lần cuối: **18/05/2026**

---

## Thông tin dự án

| Hạng mục | Giá trị |
|----------|---------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| CMS | Sanity v5 |
| Email | Resend |
| Validation | Zod |
| Deploy | Vercel |
| Branch chính | `main` |

---

## Bản đồ File — Toàn dự án

```
/ (root)
├── next.config.ts                               ✅ Xong
├── tsconfig.json                                ✅ Xong
├── middleware.ts                                ❌ TODO: Basic Auth cho /studio
├── .env.local                                   ⚠️  Còn placeholder — cần điền thật
├── .env.local.example                           ✅ Xong
│
├── constants/
│   ├── site.ts                                  ✅ Xong — cần xác nhận SĐT/địa chỉ thật
│   └── nav.ts                                   ⚠️  Cần thêm mục menu Phase 2
│
├── types/
│   ├── sanity.ts                                ✅ Xong
│   ├── news.ts                                  ✅ Xong — cần thêm: isFeatured, isNguoiTotViecTot
│   ├── legalDocument.ts                         ✅ Xong — cần thêm: documentType, status, downloadUrl
│   ├── personnel.ts                             ✅ Xong
│   ├── procedure.ts                             ✅ Xong — cần thêm: legalBasis, forms[], onlineServiceUrl
│   ├── photoAlbum.ts                            ❌ Chưa có
│   ├── video.ts                                 ❌ Chưa có
│   ├── qna.ts                                   ❌ Chưa có
│   ├── draftDocument.ts                         ❌ Chưa có
│   ├── announcement.ts                          ❌ Chưa có
│   ├── wantedPerson.ts                          ❌ Chưa có
│   └── citizenSchedule.ts                       ❌ Chưa có
│
├── sanity/
│   ├── sanity.config.ts                         ✅ Xong
│   ├── lib/
│   │   ├── client.ts                            ✅ Xong
│   │   └── queries.ts                           ✅ Xong — cần thêm queries Phase 2
│   └── schemas/
│       ├── index.ts                             ✅ Xong — cần export schemas mới
│       ├── news.ts                              ✅ Xong — cần thêm fields
│       ├── legalDocument.ts                     ✅ Xong — cần thêm fields
│       ├── personnel.ts                         ✅ Xong
│       ├── procedure.ts                         ✅ Xong — cần thêm fields
│       ├── photoAlbum.ts                        ❌ Chưa có
│       ├── video.ts                             ❌ Chưa có
│       ├── qna.ts                               ❌ Chưa có
│       ├── draftDocument.ts                     ❌ Chưa có
│       ├── announcement.ts                      ❌ Chưa có
│       ├── wantedPerson.ts                      ❌ Chưa có
│       └── citizenSchedule.ts                   ❌ Chưa có
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                           ✅ Xong — cần thêm: LiveClock, social icons, NewsTicker
│   │   ├── Footer.tsx                           ✅ Xong — cần thêm: cơ quan liên quan, sitemap link
│   │   ├── MobileMenu.tsx                       ✅ Xong — cần cập nhật menu mới
│   │   ├── PageTransition.tsx                   ✅ Xong
│   │   └── NewsTicker.tsx                       ❌ Chưa có
│   ├── sections/
│   │   ├── HeroSection.tsx                      ✅ Xong — sẽ thay bằng NewsCarousel
│   │   ├── NewsCarousel.tsx                     ❌ Chưa có
│   │   ├── LatestNews.tsx                       ✅ Xong
│   │   ├── QuickLinks.tsx                       ✅ Xong — cần thêm: Hỏi đáp, Lịch tiếp dân
│   │   ├── ContactInfo.tsx                      ✅ Xong
│   │   ├── GioiThieuTabs.tsx                    ✅ Xong
│   │   ├── HeroSearch.tsx                       ✅ Xong
│   │   ├── NguoiTotViecTot.tsx                  ❌ Chưa có
│   │   ├── PhotoAlbumPreview.tsx                ❌ Chưa có
│   │   └── VideoPreview.tsx                     ❌ Chưa có
│   ├── ui/
│   │   ├── Badge.tsx                            ✅ Xong
│   │   ├── Button.tsx                           ✅ Xong
│   │   ├── CopBubble.tsx                        ✅ Xong
│   │   ├── LegalDocCard.tsx                     ✅ Xong
│   │   ├── NewsCard.tsx                         ✅ Xong
│   │   ├── PageHeader.tsx                       ✅ Xong
│   │   ├── Sidebar.tsx                          ❌ Chưa có
│   │   ├── PhotoLightbox.tsx                    ❌ Chưa có
│   │   ├── VideoPlayer.tsx                      ❌ Chưa có
│   │   ├── QnaCard.tsx                          ❌ Chưa có
│   │   └── WantedCard.tsx                       ❌ Chưa có
│   ├── LiveClock.tsx                            ❌ Chưa có
│   └── forms/
│       └── QnaForm.tsx                          ❌ Chưa có
│
├── app/
│   ├── layout.tsx                               ✅ Xong
│   ├── globals.css                              ✅ Xong
│   ├── (admin)/studio/[[...tool]]/page.tsx      ✅ Xong
│   ├── (web)/
│   │   ├── layout.tsx                           ✅ Xong
│   │   ├── page.tsx                             ✅ Xong — cần thêm sections Phase 2
│   │   ├── tin-tuc/page.tsx                     ✅ Xong
│   │   ├── tin-tuc/[slug]/page.tsx              ✅ Xong
│   │   ├── van-ban-phap-luat/page.tsx           ✅ Xong
│   │   ├── van-ban-phap-luat/[slug]/page.tsx    ✅ Xong
│   │   ├── thu-tuc-hanh-chinh/page.tsx          ✅ Xong
│   │   ├── thu-tuc-hanh-chinh/[slug]/page.tsx   ✅ Xong — cần bổ sung: biểu mẫu, cơ sở PL
│   │   ├── gioi-thieu/page.tsx                  ✅ Xong
│   │   ├── phan-anh/page.tsx                    ✅ Xong
│   │   ├── hoi-dap/page.tsx                     ❌ Chưa có
│   │   ├── hoi-dap/gui-cau-hoi/page.tsx         ❌ Chưa có
│   │   ├── thu-vien-anh/page.tsx                ❌ Chưa có
│   │   ├── thu-vien-anh/[slug]/page.tsx         ❌ Chưa có
│   │   ├── video/page.tsx                       ❌ Chưa có
│   │   ├── chinh-sach-phap-luat/page.tsx        ❌ Chưa có
│   │   ├── lich-tiep-cong-dan/page.tsx          ❌ Chưa có
│   │   ├── truy-na/page.tsx                     ❌ Chưa có
│   │   └── so-do-trang/page.tsx                 ❌ Chưa có
│   └── api/
│       ├── feedback/route.ts                    ✅ Xong
│       └── qna/route.ts                         ❌ Chưa có
│
└── public/
    ├── logo/                                    ⚠️  Chỉ có .gitkeep — cần logo thật
    └── images/                                  ⚠️  Chỉ có .gitkeep
```

---

## Trạng thái tổng quan

| Hạng mục | Tổng | Xong | Còn lại |
|----------|------|------|---------|
| Trang (pages) | 19 | 10 | 9 |
| Sanity schemas | 11 | 4 | 7 mới + 3 cập nhật |
| Components | 27 | 15 | 12 mới + 4 cập nhật |
| API Routes | 2 | 1 | 1 |
| Cấu hình & deploy | — | — | 3 mục (Sanity, Resend, Vercel) |

---

## Danh sách việc cần làm — theo thứ tự

### Nhóm A — Bị block bởi tài khoản bên ngoài (BẠN làm)

- [ ] **A1** Tạo Sanity project tại `sanity.io/manage` → lấy Project ID + Read Token → điền `.env.local`
- [ ] **A2** Tạo tài khoản Resend tại `resend.com` → lấy API key → điền `.env.local` + `CONTACT_EMAIL`
- [ ] **A3** Nhập dữ liệu mẫu vào Sanity Studio: 3 tin tức, 2 văn bản, 2 cán bộ, 2 thủ tục *(sau khi A1 xong)*
- [ ] **A4** Upload logo thật vào `public/logo/`
- [ ] **A5** Xác nhận địa chỉ, SĐT chính xác trong `constants/site.ts`
- [ ] **A6** Deploy lên Vercel: import repo → thêm 6 env vars → verify production *(sau khi A1+A2 xong)*

---

### Nhóm B — Tôi code được ngay (không cần Sanity thật)

- [ ] **B1** `middleware.ts` — Basic Auth bảo vệ `/studio` (đọc `STUDIO_BASIC_USER`, `STUDIO_BASIC_PASS` từ env)

- [ ] **B2** Nâng cấp 3 schemas hiện có:
  - `news.ts`: thêm `isFeatured` (boolean), `isNguoiTotViecTot` (boolean)
  - `legalDocument.ts`: thêm `documentType` (enum), `effectiveDate`, `downloadUrl`, `status` (enum)
  - `procedure.ts`: thêm `legalBasis` (array[string]), `forms[]` ({title, fileUrl}), `onlineServiceUrl`

- [ ] **B3** 7 schemas mới:
  - `photoAlbum.ts` — title, slug, coverImage, date, description, photos[] (với caption), category
  - `video.ts` — title, slug, youtubeId, thumbnail, date, description, category
  - `qna.ts` — question, askerName?, askerEmail?, category, answer (PortableText), isAnswered, answeredBy, answeredAt, viewCount, publishedAt
  - `announcement.ts` — text, url?, isActive, expiryDate, priority
  - `draftDocument.ts` — title, slug, deadline, description, file
  - `wantedPerson.ts` — fullName, aliases[], photo, birthYear, hometown, crime, warrantDate, warrantAgency, status, note
  - `citizenSchedule.ts` — officer (ref → personnel), date, timeSlot, location, note, isRegular

- [ ] **B4** 7 TypeScript types tương ứng schemas mới (`types/photoAlbum.ts`, `video.ts`, `qna.ts`, `announcement.ts`, `draftDocument.ts`, `wantedPerson.ts`, `citizenSchedule.ts`)

- [ ] **B5** GROQ queries bổ sung vào `sanity/lib/queries.ts`:
  - `getFeaturedNews()` — 5 tin `isFeatured = true` cho NewsCarousel
  - `getNguoiTotViecTot()` — 6 tin `isNguoiTotViecTot = true`
  - `getActiveAnnouncements()` — ticker active và chưa hết hạn
  - `getLegalDocsFiltered(type, status)` — filter loại + trạng thái
  - `getPhotoAlbums(limit)` — danh sách albums
  - `getPhotoAlbumBySlug(slug)` — chi tiết album + tất cả ảnh
  - `getVideos(category, limit)` — videos theo category
  - `getQnaAnswered(category, from, to)` — Q&A public đã trả lời
  - `getScheduleByMonth(startDate, endDate)` — lịch tiếp công dân
  - `getWantedPersons()` — đối tượng truy nã
  - `getDraftDocuments()` — văn bản dự thảo còn hạn góp ý

- [ ] **B6** Cài dependencies: `npm install embla-carousel-react embla-carousel-autoplay react-photo-view`

- [ ] **B7** Components mới:
  - `components/LiveClock.tsx` — client-side, setInterval 1s
  - `components/layout/NewsTicker.tsx` — marquee CSS, nền police-red-dark
  - `components/sections/NewsCarousel.tsx` — Embla, 5 tin featured, auto-play 5s
  - `components/sections/NguoiTotViecTot.tsx` — grid 3 cột, icon ⭐ gold
  - `components/sections/PhotoAlbumPreview.tsx` — 4 album mới nhất
  - `components/sections/VideoPreview.tsx` — 3 video mới nhất + modal
  - `components/ui/Sidebar.tsx` — tin mới + bài xem nhiều + liên kết ngoài
  - `components/ui/PhotoLightbox.tsx` — react-photo-view wrapper
  - `components/ui/VideoPlayer.tsx` — YouTube iframe lazy load
  - `components/ui/QnaCard.tsx` — accordion câu hỏi/trả lời
  - `components/ui/WantedCard.tsx` — ảnh + tội danh + badge trạng thái
  - `components/forms/QnaForm.tsx` — form Zod, honeypot, optional name/email

- [ ] **B8** Cập nhật components hiện có:
  - `Header.tsx` — thêm LiveClock, NewsTicker, social icons, menu mới
  - `Footer.tsx` — thêm cột "Cơ quan liên quan", sitemap link, social icons
  - `MobileMenu.tsx` — thêm mục menu mới
  - `QuickLinks.tsx` — thêm card Hỏi đáp, Lịch tiếp dân

- [ ] **B9** Trang mới:
  - `/hoi-dap` — filter chủ đề + search + QnaCard + pagination + Sidebar
  - `/hoi-dap/gui-cau-hoi` — QnaForm
  - `/thu-vien-anh` — grid albums
  - `/thu-vien-anh/[slug]` — grid ảnh + PhotoLightbox
  - `/video` — tab filter + grid + modal VideoPlayer
  - `/chinh-sach-phap-luat` — 3 tab: văn bản mới, góp ý dự thảo, hỏi đáp PL
  - `/lich-tiep-cong-dan` — calendar grid tháng
  - `/truy-na` — grid WantedCard + form tố giác
  - `/so-do-trang` — cây toàn bộ trang

- [ ] **B10** Bổ sung `/thu-tuc-hanh-chinh/[slug]` — hiển thị biểu mẫu tải về, cơ sở pháp lý, nút nộp online

- [ ] **B11** API Route `/api/qna` — Zod validate → Sanity draft → Resend email thông báo

- [ ] **B12** Cập nhật trang chủ `app/(web)/page.tsx` — thêm NewsCarousel, NguoiTotViecTot, PhotoAlbumPreview, VideoPreview

- [ ] **B13** Cập nhật `constants/nav.ts` — thêm Hỏi đáp, Thư viện (dropdown), Chính sách PL, Lịch tiếp dân

---

## Thứ tự thực hiện khuyến nghị

```
B1 → B2 → B3 → B4 → B5 → B6   (nền tảng, làm trước)
B7 → B8                          (components)
B9 → B10 → B11 → B12 → B13     (trang + API)

Song song (bạn làm):
A1 → A2 → A3 → A4 → A5 → A6
```

---

*Kế hoạch hợp nhất ngày 18/05/2026 — thay thế toàn bộ kế hoạch cũ*
