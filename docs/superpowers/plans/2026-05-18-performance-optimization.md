# Performance Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Giảm JavaScript bundle, loại bỏ render-blocking resource, cải thiện perceived performance, và xóa nút Phản ánh trùng lặp còn sót.

**Architecture:** Thay framer-motion bằng CSS transition thuần (đã có sẵn trong globals.css), chuyển Google Fonts sang `next/font` để loại bỏ render-blocking, thêm loading skeleton, giảm GPU-heavy CSS effects.

**Tech Stack:** Next.js 16, Tailwind CSS v4, `next/font/google`

---

## Files Affected

| File | Action |
|---|---|
| `components/layout/PageTransition.tsx` | Modify — bỏ framer-motion, dùng CSS fade-in |
| `app/layout.tsx` | Modify — thêm `next/font/google`, bỏ `@import url()` trong globals.css |
| `app/globals.css` | Modify — xóa dòng `@import url(Google Fonts)` |
| `app/(web)/loading.tsx` | Create — skeleton loading screen |
| `components/sections/HeroSection.tsx` | Modify — giảm `blur-3xl` → `blur-xl` |
| `components/sections/ContactInfo.tsx` | Modify — xóa nút "Gửi phản ánh trực tuyến" trùng lặp |

---

### Task 1: Xóa nút Phản ánh trùng cuối cùng

**Files:**
- Modify: `components/sections/ContactInfo.tsx`

- [ ] Xóa `<Link href="/phan-anh" ...>Gửi phản ánh trực tuyến →</Link>` (dòng 94–99)
- [ ] Xóa import `Link` nếu không còn dùng ở chỗ khác trong file

```tsx
// Xóa đoạn này:
<Link
  href="/phan-anh"
  className="inline-block bg-police-red hover:bg-police-red-dark text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-police-red/30 hover:-translate-y-0.5"
>
  Gửi phản ánh trực tuyến →
</Link>
```

---

### Task 2: Thay framer-motion bằng CSS transition

**Files:**
- Modify: `components/layout/PageTransition.tsx`

`globals.css` đã có sẵn `animate-fade-in` (0.5s ease-out, opacity 0→1). Dùng lại class đó.

- [ ] Thay toàn bộ nội dung `PageTransition.tsx`:

```tsx
"use client";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-fade-in">
      {children}
    </div>
  );
}
```

- [ ] Xóa `framer-motion` khỏi dependencies:

```bash
npm uninstall framer-motion
```

- [ ] Chạy build để xác nhận không lỗi: `npm run build`

---

### Task 3: Chuyển Google Fonts sang `next/font`

**Files:**
- Modify: `app/globals.css` — xóa dòng `@import url(Google Fonts)`
- Modify: `app/layout.tsx` — thêm `next/font/google`, apply variable lên `<body>`

`@import url()` trong CSS là render-blocking. `next/font` tự inject `<link rel="preload">` và `font-display: swap`.

- [ ] Xóa dòng đầu trong `app/globals.css`:

```css
/* Xóa dòng này: */
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap');
```

- [ ] Sửa `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

// giữ nguyên metadata export hiện có

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={beVietnamPro.variable}>
        {children}
      </body>
    </html>
  );
}
```

> `variable: "--font-sans"` giữ nguyên biến CSS `--font-sans` đang dùng trong `@theme`, không cần sửa gì thêm.

---

### Task 4: Thêm Loading Skeleton

**Files:**
- Create: `app/(web)/loading.tsx`

- [ ] Tạo file:

```tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="bg-police-navy h-[480px] flex flex-col items-center justify-center gap-4 px-4">
        <div className="h-5 w-48 bg-white/20 rounded-full" />
        <div className="h-14 w-3/4 max-w-lg bg-white/20 rounded-xl" />
        <div className="h-5 w-1/2 max-w-sm bg-white/15 rounded-full" />
        <div className="h-12 w-80 bg-white/20 rounded-xl mt-4" />
      </div>
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      </div>
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 bg-gray-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Task 5: Giảm GPU-heavy CSS trong HeroSection

**Files:**
- Modify: `components/sections/HeroSection.tsx`

`blur-3xl` = `filter: blur(64px)` rất tốn GPU trên mobile. Giảm xuống `blur-xl` (24px).

- [ ] Thay 2 dòng:

```tsx
// Trước:
<div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-police-red/10 blur-3xl" />
<div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-police-gold/10 blur-3xl" />

// Sau:
<div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-police-red/10 blur-xl" />
<div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-police-gold/10 blur-xl" />
```

---

## Summary — Expected Gains

| Thay đổi | Lợi ích |
|---|---|
| Bỏ framer-motion | −~100KB JS bundle; giảm TTI |
| next/font thay @import | Bỏ render-blocking font request |
| Loading skeleton | Perceived load time tốt hơn (không blank screen) |
| blur-xl thay blur-3xl | Giảm GPU repaint, mượt hơn trên mobile |
| Xóa nút Phản ánh trùng | UX sạch, không nhầm lẫn |
