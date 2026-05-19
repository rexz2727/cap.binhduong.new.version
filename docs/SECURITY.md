# BẢO MẬT HỆ THỐNG

**Dự án:** Cổng thông tin Công an phường Bình Dương  
**Chuẩn tham chiếu:** OWASP Top 10, Next.js Security Best Practices  
**Cập nhật:** 19/05/2026

---

## I. CÁC LỚP BẢO MẬT ĐÃ TRIỂN KHAI

### 1. Security Headers (`next.config.ts`)

| Header | Giá trị | Mục đích |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Bắt buộc HTTPS |
| `X-Frame-Options` | `DENY` | Chặn Clickjacking |
| `X-Content-Type-Options` | `nosniff` | Chặn MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Kiểm soát Referer header |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Chặn truy cập thiết bị |
| `X-DNS-Prefetch-Control` | `on` | Tối ưu DNS |

### 2. Content Security Policy (CSP)

```
default-src 'self'
script-src  'self' 'unsafe-eval' 'unsafe-inline'
style-src   'self' 'unsafe-inline' https://fonts.googleapis.com
font-src    'self' https://fonts.gstatic.com
img-src     'self' data: blob: https://cdn.sanity.io
connect-src 'self' https://*.sanity.io https://api.sanity.io wss://*.sanity.io
frame-src   'none'
object-src  'none'
base-uri    'self'
form-action 'self'
upgrade-insecure-requests
```

> ⚠️ `unsafe-eval` và `unsafe-inline` trong `script-src` là yêu cầu của Sanity Studio. Không được xóa khi Studio còn tại `/studio`.

### 3. Bảo vệ Sanity Studio (`middleware.ts`)

HTTP Basic Auth áp dụng cho `/studio/:path*`. Khi không có env `STUDIO_BASIC_USER` / `STUDIO_BASIC_PASS` thì bỏ qua (dev mode). **Bắt buộc** thiết lập khi deploy production.

```env
STUDIO_BASIC_USER=<tên đăng nhập>
STUDIO_BASIC_PASS=<mật khẩu mạnh>
```

### 4. Input Validation — Zod (`app/api/`)

Mọi dữ liệu từ user được validate bằng Zod trước khi xử lý. Trả `422` với thông báo cụ thể khi không hợp lệ.

Schema feedback: `fullName` (2–100 ký tự), `phone` (regex VN `^(0|\+84)[0-9]{8,9}$`), `subject` (5–200), `content` (20–5000).

### 5. HTML Injection Prevention

Mọi chuỗi do user nhập được escape trước khi nhúng vào HTML email (xem `app/api/feedback/route.ts:5`):

```ts
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
```

### 6. Phân tách Server/Client Secret

| Biến | Vị trí | Lý do |
|---|---|---|
| `SANITY_API_TOKEN` | Server-only | Token ghi — không được lộ ra browser |
| `RESEND_API_KEY` | Server-only | API key email |
| `STUDIO_BASIC_PASS` | Server-only | Mật khẩu admin |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public | Chỉ là project ID đọc |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | Tên dataset |

### 7. Dependency Vulnerabilities — Đã vá (18/05/2026)

| Lỗ hổng | Package gốc | CVE | Cách vá |
|---|---|---|---|
| XSS via `</style>` | `postcss < 8.5.10` | GHSA-qx2v-qp2m-jg93 | Override `postcss ^8.5.10` |
| Prototype pollution | `js-yaml < 3.14.2` | GHSA-mh29-5h37-fv8m | Override `js-yaml ^3.14.2` |

Trạng thái hiện tại: `npm audit` → **0 vulnerabilities**

---

## II. GROQ INJECTION PREVENTION

GROQ params **luôn** truyền qua object, không nối chuỗi:

```ts
// ✅ Đúng
client.fetch(groq`*[_type == "newsPost" && slug.current == $slug][0]`, { slug })

// ❌ Sai — có thể bị GROQ injection
client.fetch(groq`*[_type == "newsPost" && slug.current == "${slug}"][0]`)
```

---

## III. CHECKLIST TRƯỚC KHI DEPLOY

- [ ] `STUDIO_BASIC_USER` và `STUDIO_BASIC_PASS` đã đặt trên Vercel
- [ ] `SANITY_API_TOKEN` và `RESEND_API_KEY` không có prefix `NEXT_PUBLIC_`
- [ ] `npm audit` → 0 vulnerabilities
- [ ] CSP không có domain lạ ngoài `sanity.io`, `fonts.google*`
- [ ] Không có `console.log` chứa dữ liệu nhạy cảm trong code

---

## IV. RỦI RO CÒN TỒN TẠI

| Rủi ro | Mức độ | Lý do chưa xử lý | Kế hoạch |
|---|---|---|---|
| `unsafe-inline` trong CSP | Trung bình | Sanity Studio yêu cầu | Cân nhắc tách Studio sang subdomain sau khi ra mắt |
| Rate limiting API routes | Trung bình | Chưa triển khai | Thêm Vercel Edge rate limit hoặc Upstash Redis |
| Không có CAPTCHA form phản ánh | Thấp | Quy mô hiện tại chưa cần | Thêm nếu spam xảy ra |
| Audit log hành động admin | Thấp | Ngoài phạm vi Giai đoạn 2 | Xem xét Giai đoạn 3 |

---

## V. QUY TẮC CHO LẬP TRÌNH VIÊN

1. Không nới CSP nếu không có lý do cụ thể — đây là cổng thông tin chính quyền
2. Không thêm `NEXT_PUBLIC_` cho bất kỳ secret nào
3. Mọi API route mới phải có Zod schema validation
4. Mọi dữ liệu user nhúng vào HTML phải qua `escapeHtml()`
5. Chạy `npm audit` trước mỗi lần deploy
6. GROQ params luôn truyền qua object `{ param }`, không nối chuỗi

---

*Cổng thông tin Công an phường Bình Dương — Cập nhật 19/05/2026*
