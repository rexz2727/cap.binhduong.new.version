# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dự án

Cổng thông tin chính thống của **Công an phường Bình Dương** (TP.HCM) — tin tức an ninh, thủ tục hành chính, phản ánh trực tuyến, hỏi đáp, thư viện ảnh/video, danh sách truy nã.

## Tech Stack thực tế

| Thành phần | Phiên bản | Lưu ý quan trọng |
|---|---|---|
| Next.js | 16.2.6 | App Router. **Có breaking changes** — xem `node_modules/next/dist/docs/` trước khi code |
| React | 19.2.4 | |
| Tailwind CSS | v4 | **Khác hoàn toàn v3**: không dùng `tailwind.config.js`, cấu hình qua CSS |
| Sanity | v5 | Headless CMS duy nhất — **không có database khác** |
| Zod | v4 | **Khác v3**: `.email()` không nhận tham số, nhiều API thay đổi |
| Resend | v6 | Gửi email phản ánh |

Dự án **không** dùng PostgreSQL, Prisma, Jest, hay Playwright.

## Lệnh

```bash
npm install          # Cài đặt
npm run dev          # Dev server (localhost:3000)
npm run build        # Build production
npm run lint         # ESLint
```

Không có lệnh test. Sanity Studio chạy tại `localhost:3000/studio`.

## Biến môi trường (`.env.local`)

```env
NEXT_PUBLIC_SITE_URL=https://cap-binhduong.vercel.app
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com
# Tuỳ chọn — bảo vệ /studio bằng Basic Auth khi deploy
STUDIO_BASIC_USER=admin
STUDIO_BASIC_PASS=secret
```

## Kiến trúc

### Luồng dữ liệu

```
Sanity CMS (cloud)
  └── sanity/lib/client.ts        ← Sanity client
  └── sanity/lib/queries.ts       ← Tất cả GROQ queries, có ISR revalidate
        └── Server Components     ← Gọi trực tiếp, không qua API
              └── Page / Section components
```

Toàn bộ dữ liệu đến từ Sanity qua GROQ. Tất cả queries đều bọc trong `safeFetch()` — trả về `[]` hoặc `null` khi chưa cấu hình Sanity, cho phép dev local không cần kết nối CMS.

### Route Groups

```
app/
  (web)/          # Trang công khai — có layout riêng (Header, Footer)
  (admin)/        # Sanity Studio tại /studio
  api/
    feedback/     # POST — nhận phản ánh, gửi email qua Resend (Zod validated)
    qna/          # POST — gửi câu hỏi mới
```

### Bảo vệ Studio

`middleware.ts` áp dụng HTTP Basic Auth cho `/studio/:path*` khi có env `STUDIO_BASIC_USER` + `STUDIO_BASIC_PASS`. Nếu thiếu env thì bỏ qua (dev mode).

### Sanity Schemas

`sanity/schemas/` định nghĩa 11 content types: `newsPost`, `legalDocument`, `personnel`, `procedure`, `photoAlbum`, `video`, `qna`, `announcement`, `draftDocument`, `wantedPerson`, `citizenSchedule`.

Mỗi content type có file TypeScript tương ứng trong `types/` và query functions trong `sanity/lib/queries.ts`.

### ISR Revalidation

Queries dùng `{ next: { revalidate: N } }` với các mốc: 120s (thông báo khẩn), 300s (tin tức), 3600s (thủ tục/văn bản), 86400s (nhân sự).

### Security Headers

Khai báo đầy đủ trong `next.config.ts` (HSTS, CSP, X-Frame-Options...). CSP chỉ cho phép `cdn.sanity.io` cho images và `*.sanity.io` cho API — cần cập nhật nếu thêm nguồn bên ngoài.

## Nguyên tắc hành vi cốt lõi

Các nguyên tắc này ưu tiên **SỰ CẨN TRỌNG** hơn tốc độ:

### A. Suy nghĩ trước khi lập trình
- Phải phân tích sâu sắc yêu cầu hệ thống trước khi gõ bất kỳ dòng mã nào.
- Luôn nêu rõ các giả định của mình trước khi triển khai. Nếu không chắc chắn, phải dừng lại và hỏi người dùng.
- Nếu có nhiều cách giải quyết một bài toán, hãy trình bày các giải pháp đánh đổi và chờ phản hồi, không tự ý lựa chọn.
- Luôn "phê bình" (criticize) các đề xuất của chính mình để phát hiện lỗi tiềm ẩn trước khi đồng ý thực hiện.

### B. Sự đơn giản là tối thượng
- Chỉ viết lượng code tối thiểu cần thiết để giải quyết triệt để vấn đề. Không tự ý suy diễn tính năng tương lai.
- Không tạo các lớp trừu tượng (abstraction) phức tạp cho các đoạn mã chỉ sử dụng một lần.
- Không cố tình "linh hoạt hóa" hoặc "cấu hình hóa" nếu đề bài không yêu cầu cụ thể.
- Nếu một đoạn mã có thể viết trong 50 dòng mà bạn viết tới 200 dòng, hãy cấu trúc lại ngay lập tức.

### C. Thay đổi có mục tiêu (Minimal Diff)
- Chỉ chạm và chỉnh sửa các file/hàm nằm trong phạm vi bắt buộc của tác vụ.
- Giữ nguyên phong cách (style), định dạng và chú thích (comments) của các đoạn mã liền kề, ngay cả khi bạn có thể viết tốt hơn.
- Không tự ý tái cấu trúc (refactor) những đoạn mã cũ không bị hỏng, trừ khi có yêu cầu trực tiếp.
- Dọn dẹp sạch sẽ: Xóa bỏ toàn bộ `import` thừa, biến hoặc hàm không sử dụng do chính thay đổi của bạn tạo ra.

### D. Kiểm tra và Xác minh
- Chuyển đổi mọi nhiệm vụ thành các mục tiêu có thể đo lường và xác minh rõ ràng.
- Luôn chạy `npm run build` sau khi sửa để xác nhận không có lỗi TypeScript/build (không có test runner).
- Báo cáo rõ ràng: Kết quả cuối cùng phải nêu rõ những gì đã thay đổi và bằng chứng cho thấy nó đã hoạt động ổn định.

### E. Bảo mật — không bao giờ bỏ qua
- Validate toàn bộ input tại API routes bằng Zod trước khi xử lý.
- Escape HTML (`escapeHtml`) trước khi nhúng dữ liệu user vào email HTML (xem pattern tại `app/api/feedback/route.ts`).
- Không được nới lỏng CSP trong `next.config.ts` nếu không có lý do cụ thể — đây là cổng thông tin chính quyền.
- Biến môi trường nhạy cảm (`SANITY_API_TOKEN`, `RESEND_API_KEY`) chỉ dùng server-side, không được prefix `NEXT_PUBLIC_`.

### F. Quy ước thêm nội dung Sanity
- Thêm content type mới: tạo schema trong `sanity/schemas/`, đăng ký trong `sanity/schemas/index.ts`, thêm TypeScript type trong `types/`, viết query trong `sanity/lib/queries.ts` — theo đúng thứ tự này.
- Mọi query mới phải bọc trong `safeFetch()` với fallback phù hợp (`[]` hoặc `null`) và khai báo `revalidate` hợp lý.
- Ảnh từ Sanity phải dùng `@sanity/image-url` để build URL — không hardcode `cdn.sanity.io`.
