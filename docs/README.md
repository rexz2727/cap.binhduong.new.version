# Cổng thông tin Công an phường Bình Dương

Cổng thông tin chính thống của Công an phường Bình Dương — phục vụ nhân dân, đảm bảo an ninh trật tự.

## Tính năng

- Tin tức an ninh trật tự cập nhật hàng tuần
- Văn bản pháp luật, thủ tục hành chính (cư trú, CCCD, VNeID, đăng ký xe)
- Gửi phản ánh trực tuyến (ẩn danh hoặc có tên)
- Tìm kiếm thủ tục và nội dung an ninh ngay tại trang chủ
- Thông tin ban lãnh đạo, sơ đồ tổ chức, lịch tiếp công dân
- Đường dây khẩn cấp 113 / 114 / 115

## Công nghệ

| Thành phần | Công nghệ |
|------------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| CMS | Sanity v5 |
| Email | Resend |
| Validation | Zod |
| Deploy | Vercel |

## Cài đặt

```bash
npm install
```

Tạo file `.env.local` từ mẫu dưới đây:

```env
NEXT_PUBLIC_SITE_URL=https://cap-binhduong.vercel.app

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com
```

## Chạy local

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem trang web.  
Sanity Studio tại [http://localhost:3000/studio](http://localhost:3000/studio).

## Lệnh

```bash
npm run dev      # Chạy môi trường phát triển
npm run build    # Build production
npm run lint     # Kiểm tra ESLint
```

## Cấu trúc thư mục

```
app/
  (web)/          # Trang công khai
  (admin)/        # Sanity Studio
  api/feedback/   # API nhận phản ánh
components/
  layout/         # Header, Footer, PageTransition
  sections/       # Hero, ContactInfo, GioiThieuTabs...
  ui/             # Button, Badge, CopBubble...
constants/        # Thông tin site, điều hướng
sanity/           # Cấu hình CMS và schemas
types/            # TypeScript types
```

## Bảo mật

- Security headers đầy đủ (HSTS, CSP, X-Frame-Options...)
- Validate và escape toàn bộ input người dùng trước khi xử lý
- Biến môi trường nhạy cảm không được commit lên repo

## Liên hệ

**Công an phường Bình Dương**  
Số 01, Đường D27, KP. Hòa Phú 1, Phường Bình Dương, TP. Hồ Chí Minh  
Điện thoại: 0274 3515 097 | Khẩn cấp: **113**
