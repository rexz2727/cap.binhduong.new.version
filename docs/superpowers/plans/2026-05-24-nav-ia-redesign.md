# Nav & IA Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thu gọn nav từ 10 → 5 item, đưa "Phản ánh" và "Lịch tiếp dân" lên utility bar, thay quick-tags bằng service grid 6 card trực quan.

**Architecture:** Tách `HEADER_NAV_ITEMS` (5 item, chỉ dùng trong Header/MobileMenu) ra khỏi `NAV_ITEMS` (giữ nguyên 10 item, Footer dùng cho "Liên kết nhanh"). Thêm `SERVICE_CARDS` constant cho service grid. HeroSection render grid thay cho text pills.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, CSS classes từ globals.css. Không có test runner — verify bằng `npm run build` + dev server.

---

## File Map

| File | Thay đổi |
|---|---|
| `constants/nav.ts` | Thêm `HEADER_NAV_ITEMS` (5 item) + `UTILITY_ACTIONS` |
| `constants/services.ts` | Tạo mới — `SERVICE_CARDS` (6 card) |
| `components/layout/Header.tsx` | Dùng `HEADER_NAV_ITEMS`, thêm utility action buttons |
| `components/layout/MobileMenu.tsx` | Dùng `HEADER_NAV_ITEMS` |
| `components/sections/HeroSection.tsx` | Thay `hero-quick-tags` bằng `ServiceGrid` |
| `components/sections/ServiceGrid.tsx` | Tạo mới — render 6 service cards |
| `app/globals.css` | Thêm `.service-grid`, `.service-card` + responsive + dark mode |

---

### Task 1: Cập nhật constants

**Files:**
- Modify: `constants/nav.ts`
- Create: `constants/services.ts`

- [ ] **Bước 1: Thêm `HEADER_NAV_ITEMS` và `UTILITY_ACTIONS` vào `constants/nav.ts`**

Append vào cuối file (giữ nguyên `NAV_ITEMS` để Footer dùng):

```ts
export const HEADER_NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Tin tức",
    href: "/tin-tuc",
    children: [
      { label: "Tất cả tin tức", href: "/tin-tuc" },
      { label: "Thông báo", href: "/tin-tuc?category=thong-bao" },
      { label: "Cảnh báo", href: "/tin-tuc?category=canh-bao" },
    ],
  },
  { label: "Thủ tục hành chính", href: "/thu-tuc-hanh-chinh" },
  { label: "Văn bản pháp luật", href: "/van-ban-phap-luat" },
  { label: "Hỏi đáp", href: "/hoi-dap" },
];

export const UTILITY_ACTIONS = [
  { label: "Lịch tiếp dân", href: "/lich-tiep-cong-dan", icon: "#i-cal" },
  { label: "Phản ánh", href: "/phan-anh", icon: "#i-mail", highlight: true },
] as const;
```

- [ ] **Bước 2: Tạo `constants/services.ts`**

```ts
export interface ServiceCard {
  label: string;
  description: string;
  href: string;
  icon: string;
}

export const SERVICE_CARDS: ServiceCard[] = [
  { label: "Cấp CCCD", description: "Căn cước công dân", href: "/thu-tuc-hanh-chinh", icon: "#i-doc" },
  { label: "Đăng ký cư trú", description: "Thường trú, tạm trú", href: "/thu-tuc-hanh-chinh", icon: "#i-home" },
  { label: "Đăng ký xe", description: "Mô tô, xe gắn máy", href: "/thu-tuc-hanh-chinh", icon: "#i-vehicle" },
  { label: "Hộ chiếu", description: "Cấp, gia hạn hộ chiếu", href: "/thu-tuc-hanh-chinh", icon: "#i-globe" },
  { label: "Đặt lịch hẹn", description: "Lịch tiếp công dân", href: "/lich-tiep-cong-dan", icon: "#i-cal" },
  { label: "Gửi phản ánh", description: "Kiến nghị trực tuyến", href: "/phan-anh", icon: "#i-mail" },
];
```

> **Lưu ý icon:** Dùng các icon id đã có trong `IconDefs.tsx`. Kiểm tra file đó trước để dùng đúng id. Nếu `#i-home` hay `#i-vehicle` chưa có thì dùng `#i-doc` làm fallback.

- [ ] **Bước 3: Build check**

```bash
npm run build 2>&1 | grep -E "error|Error|Compiled"
```
Expected: `✓ Compiled successfully`

---

### Task 2: CSS service grid

**Files:**
- Modify: `app/globals.css`

- [ ] **Bước 1: Đọc cuối file globals.css để tìm vị trí thêm**

Tìm dòng cuối section hero (gần `.hero-stat`), append sau đó:

```css
/* Service grid */
.service-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 28px;
}

.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 8px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius);
  color: white;
  text-decoration: none;
  text-align: center;
  font-size: 12px;
  line-height: 1.3;
  transition: background 0.15s, border-color 0.15s;
}
.service-card:hover {
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.25);
}
.service-card .sc-icon {
  width: 38px;
  height: 38px;
  background: var(--gold);
  border-radius: 9px;
  display: grid;
  place-items: center;
  color: var(--navy-deep);
  flex-shrink: 0;
}
.service-card .sc-label { font-weight: 600; font-size: 12.5px; }
.service-card .sc-desc { font-size: 11px; opacity: 0.7; }
```

- [ ] **Bước 2: Thêm responsive**

Tìm breakpoint `@media (max-width: 768px)` và thêm:

```css
  .service-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .service-card { padding: 12px 6px; }
```

Và `@media (max-width: 480px)`:

```css
  .service-grid { grid-template-columns: repeat(2, 1fr); }
```

- [ ] **Bước 3: Thêm utility action button CSS vào utility bar section**

Tìm `.utility-right` trong globals.css, thêm sau:

```css
.util-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.2);
  transition: background 0.15s;
  text-decoration: none;
}
.util-action:hover { background: rgba(255,255,255,0.1); color: white; }
.util-action.highlight { background: var(--red); border-color: var(--red); color: white; }
.util-action.highlight:hover { background: var(--red-deep); border-color: var(--red-deep); }
```

- [ ] **Bước 4: Dark mode cho `.service-card`**

Thêm vào cuối dark mode section (tìm `html[data-theme="dark"]` ở cuối file):

```css
html[data-theme="dark"] .service-card { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); }
html[data-theme="dark"] .service-card:hover { background: rgba(255,255,255,0.1); }
```

---

### Task 3: Component ServiceGrid mới

**Files:**
- Create: `components/sections/ServiceGrid.tsx`

- [ ] **Bước 1: Tạo component**

```tsx
import Link from "next/link";
import { SERVICE_CARDS } from "@/constants/services";

export default function ServiceGrid() {
  return (
    <div className="service-grid">
      {SERVICE_CARDS.map((card) => (
        <Link key={card.href + card.label} href={card.href} className="service-card">
          <div className="sc-icon">
            <svg width="18" height="18" aria-hidden="true">
              <use href={card.icon} />
            </svg>
          </div>
          <span className="sc-label">{card.label}</span>
          <span className="sc-desc">{card.description}</span>
        </Link>
      ))}
    </div>
  );
}
```

---

### Task 4: Cập nhật HeroSection

**Files:**
- Modify: `components/sections/HeroSection.tsx`

- [ ] **Bước 1: Xóa `hero-quick-tags` block, thêm `ServiceGrid`**

Xóa toàn bộ `<div className="hero-quick-tags">...</div>` và `homeContent?.heroQuickTags` logic.
Thêm import `ServiceGrid` và render sau `<HeroSearch />`:

```tsx
import ServiceGrid from "./ServiceGrid";
// ...
<HeroSearch />
<ServiceGrid />
```

Xóa props `homeContent` nếu chỉ dùng cho quickTags (kiểm tra xem có dùng cho eyebrow/h1/lead không — nếu có thì giữ prop, chỉ xóa phần quickTags).

---

### Task 5: Cập nhật Header

**Files:**
- Modify: `components/layout/Header.tsx`

- [ ] **Bước 1: Đổi `NAV_ITEMS` thành `HEADER_NAV_ITEMS`**

```tsx
import { HEADER_NAV_ITEMS, UTILITY_ACTIONS } from "@/constants/nav";
// Thay NAV_ITEMS thành HEADER_NAV_ITEMS trong phần render nav
```

- [ ] **Bước 2: Thêm utility action buttons vào utility bar**

Trong `<div className="utility-right">`, thêm trước language switcher:

```tsx
{UTILITY_ACTIONS.map((action) => (
  <Link
    key={action.href}
    href={action.href}
    className={`util-action${action.highlight ? " highlight" : ""}`}
  >
    <svg width="12" height="12" aria-hidden="true">
      <use href={action.icon} />
    </svg>
    {action.label}
  </Link>
))}
<span className="sep">|</span>
```

---

### Task 6: Cập nhật MobileMenu

**Files:**
- Modify: `components/layout/MobileMenu.tsx`

- [ ] **Bước 1: Đổi sang `HEADER_NAV_ITEMS`**

```tsx
import { HEADER_NAV_ITEMS } from "@/constants/nav";
// Thay NAV_ITEMS thành HEADER_NAV_ITEMS trong toàn bộ file
```

---

### Task 7: Build + Dev server

- [ ] **Bước 1: Build check**

```bash
npm run build 2>&1 | grep -E "error|Error|Compiled|Failed"
```
Expected: `✓ Compiled successfully`

- [ ] **Bước 2: Chạy dev server để demo**

```bash
npm run dev
```

Mở `http://localhost:3000` — kiểm tra:
- [ ] Nav chỉ còn 5 item
- [ ] Utility bar có "Lịch tiếp dân" và nút đỏ "Phản ánh"
- [ ] Hero section có service grid 6 card
- [ ] Mobile: grid collapse 3 cột → 2 cột
- [ ] Dark mode: card vẫn hiển thị đúng
- [ ] Tất cả link click được (không còn `href="#"`)

---

## Checklist cuối

- [ ] `NAV_ITEMS` vẫn còn nguyên (Footer dùng)
- [ ] `HEADER_NAV_ITEMS` chỉ 5 item
- [ ] Service grid 6 card, link đúng
- [ ] "Phản ánh" nổi bật màu đỏ ở utility bar
- [ ] Build pass, 0 lỗi TypeScript
- [ ] **Chưa commit** — chờ user xem demo rồi quyết định
