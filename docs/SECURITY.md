# BẢO MẬT HỆ THỐNG

**Dự án:** Cổng thông tin Công an phường Bình Dương  
**Chuẩn tham chiếu:** OWASP Top 10, Next.js Security Best Practices  
**Cập nhật:** 19/05/2026

---

## I. THREAT MODEL

### Tài sản cần bảo vệ

| Tài sản | Mức độ nhạy cảm | Rủi ro nếu bị xâm phạm |
|---|---|---|
| Thông tin người dân gửi phản ánh (tên, SĐT, nội dung) | 🔴 Cao | Lộ danh tính người tố giác tội phạm |
| `RESEND_API_KEY` | 🔴 Cao | Spam email hàng loạt, tốn chi phí |
| `STUDIO_BASIC_PASS` + tài khoản admin | 🔴 Cao | Chỉnh sửa nội dung chính thống của đơn vị |
| `SANITY_API_TOKEN` | 🟡 Trung bình | Đọc/ghi nội dung CMS không qua Studio |
| `CONTACT_EMAIL` | 🟡 Trung bình | Spam, phishing nhắm vào đơn vị |
| Nội dung trang web (tin tức, văn bản) | 🟡 Trung bình | Defacement, phát tán tin giả |

### STRIDE Analysis

| Mối đe dọa | Điểm tấn công | Mức độ | Trạng thái |
|---|---|---|---|
| **Spoofing** — giả mạo request đến API feedback | `POST /api/feedback` không có auth | 🔴 Cao | ✅ Zod validation + escapeHtml |
| **Tampering** — chỉnh sửa nội dung CMS qua Sanity API | Token Sanity lộ ra client | 🟡 Trung bình | ✅ Token server-only |
| **Repudiation** — spam feedback không có audit trail | Không có server-side logging | 🟡 Trung bình | ⏳ Chưa có rate limiting |
| **Information Disclosure** — lộ env vars ra browser | `NEXT_PUBLIC_` prefix dùng sai | 🔴 Cao | ✅ Phân tách đúng |
| **Denial of Service** — spam form → vét quota Resend | Không có rate limiting | 🔴 Cao | ⏳ Chưa triển khai |
| **Elevation of Privilege** — truy cập `/studio` trái phép | Không có auth middleware | 🟡 Trung bình | ✅ Basic Auth middleware |

---

## II. CÁC LỚP BẢO MẬT ĐÃ TRIỂN KHAI

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
