# Kế hoạch Kiểm tra Bảo mật — Website Công an Phường Bình Dương

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Kiểm tra toàn diện bảo mật của cổng thông tin Công an phường Bình Dương trước khi go-live, đảm bảo không có lỗ hổng ảnh hưởng đến dữ liệu người dân và uy tín đơn vị.

**Architecture:** Phương pháp Gray-box — có access vào source code nhưng kiểm tra từ góc độ người dùng bên ngoài. Áp dụng STRIDE threat model và OWASP Top 10 Web 2021. Kết quả ra báo cáo với mức độ ưu tiên và hướng xử lý cụ thể.

**Tech Stack cần kiểm tra:** Next.js 14 (App Router), Sanity.io v3, Resend API, Vercel Serverless, TypeScript

---

## Threat Model — STRIDE cho Hệ thống này

### Tài sản cần bảo vệ

| Tài sản | Mức độ nhạy cảm | Rủi ro nếu bị xâm phạm |
|---------|-----------------|------------------------|
| Thông tin người dân gửi phản ánh (tên, SĐT, nội dung) | 🔴 Cao | Lộ danh tính người tố giác tội phạm |
| `RESEND_API_KEY` | 🔴 Cao | Spam email hàng loạt, tốn chi phí |
| `SANITY_API_READ_TOKEN` | 🟡 Trung bình | Đọc/xóa nội dung CMS |
| `CONTACT_EMAIL` | 🟡 Trung bình | Spam, phishing |
| Nội dung trang web (tin tức, văn bản) | 🟡 Trung bình | Defacement, tin giả |
| Sanity Studio admin | 🔴 Cao | Chỉnh sửa nội dung chính thức |

### STRIDE Analysis

| Mối đe dọa | Điểm tấn công | Mức độ |
|-----------|---------------|--------|
| **Spoofing** — giả mạo request đến API feedback | `POST /api/feedback` không có auth | 🔴 Cao |
| **Tampering** — chỉnh sửa nội dung CMS qua Sanity API | Token Sanity lộ ra client | 🟡 Trung bình |
| **Repudiation** — không có audit log khi ai đó spam feedback | Không có logging phía server | 🟡 Trung bình |
| **Information Disclosure** — lộ env vars ra browser | `NEXT_PUBLIC_` prefix dùng sai | 🔴 Cao |
| **Denial of Service** — spam form phản ánh → vét quota Resend | Không có rate limiting | 🔴 Cao |
| **Elevation of Privilege** — truy cập `/studio` không được phép | Không có auth middleware | 🟡 Trung bình |

---

## Bản đồ File cần kiểm tra/tạo

```
/ (root)
├── middleware.ts                         [CREATE] — bảo vệ /studio, rate limit headers
├── app/api/feedback/route.ts             [AUDIT + FIX] — validation, rate limit, sanitize
├── sanity/lib/client.ts                  [AUDIT] — token exposure, read-only vs write token
├── next.config.ts                        [AUDIT + FIX] — security headers, CSP
├── .env.local                            [AUDIT] — kiểm tra không có secret NEXT_PUBLIC_
├── .gitignore                            [AUDIT] — đảm bảo .env.local bị ignore
└── docs/security/
    ├── threat-model.md                   [CREATE] — kết quả threat modeling
    └── audit-report.md                   [CREATE] — báo cáo tổng hợp sau audit
```

---

## Task S1: Kiểm tra Lộ Secrets & Environment Variables

**Rủi ro:** OWASP A02 — Cryptographic Failures, A05 — Security Misconfiguration  
**STRIDE:** Information Disclosure

**Files:**
- Audit: `.env.local`, `next.config.ts`, tất cả `*.ts` trong `sanity/lib/`

- [ ] **S1.1: Kiểm tra env vars không bị expose ra client**

Chạy lệnh này để tìm bất kỳ secret nào vô tình dùng prefix `NEXT_PUBLIC_`:

```bash
grep -rn "NEXT_PUBLIC_RESEND\|NEXT_PUBLIC_CONTACT_EMAIL\|NEXT_PUBLIC_SANITY_API_TOKEN" \
  --include="*.ts" --include="*.tsx" --include="*.env*" .
```

Kết quả mong đợi: **không có kết quả nào**. Nếu có → xóa `NEXT_PUBLIC_` prefix ngay.

- [ ] **S1.2: Kiểm tra `.gitignore` bảo vệ secrets**

```bash
cat .gitignore | grep -E "\.env"
```

Kết quả mong đợi phải có ít nhất:
```
.env.local
.env*.local
```

Nếu thiếu → thêm vào `.gitignore` ngay.

- [ ] **S1.3: Quét toàn bộ codebase tìm hardcoded secrets**

```bash
grep -rn \
  -e "re_[A-Za-z0-9]\{20,\}" \
  -e "sk_[A-Za-z0-9]\{20,\}" \
  -e "AKIA[0-9A-Z]\{16\}" \
  -e "password\s*=\s*['\"][^'\"]\{6,\}" \
  --include="*.ts" --include="*.tsx" --include="*.js" \
  --exclude-dir=node_modules .
```

Kết quả mong đợi: **không có kết quả nào**.

- [ ] **S1.4: Kiểm tra git history không chứa secrets**

```bash
git log --all --oneline | head -20
git diff HEAD~1 HEAD -- .env.local 2>/dev/null || echo "No .env.local in git"
```

Nếu phát hiện secrets đã từng commit → cần dùng `git filter-branch` hoặc `BFG Repo Cleaner` để xóa khỏi history và **rotate tất cả keys bị lộ ngay lập tức**.

- [ ] **S1.5: Kiểm tra Sanity client chỉ dùng token phía server**

Đọc `sanity/lib/client.ts`, xác nhận:

```typescript
// ✅ ĐÚNG — token chỉ dùng server-side
token: process.env.SANITY_API_READ_TOKEN,  // KHÔNG có NEXT_PUBLIC_ prefix

// ❌ SAI — token lộ ra browser
token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
```

Nếu phát hiện token dùng `NEXT_PUBLIC_` → đổi tên biến và update Vercel dashboard.

- [ ] **S1.6: Verify trên browser DevTools**

```bash
npm run build && npm run start
```

Mở `http://localhost:3000`, mở DevTools → Network → tìm bất kỳ request nào trả về JSON. Kiểm tra không có field nào chứa API keys.

Mở `http://localhost:3000/__ENV` hoặc tìm trong page source `RESEND` hoặc `SANITY_API` → không được xuất hiện.

---

## Task S2: Kiểm tra & Hardening API Route `/api/feedback`

**Rủi ro:** OWASP A03 — Injection, A07 — Identification & Authentication Failures  
**STRIDE:** Spoofing, Denial of Service, Tampering

**Files:**
- Audit + Fix: `app/api/feedback/route.ts`

- [ ] **S2.1: Kiểm tra Input Validation hiện tại**

Đọc `app/api/feedback/route.ts`. Xác nhận:
- ✅ Dùng `zod` để validate schema
- ✅ Validate phone format với regex
- ✅ Giới hạn max length cho tất cả fields
- ✅ Return lỗi 422 (không phải 500) khi validation fail

Nếu thiếu bất kỳ điều nào → thêm vào.

- [ ] **S2.2: Thêm Rate Limiting vào API route**

Cài package:

```bash
npm install @upstash/ratelimit @upstash/redis
```

Nếu không muốn dùng Redis (free tier Upstash), dùng in-memory rate limit đơn giản hơn:

```typescript
// app/api/feedback/route.ts — thêm vào đầu file
import { NextResponse } from "next/server";

// In-memory store (reset khi Vercel cold start — chấp nhận được cho use case này)
const ipRequestMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;        // 3 lần submit / 10 phút
const WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Quá nhiều yêu cầu. Vui lòng thử lại sau 10 phút." },
      { status: 429 }
    );
  }

  // ... phần còn lại của handler giữ nguyên
}
```

- [ ] **S2.3: Thêm HTML Sanitization cho email output**

Nội dung người dùng nhập vào phải được escape trước khi render trong HTML email:

```typescript
// Thêm hàm này vào app/api/feedback/route.ts
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Dùng khi build HTML email:
const safeContent = escapeHtml(content).replace(/\n/g, "<br/>");
const safeName = escapeHtml(fullName);
const safeSubject = escapeHtml(subject);
```

- [ ] **S2.4: Test Rate Limiting bằng curl**

```bash
# Gửi 4 request liên tiếp từ cùng IP
for i in 1 2 3 4; do
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST http://localhost:3000/api/feedback \
    -H "Content-Type: application/json" \
    -d '{"fullName":"Test","phone":"0912345678","subject":"Test subject here","content":"Noi dung phan anh test co it nhat 20 ky tu"}'
done
```

Kết quả mong đợi: 3 lần đầu `200`, lần thứ 4 `429`.

- [ ] **S2.5: Test Validation với dữ liệu độc hại**

```bash
# Test XSS trong content
curl -s -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"fullName":"<script>alert(1)</script>","phone":"0912345678","subject":"Test XSS subject line","content":"Noi dung binh thuong co it nhat 20 ky tu de test"}' \
  | jq .

# Test oversized payload (>5000 chars content)
python3 -c "
import json, urllib.request
data = json.dumps({'fullName':'Test','phone':'0912345678','subject':'Subject test','content':'A'*6000}).encode()
req = urllib.request.Request('http://localhost:3000/api/feedback', data=data, headers={'Content-Type':'application/json'}, method='POST')
try:
    r = urllib.request.urlopen(req)
    print(r.status, r.read())
except Exception as e:
    print(e)
"
```

Kết quả mong đợi: XSS input → nhận email với `&lt;script&gt;` (escaped), không phải tag thật. Oversized → `422`.

- [ ] **S2.6: Commit fixes**

```bash
git add app/api/feedback/route.ts
git commit -m "security: add rate limiting and HTML escaping to feedback API"
```

---

## Task S3: Bảo vệ Sanity Studio `/studio`

**Rủi ro:** OWASP A01 — Broken Access Control, A07 — Auth Failures  
**STRIDE:** Elevation of Privilege, Spoofing

**Files:**
- Create: `middleware.ts`

- [ ] **S3.1: Kiểm tra trạng thái hiện tại**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/studio
```

Nếu kết quả `200` — nghĩa là bất kỳ ai cũng truy cập được Studio. Đây là rủi ro cao cho môi trường production.

- [ ] **S3.2: Tạo `middleware.ts` để bảo vệ `/studio`**

Đây là cách đơn giản nhất không cần thêm auth provider — dùng Basic Auth hoặc kiểm tra IP:

```typescript
// middleware.ts (đặt ở root, cùng cấp với app/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Danh sách IP được phép truy cập Studio (thêm IP văn phòng vào đây)
// Để trống [] nếu muốn dùng password-based auth thay thế
const ALLOWED_IPS: string[] = [];

const STUDIO_USER = process.env.STUDIO_BASIC_USER ?? "";
const STUDIO_PASS = process.env.STUDIO_BASIC_PASS ?? "";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Chỉ áp dụng cho /studio
  if (!pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  // Nếu có cấu hình IP allowlist → kiểm tra IP
  if (ALLOWED_IPS.length > 0) {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "";
    if (!ALLOWED_IPS.includes(clientIp)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    return NextResponse.next();
  }

  // Nếu không có IP allowlist → dùng Basic Auth
  if (!STUDIO_USER || !STUDIO_PASS) {
    // Chưa cấu hình → chặn hoàn toàn trên production
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Studio is not available", { status: 403 });
    }
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const [user, pass] = decoded.split(":");
      if (user === STUDIO_USER && pass === STUDIO_PASS) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Sanity Studio — Công an phường Bình Dương"',
    },
  });
}

export const config = {
  matcher: ["/studio/:path*"],
};
```

- [ ] **S3.3: Thêm biến môi trường cho Studio auth**

Thêm vào `.env.local`:

```bash
STUDIO_BASIC_USER="admin"
STUDIO_BASIC_PASS="your-strong-password-here"  # đổi thành password thực tế
```

Thêm vào Vercel dashboard cùng tên biến với giá trị production.

- [ ] **S3.4: Cập nhật `.env.local.example`**

```bash
# .env.local.example — thêm 2 dòng này
STUDIO_BASIC_USER="admin"
STUDIO_BASIC_PASS="change-this-password"
```

- [ ] **S3.5: Kiểm tra middleware hoạt động**

```bash
npm run dev

# Test 1: Truy cập không có auth → phải yêu cầu password
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/studio
# Mong đợi: 401

# Test 2: Truy cập với sai password → phải từ chối
curl -s -o /dev/null -w "%{http_code}" \
  -u "admin:wrong-password" http://localhost:3000/studio
# Mong đợi: 401

# Test 3: Truy cập với đúng password → phải cho vào
curl -s -o /dev/null -w "%{http_code}" \
  -u "admin:your-strong-password-here" http://localhost:3000/studio
# Mong đợi: 200

# Test 4: Các trang công khai không bị ảnh hưởng
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
# Mong đợi: 200
```

- [ ] **S3.6: Commit**

```bash
git add middleware.ts .env.local.example
git commit -m "security: add Basic Auth middleware to protect /studio route"
```

---

## Task S4: HTTP Security Headers

**Rủi ro:** OWASP A05 — Security Misconfiguration  
**STRIDE:** Tampering (clickjacking), Information Disclosure

**Files:**
- Modify: `next.config.ts`

- [ ] **S4.1: Kiểm tra headers hiện tại**

```bash
npm run dev

curl -s -I http://localhost:3000/ | grep -i \
  -e "content-security-policy" \
  -e "x-frame-options" \
  -e "x-content-type-options" \
  -e "strict-transport-security" \
  -e "referrer-policy"
```

Kết quả mong đợi hiện tại: **không có headers nào** — đây là vấn đề cần fix.

- [ ] **S4.2: Thêm Security Headers vào `next.config.ts`**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    // Sanity Studio cần unsafe-eval và unsafe-inline để hoạt động
    // Trang công khai không cần — nhưng để đơn giản dùng chung 1 CSP
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",   // cần cho Sanity Studio
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://cdn.sanity.io",
      "connect-src 'self' https://*.sanity.io https://api.sanity.io wss://*.sanity.io",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **S4.3: Kiểm tra headers đã được áp dụng**

```bash
npm run dev

curl -s -I http://localhost:3000/ | grep -i \
  -e "content-security-policy" \
  -e "x-frame-options" \
  -e "x-content-type-options" \
  -e "referrer-policy" \
  -e "permissions-policy"
```

Kết quả mong đợi: **tất cả 5 headers** xuất hiện trong output.

- [ ] **S4.4: Kiểm tra Studio vẫn hoạt động với CSP mới**

```bash
npm run dev
```

Mở `http://localhost:3000/studio` trong browser, mở DevTools Console. Nếu có lỗi CSP đỏ → điều chỉnh directive trong `next.config.ts`. Studio phải load không lỗi.

- [ ] **S4.5: Test chống Clickjacking**

```bash
# X-Frame-Options: DENY phải ngăn trang bị nhúng vào iframe
curl -s -I http://localhost:3000/ | grep -i "x-frame-options"
# Mong đợi: x-frame-options: DENY
```

- [ ] **S4.6: Commit**

```bash
git add next.config.ts
git commit -m "security: add HTTP security headers (CSP, HSTS, X-Frame-Options, etc.)"
```

---

## Task S5: Kiểm tra XSS & Content Injection

**Rủi ro:** OWASP A03 — Injection  
**STRIDE:** Tampering, Information Disclosure

**Files:**
- Audit: tất cả `*.tsx` trong `app/(web)/`, `components/`

- [ ] **S5.1: Tìm tất cả nơi dùng `dangerouslySetInnerHTML`**

```bash
grep -rn "dangerouslySetInnerHTML" \
  --include="*.tsx" --include="*.ts" \
  --exclude-dir=node_modules .
```

Kết quả mong đợi: **không có kết quả nào**.

Nếu có → mỗi trường hợp phải được review cẩn thận. Nếu nội dung đến từ Sanity (Portable Text) → dùng `<PortableText>` component thay thế.

- [ ] **S5.2: Kiểm tra tất cả data từ Sanity được render đúng cách**

```bash
grep -rn "PortableText\|portableText" \
  --include="*.tsx" --include="*.ts" \
  --exclude-dir=node_modules .
```

Tất cả block content từ Sanity phải dùng `<PortableText value={...} />` — không bao giờ dùng `innerHTML` hoặc `dangerouslySetInnerHTML` trực tiếp với raw Sanity data.

- [ ] **S5.3: Kiểm tra URL parameters không được render trực tiếp**

Tìm các trang dùng `searchParams`:

```bash
grep -rn "searchParams" \
  --include="*.tsx" --include="*.ts" \
  --exclude-dir=node_modules .
```

Với mỗi kết quả, xác nhận rằng giá trị `searchParams` chỉ được dùng làm **query filter** cho Sanity, không bao giờ được render trực tiếp vào HTML như:

```tsx
// ❌ SAI — XSS nếu searchParams.category chứa <script>
<h1>Danh mục: {searchParams.category}</h1>

// ✅ ĐÚNG — chỉ dùng để lọc, không render
const docs = await getLegalDocuments(searchParams.category);
```

- [ ] **S5.4: Manual XSS test trên form phản ánh**

Mở `http://localhost:3000/phan-anh`, nhập vào ô "Nội dung":

```
<script>alert('XSS')</script>
<img src=x onerror="alert('xss')">
javascript:alert(1)
```

Submit form. Xác nhận: **không có popup alert nào**. Kiểm tra email nhận được — nội dung phải bị escaped.

---

## Task S6: Kiểm tra Dependency Vulnerabilities

**Rủi ro:** OWASP A06 — Vulnerable and Outdated Components  
**STRIDE:** Tampering (supply chain)

**Files:**
- Audit: `package.json`

- [ ] **S6.1: Chạy npm audit**

```bash
npm audit
```

Đọc output. Phân loại:
- **critical / high** → phải fix trước go-live
- **moderate** → fix trong sprint tiếp theo
- **low** → theo dõi, không khẩn cấp

- [ ] **S6.2: Fix các lỗ hổng critical/high**

```bash
npm audit fix
```

Nếu `npm audit fix` không giải quyết được (breaking changes):

```bash
npm audit fix --force  # CẢNH BÁO: có thể gây breaking changes, review kỹ sau khi chạy
```

Sau đó:

```bash
npm run build  # xác nhận build vẫn pass
npm run dev    # xác nhận app vẫn chạy
```

- [ ] **S6.3: Kiểm tra phiên bản Next.js**

```bash
node -e "const p = require('./package.json'); console.log('Next.js:', p.dependencies.next)"
```

Truy cập `https://github.com/vercel/next.js/releases` để xem phiên bản mới nhất. Nếu đang dùng phiên bản cũ hơn 2 minor versions → nâng cấp:

```bash
npm install next@latest
npm run build  # verify không lỗi
```

- [ ] **S6.4: Kiểm tra packages không cần thiết**

```bash
npx depcheck 2>/dev/null | head -30
```

Xóa packages không dùng để giảm attack surface:

```bash
npm uninstall <unused-package>
```

- [ ] **S6.5: Commit**

```bash
git add package.json package-lock.json
git commit -m "security: update vulnerable dependencies and remove unused packages"
```

---

## Task S7: Kiểm tra Cấu hình Vercel & CORS

**Rủi ro:** OWASP A05 — Security Misconfiguration  
**STRIDE:** Spoofing (CSRF), Information Disclosure

**Files:**
- Audit: `app/api/feedback/route.ts`
- Create: `app/api/feedback/route.ts` (thêm CORS check)

- [ ] **S7.1: Kiểm tra CORS trên API route**

```bash
# Test CORS từ origin khác
curl -s -I -X OPTIONS http://localhost:3000/api/feedback \
  -H "Origin: https://evil-site.com" \
  -H "Access-Control-Request-Method: POST" \
  | grep -i "access-control"
```

Kết quả mong đợi: **không có** `Access-Control-Allow-Origin: *`. Nếu có → fix ngay.

- [ ] **S7.2: Thêm Origin check vào API route**

Thêm kiểm tra `Origin` header vào `app/api/feedback/route.ts`:

```typescript
// Thêm vào đầu hàm POST, sau rate limit check
const origin = request.headers.get("origin") ?? "";
const allowedOrigins = [
  process.env.NEXT_PUBLIC_SITE_URL ?? "",
  "http://localhost:3000",
];

if (process.env.NODE_ENV === "production" && !allowedOrigins.includes(origin)) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

Thêm `NEXT_PUBLIC_SITE_URL` vào `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL="https://your-domain.vercel.app"
```

- [ ] **S7.3: Kiểm tra Vercel không expose source maps production**

```bash
# Trong next.config.ts, đảm bảo không có:
# productionBrowserSourceMaps: true
grep -n "productionBrowserSourceMaps" next.config.ts
```

Kết quả mong đợi: **không có kết quả** (mặc định Next.js tắt source maps production).

- [ ] **S7.4: Kiểm tra không có debug endpoints**

```bash
grep -rn "console\.log\|debugger" \
  --include="*.ts" --include="*.tsx" \
  app/api/ sanity/
```

Tất cả `console.log` trong API routes phải được xóa hoặc thay bằng proper logging.

- [ ] **S7.5: Commit**

```bash
git add app/api/feedback/route.ts next.config.ts
git commit -m "security: add origin validation to feedback API and remove debug logs"
```

---

## Task S8: Kiểm tra Bảo mật Sanity CMS

**Rủi ro:** OWASP A01 — Broken Access Control  
**STRIDE:** Tampering (sửa nội dung), Elevation of Privilege

- [ ] **S8.1: Kiểm tra Sanity CORS settings**

Vào Sanity dashboard (`https://sanity.io/manage` → project → API → CORS Origins).

Xác nhận chỉ có các origin được phép:
- `http://localhost:3000` (development)
- `https://your-domain.vercel.app` (production)

**Xóa** `*` (wildcard) nếu có.

- [ ] **S8.2: Kiểm tra Sanity API token permissions**

Vào Sanity dashboard → API → Tokens.

- Token trong `SANITY_API_READ_TOKEN` phải là **Viewer** (read-only), không phải Editor/Admin
- Không có token nào có quyền **Editor** hoặc **Administrator** trong `.env.local`
- Tạo token mới với quyền Viewer nếu chưa có, xóa token cũ có quyền cao hơn

- [ ] **S8.3: Kiểm tra không có write operations từ public pages**

```bash
grep -rn "client\.create\|client\.patch\|client\.delete\|client\.mutate" \
  --include="*.ts" --include="*.tsx" \
  --exclude-dir=node_modules \
  app/ components/
```

Kết quả mong đợi: **không có kết quả nào**. Tất cả write operations chỉ được phép trong `app/(admin)/` hoặc qua Sanity Studio trực tiếp.

- [ ] **S8.4: Kiểm tra Sanity dataset không phải public**

Vào Sanity dashboard → Datasets → xác nhận dataset `production` là **Private** (không phải Public).

Nếu đang là Public → đổi sang Private ngay.

---

## Task S9: Kiểm tra bằng Scanner Tự động

**Files:**
- Không tạo file mới — chỉ chạy tools

- [ ] **S9.1: Cài và chạy ESLint Security Plugin**

```bash
npm install -D eslint-plugin-security
```

Thêm vào `.eslintrc.json` (hoặc tương đương):

```json
{
  "extends": ["next/core-web-vitals", "plugin:security/recommended"],
  "plugins": ["security"]
}
```

```bash
npm run lint 2>&1 | grep -i "security\|unsafe\|inject"
```

Review và fix bất kỳ warning nào liên quan đến bảo mật.

- [ ] **S9.2: Chạy `next build` và kiểm tra output**

```bash
npm run build 2>&1 | grep -i "warn\|error"
```

Không được có lỗi. Warnings phải được đánh giá từng cái.

- [ ] **S9.3: Kiểm tra với `npm audit --audit-level=high`**

```bash
npm audit --audit-level=high
```

Exit code phải là `0` (không có high/critical vulnerabilities).

- [ ] **S9.4: Chạy OWASP ZAP Baseline Scan (nếu có Docker)**

```bash
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t http://host.docker.internal:3000 \
  -r zap-report.html
```

Xem file `zap-report.html`, tập trung vào findings mức **High** và **Medium**.

Nếu không có Docker → bỏ qua bước này, dùng kết quả từ các bước trước.

---

## Task S10: Viết Báo cáo Bảo mật

**Files:**
- Create: `docs/security/audit-report.md`

- [ ] **S10.1: Tạo thư mục**

```bash
mkdir -p docs/security
```

- [ ] **S10.2: Tạo `docs/security/audit-report.md`**

Điền vào template sau dựa trên kết quả thực tế của các Task trên:

```markdown
# Báo cáo Kiểm tra Bảo mật
**Dự án:** Website Công an phường Bình Dương  
**Ngày kiểm tra:** [ĐIỀN NGÀY]  
**Phiên bản:** 1.0  
**Người kiểm tra:** Rex Nguyen

---

## Tóm tắt điều hành

| Mức độ | Tổng phát hiện | Đã xử lý | Còn lại |
|--------|----------------|----------|---------|
| 🔴 Critical | _ | _ | _ |
| 🟠 High | _ | _ | _ |
| 🟡 Medium | _ | _ | _ |
| 🔵 Low | _ | _ | _ |

**Kết luận:** [ ✅ AN TOÀN ĐỂ GO-LIVE / ⚠️ CẦN XỬ LÝ THÊM / ❌ CHƯA SẴN SÀNG ]

---

## Chi tiết Phát hiện

### [ID] Tên lỗ hổng
- **Mức độ:** Critical / High / Medium / Low
- **Vị trí:** `file/path:line`
- **Mô tả:** 
- **Bằng chứng:**
- **Tác động:**
- **Cách xử lý:**
- **Trạng thái:** Đã xử lý / Chấp nhận rủi ro / Đang xử lý

---

## Checklist OWASP Top 10

| # | Rủi ro | Trạng thái |
|---|--------|------------|
| A01 | Broken Access Control | ✅ / ⚠️ / ❌ |
| A02 | Cryptographic Failures | ✅ / ⚠️ / ❌ |
| A03 | Injection | ✅ / ⚠️ / ❌ |
| A04 | Insecure Design | ✅ / ⚠️ / ❌ |
| A05 | Security Misconfiguration | ✅ / ⚠️ / ❌ |
| A06 | Vulnerable Components | ✅ / ⚠️ / ❌ |
| A07 | Auth & Access Failures | ✅ / ⚠️ / ❌ |
| A08 | Software & Data Integrity | ✅ / ⚠️ / ❌ |
| A09 | Logging & Monitoring | ✅ / ⚠️ / ❌ |
| A10 | Server-Side Request Forgery | ✅ N/A |

---

## Kiến nghị Dài hạn

1. Thiết lập Dependabot trên GitHub để tự động cảnh báo dependencies có lỗ hổng
2. Định kỳ review Sanity Studio access log hàng tháng  
3. Xem xét tích hợp Upstash Redis cho rate limiting mạnh hơn khi traffic tăng
4. Cài đặt Vercel Security Headers monitor để theo dõi regression
```

- [ ] **S10.3: Commit báo cáo**

```bash
git add docs/security/
git commit -m "docs: add security audit report template"
```

---

## Tóm tắt Checklist Bảo mật

| Task | Mục tiêu | Mức độ | Thời lượng |
|------|----------|--------|------------|
| S1 | Kiểm tra lộ Secrets & env vars | 🔴 Critical | 20 phút |
| S2 | Hardening API `/api/feedback` (rate limit, sanitize) | 🔴 Critical | 30 phút |
| S3 | Bảo vệ Sanity Studio `/studio` bằng Basic Auth | 🔴 Critical | 20 phút |
| S4 | Thêm HTTP Security Headers (CSP, HSTS, X-Frame) | 🟠 High | 20 phút |
| S5 | Kiểm tra XSS & Content Injection | 🟠 High | 20 phút |
| S6 | Quét Dependency Vulnerabilities | 🟠 High | 15 phút |
| S7 | Kiểm tra CORS & cấu hình Vercel | 🟡 Medium | 20 phút |
| S8 | Kiểm tra bảo mật Sanity CMS (token, CORS) | 🟡 Medium | 15 phút |
| S9 | Chạy automated scanner (ESLint Security, ZAP) | 🟡 Medium | 20 phút |
| S10 | Viết Báo cáo tổng hợp | 📄 Doc | 15 phút |

**Tổng: ~3 giờ — nên thực hiện TRƯỚC khi go-live production.**

---

## Thứ tự ưu tiên thực hiện

```
ĐẦU TIÊN (trước khi deploy):
  S1 → S3 → S2 → S4

SAU ĐÓ (trong tuần đầu sau launch):
  S5 → S6 → S7 → S8

CUỐI CÙNG (hoàn thiện):
  S9 → S10
```
