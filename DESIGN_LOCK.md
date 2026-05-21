# 🎨 Design Lock — KHÔNG chỉnh sửa file thiết kế

> **Quy ước:** Các file dưới đây là **mã thiết kế chuẩn** đã được duyệt. Khi xử lý logic / flows / business code, **không được sửa style, layout, màu sắc, animation** trừ khi có yêu cầu rõ ràng từ thiết kế.

## Phạm vi LOCK (chỉ sửa khi có yêu cầu thiết kế)

### Tokens & Theme
- `app/globals.css` — CSS variables (palette navy/đỏ/vàng), font, radius, shadow, dark mode overrides
- `tailwind.config.*` (nếu thêm) — token đồng bộ

### Layout / Frame
- `components/layout/Header.tsx` — utility bar + main bar + nav dropdowns + dark mode toggle + language switcher
- `components/layout/Footer.tsx` — 4 cột với hotline 113 box
- `components/layout/MobileMenu.tsx` — drawer slide từ phải
- `components/layout/NewsTicker.tsx` — ticker layout 2 cột (label + viewport scroll)

### Sections (homepage)
- `components/sections/HeroSection.tsx`
- `components/sections/QuickLinks.tsx` (service grid 3×2)
- `components/sections/LatestNews.tsx` (editorial)
- `components/sections/NguoiTotViecTot.tsx` (honor strip)
- `components/sections/ContactInfo.tsx` (value props 4 cột)

### UI primitives
- `components/ui/Button.tsx` — `.btn`, `.btn-primary` (vàng), `.btn-red`, `.btn-secondary`, `.btn-navy`, `.btn-ghost`
- `components/ui/NewsCard.tsx`, `LegalDocCard.tsx`, `WantedCard.tsx`, `QnaCard.tsx`
- `components/ui/PageHeader.tsx` — breadcrumb + title trên nền red gradient
- `components/ui/CopBubble.tsx` — floating bubble + support panel + AI chat

### Page templates (chỉ đụng JSX wrapper, không sửa class)
- `app/(web)/page.tsx` đến tất cả pages

## ✅ CHO PHÉP sửa

- Logic JS/TS (data fetching, state, validation)
- Sanity GROQ queries
- API routes (`/api/feedback`, `/api/qna`)
- Middleware, env, security headers
- Thêm trang mới (nhớ đăng ký nav nếu cần)
- Sửa nội dung text trong placeholder demo (lorem) thành text thật từ Sanity

## ❌ KHÔNG cho phép (cần hỏi designer trước)

- Đổi màu, font, radius, shadow
- Đổi spacing, sizing, breakpoint
- Thay icon, đổi placeholder image style
- Đổi animation timing, easing
- Sửa layout grid columns, sidebar widths
- Đổi cấu trúc Header / Footer / Mobile drawer

## Tham khảo bản demo HTML

File `design-reference/index-v4.html` + `design-reference/styles-v4.css` là **bản pixel-perfect demo** của thiết kế. Khi cần xem trang nào trông như thế nào → mở file đó, không suy diễn.

## Design system tóm tắt

```css
/* Palette */
--navy: #8B0000          /* Đỏ thẫm — brand chính (header/footer/hero) */
--red: #C8102E           /* Đỏ tươi — CTA emergency */
--gold: #E8B931          /* Vàng đồng — accent, primary CTA bg */
--gold-bright: #F2C94C   /* Vàng rực — hover */
--bg: #FBF7F0            /* Cream paper — nền chính */
--ink: #1A0F08           /* Near-black warm — text */

/* Type */
--font-sans: 'Inter', 'Be Vietnam Pro', sans-serif

/* Radius (bo tròn nhiều) */
--radius-sm: 8px
--radius: 14px
--radius-lg: 20px
--radius-xl: 28px

/* Container */
max-width: 1240px

/* Breakpoints */
1024px (tablet — show hamburger)
768px  (mobile — full stack)
480px  (small mobile)
```

## Dark mode

Toggle qua `html[data-theme="dark"]`, lưu vào `localStorage` key `theme`. Khi build Tailwind, dùng `class` strategy (`darkMode: 'class'`) hoặc `selector` strategy mapping `[data-theme="dark"]`.

## Language

Toggle qua `document.documentElement.lang`, lưu `localStorage` key `lang`. Tags `data-i18n="key"` và `data-i18n-placeholder="key"` — map trong `lib/i18n.ts`.

---

**Designer:** Claude · **Ngày khóa thiết kế:** 21/05/2026 · **Version:** v4 (Kết hợp)
