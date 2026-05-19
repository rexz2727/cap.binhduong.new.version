# TỐI ƯU HIỆU NĂNG

**Dự án:** Cổng thông tin Công an phường Bình Dương  
**Chuẩn tham chiếu:** Core Web Vitals, Next.js Performance Best Practices  
**Cập nhật:** 19/05/2026

---

## I. ĐÃ TỐI ƯU

### 1. Bundle Size — Bỏ thư viện nặng

| Thư viện bị bỏ | Kích thước tiết kiệm | Thay thế |
|---|---|---|
| `framer-motion` | ~100KB gzipped | CSS `transition` + Tailwind |

Hiệu ứng fade-up, card hover, page transition hiện dùng CSS thuần — đủ dùng, không cần JS animation library.

### 2. Font Optimization

- Dùng `next/font` để load **Be Vietnam Pro** — preload + self-hosted
- Loại bỏ render-blocking từ Google Fonts CDN
- Kết quả: không còn FOUT (Flash of Unstyled Text)

### 3. Image Optimization — Sanity CDN

- Sanity CDN (`cdn.sanity.io`) bật — ảnh cache tại edge
- `@sanity/image-url` để tạo URL với resize, crop, format WebP
- `next/image` với `remotePatterns` — lazy load + WebP tự động

```ts
// Đúng cách — transform ảnh tại CDN trước khi trả về browser
builder.image(source).width(800).format("webp").url()
```

### 4. Loading Skeleton

- Mọi trang có `loading.tsx` hoặc Suspense boundary
- Người dùng thấy layout ngay, không bị màn hình trắng

### 5. ISR — Incremental Static Regeneration

| Loại nội dung | Revalidate | Lý do |
|---|---|---|
| Thông báo khẩn (announcement) | 120s | Cần cập nhật nhanh |
| Tin tức, Q&A | 300s | Thay đổi hàng ngày |
| Thủ tục, văn bản pháp luật | 3600s | Ít thay đổi |
| Lịch tiếp dân, album ảnh, video | 3600s | Ít thay đổi |
| Nhân sự | 86400s | Rất ít thay đổi |

### 6. `safeFetch` — Không block render

Tất cả data fetching bọc trong `safeFetch()` — trả fallback ngay nếu Sanity lỗi, không crash trang:

```ts
async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isConfigured) return fallback;
  try { return await fn(); } catch { return fallback; }
}
```

---

## II. CƠ HỘI TỐI ƯU TIẾP THEO

### Ưu tiên cao

**Rate limiting API routes**
- `/api/feedback` và `/api/qna` hiện chưa có giới hạn request
- Đề xuất: Vercel Edge Middleware + Upstash Redis (free tier)
- Lợi ích kép: chống spam + bảo mật

**Lazy load sections cuối trang chủ**
- `PhotoAlbumPreview` và `VideoPreview` không cần load khi trang mới mở
- Dùng `dynamic(() => import(...), { ssr: false })` hoặc IntersectionObserver

### Ưu tiên trung bình

**Sitemap + robots.txt**
- Tạo `app/sitemap.ts` và `app/robots.ts` (Next.js App Router hỗ trợ native)
- Google index đúng các trang công khai, loại trừ `/studio`

```ts
// app/sitemap.ts — mẫu
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getLatestNews(100);
  return [
    { url: "https://cap-binhduong.vercel.app", lastModified: new Date() },
    ...news.map(n => ({
      url: `https://cap-binhduong.vercel.app/tin-tuc/${n.slug.current}`,
      lastModified: new Date(n.publishedAt),
    })),
  ];
}
```

**YouTube click-to-play**
- Thay iframe YouTube tải ngay bằng thumbnail + click để play
- Tránh load script YouTube nặng (~500KB) khi trang mới mở

### Ưu tiên thấp

**OpenGraph dynamic images**
- `app/opengraph-image.tsx` tạo OG image tự động cho từng bài tin
- Hiển thị đẹp khi share lên Zalo/Facebook

**Service Worker / PWA**
- Cache static assets để tải nhanh hơn trên mạng chậm
- Phù hợp nếu đơn vị muốn cài vào màn hình điện thoại

---

## III. CORE WEB VITALS — MỤC TIÊU

| Metric | Mục tiêu (Google) | Ghi chú |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Đo sau khi deploy với data thật |
| INP (Interaction to Next Paint) | < 200ms | Tốt — không có heavy JS |
| CLS (Cumulative Layout Shift) | < 0.1 | Tốt — skeleton + fixed layout |
| TTFB (Time to First Byte) | < 800ms | Tốt — Vercel Edge + ISR |

Đo chính xác bằng PageSpeed Insights sau khi deploy với dữ liệu thật.

---

## IV. QUY TẮC KHÔNG ĐƯỢC PHÁ VỠ

1. **Không thêm animation library** (framer-motion, gsap...) — dùng CSS transition
2. **Không load ảnh bằng `<img>` thường** — luôn dùng `next/image`
3. **Không import toàn bộ icon library** — chỉ import icon cần dùng hoặc SVG inline
4. **Không để data fetch trong Client Component** nếu có thể làm ở Server Component
5. **Không tắt ISR** (`revalidate: 0` hoặc `cache: 'no-store'`) nếu nội dung không cần real-time

---

*Cổng thông tin Công an phường Bình Dương — Cập nhật 19/05/2026*
