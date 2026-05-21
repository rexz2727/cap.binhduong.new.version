# Bản thiết kế Hướng 4 — Pixel-perfect reference

Hai file trong thư mục này là **bản demo gốc** dùng làm chuẩn khi triển khai code Next.js + Tailwind.

| File | Mô tả |
|---|---|
| `index-v4.html` | Toàn bộ 12 trang trong 1 HTML (Trang chủ, Giới thiệu, Tin tức, Văn bản, Thủ tục, Phản ánh, Hỏi đáp, Thư viện, Video, Lịch tiếp, Truy nã, Bài viết) |
| `styles-v4.css` | Design tokens + tất cả component styles + responsive + dark mode |

## Cách dùng

1. **Khi build component:** mở file HTML, tìm element tương ứng, copy class + style trực tiếp sang Tailwind utility hoặc giữ nguyên CSS module.
2. **Khi cần xem layout:** mở file trong browser. Click các tab trên header để xem từng trang.
3. **Khi muốn đổi thiết kế:** sửa ở đây trước, sau đó áp dụng vào component thật.

## Tính năng đã có

- ✅ 12 trang fully designed
- ✅ Nav dropdown hover (Tin tức, Thư viện)
- ✅ Mobile drawer (hamburger < 1024px)
- ✅ About page tabs switching
- ✅ Filter chips toggle
- ✅ Ticker scrolling
- ✅ **Dark mode** toggle (icon mặt trăng)
- ✅ **Language switcher** VI/EN (icon quả địa cầu)
- ✅ **AI Trợ lý ảo** widget (floating bubble + claude.complete)
- ✅ Live clock
- ✅ Responsive 4 breakpoints (1280/1024/768/480)

## KHÔNG commit file này vào production build

Folder `design-reference/` chỉ là **tham chiếu cho dev**. Add vào `.gitignore` nếu muốn không deploy, hoặc giữ lại làm tài liệu nội bộ.
