# Full i18n Design — VI/EN Toggle

**Date:** 2026-05-26
**Goal:** Toàn bộ nội dung trang (UI chrome + CMS content) chuyển ngôn ngữ khi user bấm toggle EN/VI.

---

## Architecture

```
User bấm EN toggle
  ├── UI Chrome → đọc từ I18N dict (lib/i18n.tsx) — đã có, chỉ cần áp đủ t()
  └── CMS Content → đọc trường *En từ Sanity (titleEn, summaryEn, bodyEn...)
                        └── Fallback: hiện bản VI nếu chưa có EN

Admin dùng Sanity Studio
  └── Bấm "Dịch sang EN" (custom action)
        └── Gọi Google Cloud Translation API (1 lần/document)
              └── Lưu vào titleEn / summaryEn / bodyEn trong Sanity
```

**Nguyên tắc chi phí:** Dịch 1 lần lúc admin publish → lưu Sanity → mọi user đọc từ Sanity, KHÔNG gọi API mỗi lần xem.

---

## Phần 1 — UI Chrome (sửa hardcoded strings)

**Vấn đề:** Nhiều component dùng text tiếng Việt cứng thay vì `t()`.

**Files cần sửa:**
- `components/layout/Header.tsx` — utility bar labels, nav labels
- `components/layout/Footer.tsx` — section headings, labels
- `components/layout/MobileMenu.tsx` — labels, CTA
- `components/sections/ServiceGrid.tsx` — card labels + descriptions (thêm key vào I18N)
- `components/sections/EmergencyRow.tsx` — tiêu đề, số điện thoại labels
- `components/sections/QuickLinks.tsx` — tiêu đề, labels
- `components/sections/ContactInfo.tsx` — labels
- `constants/nav.ts` — HEADER_NAV_ITEMS labels, UTILITY_ACTIONS labels

**Thêm I18N keys còn thiếu vào `lib/i18n.tsx`:**
- Service cards: `svc.cccd`, `svc.residence`, `svc.vehicle`, `svc.passport`, `svc.appointment`, `svc.qna`
- Utility: `util.schedule`, `util.feedback`
- Nav: `nav.feedback` (utility bar label)

---

## Phần 2 — Schema Sanity (thêm trường EN)

**Content types cần thêm trường EN:**

| Schema | Trường thêm |
|---|---|
| `newsPost` | `titleEn`, `summaryEn`, `bodyEn` |
| `legalDocument` | `titleEn`, `summaryEn` |
| `procedure` | `titleEn`, `summaryEn`, `stepsEn` |
| `announcement` | `titleEn`, `bodyEn` |
| `personnel` | `positionEn`, `unitEn` |

Tất cả trường EN đều **optional** — nếu rỗng, fallback về bản VI.

---

## Phần 3 — API Route dịch (`/api/translate`)

**File:** `app/api/translate/route.ts`

```
POST /api/translate
Body: { text: string | string[], sourceLang: "vi", targetLang: "en" }
Response: { translated: string | string[] }
```

- Dùng Google Cloud Translation API v2 (Basic)
- Env var: `GOOGLE_TRANSLATE_API_KEY`
- Chỉ gọi từ Sanity Studio action (server-side) — không expose cho public
- Validate input bằng Zod

---

## Phần 4 — Sanity Studio Custom Action

**File:** `sanity/actions/translateAction.ts`

- Nút "🌐 Dịch sang EN" xuất hiện trên mỗi document trong Studio
- Khi bấm: gọi `/api/translate` với các trường VI
- Điền kết quả vào các trường EN tương ứng
- Hiện toast "Đã dịch — hãy review trước khi publish"
- Đăng ký trong `sanity.config.ts`

---

## Phần 5 — GROQ Queries (trả về cả VI + EN)

**File:** `sanity/lib/queries.ts`

Mọi query fetch thêm trường `*En`:
```groq
*[_type == "newsPost"][0]{
  title, titleEn,
  summary, summaryEn,
  body, bodyEn,
  ...
}
```

---

## Phần 6 — Components hiển thị bilingual

**Pattern dùng chung:**
```tsx
const { lang } = useI18n();
const title = lang === "en" && doc.titleEn ? doc.titleEn : doc.title;
```

**Files cần cập nhật:**
- `app/(web)/tin-tuc/[slug]/page.tsx`
- `app/(web)/van-ban-phap-luat/[slug]/page.tsx`
- `app/(web)/thu-tuc-hanh-chinh/[slug]/page.tsx`
- `components/ui/NewsCard.tsx`
- `components/ui/LegalDocCard.tsx`
- `components/sections/LatestNews.tsx`
- `components/sections/NewsCarousel.tsx`

---

## Env vars cần thêm

```env
GOOGLE_TRANSLATE_API_KEY=your_key_here
```

---

## Không làm

- Không dịch realtime mỗi lần user xem
- Không bắt buộc admin phải có bản EN mới publish
- Không tự động dịch khi admin save (chỉ khi bấm nút)
- Không thay đổi URL structure (không dùng `/en/`, `/vi/` prefix)

---

## Build verification

```bash
npm run build  # 0 TypeScript errors
```
